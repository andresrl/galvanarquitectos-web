#!/usr/bin/env python3
"""Project archive derivatives: reads scripts/media/projects.json and the originals in
../Graphics/VISENI/01 - Selección Proyectos, writes AVIF derivatives to public/media/projects/<id>/ and the
manifest app/data/projects/media.generated.ts.

Originals stay outside public/. Never upscales. Incremental: existing outputs are kept
(pass --force to rebuild). --projects ID [ID ...] rebuilds only those projects.
--src DIR reads the originals from another folder (on the Windows machine: ../__Selección__).
Content hashes in filenames invalidate cached images when originals or the conversion recipe change.
Uses the vips CLI with HEIF/AVIF support; without it, falls back to Pillow 11.2+ (built-in AVIF).
"""
import argparse, base64, hashlib, io, json, os, re, shutil, subprocess, unicodedata
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

APP = Path(__file__).resolve().parents[2]
SRC = APP.parent / 'Graphics' / 'VISENI' / '01 - Selección Proyectos'
OUT = APP / 'public' / 'media' / 'projects'
CACHE = APP / '.cache' / 'lqip'
MANIFEST = APP / 'app' / 'data' / 'projects' / 'media.generated.ts'
CURATION = json.loads((APP / 'scripts' / 'media' / 'projects.json').read_text(encoding='utf-8'))['projects']
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--force', action='store_true')
parser.add_argument('--projects', nargs='+', metavar='ID')
parser.add_argument('--src', type=Path, default=SRC)
ARGS = parser.parse_args()
SRC = ARGS.src
FORCE = ARGS.force
ENV = {**os.environ, 'VIPS_WARNING': '0', 'VIPS_CONCURRENCY': '2'}
ENGINE = 'vips' if shutil.which('vips') else 'pillow'
IMAGE = re.compile(r'\.(jpe?g|png|webp)$', re.I)
WIDTHS = [800, 1600]          # gallery
WIDTHS_WIDE = [800, 1600, 2560]  # hero and pause are shown full-bleed
# Include the conversion recipe so regenerated derivatives also get fresh cache URLs.
RECIPE = b'v1:avif-Q52-effort4-strip:srgb:jpeg-Q82:webp-Q40' + (b':pillow' if ENGINE == 'pillow' else b'')
SAVE = {  # vips save options and their Pillow equivalents
    'avif': ('Q=52,effort=4,strip', {'quality': 52, 'speed': 5}),
    'og': ('Q=82,strip,optimize-coding,interlace', {'quality': 82, 'optimize': True, 'progressive': True}),
    'lqip': ('Q=40,strip', {'quality': 40}),
}


def run(*args: str) -> str:
    return subprocess.run(args, check=True, capture_output=True, text=True, env=ENV).stdout


def slugify(stem: str) -> str:
    s = unicodedata.normalize('NFKD', stem).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')


def pillow(path: Path):
    from PIL import Image, ImageCms, ImageOps
    im = ImageOps.exif_transpose(Image.open(path))
    if icc := im.info.get('icc_profile'):  # as --export-profile srgb
        im = ImageCms.profileToProfile(im, ImageCms.ImageCmsProfile(io.BytesIO(icc)), ImageCms.createProfile('sRGB'), outputMode='RGB')
    im = im.convert('RGB')
    im.info.clear()  # strip: no EXIF or ICC in the derivatives
    return im


def size(path: Path) -> tuple[int, int]:
    if ENGINE == 'pillow':
        return pillow(path).size
    return int(run('vipsheader', '-f', 'width', str(path))), int(run('vipsheader', '-f', 'height', str(path)))


def derive(src: Path, dest: Path, width: int, kind: str, height: int = 0) -> None:
    if dest.exists() and not FORCE:
        return
    opts, save = SAVE[kind]
    if ENGINE == 'vips':
        crop = ('--height', str(height), '--crop', 'centre') if height else ()
        run('vips', 'thumbnail', str(src), f'{dest}[{opts}]', str(width), '--export-profile', 'srgb', *crop)
        return
    from PIL import Image, ImageOps
    im = pillow(src)
    im = ImageOps.fit(im, (width, height), Image.LANCZOS) if height else im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(dest, **save)


def process(project: dict, file: str, role: str) -> dict:
    src = SRC / project['folder'] / file
    w, h = size(src)
    digest = hashlib.sha256(src.read_bytes() + RECIPE).hexdigest()[:12]
    name = f'{slugify(Path(file).stem)}-{digest}'
    folder = OUT / project['id']
    folder.mkdir(parents=True, exist_ok=True)
    widths = sorted({min(x, w) for x in (WIDTHS_WIDE if role != 'gallery' else WIDTHS)})
    variants = []
    for width in widths:
        dest = folder / f'{name}-{width}.avif'
        derive(src, dest, width, 'avif')
        variants.append((width, f'/media/projects/{project["id"]}/{dest.name}'))
    if role == 'hero':  # Open Graph: exact 1200x630 crop, JPEG
        derive(src, folder / f'{name}-og.jpg', 1200, 'og', 630)
    CACHE.mkdir(parents=True, exist_ok=True)
    lqip = CACHE / f'{project["id"]}-{name}.webp'
    derive(src, lqip, 24, 'lqip')
    default = next((p for wd, p in variants if wd >= 1600), variants[-1][1])
    return {
        'file': file, 'src': default, 'srcset': ', '.join(f'{p} {wd}w' for wd, p in variants),
        'width': w, 'height': h,
        'lqip': 'data:image/webp;base64,' + base64.b64encode(lqip.read_bytes()).decode(),
        **({'jpg': f'/media/projects/{project["id"]}/{name}-og.jpg'} if role == 'hero' else {})
    }


def build(project: dict) -> tuple[str, dict]:
    files = sorted(f for f in os.listdir(SRC / project['folder']) if IMAGE.search(f) and f not in project.get('exclude', []))
    for key in ('hero', 'pause'):
        if project[key] not in files:
            raise SystemExit(f'{project["id"]}: {key} {project[key]!r} not found')
    gallery = [f for f in files if f not in (project['hero'], project['pause'])]
    entry = {
        'hero': process(project, project['hero'], 'hero'),
        'pause': process(project, project['pause'], 'pause'),
        'gallery': [process(project, f, 'gallery') for f in gallery],
    }
    if 'card' in project:  # thumbnail: reuses the derivatives of an image already processed above
        card = next((i for i in (entry['hero'], entry['pause'], *entry['gallery']) if i['file'] == project['card']), None)
        if not card:
            raise SystemExit(f'{project["id"]}: card {project["card"]!r} not found')
        entry['card'] = card
    print(f'  {project["id"]}: {len(files)} images')
    return project['id'], entry


def main() -> None:
    selected = CURATION
    media = {}
    if ARGS.projects:
        unknown = set(ARGS.projects) - {p['id'] for p in CURATION}
        if unknown:
            parser.error(f'Unknown project IDs: {", ".join(sorted(unknown))}')
        if not MANIFEST.exists():
            parser.error('A full build is required before rebuilding selected projects')
        media = json.loads(MANIFEST.read_text(encoding='utf-8').split(' = ', 1)[1])
        selected = [p for p in CURATION if p['id'] in ARGS.projects]
    print(f'Projects: {len(selected)} from {SRC}')
    with ThreadPoolExecutor(max_workers=min(os.cpu_count() or 4, 4)) as pool:
        media.update(pool.map(build, selected))
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    body = json.dumps({p['id']: media[p['id']] for p in CURATION}, ensure_ascii=False, indent=1)
    MANIFEST.write_text(
        '// Generated by scripts/media/build_projects.py from scripts/media/projects.json. Do not edit.\n'
        "import type { ProjectMedia } from './types'\n"
        f'export const projectMedia: Record<string, ProjectMedia> = {body}\n', encoding='utf-8'
    )
    total = sum(f.stat().st_size for f in OUT.rglob('*') if f.is_file())
    print(f'Wrote {MANIFEST.relative_to(APP)} · public/media/projects {total / 1e6:.1f} MB')


if __name__ == '__main__':
    main()

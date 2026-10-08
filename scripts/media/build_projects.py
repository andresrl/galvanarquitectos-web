#!/usr/bin/env python3
"""Project archive derivatives: reads scripts/media/projects.json and the originals in
../Graphics/VISENI/01 - Selección Proyectos, writes AVIF derivatives to public/media/projects/<id>/ and the
manifest app/data/projects/media.generated.ts.

Originals stay outside public/. Never upscales. Incremental: existing outputs are kept
(pass --force to rebuild). --projects ID [ID ...] rebuilds only those projects.
Content hashes in filenames invalidate cached images when originals or the conversion recipe change.
Requires the vips CLI with HEIF/AVIF support.
"""
import argparse, base64, hashlib, json, os, re, subprocess, unicodedata
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

APP = Path(__file__).resolve().parents[2]
SRC = APP.parent / 'Graphics' / 'VISENI' / '01 - Selección Proyectos'
OUT = APP / 'public' / 'media' / 'projects'
CACHE = APP / '.cache' / 'lqip'
MANIFEST = APP / 'app' / 'data' / 'projects' / 'media.generated.ts'
CURATION = json.loads((APP / 'scripts' / 'media' / 'projects.json').read_text())['projects']
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--force', action='store_true')
parser.add_argument('--projects', nargs='+', metavar='ID')
ARGS = parser.parse_args()
FORCE = ARGS.force
ENV = {**os.environ, 'VIPS_WARNING': '0', 'VIPS_CONCURRENCY': '2'}
IMAGE = re.compile(r'\.(jpe?g|png)$', re.I)
WIDTHS = [800, 1600]          # gallery
WIDTHS_WIDE = [800, 1600, 2560]  # hero and pause are shown full-bleed
# Include the conversion recipe so regenerated derivatives also get fresh cache URLs.
RECIPE = b'v1:avif-Q52-effort4-strip:srgb:jpeg-Q82:webp-Q40'


def run(*args: str) -> str:
    return subprocess.run(args, check=True, capture_output=True, text=True, env=ENV).stdout


def slugify(stem: str) -> str:
    s = unicodedata.normalize('NFKD', stem).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')


def size(path: Path) -> tuple[int, int]:
    return int(run('vipsheader', '-f', 'width', str(path))), int(run('vipsheader', '-f', 'height', str(path)))


def derive(src: Path, dest: Path, width: int, opts: str, *extra: str) -> None:
    if dest.exists() and not FORCE:
        return
    run('vips', 'thumbnail', str(src), f'{dest}[{opts}]', str(width), '--export-profile', 'srgb', *extra)


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
        derive(src, dest, width, 'Q=52,effort=4,strip')
        variants.append((width, f'/media/projects/{project["id"]}/{dest.name}'))
    if role == 'hero':  # Open Graph: exact 1200x630 crop, JPEG
        derive(src, folder / f'{name}-og.jpg', 1200, 'Q=82,strip,optimize-coding,interlace', '--height', '630', '--crop', 'centre')
    CACHE.mkdir(parents=True, exist_ok=True)
    lqip = CACHE / f'{project["id"]}-{name}.webp'
    derive(src, lqip, 24, 'Q=40,strip')
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
        media = json.loads(MANIFEST.read_text().split(' = ', 1)[1])
        selected = [p for p in CURATION if p['id'] in ARGS.projects]
    print(f'Projects: {len(selected)} from {SRC}')
    with ThreadPoolExecutor(max_workers=min(os.cpu_count() or 4, 4)) as pool:
        media.update(pool.map(build, selected))
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    body = json.dumps({p['id']: media[p['id']] for p in CURATION}, ensure_ascii=False, indent=1)
    MANIFEST.write_text(
        '// Generated by scripts/media/build_projects.py from scripts/media/projects.json. Do not edit.\n'
        "import type { ProjectMedia } from './types'\n"
        f'export const projectMedia: Record<string, ProjectMedia> = {body}\n'
    )
    total = sum(f.stat().st_size for f in OUT.rglob('*') if f.is_file())
    print(f'Wrote {MANIFEST.relative_to(APP)} · public/media/projects {total / 1e6:.1f} MB')


if __name__ == '__main__':
    main()

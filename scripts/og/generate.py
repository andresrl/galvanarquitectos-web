"""Open Graph images (1200x630) for every page: headline on paper, the page's own hero photo beside it.

Crawls a running site (dev or production build) so titles and images always match what the page renders.
Writes public/og/<name>.jpg and app/data/og-manifest.ts (the paths that have their own image).

    python3 scripts/og/generate.py [http://127.0.0.1:3048]

Needs Pillow. Fonts: scripts/og/manrope.ttf and inter.ttf (OFL, converted from public/diseno/fonts).
"""
import html, json, re, sys, urllib.request
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

BASE = (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:3048').rstrip('/')
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'public' / 'og'
FONTS = Path(__file__).resolve().parent
W, H, PHOTO = 1200, 630, 630
PAPER, INK, BRASS, MUTED = (246, 244, 239), (28, 33, 30), (173, 141, 97), (98, 105, 97)
HUBS = ['/villa-architecture', '/villa-renovation', '/interior-design', '/landscape-design',
        '/es/arquitectura-villas', '/es/reformas-villas', '/es/interiorismo', '/es/paisajismo']
EXTRA = ['/', '/es', '/journal', '/es/guias', '/projects', '/es/proyectos', '/studio', '/es/estudio', '/contact', '/es/contacto']
SUFFIX = ' | Martínez Galván'


def font(name, size, weight):
    f = ImageFont.truetype(str(FONTS / f'{name}.ttf'), size)
    f.set_variation_by_axes([weight])
    return f


def get(path):
    with urllib.request.urlopen(BASE + path) as r:
        return r.read().decode()


def text(fragment):
    return ' '.join(html.unescape(re.sub(r'<[^>]+>', ' ', fragment or '')).split())


def links(page, block):
    m = re.search(block + r'[\s\S]*?</(?:ol|ul)>', page)
    return re.findall(r'href="(/[^"#]+)"', m.group(0)) if m else []


def describe(path, page):
    title = html.unescape(re.search(r'<meta property="og:title" content="([^"]*)"', page).group(1))
    title = title[:-len(SUFFIX)] if title.endswith(SUFFIX) else title
    lang = re.search(r'<html[^>]*lang="(\w+)"', page).group(1)
    hero = re.search(r'class="(?:service-hero-image|guide-figure|project-image project-hero-image)"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"', page)
    poster = re.search(r'class="projects-hero-media"[^>]*poster="([^"]+)"', page)
    eyebrow = re.search(r'<p class="eyebrow"[^>]*>([\s\S]*?)</p>', page)
    fixed = {'/': 'Spaces for living well.', '/es': 'Espacios para vivir mejor.', '/journal': 'Questions before your project.', '/es/guias': 'Preguntas antes de tu proyecto.',
             '/projects': 'Architecture, spaces and ways of living.', '/es/proyectos': 'Arquitectura, espacios y formas de vivir.',
             '/studio': 'Design and personal attention. From the idea to the site.', '/es/estudio': 'Diseño y trato directo. De la idea a la obra.',
             '/contact': 'Tell us about your project.', '/es/contacto': 'Cuéntanos tu proyecto.'}
    title = fixed.get(path, title)
    studio = path in ('/studio', '/es/estudio', '/contact', '/es/contacto')
    image = '/media/studio/studio-drawing-2560.avif' if studio else hero.group(1) if hero else poster.group(1) if poster else '/media/projects/the-house/the-house-06-1600.avif'
    if path in ('/', '/es'):
        image = '/media/projects/the-house/the-house-06-1600.avif'
    italic = re.search(r'class="project-hero-italic"[^>]*>([^<]*)<', page)
    if italic:
        title = html.unescape(re.search(r'<h1[^>]*>([^<]*)<', page).group(1)).strip()
    return {
        'title': title,
        'eyebrow': {'/contact': 'CONTACT · MARBELLA', '/es/contacto': 'CONTACTO · MARBELLA'}.get(path, (text(eyebrow.group(1)) if eyebrow else 'MARBELLA · COSTA DEL SOL').upper()),
        'image': image,
        'lang': lang,
        'project': bool(italic),
        'italic': html.unescape(italic.group(1)) if italic else '',
    }


def name_for(path):
    return 'home' if path == '/' else path.strip('/').replace('/', '--')


def spaced(draw, xy, s, f, fill, tracking):
    x, y = xy
    for ch in s:
        draw.text((x, y), ch, font=f, fill=fill)
        x += draw.textlength(ch, font=f) + tracking
    return x


def wrap(draw, s, f, width):
    lines, line = [], ''
    for word in s.split():
        trial = (line + ' ' + word).strip()
        if draw.textlength(trial, font=f) <= width or not line:
            line = trial
        else:
            lines.append(line)
            line = word
    return lines + [line] if line else lines


def logo(img, xy, height, file):
    mark = Image.open(ROOT / 'public' / 'brand' / file).convert('RGBA')
    mark = mark.resize((round(mark.width * height / mark.height), height), Image.LANCZOS)
    img.paste(mark, xy, mark)


def cover(photo, w, h):
    scale = max(w / photo.width, h / photo.height)
    p = photo.resize((round(photo.width * scale), round(photo.height * scale)), Image.LANCZOS)
    left, top = (p.width - w) // 2, (p.height - h) // 2
    return p.crop((left, top, left + w, top + h))


def render_project(info, target):
    # Project pages: the hero photograph full-bleed, name and headline over a dark gradient, white logo.
    img = cover(Image.open(ROOT / 'public' / info['image'].split('?', 1)[0].lstrip('/')).convert('RGB'), W, H)
    shade = Image.new('L', (W, H))
    sd = ImageDraw.Draw(shade)
    for y in range(H):
        sd.line([(0, y), (W, y)], fill=int(215 * max(0, (y - H * 0.28) / (H * 0.72)) ** 1.15))
    img.paste(Image.new('RGB', (W, H), (11, 20, 16)), (0, 0), shade)
    d = ImageDraw.Draw(img)
    spaced(d, (64, H - 228), info['eyebrow'][:46], font('inter', 15, 600), BRASS, 2.2)
    d.text((62, H - 205), info['title'], font=font('manrope', 78, 300), fill=(255, 255, 255))
    d.text((64, H - 108), info['italic'][:70], font=font('inter', 24, 400), fill=(236, 233, 226))
    logo(img, (W - 64 - 150, H - 86), 52, 'logo-invert.png')
    img.save(target, 'JPEG', quality=84, optimize=True, progressive=True)


def render(info, target):
    if info.get('project'):
        return render_project(info, target)
    img = Image.new('RGB', (W, H), PAPER)
    photo = Image.open(ROOT / 'public' / info['image'].split('?', 1)[0].lstrip('/')).convert('RGB')
    side = min(photo.size)
    left, top = (photo.width - side) // 2, (photo.height - side) // 2
    img.paste(photo.crop((left, top, left + side, top + side)).resize((PHOTO, PHOTO), Image.LANCZOS), (W - PHOTO, 0))
    d = ImageDraw.Draw(img)
    x, width = 64, W - PHOTO - 64 - 52
    spaced(d, (x, 64), info['eyebrow'][:46], font('inter', 15, 600), BRASS, 2.2)
    for size in (56, 50, 45, 40, 36):
        f = font('manrope', size, 300)
        lines = wrap(d, info['title'], f, width)
        if len(lines) <= 5:
            break
    y = 128
    for ln in lines:
        d.text((x, y), ln, font=f, fill=INK)
        y += int(size * 1.14)
    logo(img, (x, H - 112), 58, 'logo.png')
    place = 'Marbella · Costa del Sol'
    d.text((x + width - d.textlength(place, font=font('inter', 14, 400)), H - 62), place, font=font('inter', 14, 400), fill=MUTED)
    img.save(target, 'JPEG', quality=84, optimize=True, progressive=True)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    paths = list(EXTRA) + HUBS
    for hub in HUBS:
        paths += links(get(hub), 'class="service-zones-list"')
    for index in ('/journal', '/es/guias'):
        paths += links(get(index), 'class="guides-list')
    for index in ('/projects', '/es/proyectos'):
        paths += links(get(index), 'class="projects-grid"')
    for home in ('/', '/es'):  # footer rows: area pages and legal pages
        page = get(home)
        for block in re.findall(r'class="site-footer-legal"[\s\S]*?</nav>', page):
            paths += [p for p in re.findall(r'href="(/[^"#]+)"', block) if p not in ('/', '/es')]
    paths += ['/international-clients', '/es/clientes-internacionales']
    paths = list(dict.fromkeys(paths))
    manifest = {}
    for path in paths:
        info = describe(path, get(path))
        name = name_for(path)
        render(info, OUT / f'{name}.jpg')
        manifest[path] = {'image': f'/og/{name}.jpg', 'alt': info['title']}
    stale = {p.name for p in OUT.glob('*.jpg')} - {Path(v['image']).name for v in manifest.values()}
    for n in stale:
        (OUT / n).unlink()
    (ROOT / 'app' / 'data' / 'og-manifest.ts').write_text(
        '// Generated by scripts/og/generate.py: Open Graph image per page path. Do not edit by hand.\n'
        'export const ogImages: Record<string, { image: string; alt: string }> = ' + json.dumps(manifest, ensure_ascii=False, indent=1) + '\n')
    print(f'{len(manifest)} images in public/og, {len(stale)} stale removed')


if __name__ == '__main__':
    main()

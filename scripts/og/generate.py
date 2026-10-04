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
EXTRA = ['/', '/journal', '/es/guias', '/examples/villa-renovation', '/examples/interior-design', '/examples/landscape-design']
SUFFIX = ' · Galván Arquitectos'


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
    hero = re.search(r'class="(?:service-hero-image|guide-figure)"[\s\S]*?<img[^>]*src="([^"]+)"', page)
    eyebrow = re.search(r'<p class="eyebrow"[^>]*>([\s\S]*?)</p>', page)
    if path in ('/', '/journal', '/es/guias') or path.startswith('/examples/'):
        title = {'/': 'Spaces for living well.', '/journal': 'Questions before your project.', '/es/guias': 'Preguntas antes de tu proyecto.'}.get(path, title)
    return {
        'title': title,
        'eyebrow': (text(eyebrow.group(1)) if eyebrow else 'MARBELLA · COSTA DEL SOL').upper(),
        'image': hero.group(1) if hero else '/photos/web-villa-silver-01.jpg',
        'lang': lang,
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


def render(info, target):
    img = Image.new('RGB', (W, H), PAPER)
    photo = Image.open(ROOT / 'public' / info['image'].lstrip('/')).convert('RGB')
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
    spaced(d, (x, H - 104), 'GALVÁN', font('manrope', 30, 400), INK, 7)
    spaced(d, (x + 1, H - 64), 'ARQUITECTOS', font('manrope', 12, 500), INK, 4.6)
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

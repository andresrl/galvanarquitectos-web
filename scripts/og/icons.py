"""Site icons: the Martínez Galván isologo (public/brand/mark.png) in paper on the brand's ink.
Writes favicon.ico, PNG icons and site.webmanifest in public/.

    python3 scripts/og/icons.py
"""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
INK, PAPER = (28, 33, 30), (246, 244, 239)
MARK = Image.open(ROOT / 'public' / 'brand' / 'mark.png').getchannel('A')
MARK = MARK.crop(MARK.getbbox())


def icon(size):
    # Small favicons need a larger mark to stay legible in the browser tab.
    scale = .8 if size <= 32 else .72 if size <= 48 else .58
    w = round(size * scale)
    h = round(w * MARK.height / MARK.width)
    if h > size * scale:
        h = round(size * scale); w = round(h * MARK.width / MARK.height)
    img = Image.new('RGB', (size, size), INK)
    img.paste(Image.new('RGB', (w, h), PAPER), ((size - w) // 2, (size - h) // 2), MARK.resize((w, h), Image.LANCZOS))
    return img


public = ROOT / 'public'
icon(48).save(public / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)], append_images=[icon(16), icon(32)])
icon(180).save(public / 'apple-touch-icon.png')
for s in (192, 512):
    icon(s).save(public / f'icon-{s}.png')
(public / 'site.webmanifest').write_text(json.dumps({
    'name': 'Martínez Galván', 'short_name': 'M. Galván', 'start_url': '/', 'display': 'browser',
    'background_color': '#f6f4ef', 'theme_color': '#1c2a22',
    'icons': [{'src': '/icon-192.png', 'sizes': '192x192', 'type': 'image/png'}, {'src': '/icon-512.png', 'sizes': '512x512', 'type': 'image/png'}]
}, indent=1) + '\n')
print('icons written')

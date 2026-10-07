"""Site icons: a thin Manrope "G" on the studio's dark green. Writes favicon.ico, PNG icons and site.webmanifest in public/.

    python3 scripts/og/icons.py
"""
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
FOREST, PAPER, BRASS = (28, 42, 34), (246, 244, 239), (173, 141, 97)


def icon(size, weight=300):
    img = Image.new('RGB', (size, size), FOREST)
    d = ImageDraw.Draw(img)
    f = ImageFont.truetype(str(Path(__file__).with_name('manrope.ttf')), int(size * .66))
    f.set_variation_by_axes([weight if size >= 64 else 500])
    box = d.textbbox((0, 0), 'G', font=f)
    d.text(((size - (box[2] - box[0])) / 2 - box[0], (size - (box[3] - box[1])) / 2 - box[1] - size * .02), 'G', font=f, fill=PAPER)
    if size >= 64:
        d.rectangle((size * .38, size * .82, size * .62, size * .82 + max(2, size // 90)), fill=BRASS)
    return img


public = ROOT / 'public'
icon(48).save(public / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
icon(180).save(public / 'apple-touch-icon.png')
for s in (192, 512):
    icon(s).save(public / f'icon-{s}.png')
(public / 'site.webmanifest').write_text(json.dumps({
    'name': 'Martínez Galván', 'short_name': 'M. Galván', 'start_url': '/', 'display': 'browser',
    'background_color': '#f6f4ef', 'theme_color': '#1c2a22',
    'icons': [{'src': '/icon-192.png', 'sizes': '192x192', 'type': 'image/png'}, {'src': '/icon-512.png', 'sizes': '512x512', 'type': 'image/png'}]
}, indent=1) + '\n')
print('icons written')

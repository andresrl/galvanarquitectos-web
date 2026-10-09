"""Posters for the films page from the still supplied with each film (scripts/media/build_films.sh).

    python -I scripts/media/film_posters.py <poster.webp> <public/video/films/id>

Crops the still to the exact frame of <id>-1080.mp4, so poster and video match when the video starts, and writes
<id>-poster-1920.avif, <id>-poster-960.avif and <id>-poster.jpg (1280 wide: Open Graph and VideoObject thumbnail).
"""
import json, subprocess, sys
from PIL import Image

src, base = sys.argv[1], sys.argv[2]
probe = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height',
                                   '-of', 'json', base + '-1080.mp4'], capture_output=True, check=True).stdout)['streams'][0]
ratio = probe['width'] / probe['height']
img = Image.open(src).convert('RGB')
w, h = img.size
if w / h > ratio:
    cw = round(h * ratio); img = img.crop(((w - cw) // 2, 0, (w - cw) // 2 + cw, h))
else:
    ch = round(w / ratio); img = img.crop((0, (h - ch) // 2, w, (h - ch) // 2 + ch))
for width, name, opts in ((1920, '-poster-1920.avif', {'quality': 58}), (960, '-poster-960.avif', {'quality': 55}), (1280, '-poster.jpg', {'quality': 84, 'optimize': True, 'progressive': True})):
    out = img.resize((width, round(width / ratio)), Image.LANCZOS)
    out.save(base + name, **opts)
print('  posters', base, f'{probe["width"]}x{probe["height"]}')

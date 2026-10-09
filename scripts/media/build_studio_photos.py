#!/usr/bin/env python3
"""Studio photographs for /studio: AVIF derivatives in public/media/studio/ from the originals in ../__Material__/ESTUDIO.

Originals stay outside public/. Never upscales (a width above the original is capped to it).
Run: python scripts/media/build_studio_photos.py [--src DIR]
Needs Pillow 11.2+ (built-in AVIF).
"""
import argparse, io
from pathlib import Path
from PIL import Image, ImageCms, ImageOps

APP = Path(__file__).resolve().parents[2]
OUT = APP / 'public' / 'media' / 'studio'
# original -> (published name, widths)
PHOTOS = {
    'estudio_1.webp': ('studio-office', [800, 1600]),        # interior with the model in its glass case
    'estudio_2.webp': ('studio-facade', [1280, 2560]),       # street front at dusk
    'fmg_working_1.webp': ('studio-on-site', [800, 1400]),   # Francisco Martínez Galván on site (black and white)
}

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--src', type=Path, default=APP.parent / '__Material__' / 'ESTUDIO')
src = parser.parse_args().src

for file, (name, widths) in PHOTOS.items():
    im = ImageOps.exif_transpose(Image.open(src / file))
    if icc := im.info.get('icc_profile'):
        im = ImageCms.profileToProfile(im, ImageCms.ImageCmsProfile(io.BytesIO(icc)), ImageCms.createProfile('sRGB'), outputMode='RGB')
    im = im.convert('RGB')
    for width in sorted({min(w, im.width) for w in widths}):
        out = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        out.save(OUT / f'{name}-{width}.avif', quality=52, speed=5)
        print(f'{name}-{width}.avif  {out.width}x{out.height}')
    print(f'  {file}: original {im.width}x{im.height}')

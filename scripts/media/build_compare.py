#!/usr/bin/env python3
"""CAD → render comparisons on project pages: AVIF derivatives of each pair in public/media/projects/<folder>/.

Both images of a pair share the same view and size and are resized identically, so the drawing lines up
exactly over the render (app/data/projects/compare.ts). Never upscales. Line drawings get a higher quality
than renders so their thin lines stay sharp.
Run: python scripts/media/build_compare.py [--src DIR]   (default: the project's media folder, where the originals were left)
Needs Pillow 11.2+ (built-in AVIF).
"""
import argparse, io
from pathlib import Path
from PIL import Image, ImageCms, ImageOps

APP = Path(__file__).resolve().parents[2]
MEDIA = APP / 'public' / 'media' / 'projects'
WIDTHS = [800, 1600, 2560]
# folder -> (published base name, CAD original, render original)
PAIRS = {
    'the-house': ('the-house-compare', 'thehouse_1-cad.webp', 'thehouse_1.webp'),
}
QUALITY = {'cad': 70, 'render': 52}

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--src', type=Path, help='folder holding the originals (default: public/media/projects/<folder>)')
args = parser.parse_args()


def load(path):
    im = ImageOps.exif_transpose(Image.open(path))
    if icc := im.info.get('icc_profile'):
        im = ImageCms.profileToProfile(im, ImageCms.ImageCmsProfile(io.BytesIO(icc)), ImageCms.createProfile('sRGB'), outputMode='RGB')
    return im.convert('RGB')


for folder, (name, cad, render) in PAIRS.items():
    src = args.src or MEDIA / folder
    images = {'cad': load(src / cad), 'render': load(src / render)}
    if images['cad'].size != images['render'].size:
        raise SystemExit(f'{folder}: CAD {images["cad"].size} and render {images["render"].size} must be the same size')
    for kind, im in images.items():
        for width in sorted({min(w, im.width) for w in WIDTHS}):
            out = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
            dest = MEDIA / folder / f'{name}-{kind}-{width}.avif'
            out.save(dest, quality=QUALITY[kind], speed=5)
            print(f'{dest.name}  {out.width}x{out.height}  {dest.stat().st_size // 1024} KB')

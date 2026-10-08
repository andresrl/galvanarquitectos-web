#!/usr/bin/env python3
"""Studio map: a fixed, drawn map of Marbella centre around the studio (Calle Estébanez Calderón, 1).

Reads OpenStreetMap data (© OpenStreetMap contributors, ODbL) and writes two SVGs in the site palette:
public/media/studio/studio-map.svg (wide) and studio-map-mobile.svg (portrait crop, larger labels).
No tiles, iframe, cookies or JavaScript: the page shows a plain image with the attribution beside it.

    python scripts/media/build_studio_map.py [--osm extract.osm]

Without --osm it downloads the bounding box from the OpenStreetMap API once.
"""
import argparse, math, urllib.request
import xml.etree.ElementTree as ET
from collections import defaultdict
from pathlib import Path

APP = Path(__file__).resolve().parents[2]
OUT = APP / 'public' / 'media' / 'studio'
# Studio position (Google Maps place «Galván Arquitectos», shared by Andrés, 8 Oct 2026).
LAT0, LON0 = 36.5098118, -4.8999249
BBOX = (-4.9095, 36.5035, -4.8905, 36.5160)  # west, south, east, north
K = math.cos(math.radians(LAT0))

PAPER, LAND, GREEN, SAND, SEA, POOL = '#f6f4ef', '#ece8e0', '#e1e4d8', '#ebe3d0', '#d7ddd5', '#d3dcda'
ROAD, PATH, LABEL, INK, BRASS = '#fbfaf7', '#dcd6ca', '#8d8b82', '#1c211e', '#ad8d61'
WIDTHS = {'motorway': 15, 'trunk': 14, 'primary': 13, 'primary_link': 8, 'secondary': 11, 'secondary_link': 7,
          'tertiary': 9, 'tertiary_link': 6, 'residential': 6.5, 'unclassified': 6.5, 'living_street': 5.5,
          'pedestrian': 5, 'service': 3.4}
PATHS = {'footway', 'path', 'steps', 'cycleway'}
GREENS = {('leisure', 'park'), ('leisure', 'garden'), ('leisure', 'pitch'), ('landuse', 'grass'),
          ('landuse', 'recreation_ground'), ('landuse', 'forest'), ('natural', 'wood'), ('natural', 'scrub')}
LABELS = ['Avenida Ricardo Soriano', 'Bulevar del Príncipe Alfonso de Hohenlohe', 'Calle de Jacinto Benavente',
          'Avenida Arias Maldonado', 'Paseo Marítimo', 'Calle Camilo José Cela']
VARIANTS = {  # name: (viewBox x, y, width, height, label size)
    'studio-map': (-1080, -320, 1800, 860, 14),  # studio at 60% across, clear of the address card
    'studio-map-mobile': (-330, -330, 660, 860, 19),
}


def xy(lat, lon):
    return ((lon - LON0) * 111320 * K, (LAT0 - lat) * 110574)


def load(path):
    if path:
        return ET.parse(path).getroot()
    url = 'https://api.openstreetmap.org/api/0.6/map?bbox=' + ','.join(map(str, BBOX))
    req = urllib.request.Request(url, headers={'User-Agent': 'MartinezGalvanWeb/1.0 (one-off static studio map)'})
    with urllib.request.urlopen(req, timeout=120) as r:
        return ET.fromstring(r.read())


def chains(segments):
    # Joins polylines that share endpoints (multipolygon members, coastline, street segments).
    segs = [list(s) for s in segments if len(s) > 1]
    out = []
    while segs:
        line = segs.pop(0)
        grown = True
        while grown:
            grown = False
            for i, s in enumerate(segs):
                if s[0] == line[-1]: line += s[1:]
                elif s[-1] == line[-1]: line += s[::-1][1:]
                elif s[-1] == line[0]: line = s[:-1] + line
                elif s[0] == line[0]: line = s[::-1][:-1] + line
                else: continue
                segs.pop(i); grown = True; break
        out.append(line)
    return out


def runs(line):
    # Splits a chain where it doubles back (dual carriageways joined at their ends), so labels never fold over.
    out, cur = [], line[:2]
    for c in line[2:]:
        a, b = cur[-2], cur[-1]
        u, v = (b[0] - a[0], b[1] - a[1]), (c[0] - b[0], c[1] - b[1])
        if u[0] * v[0] + u[1] * v[1] < 0:
            out.append(cur); cur = [b]
        cur.append(c)
    return out + [cur]


def d(points, close=False):
    s = 'M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in points)
    return s + ('Z' if close else '')


def build():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--osm')
    root = load(parser.parse_args().osm)
    nodes = {n.get('id'): (float(n.get('lat')), float(n.get('lon'))) for n in root.findall('node')}
    ways, tags = {}, {}
    for w in root.findall('way'):
        ways[w.get('id')] = [xy(*nodes[n.get('ref')]) for n in w.findall('nd') if n.get('ref') in nodes]
        tags[w.get('id')] = {t.get('k'): t.get('v') for t in w.findall('tag')}

    def area_kind(t):
        if t.get('natural') == 'beach': return 'sand'
        if t.get('leisure') == 'swimming_pool': return 'pool'
        if any((k, t.get(k)) in GREENS for k in ('leisure', 'landuse', 'natural')): return 'green'

    areas = defaultdict(list)
    for wid, t in tags.items():
        kind = area_kind(t)
        if kind and ways[wid] and ways[wid][0] == ways[wid][-1]:
            areas[kind].append(ways[wid])
    for rel in root.findall('relation'):
        t = {x.get('k'): x.get('v') for x in rel.findall('tag')}
        kind = area_kind(t)
        if t.get('type') != 'multipolygon' or not kind: continue
        outer = [ways[m.get('ref')] for m in rel.findall('member') if m.get('type') == 'way' and m.get('role') == 'outer' and m.get('ref') in ways]
        areas[kind] += [c for c in chains(outer) if c[0] == c[-1]]

    # Sea: coastline runs with the land on its left, so the water lies south; close it far below the frame.
    coast = chains([ways[w] for w, t in tags.items() if t.get('natural') == 'coastline'])
    sea = [c + [(c[-1][0], 5000), (c[0][0], 5000)] for c in coast]

    roads, paths, named = defaultdict(list), [], defaultdict(list)
    for wid, t in tags.items():
        hw, pts = t.get('highway'), ways[wid]
        if not hw or len(pts) < 2 or t.get('tunnel') or t.get('area') == 'yes': continue
        if hw in PATHS: paths.append(pts)
        elif hw in WIDTHS:
            roads[hw].append(pts)
            if t.get('name') in LABELS or t.get('name') == 'Calle Estébanez Calderón': named[t['name']].append(pts)

    for name, (vx, vy, vw, vh, size) in VARIANTS.items():
        def visible(pts, m=80):
            return any(vx - m < x < vx + vw + m and vy - m < y < vy + vh + m for x, y in pts)
        o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vx} {vy} {vw} {vh}" width="{vw}" height="{vh}" preserveAspectRatio="xMidYMid slice">',
             f'<rect x="{vx}" y="{vy}" width="{vw}" height="{vh}" fill="{LAND}"/>']
        o.append(f'<path fill="{SEA}" d="{"".join(d(c, True) for c in sea)}"/>')
        for kind, fill in (('sand', SAND), ('green', GREEN), ('pool', POOL)):
            o.append(f'<path fill="{fill}" d="{"".join(d(c, True) for c in areas[kind] if visible(c))}"/>')
        o.append(f'<g fill="none" stroke-linecap="round" stroke-linejoin="round">')
        o.append(f'<path stroke="{PATH}" stroke-width="1.3" d="{"".join(d(p) for p in paths if visible(p))}"/>')
        for hw in sorted(WIDTHS, key=WIDTHS.get):
            lines = [p for p in roads[hw] if visible(p)]
            if lines: o.append(f'<path stroke="{ROAD}" stroke-width="{WIDTHS[hw]}" d="{"".join(d(p) for p in lines)}"/>')
        # The studio's street, picked out in brass.
        o.append(f'<path stroke="{BRASS}" stroke-opacity=".55" stroke-width="2" d="{"".join(d(p) for p in named["Calle Estébanez Calderón"])}"/>')
        o.append('</g>')
        # Street names along their longest visible stretch, always reading left to right.
        o.append(f'<g font-family="Inter, Arial, Helvetica, sans-serif" font-size="{size}" font-weight="500" letter-spacing="{size * .14:.1f}" fill="{LABEL}">')
        defs = []
        for i, label in enumerate(LABELS + ['Calle Estébanez Calderón']):
            lines = [r for c in chains(named[label]) for r in runs(c) if len(r) > 1 and visible(r, 0)]
            if not lines: continue
            line = max(lines, key=lambda c: sum(math.dist(a, b) for a, b in zip(c, c[1:])))
            # Keep the visible part, clear of the marker.
            line = [p for p in line if vx < p[0] < vx + vw and vy < p[1] < vy + vh and math.hypot(*p) > size * 5.5] or line
            length = sum(math.dist(a, b) for a, b in zip(line, line[1:]))
            text = label.upper()
            if length < len(text) * size * .78: continue
            if line[-1][0] < line[0][0]: line = line[::-1]
            defs.append(f'<path id="s{i}" d="{d(line)}"/>')
            fill = f' fill="{INK}" font-weight="600"' if label == 'Calle Estébanez Calderón' else ''
            o.append(f'<text dy="{size * .36:.1f}"{fill}><textPath href="#s{i}" startOffset="50%" text-anchor="middle">{text}</textPath></text>')
        o.append('</g>')
        o.insert(1, f'<defs>{"".join(defs)}</defs>')
        sea_y = 440  # just below the beach, inside any crop of either variant
        o.append(f'<text x="{vx + vw * .72:.0f}" y="{sea_y:.0f}" font-family="Georgia, serif" font-style="italic" font-size="{size * 1.6:.0f}" fill="#97a294" text-anchor="middle">Mar Mediterráneo</text>')
        # Marker: brass point with two quiet rings and the studio name.
        o.append(f'<circle r="{size * 2.9:.0f}" fill="{BRASS}" fill-opacity=".12"/><circle r="{size * 1.5:.0f}" fill="none" stroke="{BRASS}" stroke-width="1.5"/><circle r="{size * .55:.1f}" fill="{BRASS}"/>')
        wide = vw > vh  # name beside the point; on the narrow crop, centred above it so it never runs off screen
        pos = f'x="{size * 2.2:.0f}" y="{-size * 1.3:.0f}"' if wide else f'x="0" y="{-size * 3.6:.0f}" text-anchor="middle"'
        o.append(f'<text {pos} font-family="Inter, Arial, Helvetica, sans-serif" font-size="{size * 1.05:.0f}" font-weight="600" letter-spacing="{size * .2:.1f}" fill="{INK}">MARTÍNEZ GALVÁN</text>')
        o.append('</svg>')
        target = OUT / f'{name}.svg'
        target.write_text('\n'.join(o) + '\n', encoding='utf-8')
        print(f'{target.relative_to(APP)}: {target.stat().st_size / 1024:.0f} KB')


if __name__ == '__main__':
    build()

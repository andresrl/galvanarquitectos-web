#!/usr/bin/env bash
# Compila y sube .output (public + server) al repo de distribución.
set -e
cd "$(dirname "$0")/.."
npm run build
DIST=../dist
[ -d $DIST/.git ] || git clone git@github.com:andresrl/galvanarquitectos-web-dist.git $DIST
rsync -a --delete --exclude .git --exclude '*.map' --exclude videos-reel --exclude maquetas .output/ $DIST/
cd $DIST && git add -A && git commit -qm "deploy $(date '+%Y-%m-%d %H:%M')" && git push -u origin main

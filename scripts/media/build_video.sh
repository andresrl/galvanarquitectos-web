#!/usr/bin/env bash
# Web video derivatives from ../Graphics/VISENI (originals stay outside public/).
# MP4 H.264 + WebM VP9, no audio, faststart, plus an AVIF poster. Run from the Nuxt root.
set -euo pipefail
SRC=../Graphics/VISENI; OUT=public/video; mkdir -p "$OUT"
encode() { # source, name, width, crf-h264, crf-vp9 ("-" = no WebM), poster time (s), max duration (s)
  local in="$SRC/$1" name=$2 w=$3 at=${6:-0.5} dur=${7:-0}
  local limit=(); [ "$dur" != 0 ] && limit=(-t "$dur")
  [ -f "$OUT/$name.mp4" ] || ffmpeg -v error -y -i "$in" "${limit[@]}" -an -vf "scale=$w:-2" -c:v libx264 -preset slow -crf "$4" -pix_fmt yuv420p -movflags +faststart "$OUT/$name.mp4"
  [ "$5" = - ] || [ -f "$OUT/$name.webm" ] || ffmpeg -v error -y -i "$in" -an -vf "scale=$w:-2" -c:v libvpx-vp9 -b:v 0 -crf "$5" -row-mt 1 "$OUT/$name.webm"
  [ -f "$OUT/$name-poster.avif" ] || { ffmpeg -v error -y -ss "$at" -i "$in" -frames:v 1 -vf "scale=$w:-2" /tmp/poster-$$.png && vips copy /tmp/poster-$$.png "$OUT/$name-poster.avif[Q=55,strip]" && rm /tmp/poster-$$.png; }
  echo "  $name: $(du -h "$OUT/$name.mp4" | cut -f1) mp4"
}
# Home hero (replaces viseni.mp4, 7 Oct 2026) and project listing hero
# Reels: MP4 only (VP9 came out larger than H.264 for this footage)
encode galvan-arquitectos_video_reel_30s_hero.mp4 home-reel 1920 29 - 11
encode galvan-arquitectos_video_reel_full.mp4 projects-reel 1280 27 - 30 45
encode "Arquitecto dibujando en su estudio.mp4" studio-drawing 1264 23 34
encode "Arquitecto revisando planos en obra.mp4" studio-site 1264 23 34
encode "Conversación creativa en el estudio.mp4" studio-conversation 1264 23 34
# Large stills of the studio scenes (posters at full width for the Home and studio page)
for pair in "Arquitecto dibujando en su estudio:studio-drawing" "Arquitecto revisando planos en obra:studio-site" "Conversación creativa en el estudio:studio-conversation" "Arquitecto inspeccionando la obra:studio-inspection"; do
  src="${pair%%:*}"; name="${pair##*:}"
  for w in 1280 2560; do [ -f "public/media/studio/$name-$w.avif" ] || { mkdir -p public/media/studio; VIPS_WARNING=0 vips thumbnail "$SRC/$src.png" "public/media/studio/$name-$w.avif[Q=52,strip]" $w --export-profile srgb; }; done
done
[ -f public/media/studio/francisco-martinez-galvan.avif ] || VIPS_WARNING=0 vips thumbnail "$SRC/francisco-galvan_foto.jpg" "public/media/studio/francisco-martinez-galvan.avif[Q=60,strip]" 740
echo "public/video $(du -sh $OUT | cut -f1) · public/media/studio $(du -sh public/media/studio | cut -f1)"

#!/usr/bin/env bash
# Web video derivatives from ../Graphics/VISENI (originals stay outside public/).
# MP4 H.264 + WebM VP9, no audio, faststart, plus an AVIF poster. Run from the Nuxt root.
set -euo pipefail
SRC=../Graphics/VISENI; OUT=public/video; mkdir -p "$OUT"
encode() { # source, name, width, crf-h264, crf-vp9 ("-" = no WebM), poster time (s), max duration (s)
  local in="$SRC/$1" name=$2 w=$3 at=${6:-0.5} dur=${7:-0}
  local limit=(); [ "$dur" != 0 ] && limit=(-t "$dur")
  [ -f "$OUT/$name.mp4" ] || ffmpeg -v error -y -i "$in" ${limit[@]+"${limit[@]}"} -an -vf "scale=$w:-2" -c:v libx264 -preset slow -crf "$4" -pix_fmt yuv420p -movflags +faststart "$OUT/$name.mp4"
  [ "$5" = - ] || [ -f "$OUT/$name.webm" ] || ffmpeg -v error -y -i "$in" -an -vf "scale=$w:-2" -c:v libvpx-vp9 -b:v 0 -crf "$5" -row-mt 1 "$OUT/$name.webm"
  [ -f "$OUT/$name-poster.avif" ] || { ffmpeg -v error -y -ss "$at" -i "$in" -frames:v 1 -vf "scale=$w:-2" /tmp/poster-$$.png && vips copy /tmp/poster-$$.png "$OUT/$name-poster.avif[Q=55,strip]" && rm /tmp/poster-$$.png; }
  echo "  $name: $(du -h "$OUT/$name.mp4" | cut -f1) mp4"
}
# Shared Home and project listing hero
# Reels: MP4 only (VP9 came out larger than H.264 for this footage)
if [ ! -f app/data/home-reel.ts ] || [ ! -f "$OUT/home-reel.mp4" ] || [ ! -f "$OUT/home-reel-720.mp4" ] || [ ! -f "$OUT/home-reel-poster.avif" ] || [ ! -f "$OUT/home-reel-720-poster.avif" ] || [ "$SRC/REEL Galvan Arquitectos Octubre 2026 - 40seg.mp4" -nt "$OUT/home-reel.mp4" ]; then
  bash scripts/media/replace_home_reel.sh
fi
encode "Arquitecto dibujando en su estudio.mp4" studio-drawing 1264 23 34
encode "Arquitecto revisando planos en obra.mp4" studio-site 1264 23 34
encode "Conversación creativa en el estudio.mp4" studio-conversation 1264 23 34
# Ping-pong loop (forward + reverse, end frames not repeated) so `loop` never jumps: Home studio scene and contact panel
pingpong() { # name: reads $OUT/$name.mp4, writes $OUT/$name-pingpong.{mp4,webm}
  local in="$OUT/$1.mp4" n; [ -f "$OUT/$1-pingpong.mp4" ] && [ -f "$OUT/$1-pingpong.webm" ] && return
  n=$(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of csv=p=0 "$in")
  local f="[0:v]split[f][r];[r]reverse,trim=start_frame=1:end_frame=$((n-1)),setpts=PTS-STARTPTS[b];[f][b]concat=n=2:v=1:a=0,format=yuv420p[v]"
  ffmpeg -v error -y -i "$in" -filter_complex "$f" -map "[v]" -an -c:v libx264 -preset slow -crf 22 -movflags +faststart "$OUT/$1-pingpong.mp4"
  ffmpeg -v error -y -i "$in" -filter_complex "$f" -map "[v]" -an -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 "$OUT/$1-pingpong.webm"
  echo "  $1-pingpong: $(du -h "$OUT/$1-pingpong.mp4" | cut -f1) mp4"
}
pingpong studio-conversation_white
# Large stills of the studio scenes (posters at full width for the Home and studio page)
for pair in "Arquitecto dibujando en su estudio:studio-drawing" "Arquitecto revisando planos en obra:studio-site" "Conversación creativa en el estudio:studio-conversation" "Arquitecto inspeccionando la obra:studio-inspection"; do
  src="${pair%%:*}"; name="${pair##*:}"
  for w in 1280 2560; do [ -f "public/media/studio/$name-$w.avif" ] || { mkdir -p public/media/studio; VIPS_WARNING=0 vips thumbnail "$SRC/$src.png" "public/media/studio/$name-$w.avif[Q=52,strip]" $w --export-profile srgb; }; done
done
[ -f public/media/studio/studio-og.jpg ] || VIPS_WARNING=0 vips thumbnail "$SRC/Arquitecto dibujando en su estudio.png" "public/media/studio/studio-og.jpg[Q=82,strip]" 1200 --height 630 --crop centre
[ -f public/media/studio/francisco-martinez-galvan.jpg ] || VIPS_WARNING=0 vips thumbnail "$SRC/francisco-galvan_foto.jpg" "public/media/studio/francisco-martinez-galvan.jpg[Q=82,strip]" 740
[ -f public/media/studio/francisco-martinez-galvan.avif ] || VIPS_WARNING=0 vips thumbnail "$SRC/francisco-galvan_foto.jpg" "public/media/studio/francisco-martinez-galvan.avif[Q=60,strip]" 740
echo "public/video $(du -sh $OUT | cut -f1) · public/media/studio $(du -sh public/media/studio | cut -f1)"

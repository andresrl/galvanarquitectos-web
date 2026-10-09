#!/usr/bin/env bash
# Web versions of the videos on /videos · /es/videos, from the originals and their posters in public/videos-reel
# (ignored by git; keep that folder out of the deployed build: .output/public would copy its 3.4 GB).
# Run from the Nuxt root. SRC=<folder> selects another source folder; FORCE=1 re-encodes existing outputs;
# STAGE=full encodes only the full films (the slow part).
#   Full films (with sound, for the player): MP4 H.264 + AAC and WebM VP9 + Opus, 1080p and 720p, keyframe every 2 s.
#   Previews (muted loops for the hero and the film cards): MP4 + WebM, a few seconds chosen per film.
#   Posters: AVIF from the poster supplied with each film (+ JPG for Open Graph and VideoObject).
# Then app/data/films.generated.ts is written with sizes, durations and a content version for the cache.
set -euo pipefail
SRC=${SRC:-public/videos-reel}; OUT=public/video/films
mkdir -p "$OUT"; logs=$(mktemp -d); trap 'rm -rf "$logs"' EXIT

# id:source basename:preview start (s):preview length (s). Previews start on a cut and stop one frame before the next
# (scene detection: ffmpeg select='gt(scene,0.25)'); Villa Pareja dissolves between shots, so it has no clean cut.
FILMS=(
 "reel-2026:REEL_2026_FMG_2min:0:14.24"
 "the-house:The_House:3.20:9.48"
 "villa-paris:Villa_Paris:10.17:8.16"
 "la-resina-six:The_Resina_6ix:3.56:7.84"
 "villa-soal:Villa_Soal:14.42:7.96"
 "villa-pareja:Villa_Pareja:20:8"
)
todo() { [ "${FORCE:-0}" = 1 ] || [ ! -s "$1" ]; }
# Windows may still hold the finished file for a moment (indexer, antivirus): retry the rename.
commit() { local i; for i in 1 2 3 4 5 6 7 8 9 10; do mv "$1" "$2" 2>/dev/null && return 0; sleep 2; done; mv "$1" "$2"; }

h264() { # in, out, width, crf, maxrate (k), audio bitrate (k)
 todo "$2" || return 0
 ffmpeg -v error -y -i "$1" -map 0:v:0 -map 0:a:0? -vf "scale=$3:-2:flags=lanczos,format=yuv420p" \
  -c:v libx264 -preset slow -profile:v high -crf "$4" -maxrate "$5k" -bufsize "$(( $5 * 2 ))k" -force_key_frames 'expr:gte(t,n_forced*2)' \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 -c:a aac -b:a "$6k" -ac 2 -movflags +faststart "$2.part.mp4" && commit "$2.part.mp4" "$2"
}
vp9() { # in, out, width, crf, bitrate cap (k), audio bitrate (k); two passes
 todo "$2" || return 0
 local log="$logs/$(basename "$2")" common=(-map 0:v:0 -vf "scale=$3:-2:flags=lanczos,format=yuv420p" -c:v libvpx-vp9 -crf "$4" -b:v "$5k" -row-mt 1 -tile-columns 2 -auto-alt-ref 1 -lag-in-frames 25 -g 60)
 ffmpeg -v error -y -i "$1" "${common[@]}" -pass 1 -passlogfile "$log" -deadline good -cpu-used 4 -an -f null - &&
 ffmpeg -v error -y -i "$1" "${common[@]}" -map 0:a:0? -pass 2 -passlogfile "$log" -deadline good -cpu-used 2 -c:a libopus -b:a "$6k" -ac 2 "$2.part.webm" && commit "$2.part.webm" "$2"
}
preview() { # in, out base, start, length, width, H.264 max rate (k), VP9 crf, VP9 cap (k)
 # Start and length fall on cuts of the edit, so the loop restarts like one more cut.
 local v="scale=$5:-2:flags=lanczos,format=yuv420p"
 todo "$2.mp4" && ffmpeg -v error -y -ss "$3" -t "$4" -i "$1" -an -vf "$v" -c:v libx264 -preset slow -crf 28 -maxrate "$6k" -bufsize "$(( $6 * 2 ))k" -movflags +faststart "$2.mp4"
 todo "$2.webm" && ffmpeg -v error -y -ss "$3" -t "$4" -i "$1" -an -vf "$v" -c:v libvpx-vp9 -crf "$7" -b:v "$8k" -row-mt 1 -tile-columns 2 -deadline good -cpu-used 1 "$2.webm"
 return 0
}

film() { # id, source basename, preview start, preview length
 local in="$SRC/$2.mp4" o="$OUT/$1"
 [ -f "$in" ] || { echo "missing $in" >&2; return 1; }
 h264 "$in" "$o-1080.mp4" 1920 24 4000 128 &
 h264 "$in" "$o-720.mp4" 1280 25 2000 96 &
 vp9 "$in" "$o-1080.webm" 1920 32 2600 112 &
 vp9 "$in" "$o-720.webm" 1280 34 1300 96 &
 if [ "${STAGE:-}" != full ]; then
  preview "$in" "$o-preview" "$3" "$4" 1280 1800 41 1300 &
  [ "$1" = reel-2026 ] && preview "$in" "$o-hero" "$3" "$4" 1920 2600 40 2000 &
  [ "$1" = reel-2026 ] && preview "$in" "$o-hero-720" "$3" "$4" 720 1000 40 700 &
 fi
 wait
 [ "${STAGE:-}" = full ] && { echo "  $1 full films done"; return 0; }
 # Posters: the still supplied with each film, 1920 and 960 wide AVIF, 1200×675 JPG (OG, VideoObject thumbnail).
 if todo "$o-poster-1920.avif" || todo "$o-poster.jpg"; then
  python -I scripts/media/film_posters.py "$SRC/$2.webp" "$o"
 fi
 echo "  $1 done"
}

for f in "${FILMS[@]}"; do IFS=: read -r id name start len <<<"$f"; film "$id" "$name" "$start" "$len" & done
wait
[ "${STAGE:-}" = full ] || node scripts/media/films-manifest.mjs

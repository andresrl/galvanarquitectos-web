#!/usr/bin/env bash
# Web versions of the videos on /videos · /es/videos, from the originals and their posters in public/videos-reel
# (ignored by git; keep that folder out of the deployed build: .output/public would copy its 3.4 GB).
# Run from the Nuxt root. SRC=<folder> selects another source folder; FORCE=1 re-encodes existing outputs;
# ONLY="<id> <id>" limits the run to those films; STAGE=full encodes only the full films (the slow part).
#   Full films (with sound, for the player): MP4 H.264 + AAC and WebM VP9 + Opus, 1080p and 720p, keyframe every 2 s.
#   Previews (muted loops for the hero and the film cards): MP4 + WebM, a few seconds chosen per film.
#   Posters: AVIF from the poster supplied with each film (+ JPG for Open Graph and VideoObject).
#   Studio logo (public/brand/logo-invert-video.png) bottom right, for films whose edit does not carry it already.
# Then app/data/films.generated.ts is written with sizes, durations and a content version for the cache.
set -euo pipefail
SRC=${SRC:-public/videos-reel}; OUT=public/video/films
mkdir -p "$OUT"; logs=$(mktemp -d); trap 'rm -rf "$logs"' EXIT

# id:source basename:preview start (s):preview length (s)[:logo]. Previews start on a cut and stop one frame before the next
# (scene detection: ffmpeg select='gt(scene,0.25)'); Villa Pareja dissolves between shots, so it has no clean cut.
# logo = fade-in start,length,fade-out start,length (s): the logo arrives with the footage and leaves with it, before the
# title cards that already carry it (Villa Soal, Villa Pareja) and before the filmmaker's credit (Villa París, The Resina).
# Villa Las Fuentes has the logo in its edit; the reel is left as it is.
FILMS=(
 "reel-2026:REEL_2026_FMG_2min:0:14.24"
 "the-house:The_House:3.20:9.48:0,0,143,3.2"
 "villa-paris:Villa_Paris:10.17:8.16:0,0,111,1.5"
 "la-resina-six:The_Resina_6ix:3.56:7.84:0,1.5,54.24,1.6"
 "villa-las-fuentes:Villa_Las_Fuentes:87.72:8.16"
 "villa-soal:Villa_Soal:14.42:7.96:6.4,0.6,54.4,0.7"
 "villa-pareja:Villa_Pareja:20:8:5,0.8,97,0.9"
)
# Size and place measured on Villa Las Fuentes: on a 1920 frame the PNG is 307 px wide (288 px of artwork), 33 px from the
# right edge and 54 px from the bottom; it scales with the output width.
LOGO=public/brand/logo-invert-video.png
todo() { [ "${FORCE:-0}" = 1 ] || [ ! -s "$1" ]; }
# Windows may still hold the finished file for a moment (indexer, antivirus): retry the rename.
commit() { local i; for i in 1 2 3 4 5 6 7 8 9 10; do mv "$1" "$2" 2>/dev/null && return 0; sleep 2; done; mv "$1" "$2"; }

graph() { # width, logo ('' none, 'still' for the whole clip, or its fades) → filter graph ending in [v]
 local s="scale=$1:-2:flags=lanczos" fade= a da b db
 [ -z "$2" ] && { echo "[0:v]$s,format=yuv420p[v]"; return; }
 if [ "$2" != still ]; then
  IFS=, read -r a da b db <<<"$2"
  [ "$da" = 0 ] || fade=",fade=t=in:st=$a:d=$da:alpha=1"
  fade+=",fade=t=out:st=$b:d=$db:alpha=1"
 fi
 echo "[1:v]scale=$(( ($1 * 307 + 960) / 1920 )):-1:flags=lanczos,format=rgba$fade[l];[0:v]$s[b];[b][l]overlay=W-w-$(( ($1 * 33 + 960) / 1920 )):H-h-$(( ($1 * 54 + 960) / 1920 )):shortest=1,format=yuv420p[v]"
}
logo() { [ -z "$1" ] || printf '%s\n' -loop 1 -framerate 25 -i "$LOGO"; } # the logo as the second input

h264() { # in, out, width, crf, maxrate (k), audio bitrate (k), logo
 todo "$2" || return 0
 local l; mapfile -t l < <(logo "$7")
 ffmpeg -v error -y -i "$1" "${l[@]}" -filter_complex "$(graph "$3" "$7")" -map '[v]' -map 0:a:0? \
  -c:v libx264 -preset slow -profile:v high -crf "$4" -maxrate "$5k" -bufsize "$(( $5 * 2 ))k" -force_key_frames 'expr:gte(t,n_forced*2)' \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 -c:a aac -b:a "$6k" -ac 2 -movflags +faststart "$2.part.mp4" && commit "$2.part.mp4" "$2"
}
vp9() { # in, out, width, crf, bitrate cap (k), audio bitrate (k), logo; two passes
 todo "$2" || return 0
 local l; mapfile -t l < <(logo "$7")
 local log="$logs/$(basename "$2")" common=(-filter_complex "$(graph "$3" "$7")" -map '[v]' -c:v libvpx-vp9 -crf "$4" -b:v "$5k" -row-mt 1 -tile-columns 2 -auto-alt-ref 1 -lag-in-frames 25 -g 60)
 ffmpeg -v error -y -i "$1" "${l[@]}" "${common[@]}" -pass 1 -passlogfile "$log" -deadline good -cpu-used 4 -an -f null - &&
 ffmpeg -v error -y -i "$1" "${l[@]}" "${common[@]}" -map 0:a:0? -pass 2 -passlogfile "$log" -deadline good -cpu-used 2 -c:a libopus -b:a "$6k" -ac 2 "$2.part.webm" && commit "$2.part.webm" "$2"
}
preview() { # in, out base, start, length, width, H.264 max rate (k), VP9 crf, VP9 cap (k), logo
 # Start and length fall on cuts of the edit, so the loop restarts like one more cut. Previews lie inside the logo's
 # window, so it stays still on them.
 local l v; mapfile -t l < <(logo "${9:-}"); v=$(graph "$5" "${9:+still}")
 todo "$2.mp4" && ffmpeg -v error -y -ss "$3" -t "$4" -i "$1" "${l[@]}" -an -filter_complex "$v" -map '[v]' -c:v libx264 -preset slow -crf 28 -maxrate "$6k" -bufsize "$(( $6 * 2 ))k" -movflags +faststart "$2.mp4"
 todo "$2.webm" && ffmpeg -v error -y -ss "$3" -t "$4" -i "$1" "${l[@]}" -an -filter_complex "$v" -map '[v]' -c:v libvpx-vp9 -crf "$7" -b:v "$8k" -row-mt 1 -tile-columns 2 -deadline good -cpu-used 1 "$2.webm"
 return 0
}

film() { # id, source basename, preview start, preview length, logo
 local in="$SRC/$2.mp4" o="$OUT/$1"
 [ -f "$in" ] || { echo "missing $in" >&2; return 1; }
 h264 "$in" "$o-1080.mp4" 1920 24 4000 128 "$5" &
 h264 "$in" "$o-720.mp4" 1280 25 2000 96 "$5" &
 vp9 "$in" "$o-1080.webm" 1920 32 2600 112 "$5" &
 vp9 "$in" "$o-720.webm" 1280 34 1300 96 "$5" &
 if [ "${STAGE:-}" != full ]; then
  preview "$in" "$o-preview" "$3" "$4" 1280 1800 41 1300 "$5" &
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

for f in "${FILMS[@]}"; do
 IFS=: read -r id name start len logo <<<"$f"
 [ -z "${ONLY:-}" ] || [[ " $ONLY " == *" $id "* ]] || continue
 film "$id" "$name" "$start" "$len" "$logo" &
done
wait
[ "${STAGE:-}" = full ] || node scripts/media/films-manifest.mjs

<script setup>
// Cinema player for the videos page, on a native <dialog>: top layer, focus kept inside, Esc closes, focus returns.
// The video grows out of the frame that was clicked (FLIP) and shrinks back into it when closed.
// One <video> element stays mounted: its source is set and play() called inside the click, so browsers that only
// allow sound after a gesture (iOS Safari) accept it. 1080p on wide or dense screens, 720p otherwise and with
// Save-Data; WebM (VP9 + Opus) where the browser plays it and it is lighter, MP4 (H.264 + AAC) everywhere else.
import { clock } from '~/data/films'
const props = defineProps({ films: { type: Array, required: true }, ui: { type: Object, required: true } })
const emit = defineEmits(['change'])
const playerOpen = useState('galvan:film', () => false)
const dialog = ref(null), frame = ref(null), video = ref(null), track = ref(null)
const index = ref(-1)
const film = computed(() => props.films[index.value])
const next = computed(() => props.films.length > 1 ? props.films[(index.value + 1) % props.films.length] : null)
const playing = ref(false), waiting = ref(false), ended = ref(false), muted = ref(false), full = ref(false), idle = ref(false)
const current = ref(0), duration = ref(0), buffered = ref(0), hoverAt = ref(null)
const ratio = computed(() => film.value ? `${film.value.media.width} / ${film.value.media.height}` : '16 / 9')
const progress = computed(() => duration.value ? Math.min(1, current.value / duration.value) : 0)
let opener = null, origin = null, idleTimer = 0, frameLoop = 0, closing = false, scrubbing = false, resume = false, overBar = false, tapWoke = false

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches
const EASE = 'cubic-bezier(.65,0,.2,1)'

function sourceFor(media) {
 const c = navigator.connection, save = !!c?.saveData || /2g|3g/.test(c?.effectiveType ?? '')
 const q = !save && Math.min(innerWidth, screen.width || innerWidth) * Math.min(devicePixelRatio || 1, 2) >= 1400 ? '1080' : '720'
 const s = media.sources[q], apple = /Apple/.test(navigator.vendor)
 return !apple && s.webmBytes < s.mp4Bytes && video.value.canPlayType('video/webm; codecs="vp9, opus"') === 'probably' ? s.webm : s.mp4
}
// Visible 16:9 frame of an element that shows a video or photo with object-fit: cover (the card, or the full-bleed hero).
function coverFrame(el, media) {
 const r = el.getBoundingClientRect(), a = media.width / media.height
 const w = Math.max(r.width, r.height * a), h = w / a
 return { left: r.left + (r.width - w) / 2, top: r.top + (r.height - h) / 2, width: w, height: h }
}
const flip = (from, to) => [{ transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width})` }, { transform: 'none' }]

function load(f, autoplay) {
 const v = video.value
 ended.value = false; waiting.value = autoplay; current.value = 0; buffered.value = 0; duration.value = f.media.duration
 v.poster = f.media.poster.src
 v.src = sourceFor(f.media)
 v.muted = muted.value
 if (autoplay) v.play().catch(() => { waiting.value = false })
}

// Opens film `i`; `from` is the element whose frame the video grows out of (optional).
async function show(i, from) {
 const f = props.films[i], el = dialog.value
 if (!f || !el || closing) return
 index.value = i
 load(f, true)
 if (el.open) return
 opener = document.activeElement; origin = from ?? null
 el.showModal(); playerOpen.value = true
 document.documentElement.classList.add('menu-open')
 emit('change', i)
 wake()
 if (reduced()) return
 await nextTick() // the frame takes this film's proportions (a microtask: nothing is painted in between)
 const chrome = el.querySelectorAll('[data-chrome]'), to = frame.value.getBoundingClientRect()
 el.animate([{ backgroundColor: 'rgb(7 11 9 / 0)' }, { backgroundColor: 'rgb(7 11 9 / 1)' }], { duration: 700, easing: 'ease-out' })
 chrome.forEach(c => c.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 600, delay: 520, easing: 'ease-out', fill: 'backwards' }))
 if (origin?.isConnected) frame.value.animate(flip(coverFrame(origin, f.media), to), { duration: 950, easing: EASE })
 else frame.value.animate([{ opacity: 0, transform: 'scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 600, easing: EASE })
}

async function close() {
 const el = dialog.value
 if (!el?.open || closing) return
 closing = true
 video.value.pause()
 if (document.fullscreenElement) await document.exitFullscreen().catch(() => {})
 if (!reduced()) {
  const to = frame.value.getBoundingClientRect(), back = origin?.isConnected ? coverFrame(origin, film.value.media) : null
  const inView = back && back.top < innerHeight && back.top + back.height > 0
  const runs = [el.animate([{ backgroundColor: 'rgb(7 11 9 / 1)' }, { backgroundColor: 'rgb(7 11 9 / 0)' }], { duration: inView ? 800 : 420, easing: 'ease-in-out', fill: 'forwards' })]
  el.querySelectorAll('[data-chrome]').forEach(c => runs.push(c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, fill: 'forwards' })))
  runs.push(frame.value.animate(inView ? flip(back, to).reverse() : [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.97)' }], { duration: inView ? 820 : 380, easing: EASE, fill: 'forwards' }))
  await Promise.all(runs.map(a => a.finished.catch(() => {})))
 }
 el.close()
}

// The dialog closed (close(), a second Esc or the browser): release everything.
function closed() {
 const el = dialog.value, v = video.value
 el?.getAnimations({ subtree: true }).forEach(a => a.cancel())
 v.pause(); v.removeAttribute('src'); v.load()
 cancelAnimationFrame(frameLoop); clearTimeout(idleTimer)
 document.documentElement.classList.remove('menu-open')
 playerOpen.value = false; index.value = -1; playing.value = false; ended.value = false; idle.value = false; closing = false
 opener?.focus?.({ preventScroll: true }); opener = null; origin = null
 emit('change', -1)
}

function go(step) {
 if (props.films.length < 2) return
 const i = (index.value + step + props.films.length) % props.films.length
 index.value = i; load(props.films[i], true); emit('change', i)
 if (!reduced()) frame.value.animate([{ opacity: .2 }, { opacity: 1 }], { duration: 500, easing: 'ease-out' })
}
function toggle() {
 const v = video.value
 if (ended.value) { v.currentTime = 0; ended.value = false }
 v.paused ? v.play().catch(() => {}) : v.pause()
 wake()
}
function toggleMute() { video.value.muted = !video.value.muted; wake() }
function toggleFull() {
 const el = dialog.value, v = video.value
 if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
 else if (el.requestFullscreen) el.requestFullscreen().catch(() => {})
 else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen() // iPhone: the system player
}
function seek(to) {
 const v = video.value, d = duration.value || v.duration || 0
 const t = Math.max(0, Math.min(d - .05, to))
 if (scrubbing && v.fastSeek) v.fastSeek(t); else v.currentTime = t
 current.value = t
 if (ended.value && t < d - .1) ended.value = false
}

// Controls fade out after a moment of stillness while the film plays.
function wake() {
 idle.value = false; clearTimeout(idleTimer)
 idleTimer = setTimeout(() => { if (playing.value && !overBar && !scrubbing) idle.value = true }, 2600)
}
function barHover(on) { overBar = on; wake() }
// A tap while the controls are hidden only shows them; the next one plays or pauses.
function onPointerDown(e) { tapWoke = e.pointerType !== 'mouse' && idle.value; wake() }
function onVideoClick() { if (tapWoke) { tapWoke = false; return } toggle() }

// Timeline: pointer scrubbing (mouse and touch) and a keyboard slider.
const timeAt = x => { const r = track.value.getBoundingClientRect(); return Math.max(0, Math.min(1, (x - r.left) / r.width)) * (duration.value || 0) }
function scrubStart(e) {
 if (e.button) return
 scrubbing = true; resume = !video.value.paused; video.value.pause()
 track.value.setPointerCapture(e.pointerId); seek(timeAt(e.clientX))
}
function scrubMove(e) { hoverAt.value = timeAt(e.clientX); if (scrubbing) seek(hoverAt.value) }
function scrubEnd(e) {
 if (!scrubbing) return
 scrubbing = false; track.value.releasePointerCapture?.(e.pointerId)
 video.value.currentTime = current.value
 if (resume) video.value.play().catch(() => {})
 wake()
}
function trackKey(e) {
 const d = duration.value, steps = { ArrowLeft: -5, ArrowRight: 5, ArrowDown: -5, ArrowUp: 5, PageDown: -d / 10, PageUp: d / 10 }
 if (e.key in steps) seek(current.value + steps[e.key])
 else if (e.key === 'Home') seek(0)
 else if (e.key === 'End') seek(d)
 else return
 e.preventDefault(); e.stopPropagation(); wake()
}
function onKey(e) {
 wake()
 if (e.altKey || e.ctrlKey || e.metaKey) return
 // Space activates a focused button or link; the timeline handles its own arrows (trackKey).
 const control = e.target.closest?.('button, a')
 const key = e.key.toLowerCase()
 if ((key === ' ' && !control) || key === 'k') toggle()
 else if (e.key === 'ArrowLeft') seek(current.value - 5)
 else if (e.key === 'ArrowRight') seek(current.value + 5)
 else if (key === 'm') toggleMute()
 else if (key === 'f') toggleFull()
 else if (e.key === 'N' && e.shiftKey) go(1)
 else if (e.key === 'P' && e.shiftKey) go(-1)
 else return
 e.preventDefault()
}

// Media events
function tick() { const v = video.value; if (!scrubbing) current.value = v.currentTime; frameLoop = requestAnimationFrame(tick) }
function onPlay() { playing.value = true; ended.value = false; cancelAnimationFrame(frameLoop); frameLoop = requestAnimationFrame(tick); wake() }
function onPause() { playing.value = false; cancelAnimationFrame(frameLoop); idle.value = false }
function onEnded() { playing.value = false; ended.value = true; idle.value = false; cancelAnimationFrame(frameLoop); current.value = duration.value }
function onProgress() { const v = video.value, b = v.buffered; buffered.value = b.length ? b.end(b.length - 1) : 0 }
function onMeta() { if (Number.isFinite(video.value.duration)) duration.value = video.value.duration }
const onFull = () => { full.value = !!document.fullscreenElement }
onMounted(() => document.addEventListener('fullscreenchange', onFull))
onBeforeUnmount(() => {
 document.removeEventListener('fullscreenchange', onFull)
 cancelAnimationFrame(frameLoop); clearTimeout(idleTimer)
 if (dialog.value?.open) { dialog.value.close() }
 document.documentElement.classList.remove('menu-open'); playerOpen.value = false
})
// dismiss: closes at once, without the way back (leaving the page).
defineExpose({ show, close, dismiss: () => { if (dialog.value?.open) dialog.value.close() } })
</script>
<template>
<dialog ref="dialog" class="film-player" :class="{ 'is-idle': idle && playing, 'is-paused': !playing, 'is-ended': ended }" :aria-label="ui.dialog"
 @cancel.prevent="close" @close="closed" @keydown="onKey" @pointermove="wake" @pointerdown="onPointerDown">
 <div class="film-player-top" data-chrome>
  <p v-if="film" class="film-player-meta">
   <span class="film-player-count">{{ String(index + 1).padStart(2, '0') }} <span>{{ ui.of }} {{ String(films.length).padStart(2, '0') }}</span></span>
   <strong translate="no">{{ film.title }}</strong><em>{{ film.kind }}</em><span v-if="film.credit" class="film-player-credit">{{ film.credit.label }} <i>{{ film.credit.name }}</i></span>
  </p>
  <div class="film-player-actions">
   <NuxtLink v-if="film?.path" class="film-player-project" :to="film.path" @click="dialog.close()"><span>{{ ui.viewProject }}</span><DisenoIcon name="arrow-up-right" /></NuxtLink>
   <button type="button" class="film-player-close" @click="close"><span>{{ ui.close }}</span><DisenoIcon name="close" /></button>
  </div>
 </div>

 <div class="film-player-stage">
  <div ref="frame" class="film-player-frame" :style="{ aspectRatio: ratio }">
   <video ref="video" playsinline preload="none" @click="onVideoClick" @dblclick="toggleFull" @play="onPlay" @pause="onPause" @ended="onEnded"
    @waiting="waiting = true" @playing="waiting = false" @canplay="waiting = false" @progress="onProgress" @loadedmetadata="onMeta" @volumechange="muted = video.muted"></video>
   <span v-if="waiting && !ended" class="film-player-spinner" role="status"><span class="visually-hidden">{{ ui.loading }}</span></span>
   <button v-if="film && !playing && !ended && !waiting" type="button" class="film-player-big" :aria-label="ui.play" @click="toggle"><DisenoIcon name="play" /></button>
   <div v-if="ended" class="film-player-end">
    <button type="button" class="film-player-replay" @click="toggle"><DisenoIcon name="replay" /><span>{{ ui.replay }}</span></button>
    <button v-if="next" type="button" class="film-player-next" @click="go(1)">
     <img :src="next.media.poster.small" alt="" width="960" height="540">
     <span><small>{{ ui.upNext }}</small><strong translate="no">{{ next.title }}</strong><em>{{ next.kind }} · {{ next.time }}</em></span>
     <DisenoIcon name="play" />
    </button>
   </div>
  </div>
 </div>

 <div class="film-player-bar" data-chrome @pointerenter="barHover(true)" @pointerleave="barHover(false)">
  <button type="button" class="film-player-button" autofocus :aria-label="playing ? ui.pause : ui.play" @click="toggle"><DisenoIcon :name="playing ? 'pause' : 'play'" /></button>
  <span class="film-player-time">{{ clock(current) }}<span> / {{ clock(duration) }}</span></span>
  <div ref="track" class="film-player-track" role="slider" tabindex="0" :aria-label="ui.seek" aria-valuemin="0" :aria-valuemax="Math.round(duration)" :aria-valuenow="Math.round(current)" :aria-valuetext="`${clock(current)} / ${clock(duration)}`"
   @pointerdown="scrubStart" @pointermove="scrubMove" @pointerup="scrubEnd" @pointercancel="scrubEnd" @pointerleave="hoverAt = null" @keydown="trackKey">
   <span class="film-player-buffered" :style="{ transform: `scaleX(${duration ? Math.min(1, buffered / duration) : 0})` }"></span>
   <span class="film-player-played" :style="{ transform: `scaleX(${progress})` }"></span>
   <span class="film-player-head" :style="{ left: progress * 100 + '%' }"></span>
   <span v-if="hoverAt !== null" class="film-player-hover" :style="{ left: (duration ? hoverAt / duration : 0) * 100 + '%' }">{{ clock(hoverAt) }}</span>
  </div>
  <button type="button" class="film-player-button" :aria-label="muted ? ui.unmute : ui.mute" :aria-pressed="muted" @click="toggleMute"><DisenoIcon :name="muted ? 'muted' : 'sound'" /></button>
  <template v-if="films.length > 1">
   <button type="button" class="film-player-button film-player-step" :aria-label="ui.previous" @click="go(-1)"><DisenoIcon name="previous" /></button>
   <button type="button" class="film-player-button film-player-step" :aria-label="ui.next" @click="go(1)"><DisenoIcon name="next" /></button>
  </template>
  <button type="button" class="film-player-button" :aria-label="full ? ui.exitFullscreen : ui.fullscreen" @click="toggleFull"><DisenoIcon :name="full ? 'shrink' : 'expand'" /></button>
 </div>
</dialog>
</template>

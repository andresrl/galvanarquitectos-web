<script setup>
// CAD → render comparison (project pages, data in compare.ts): the drawing lies over the render and is clipped at the handle.
// Mouse: press anywhere on the frame and drag. Touch: a horizontal drag moves the handle, a vertical one keeps scrolling the page (touch-action: pan-y).
// Keyboard and screen readers: a visually hidden range input drives the same value.
// On first sight the handle sweeps once to show that it moves; never with reduced motion or after the visitor has touched it.
const props = defineProps({ compare: { type: Object, required: true }, name: { type: String, required: true }, locale: { type: String, required: true }, ui: { type: Object, required: true } })
const alt = computed(() => props.compare.alt[props.locale])
const x = ref(50)
const stage = ref(null)
const sizes = '(max-width:700px) 100vw, (min-width:1700px) 1520px, 90vw'
let drag = null, sweep = 0, wait = 0, watcher = null, touched = false

function stop() { touched = true; cancelAnimationFrame(sweep); clearTimeout(wait); watcher?.disconnect(); watcher = null }
function at(e) {
 const r = stage.value.getBoundingClientRect()
 x.value = Math.min(100, Math.max(0, (e.clientX - r.left) / r.width * 100))
}
function down(e) {
 if (e.button > 0 || !stage.value) return
 stop()
 drag = { id: e.pointerId, touch: e.pointerType !== 'mouse', from: e.clientX, moved: false }
 if (!drag.touch) { at(e); stage.value.setPointerCapture(e.pointerId) }
}
function move(e) {
 if (!drag || e.pointerId !== drag.id) return
 if (drag.touch && !drag.moved) { if (Math.abs(e.clientX - drag.from) < 6) return; drag.moved = true }
 at(e)
}
function up(e) {
 if (drag?.touch && !drag.moved && e.type === 'pointerup') at(e) // a tap places the handle
 drag = null
}

function invite() {
 const keys = [50, 32, 66, 50], segment = 950, start = performance.now()
 const ease = t => (1 - Math.cos(Math.PI * t)) / 2
 const tick = now => {
  const t = (now - start) / segment, i = Math.floor(t)
  if (i >= keys.length - 1) { x.value = 50; return }
  x.value = keys[i] + (keys[i + 1] - keys[i]) * ease(t - i)
  sweep = requestAnimationFrame(tick)
 }
 sweep = requestAnimationFrame(tick)
}
onMounted(() => {
 if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
 watcher = new IntersectionObserver(([entry]) => {
  if (!entry.isIntersecting || touched) return
  watcher.disconnect(); watcher = null
  wait = setTimeout(() => { if (!touched) invite() }, 650) // after the frame has unveiled
 }, { threshold: .6 })
 watcher.observe(stage.value)
})
onBeforeUnmount(() => { cancelAnimationFrame(sweep); clearTimeout(wait); watcher?.disconnect() })
</script>
<template>
<figure class="project-compare-figure">
 <div ref="stage" class="project-compare-stage" :style="{ '--p': x }" data-unveil @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="up" @dragstart.prevent>
  <img class="project-compare-render" :src="compare.render.src" :srcset="compare.render.srcset" :sizes="sizes" :alt="alt.render" :width="compare.render.width" :height="compare.render.height" loading="lazy" decoding="async" draggable="false">
  <img class="project-compare-cad" :src="compare.cad.src" :srcset="compare.cad.srcset" :sizes="sizes" :alt="alt.cad" :width="compare.cad.width" :height="compare.cad.height" loading="lazy" decoding="async" draggable="false">
  <span class="project-compare-tag project-compare-tag--cad" aria-hidden="true">{{ ui.cad }}</span>
  <span class="project-compare-tag project-compare-tag--render" aria-hidden="true">{{ ui.render }}</span>
  <span class="project-compare-handle" aria-hidden="true"><span><DisenoIcon name="arrow-left" /><DisenoIcon name="arrow-right" /></span></span>
  <input v-model.number="x" class="project-compare-range" type="range" min="0" max="100" step="1" :aria-label="ui.label" :aria-valuetext="`${ui.cad} ${Math.round(x)} % · ${ui.render} ${100 - Math.round(x)} %`" @keydown="stop">
 </div>
 <figcaption><span><span translate="no">{{ name }}</span> · {{ ui.caption }}</span><span class="project-compare-hint"><DisenoIcon name="arrow-left" /><span>{{ ui.hint }}</span><DisenoIcon name="arrow-right" /></span></figcaption>
</figure>
</template>

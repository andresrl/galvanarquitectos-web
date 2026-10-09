<script setup>
// One physical model on the studio page (copy in studio.ts models, photographs in scripts/media/models.json):
// a stage that cross-fades between its views, a strip of thumbnails, the viewer and the link to the project.
// Only the views shown (or pointed at in the strip) are mounted, so the section never downloads every large file at once.
// A new view fades in (Web Animations) over the previous one, which stays opaque underneath. Without JS the first view shows.
const props = defineProps({ model: { type: Object, required: true }, index: { type: Number, required: true }, ui: { type: Object, required: true } })
const total = computed(() => props.model.images.length)
const pad = n => String(n).padStart(2, '0')
const active = ref(0)  // view requested
const shown = ref(0)   // view on screen, once loaded
const under = ref(-1)  // previous view, kept under the new one while it fades in
const mounted = reactive(new Set([0]))
const viewer = ref(-1)
const imgs = []
const items = computed(() => props.model.images.map((image, i) => ({ image, alt: props.model.alts[i] })))
const viewerUi = computed(() => ({ ...props.ui.viewer, gallery: `${props.ui.label} · ${props.model.name}` }))
function reveal(i) {
 if (i !== active.value || i === shown.value) return
 imgs[shown.value]?.getAnimations().forEach(a => a.finish())
 under.value = shown.value
 shown.value = i
 if (!matchMedia('(prefers-reduced-motion: reduce)').matches) imgs[i]?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1100, easing: 'cubic-bezier(.4,0,.2,1)' })
}
function select(i) {
 active.value = i
 mounted.add(i)
 nextTick(() => { if (imgs[i]?.complete && imgs[i].naturalWidth) reveal(i) })
}
const step = d => select((active.value + d + total.value) % total.value)
// A horizontal swipe on the stage changes the view; a tap opens the viewer.
let start = null, swiped = false
function down(e) { start = { x: e.clientX, y: e.clientY }; swiped = false }
function cancel() { start = null }
function up(e) {
 if (!start) return
 const dx = e.clientX - start.x, dy = e.clientY - start.y
 start = null
 if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) { swiped = true; step(dx < 0 ? 1 : -1) }
}
function open() {
 if (swiped) { swiped = false; return }
 viewer.value = active.value
}
// The viewer and the stage stay on the same view.
watch(viewer, v => { if (v >= 0) select(v) })
</script>
<template>
<li class="studio-model" :class="{ 'studio-model--flip': index % 2 }">
 <button type="button" class="studio-model-stage" :class="{ 'is-loading': active !== shown }" :style="{ backgroundImage: `url(${model.images[0].lqip})` }" :aria-label="`${ui.open}: ${model.alts[active]}`" data-unveil
  @click="open" @pointerdown="down" @pointerup="up" @pointercancel="cancel" @keydown.left.prevent="step(-1)" @keydown.right.prevent="step(1)">
  <span class="studio-model-zoom" data-zoom>
   <template v-for="(image, i) in model.images" :key="image.src">
    <img v-if="mounted.has(i)" :ref="el => { imgs[i] = el }" :src="image.src" :srcset="image.srcset" sizes="(max-width:700px) 100vw, 62vw" :alt="model.alts[i]" :width="image.width" :height="image.height"
     :class="{ 'is-active': i === shown, 'is-under': i === under }" loading="lazy" decoding="async" draggable="false" @load="reveal(i)">
   </template>
  </span>
  <span class="studio-model-expand" aria-hidden="true"><DisenoIcon name="expand" /></span>
 </button>
 <div class="studio-model-strip" data-reveal>
  <ol class="studio-model-thumbs">
   <li v-for="(image, i) in model.images" :key="image.thumb">
    <button type="button" :aria-label="ui.show(i + 1, total)" :aria-pressed="i === active" @click="select(i)" @pointerenter="mounted.add(i)" @focus="mounted.add(i)">
     <img :src="image.thumb" alt="" width="400" :height="Math.round(400 * image.height / image.width)" loading="lazy" decoding="async" draggable="false">
    </button>
   </li>
  </ol>
  <p class="studio-model-count" aria-hidden="true"><b>{{ pad(active + 1) }}</b> / {{ pad(total) }}</p>
 </div>
 <div class="studio-model-copy">
  <p class="studio-model-index" data-reveal><span>{{ pad(index + 1) }}</span><i aria-hidden="true"></i>{{ ui.label }}</p>
  <h3 data-reveal>{{ model.name }}</h3>
  <p class="studio-model-note" data-reveal>{{ model.note }}</p>
  <NuxtLink class="studio-model-link" :to="model.path" data-reveal>
   <span class="studio-model-link-text">{{ ui.view }}<span class="visually-hidden">: {{ model.name }}</span></span>
   <span class="studio-model-link-icon" aria-hidden="true"><DisenoIcon name="arrow-right" /><DisenoIcon name="arrow-right" /></span>
  </NuxtLink>
 </div>
 <DisenoProjectLightbox v-model="viewer" :items="items" :ui="viewerUi" />
</li>
</template>

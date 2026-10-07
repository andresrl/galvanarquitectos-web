<script setup>
// Project archive listing: reel hero, real filters (status), asymmetric editorial grid, selected villas, closing.
import { projectUi } from '~/data/projects/ui'
import { projects, projectPath } from '~/data/projects/projects'
import { locations } from '~/data/taxonomy'
import { createProjectMotion } from '../motion/project-motion'
const props = defineProps({ page: { type: Object, required: true } })
const { tone } = useGalvan()
const locale = computed(() => props.page.locale)
const other = computed(() => locale.value === 'en' ? 'es' : 'en')
const ui = computed(() => projectUi[locale.value])
const t = computed(() => ui.value.list)
const filter = ref('all')
const items = computed(() => projects.map(p => ({ id: p.id, status: p.status, name: p.name[locale.value], heading: p.copy[locale.value].heading, alt: p.copy[locale.value].heroAlt, image: p.media.hero, featured: p.featured, path: projectPath(p, locale.value),
 meta: [p.status ? ui.value.status[p.status] : '', p.zone ? locations[p.zone].name[locale.value] : ''].filter(Boolean).join(' · ') })))
const visible = computed(() => filter.value === 'all' ? items.value : items.value.filter(i => i.status === filter.value))
const featured = computed(() => items.value.filter(i => i.featured))
const filters = computed(() => (['all', 'completed', 'ongoing']).map(id => ({ id, label: t.value.filters[id], count: id === 'all' ? items.value.length : items.value.filter(i => i.status === id).length })))
const root = ref(null), video = ref(null)
const reduced = ref(false)
let motion = null, alive = false, observer = null
useHead({ bodyAttrs: { class: 'project-archive-page' } })
onMounted(async () => {
 alive = true
 reduced.value = matchMedia('(prefers-reduced-motion: reduce)').matches
 // The reel plays only while visible, never with reduced motion.
 if (video.value && !reduced.value) {
  observer = new IntersectionObserver(([entry]) => entry.isIntersecting && !document.hidden ? video.value?.play().catch(() => {}) : video.value?.pause())
  observer.observe(video.value)
 }
 await document.fonts.ready
 const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
 if (alive && root.value) motion = createProjectMotion({ root: root.value, gsap, ScrollTrigger, onTone: v => { tone.value = v } })
})
watch(filter, async () => { await nextTick(); motion?.refresh() })
function stop() { alive = false; observer?.disconnect(); motion?.destroy(); motion = null }
onBeforeRouteLeave(stop)
onBeforeUnmount(stop)
</script>
<template>
<main ref="root" class="projects-page">
 <section class="projects-hero" id="projects-top" data-header="light" aria-labelledby="projects-title">
  <video v-if="!reduced" ref="video" class="projects-hero-media" muted loop playsinline preload="metadata" poster="/video/projects-reel-poster.avif" aria-hidden="true">
   <source src="/video/projects-reel.mp4" type="video/mp4">
  </video>
  <img v-else class="projects-hero-media" src="/video/projects-reel-poster.avif" alt="" width="1920" height="1080">
  <div class="project-hero-shade" aria-hidden="true"></div>
  <div class="projects-hero-copy">
   <p class="eyebrow" data-reveal>{{ t.eyebrow }} · {{ t.count(items.length) }}</p>
   <h1 id="projects-title" data-reveal>{{ t.title }} <em>{{ t.italic }}</em></h1>
   <p class="projects-hero-lead" data-reveal>{{ t.lead }}</p>
  </div>
  <a class="project-discover" href="#projects-archive"><span>{{ ui.discover }}</span><span class="project-discover-line" aria-hidden="true"></span></a>
 </section>

 <section class="projects-archive" id="projects-archive" data-header="dark" :aria-label="t.eyebrow">
  <div class="projects-toolbar">
   <nav class="project-breadcrumb" :aria-label="locale === 'en' ? 'Breadcrumb' : 'Ruta de navegación'"><template v-for="(crumb, i) in page.breadcrumb" :key="i"><span v-if="i" aria-hidden="true">/</span><span v-if="i === page.breadcrumb.length - 1" aria-current="page">{{ crumb.label }}</span><NuxtLink v-else-if="crumb.path" :to="crumb.path">{{ crumb.label }}</NuxtLink></template></nav>
   <div class="projects-filters" role="group" :aria-label="t.filterLabel"><button v-for="f in filters" :key="f.id" type="button" :aria-pressed="filter === f.id" @click="filter = f.id">{{ f.label }} <sup>{{ f.count }}</sup></button></div>
  </div>
  <ol class="projects-grid">
   <li v-for="(item, i) in visible" :key="item.id" :class="['projects-card', 'projects-card--' + (i % 5)]">
    <NuxtLink :to="item.path">
     <DisenoProjectImage class="project-photo" :image="item.image" :alt="item.alt" :eager="i < 2" :sizes="i % 5 === 4 ? '(max-width:700px) 100vw, 70vw' : '(max-width:700px) 100vw, 50vw'" />
     <span class="projects-card-text"><span class="projects-card-index" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span><span class="projects-card-name">{{ item.name }}</span><em>{{ item.heading }}</em><small v-if="item.meta">{{ item.meta }}</small></span>
    </NuxtLink>
   </li>
  </ol>
 </section>

 <section class="projects-selected" data-header="light" aria-labelledby="selected-title">
  <h2 id="selected-title" data-reveal>{{ t.selected }} <em>{{ t.selectedItalic }}</em></h2>
  <ul>
   <li v-for="item in featured" :key="item.id"><NuxtLink :to="item.path"><DisenoProjectImage class="project-photo" :image="item.image" :alt="item.alt" sizes="(max-width:700px) 80vw, 20vw" /><span>{{ item.name }}</span></NuxtLink></li>
  </ul>
 </section>

 <section class="project-cta" data-header="light" aria-labelledby="projects-cta-title">
  <div data-reveal><p class="eyebrow">{{ ui.ctaEyebrow }}</p><h2 id="projects-cta-title">{{ t.closingTitle }} <em>{{ t.closingItalic }}</em></h2></div>
  <div data-reveal><p>{{ t.closingText }}</p><NuxtLink class="text-link" to="/#contacto"><span>{{ ui.ctaLink }}</span><span aria-hidden="true">↗</span></NuxtLink></div>
 </section>
 <div class="project-end" data-header="light"><span>{{ t.count(items.length).toUpperCase() }}</span><a href="#projects-top">{{ ui.top }} ↑</a><NuxtLink :to="page.alternates[other]" :hreflang="other">{{ ui.language }}</NuxtLink></div>
</main>
</template>

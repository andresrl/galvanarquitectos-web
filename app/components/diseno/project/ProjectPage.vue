<script setup>
// Project page (archive). Receives the resolved registry page and its project; holds no copy of its own.
// Rhythm: full-bleed hero → dark forest block (lead, facts, two columns) → image crossing into paper → gallery → pause → other projects → contact.
import { projectUi } from '~/data/projects/ui'
import { relatedProjects, projectPath, projectsIndexPath, projectsByService } from '~/data/projects/projects'
import { services as serviceNames } from '~/data/taxonomy'
import { pageById } from '~/data/pages'
import { locations } from '~/data/taxonomy'
import { negocio } from '~/data/negocio'
import { studioPaths } from '~/data/studio'
import { projectSetting } from '~/data/projects/setting'
import { createProjectMotion } from '../motion/project-motion'
const props = defineProps({ page: { type: Object, required: true }, project: { type: Object, required: true } })
const { tone } = useGalvan()
const locale = computed(() => props.page.locale)
const other = computed(() => locale.value === 'en' ? 'es' : 'en')
const ui = computed(() => projectUi[locale.value])
const copy = computed(() => props.project.copy[locale.value])
const name = computed(() => props.project.name[locale.value])
const media = computed(() => props.project.media)
const gallery = computed(() => media.value.gallery)
// Layout follows the material: never repeat or pad images.
const crossing = computed(() => gallery.value[0])
const pair = computed(() => gallery.value.length >= 3 ? gallery.value.slice(1, 3) : [])
const rest = computed(() => gallery.value.length >= 3 ? gallery.value.slice(3) : gallery.value.slice(1))
const reel = computed(() => rest.value.length >= 2 ? rest.value : [])
const single = computed(() => rest.value.length === 1 ? rest.value[0] : null)
const facts = computed(() => {
 const p = props.project, t = ui.value, out = []
 if (p.status) out.push([t.facts.status, t.status[p.status]])
 if (p.zone) out.push([t.facts.location, locations[p.zone].name[locale.value]])
 if (p.kind) out.push([t.facts.type, t.kind[p.kind]])
 out.push([t.facts.images, t.imagery[p.imagery]])
 return out
})
// Every image in reading order, for the viewer.
const viewer = computed(() => [media.value.hero, ...gallery.value, media.value.pause].map((image, i, all) => ({ image, alt: i === 0 ? copy.value.heroAlt : `${name.value} · ${ui.value.imagery[props.project.imagery]} ${i + 1} ${ui.value.of} ${all.length}` })))
const altOf = image => viewer.value.find(v => v.image === image)?.alt ?? name.value
const open = ref(-1)
const show = image => { open.value = viewer.value.findIndex(v => v.image === image) }
const related = computed(() => relatedProjects(props.project).map(p => ({ id: p.id, name: p.name[locale.value], heading: p.copy[locale.value].heading, alt: p.copy[locale.value].heroAlt, image: p.media.hero, path: projectPath(p, locale.value) })))
const setting = computed(() => projectSetting(props.project, locale.value))
// Related by service: the services this project shows (links to their pages) and projects that share them.
const byService = computed(() => ({
 services: (props.project.services ?? []).map(id => ({ label: serviceNames[id].name[locale.value], path: pageById(`${id}-hub`).paths[locale.value] })),
 projects: projectsByService(props.project).map(p => ({ id: p.id, name: p.name[locale.value], heading: p.copy[locale.value].heading, alt: p.copy[locale.value].heroAlt, image: p.media.hero, path: projectPath(p, locale.value) }))
}))
const contact = useContact()
const root = ref(null), track = ref(null)
const pageScroll = usePageScroll()
let motion = null, alive = false
useHead({ bodyAttrs: { class: 'project-archive-page' } })
onMounted(async () => {
 alive = true
 await document.fonts.ready
 const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
 if (alive && root.value) motion = createProjectMotion({ root: root.value, gsap, ScrollTrigger, onTone: v => { tone.value = v } })
 pageScroll.ready()
})
function stop() { alive = false; motion?.destroy(); motion = null }
onBeforeRouteLeave(stop)
onBeforeUnmount(stop)
// Reel: mouse drag with inertia (touch and trackpads scroll natively, with snap on mobile).
let drag = null, glide = 0
function down(e) {
 if (e.pointerType !== 'mouse' || e.button !== 0 || !track.value) return
 cancelAnimationFrame(glide)
 drag = { x: e.clientX, left: track.value.scrollLeft, moved: false, v: 0, t: performance.now(), last: e.clientX }
 track.value.classList.add('is-dragging')
}
function move(e) {
 if (!drag) return
 const dx = e.clientX - drag.x
 if (Math.abs(dx) > 4) drag.moved = true
 const now = performance.now(), dt = Math.max(now - drag.t, 1)
 drag.v = .8 * ((e.clientX - drag.last) / dt) + .2 * drag.v
 drag.t = now; drag.last = e.clientX
 track.value.scrollLeft = drag.left - dx
}
function up() {
 if (!drag) return
 const el = track.value, moved = drag.moved
 let v = drag.v * 16 // px per frame
 el?.classList.remove('is-dragging')
 if (el && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const tick = () => { if (Math.abs(v) < .4) return; el.scrollLeft -= v; v *= .94; glide = requestAnimationFrame(tick) }
  glide = requestAnimationFrame(tick)
 }
 setTimeout(() => { if (drag?.moved === moved) drag = null }, 0)
}
function reelClick(image) { if (!drag?.moved) show(image); drag = null }
onBeforeUnmount(() => cancelAnimationFrame(glide))
function step(dir) {
 const el = track.value; if (!el) return
 cancelAnimationFrame(glide)
 const base = el.children[0].offsetLeft, stops = [...el.children].map(i => i.offsetLeft - base), x = el.scrollLeft
 const target = dir > 0 ? stops.find(o => o > x + 8) : [...stops].reverse().find(o => o < x - 8)
 el.scrollTo({ left: target ?? (dir > 0 ? el.scrollWidth : 0), behavior: 'smooth' })
}
</script>
<template>
<main ref="root" class="project-page">
 <section class="project-hero" id="project-top" data-header="light" aria-labelledby="project-title">
  <DisenoProjectImage class="project-hero-image" :image="media.hero" :alt="copy.heroAlt" sizes="100vw" eager />
  <div class="project-hero-shade" aria-hidden="true"></div>
  <div class="project-hero-copy">
   <p class="eyebrow" data-reveal>{{ ui.project }}<template v-if="project.zone"> · {{ locations[project.zone].name[locale] }}</template></p>
   <h1 id="project-title" data-reveal>{{ name }}</h1>
   <p class="project-hero-italic" data-reveal>{{ copy.heading }}</p>
  </div>
  <a class="project-discover" href="#project-story"><span>{{ ui.discover }}</span><span class="project-discover-line" aria-hidden="true"></span></a>
  <span class="project-hero-caption">{{ ui.imagery[project.imagery] }}</span>
 </section>

 <section class="project-story" id="project-story" data-header="light" :aria-label="name">
  <nav class="project-breadcrumb" :aria-label="locale === 'en' ? 'Breadcrumb' : 'Ruta de navegación'"><template v-for="(crumb, i) in page.breadcrumb" :key="i"><span v-if="i" aria-hidden="true">/</span><span v-if="i === page.breadcrumb.length - 1" aria-current="page">{{ crumb.label }}</span><NuxtLink v-else-if="crumb.path" :to="crumb.path">{{ crumb.label }}</NuxtLink></template></nav>
  <div class="project-intro">
   <span class="project-rule" aria-hidden="true"></span>
   <p class="project-lead" data-reveal>{{ copy.lead }}</p>
   <dl class="project-facts" data-reveal><div v-for="[term, value] in facts" :key="term"><dt>{{ term }}</dt><dd>{{ value }}</dd></div></dl>
  </div>
  <div v-if="copy.body.length >= 2" class="project-columns">
   <div data-reveal><h2>{{ ui.architecture }}</h2><p>{{ copy.body[0] }}</p></div>
   <div data-reveal><h2>{{ ui.experience }}</h2><p>{{ copy.body[1] }}</p></div>
  </div>
 </section>

 <section v-if="crossing" class="project-crossing" data-header="light" :aria-label="ui.gallery">
  <p class="project-crossing-italic" aria-hidden="true">{{ copy.heading }}</p>
  <button type="button" class="project-photo project-crossing-photo" :aria-label="ui.open + ': ' + altOf(crossing)" @click="show(crossing)"><DisenoProjectImage :image="crossing" :alt="altOf(crossing)" sizes="(max-width:700px) 100vw, 72vw" /></button>
 </section>

 <section class="project-gallery" data-header="dark" :aria-label="ui.gallery">
  <div v-if="pair.length" class="project-pair">
   <button v-for="(image, i) in pair" :key="image.src" type="button" :class="['project-photo', 'project-pair-' + (i + 1)]" :aria-label="ui.open + ': ' + altOf(image)" @click="show(image)"><DisenoProjectImage :image="image" :alt="altOf(image)" sizes="(max-width:700px) 100vw, 42vw" /></button>
  </div>
  <p v-if="copy.body[2]" class="project-closing" data-reveal><span class="project-rule" aria-hidden="true"></span>{{ copy.body[2] }}</p>
  <button v-if="single" type="button" class="project-photo project-single" :aria-label="ui.open + ': ' + altOf(single)" @click="show(single)"><DisenoProjectImage :image="single" :alt="altOf(single)" sizes="(max-width:700px) 100vw, 84vw" /></button>
  <div v-if="reel.length" class="project-reel">
   <div class="project-reel-head"><p class="eyebrow">{{ ui.gallery }} <span>{{ String(reel.length).padStart(2, '0') }}</span></p><div class="project-reel-controls"><span>{{ ui.scrollHint }}</span><button type="button" :aria-label="ui.previous" @click="step(-1)"><DisenoIcon name="arrow-left" /></button><button type="button" :aria-label="ui.next" @click="step(1)"><DisenoIcon name="arrow-right" /></button></div></div>
   <div ref="track" class="project-reel-track" tabindex="0" :aria-label="ui.gallery" @pointerdown="down" @pointermove="move" @pointerup="up" @pointerleave="up" @dragstart.prevent>
    <button v-for="image in reel" :key="image.src" type="button" class="project-reel-item" :style="{ aspectRatio: image.width + ' / ' + image.height }" :aria-label="ui.open + ': ' + altOf(image)" @click="reelClick(image)"><DisenoProjectImage :image="image" :alt="altOf(image)" sizes="(max-width:700px) 90vw, 60vw" /></button>
   </div>
  </div>
 </section>

 <section class="project-pause" data-header="light">
  <button type="button" class="project-photo project-pause-photo" :aria-label="ui.open + ': ' + altOf(media.pause)" @click="show(media.pause)"><DisenoProjectImage :image="media.pause" :alt="altOf(media.pause)" sizes="100vw" /></button>
 </section>

 <section class="project-setting" data-header="dark" :aria-labelledby="'setting-' + project.id">
  <div class="project-setting-head" data-reveal>
   <p class="eyebrow">{{ setting.eyebrow }}</p>
   <h2 :id="'setting-' + project.id">{{ setting.name }} <em>{{ setting.italic }}</em></h2>
  </div>
  <div class="project-setting-body">
   <p v-for="(text, i) in setting.text" :key="i" :class="{ 'project-setting-lead': i === 0 }" data-reveal>{{ text }}</p>
  </div>
  <nav class="project-setting-services" :aria-label="setting.servicesTitle" data-reveal>
   <h3>{{ setting.servicesTitle }}</h3>
   <ul><li v-for="link in setting.services" :key="link.path"><NuxtLink :to="link.path">{{ link.label }}<span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></NuxtLink></li></ul>
  </nav>
  <nav v-if="setting.projects.length" class="project-setting-projects" :aria-label="setting.projectsTitle">
   <h3 data-reveal>{{ setting.projectsTitle }}</h3>
   <ul><li v-for="item in setting.projects" :key="item.id"><NuxtLink :to="item.path"><DisenoProjectImage class="project-photo" :image="item.image" :alt="item.alt" sizes="(max-width:700px) calc(100vw - 52px), 30vw" /><span class="project-related-name">{{ item.name }}</span><em>{{ item.heading }}</em></NuxtLink></li></ul>
  </nav>
 </section>

 <nav class="project-byservice" data-header="dark" :aria-labelledby="'byservice-' + project.id">
  <div class="project-byservice-head" data-reveal>
   <p class="eyebrow">{{ locale === 'en' ? 'By service' : 'Por servicio' }}</p>
   <h2 :id="'byservice-' + project.id">{{ locale === 'en' ? 'Related projects' : 'Proyectos relacionados' }}</h2>
   <ul class="project-byservice-services"><li v-for="s in byService.services" :key="s.path"><NuxtLink :to="s.path">{{ s.label }} <span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></NuxtLink></li></ul>
  </div>
  <ul class="project-byservice-list"><li v-for="item in byService.projects" :key="item.id"><NuxtLink :to="item.path"><DisenoProjectImage class="project-photo" :image="item.image" :alt="item.alt" sizes="(max-width:700px) calc(100vw - 52px), 24vw" /><span class="project-related-name">{{ item.name }}</span><em>{{ item.heading }}</em></NuxtLink></li></ul>
 </nav>

 <nav class="project-related" data-header="dark" :aria-labelledby="'related-' + project.id">
  <div class="project-related-head"><h2 :id="'related-' + project.id">{{ ui.other }}</h2><NuxtLink class="text-link" :to="projectsIndexPath[locale]"><span>{{ ui.all }}</span><span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></NuxtLink></div>
  <ul>
   <li v-for="item in related" :key="item.id"><NuxtLink :to="item.path"><DisenoProjectImage class="project-photo" :image="item.image" :alt="item.alt" sizes="(max-width:700px) calc(100vw - 52px), 25vw" /><span class="project-related-name">{{ item.name }}</span><em>{{ item.heading }}</em></NuxtLink></li>
  </ul>
 </nav>

 <section class="project-architect" data-header="light" :aria-labelledby="'architect-' + project.id">
  <figure class="project-architect-portrait" data-reveal><img src="/media/studio/francisco-martinez-galvan.avif" :alt="ui.architect.portraitAlt" width="740" height="980" loading="lazy" decoding="async"></figure>
  <div class="project-architect-copy">
   <p class="eyebrow" data-reveal>{{ ui.architect.eyebrow }}</p>
   <h2 :id="'architect-' + project.id" data-reveal>{{ ui.architect.name }} <em>{{ ui.architect.italic }}</em></h2>
   <p data-reveal>{{ ui.architect.background }}</p>
   <p data-reveal>{{ ui.architect.approach }}</p>
   <dl class="project-principles"><div v-for="[term, text] in ui.architect.principles" :key="term" data-reveal><dt>{{ term }}</dt><dd>{{ text }}</dd></div></dl>
   <NuxtLink class="text-link" :to="studioPaths[locale]" data-reveal><span>{{ ui.architect.link }}</span><span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></NuxtLink>
  </div>
  <figure class="project-architect-scene"><img src="/media/studio/studio-drawing-1280.avif" :alt="ui.architect.studioAlt" width="1280" height="720" loading="lazy" decoding="async"></figure>
 </section>

 <section class="project-cta" data-header="light" aria-labelledby="project-cta-title">
  <div data-reveal><p class="eyebrow">{{ ui.ctaEyebrow }}</p><h2 id="project-cta-title">{{ ui.ctaTitle }} <em>{{ ui.ctaItalic }}</em></h2></div>
  <div data-reveal><p>{{ ui.ctaText }}</p><a class="text-link" :href="contact.path.value" @click="contact.show($event)"><span>{{ ui.ctaLink }}</span><span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></a>
   <p class="project-direct"><span>{{ ui.direct }}</span><a :href="'mailto:' + negocio.contacto.email">{{ negocio.contacto.email }}</a><a :href="'tel:' + negocio.contacto.telefono.replaceAll(' ', '')">{{ negocio.contacto.telefono }}</a></p></div>
 </section>
 <div class="project-end" data-header="light"><span>{{ name.toUpperCase() }} · {{ negocio.marca.toUpperCase() }}</span><a href="#project-top">{{ ui.top }} <DisenoIcon name="arrow-up" /></a><NuxtLink :to="page.alternates[other]" :hreflang="other">{{ ui.language }}</NuxtLink></div>
 <DisenoProjectLightbox v-model="open" :items="viewer" :ui="ui" />
</main>
</template>

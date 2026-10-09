<script setup>
// Videos page (/videos · /es/videos), a screening room. The reel plays muted and full-bleed, and on scroll it settles
// into a framed 16:9 screen; the project videos follow as a programme with muted previews.
// Each one plays with sound in FilmPlayer.vue, growing out of the frame that was clicked. Motion: film-motion.js
// (the hero stage is CSS sticky, without GSAP pins). Previews play only in view, never with reduced motion or Save-Data.
import { films, reel, filmsCopy, filmProjectPath, clock, totalRuntime } from '~/data/films'
import { projectUi } from '~/data/projects/ui'
import { projectsIndexPath } from '~/data/projects/projects'
import { negocio } from '~/data/negocio'
import { createFilmMotion } from '../motion/film-motion'
import FilmPlayer from './FilmPlayer.vue'
const props = defineProps({ page: { type: Object, required: true } })
const { tone } = useGalvan()
const contact = useContact()
const locale = computed(() => props.page.locale)
const other = computed(() => locale.value === 'en' ? 'es' : 'en')
const c = computed(() => filmsCopy[locale.value])
const ui = computed(() => projectUi[locale.value])
const items = computed(() => films.map((f, index) => ({ id: f.id, index, title: f.title[locale.value], kind: c.value.kind[f.kind], kindId: f.kind, text: f.text[locale.value],
 media: f.media, path: filmProjectPath(f, locale.value), time: clock(f.media.duration) })))
const first = computed(() => items.value[0])
const programme = computed(() => items.value.slice(1))
const hero = reel.media.hero
const root = ref(null), heroMedia = ref(null), player = ref(null)
const reduced = ref(false)
let motion = null, alive = false, videos = null, open = -1
useHead({ bodyAttrs: { class: 'project-archive-page films-archive-page' } })

// `from`: the element the video grows out of (the hero screen or a programme frame).
function play(index, from) { player.value?.show(index, from) }
const playFromItem = (index, event) => play(index, event.currentTarget.closest('.films-item')?.querySelector('.films-media'))
function onPlayer(index) { open = index; videos?.sync() }

onMounted(async () => {
 alive = true
 reduced.value = matchMedia('(prefers-reduced-motion: reduce)').matches
 const save = !!navigator.connection?.saveData
 await nextTick()
 // Muted loops play only in view and stop while the player is open; with Save-Data only the hero reel moves.
 if (!reduced.value && root.value) {
  videos = createAmbientVideos(() => open < 0)
  if (heroMedia.value instanceof HTMLVideoElement) videos.observe(heroMedia.value, heroMedia.value.closest('.films-stage'))
  if (!save) root.value.querySelectorAll('.films-preview').forEach(v => videos.observe(v, v.closest('.films-media')))
 }
 await document.fonts.ready
 const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
 if (alive && root.value) motion = createFilmMotion({ root: root.value, gsap, ScrollTrigger, onTone: v => { tone.value = v } })
})
function stop() { alive = false; videos?.destroy(); videos = null; motion?.destroy(); motion = null }
onBeforeRouteLeave(async (to, from) => { await awaitPageCapture(to, from); player.value?.dismiss(); stop() })
onBeforeUnmount(stop)
</script>
<template>
<main ref="root" class="films-page">
 <section class="films-hero" id="films-top" data-header="light" aria-labelledby="films-title">
  <div class="films-stage">
   <div class="films-screen" :data-cursor="`${c.cursor} · ${first.time}`" @click="play(0, heroMedia)">
    <video v-if="!reduced" ref="heroMedia" class="films-screen-media" muted loop playsinline preload="metadata" :poster="reel.media.poster.src" aria-hidden="true">
     <source :src="hero.mobileWebm" type="video/webm" media="(max-width: 700px)"><source :src="hero.mobileMp4" type="video/mp4" media="(max-width: 700px)">
     <source :src="hero.webm" type="video/webm"><source :src="hero.mp4" type="video/mp4">
    </video>
    <img v-else ref="heroMedia" class="films-screen-media" :src="reel.media.poster.src" alt="" width="1920" height="1080" fetchpriority="high">
    <span class="films-screen-shade" aria-hidden="true"></span>
   </div>
   <span class="films-screen-marks" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
   <div class="films-hero-copy">
    <p class="eyebrow" data-reveal>{{ c.eyebrow }}</p>
    <h1 id="films-title" data-reveal>{{ c.heading }} <em>{{ c.italic }}</em></h1>
    <p class="films-hero-lead" data-reveal>{{ c.lead }}</p>
   </div>
   <button type="button" class="films-play" :aria-label="c.playLabel(first.title, first.time)" @click="play(0, heroMedia)">
    <span class="films-play-disc" aria-hidden="true"><DisenoIcon name="play" /></span>
    <span class="films-play-text" aria-hidden="true"><strong>{{ c.playReel }}</strong><span>{{ first.time }} · {{ c.withSound }}</span></span>
   </button>
   <p class="films-screen-caption" aria-hidden="true"><span>{{ c.screenCaption }}</span><span>{{ c.screenSign }} · {{ first.time }}</span></p>
   <a class="project-discover films-discover" href="#films-programme"><span>{{ ui.discover }}</span><span class="project-discover-line" aria-hidden="true"></span></a>
  </div>
 </section>

 <section class="films-programme" id="films-programme" data-header="light" aria-labelledby="films-programme-title">
  <div class="films-toolbar">
   <nav class="project-breadcrumb" :aria-label="locale === 'en' ? 'Breadcrumb' : 'Ruta de navegación'"><template v-for="(crumb, i) in page.breadcrumb" :key="i"><span v-if="i" aria-hidden="true">/</span><span v-if="i === page.breadcrumb.length - 1" aria-current="page">{{ crumb.label }}</span><NuxtLink v-else-if="crumb.path" :to="crumb.path">{{ crumb.label }}</NuxtLink></template></nav>
   <span class="films-count">{{ c.count(items.length) }} · {{ clock(totalRuntime) }}</span>
  </div>
  <header class="films-programme-head">
   <p class="eyebrow" data-reveal>{{ c.programmeEyebrow }}</p>
   <h2 id="films-programme-title" data-reveal>{{ c.programmeTitle }} <em>{{ c.programmeItalic }}</em></h2>
   <p data-reveal>{{ c.programmeText }}</p>
  </header>
  <ol class="films-list">
   <li v-for="(item, i) in programme" :id="item.id" :key="item.id" :class="['films-item', i % 2 ? 'films-item--right' : 'films-item--left']">
    <div class="films-media" :data-cursor="`${c.cursor} · ${item.time}`" @click="play(item.index, $event.currentTarget)">
     <video class="films-preview" muted loop playsinline preload="none" :poster="item.media.poster.small" aria-hidden="true">
      <source :src="item.media.preview.webm" type="video/webm"><source :src="item.media.preview.mp4" type="video/mp4">
     </video>
     <span class="films-media-time" aria-hidden="true"><DisenoIcon name="play" />{{ item.time }}</span>
    </div>
    <div class="films-copy">
     <span class="films-number" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
     <p :class="['films-kind', 'films-kind--' + item.kindId]">{{ item.kind }}</p>
     <h3 class="films-title">{{ item.title }}</h3>
     <p class="films-text">{{ item.text }}</p>
     <div class="films-actions">
      <button type="button" class="text-link films-watch" :aria-label="c.playLabel(item.title, item.time)" @click="playFromItem(item.index, $event)"><span>{{ c.watch }} · {{ item.time }}</span><span aria-hidden="true"><DisenoIcon name="play" /></span></button>
      <NuxtLink v-if="item.path" class="text-link" :to="item.path"><span>{{ c.viewProject }}</span><span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></NuxtLink>
     </div>
    </div>
   </li>
  </ol>
 </section>


 <section class="project-cta" data-header="light" aria-labelledby="films-cta-title">
  <div data-reveal><p class="eyebrow">{{ c.ctaEyebrow }}</p><h2 id="films-cta-title">{{ c.ctaTitle }} <em>{{ c.ctaItalic }}</em></h2></div>
  <div data-reveal><p>{{ c.ctaText }}</p>
   <a class="text-link" :href="contact.path.value" @click="contact.show($event)"><span>{{ c.ctaLink }}</span><span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></a>
   <NuxtLink class="text-link films-cta-projects" :to="projectsIndexPath[locale]"><span>{{ c.projectsLink }}</span><span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></NuxtLink>
   <p class="project-direct"><a :href="'mailto:' + negocio.contacto.email">{{ negocio.contacto.email }}</a><a :href="'tel:' + negocio.contacto.telefono.replaceAll(' ', '')">{{ negocio.contacto.telefono }}</a><a :href="negocio.mapa" target="_blank" rel="noopener">{{ negocio.contacto.direccionTexto }}</a></p></div>
 </section>
 <div class="project-end" data-header="light"><span>{{ c.count(items.length).toUpperCase() }} · {{ clock(totalRuntime) }}</span><a href="#films-top">{{ ui.top }} <DisenoIcon name="arrow-up" /></a><NuxtLink :to="page.alternates[other]" :hreflang="other">{{ ui.language }}</NuxtLink></div>

 <div class="films-cursor" aria-hidden="true"><span></span></div>
 <FilmPlayer ref="player" :films="items" :ui="c.player" @change="onPlayer" />
</main>
</template>

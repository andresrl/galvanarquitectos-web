<script setup>
// Studio page (/studio · /es/estudio): the architect, what the studio defends and does, how it works, abroad, projects.
// Same editorial family as the project archive (project.css); motion from project-motion.js.
import { studioCopy } from '~/data/studio'
import { projectUi } from '~/data/projects/ui'
import { projects, projectPath, projectCard, projectsIndexPath } from '~/data/projects/projects'
import { services, serviceIds } from '~/data/taxonomy'
import { pageById } from '~/data/pages'
import { negocio } from '~/data/negocio'
import { areaIds, areaPath } from '~/data/areas'
import { locations } from '~/data/taxonomy'
import { projectById } from '~/data/projects/projects'
import { createProjectMotion } from './motion/project-motion'
const props = defineProps({ page: { type: Object, required: true } })
const { tone } = useGalvan()
const contact = useContact()
const locale = computed(() => props.page.locale)
const other = computed(() => locale.value === 'en' ? 'es' : 'en')
const c = computed(() => studioCopy[locale.value])
const principles = computed(() => projectUi[locale.value].architect.principles)
const serviceLinks = computed(() => serviceIds.map(id => ({ label: services[id].name[locale.value], path: pageById(id + '-hub').paths[locale.value] })))
const scenes = ['studio-drawing', 'studio-site', 'studio-conversation', 'studio-inspection']
const areas = computed(() => [{ label: 'Marbella', path: locale.value === 'en' ? '/' : '/es' }, ...areaIds.map(id => ({ label: locations[id].name[locale.value], path: areaPath(id, locale.value) }))])
const bleuRoyal = computed(() => projectPath(projectById('bleu-royal'), locale.value))
const featured = computed(() => projects.filter(p => p.featured).map(p => projectCard(p, locale.value)))
const root = ref(null)
const reduced = ref(false)
let motion = null, alive = false, videos = null
useHead({ bodyAttrs: { class: 'project-archive-page' } })
onMounted(async () => {
 alive = true
 reduced.value = matchMedia('(prefers-reduced-motion: reduce)').matches
 await nextTick()
 // Background videos play only while visible.
 videos = createAmbientVideos()
 root.value?.querySelectorAll('video').forEach(v => videos.observe(v))
 await document.fonts.ready
 const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
 if (alive && root.value) motion = createProjectMotion({ root: root.value, gsap, ScrollTrigger, onTone: v => { tone.value = v } })
})
function stop() { alive = false; videos?.destroy(); videos = null; motion?.destroy(); motion = null }
onBeforeRouteLeave(stop)
onBeforeUnmount(stop)
</script>
<template>
<main ref="root" class="studio-page">
 <section class="projects-hero studio-hero" id="studio-top" data-header="light" aria-labelledby="studio-title">
  <video v-if="!reduced" class="projects-hero-media" muted loop playsinline preload="metadata" poster="/media/studio/studio-drawing-2560.avif" aria-hidden="true"><source src="/video/studio-drawing.webm" type="video/webm"><source src="/video/studio-drawing.mp4" type="video/mp4"></video>
  <img v-else class="projects-hero-media" src="/media/studio/studio-drawing-2560.avif" :alt="c.sceneAlts[0]" width="2560" height="1441">
  <div class="project-hero-shade" aria-hidden="true"></div>
  <div class="projects-hero-copy">
   <p class="eyebrow" data-reveal>{{ c.eyebrow }}</p>
   <h1 id="studio-title" data-reveal>{{ c.heading }} <em>{{ c.italic }}</em></h1>
  </div>
  <a class="project-discover" href="#studio-intro"><span>{{ projectUi[locale].discover }}</span><span class="project-discover-line" aria-hidden="true"></span></a>
 </section>

 <section class="project-story" id="studio-intro" data-header="light" :aria-label="c.label">
  <nav class="project-breadcrumb" :aria-label="locale === 'en' ? 'Breadcrumb' : 'Ruta de navegación'"><template v-for="(crumb, i) in page.breadcrumb" :key="i"><span v-if="i" aria-hidden="true">/</span><span v-if="i === page.breadcrumb.length - 1" aria-current="page">{{ crumb.label }}</span><NuxtLink v-else-if="crumb.path" :to="crumb.path">{{ crumb.label }}</NuxtLink></template></nav>
  <div class="project-intro"><span class="project-rule" aria-hidden="true"></span><p class="project-lead" data-reveal>{{ c.intro }}</p></div>
 </section>

 <section class="project-architect studio-bio" data-header="light" aria-labelledby="studio-bio-title">
  <figure class="project-architect-portrait" data-reveal><img src="/media/studio/francisco-martinez-galvan.avif" :alt="c.portraitAlt" width="740" height="980" loading="lazy" decoding="async"></figure>
  <div class="project-architect-copy">
   <p class="eyebrow" data-reveal>{{ c.bioEyebrow }}</p>
   <h2 id="studio-bio-title" data-reveal>{{ c.bioTitle }} <em>{{ c.bioItalic }}</em></h2>
   <p v-for="text in c.bio" :key="text" data-reveal>{{ text }}</p>
   <blockquote class="studio-quote" data-reveal><p>“{{ c.quote }}”</p><footer>{{ c.quoteNote }}</footer></blockquote>
  </div>
 </section>

 <section class="studio-principles" data-header="dark" aria-labelledby="studio-principles-title">
  <div class="studio-principles-head" data-reveal><p class="eyebrow">{{ c.principlesEyebrow }}</p><h2 id="studio-principles-title">{{ c.principlesTitle }} <em>{{ c.principlesItalic }}</em></h2></div>
  <ol class="studio-principles-list"><li v-for="([term, text], i) in principles" :key="term" data-reveal><span aria-hidden="true">0{{ i + 1 }}</span><h3>{{ term }}</h3><p>{{ text }}</p></li></ol>
 </section>

 <section class="studio-scene" data-header="light" aria-hidden="true">
  <div class="project-photo studio-scene-media"><video v-if="!reduced" muted loop playsinline preload="none" poster="/media/studio/studio-conversation-2560.avif"><source src="/video/studio-conversation.webm" type="video/webm"><source src="/video/studio-conversation.mp4" type="video/mp4"></video><img v-else src="/media/studio/studio-conversation-2560.avif" alt="" width="2560" height="1441"></div>
 </section>

 <section class="studio-services" data-header="dark" aria-labelledby="studio-services-title">
  <div data-reveal><p class="eyebrow">{{ c.servicesEyebrow }}</p><h2 id="studio-services-title">{{ c.servicesTitle }} <em>{{ c.servicesItalic }}</em></h2></div>
  <div data-reveal><p>{{ c.servicesText }}</p><ul><li v-for="link in serviceLinks" :key="link.path"><NuxtLink :to="link.path">{{ link.label }}<span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></NuxtLink></li></ul></div>
 </section>

 <section class="studio-method" data-header="dark" aria-labelledby="studio-method-title">
  <div class="studio-method-head" data-reveal><p class="eyebrow">{{ c.methodEyebrow }}</p><h2 id="studio-method-title">{{ c.methodTitle }} <em>{{ c.methodItalic }}</em></h2></div>
  <ol class="studio-method-list">
   <li v-for="([title, text], i) in c.method" :key="title" :class="'studio-method-' + i">
    <div class="project-photo"><img :src="'/media/studio/' + scenes[i] + '-1280.avif'" :alt="c.sceneAlts[i]" width="1280" height="720" loading="lazy" decoding="async"></div>
    <span aria-hidden="true">0{{ i + 1 }}</span><h3>{{ title }}</h3><p>{{ text }}</p>
   </li>
  </ol>
 </section>

 <section class="project-cta studio-intl" data-header="light" aria-labelledby="studio-intl-title">
  <div data-reveal><p class="eyebrow">{{ c.intlEyebrow }}</p><h2 id="studio-intl-title">{{ c.intlTitle }} <em>{{ c.intlItalic }}</em></h2></div>
  <div data-reveal><p>{{ c.intlText }}</p></div>
 </section>

 <section class="studio-facts" data-header="dark" aria-label="facts"><dl><div v-for="[k, v] in c.facts" :key="k" data-reveal><dt>{{ k }}</dt><dd>{{ v }}</dd></div></dl></section>

 <section class="studio-press" data-header="light" aria-labelledby="studio-press-title">
  <div class="studio-press-copy" data-reveal><p class="eyebrow">{{ c.pressEyebrow }}</p><h2 id="studio-press-title">{{ c.pressTitle }} <em>{{ c.pressItalic }}</em></h2><p>{{ c.pressText }}</p>
   <p class="eyebrow studio-collab-eyebrow">{{ c.collabEyebrow }}</p><p>{{ c.collabText }}</p><NuxtLink class="text-link" :to="bleuRoyal"><span>{{ c.collabLink }}</span><span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></NuxtLink></div>
  <div class="studio-press-covers"><figure v-for="(alt, i) in c.pressAlts" :key="alt" data-reveal><img :src="`/media/studio/espacio-${i + 1}.avif`" :alt="alt" width="900" height="1146" loading="lazy" decoding="async"><figcaption>ESPACIO · {{ i + 1 }}</figcaption></figure></div>
 </section>

 <nav class="area-near studio-where" data-header="dark" :aria-label="c.whereEyebrow"><h3>{{ c.whereEyebrow }}</h3><p class="studio-where-title">{{ c.whereTitle }} <em>{{ c.whereItalic }}</em></p><ul><li v-for="a in areas" :key="a.path"><NuxtLink :to="a.path">{{ a.label }} <span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></NuxtLink></li></ul></nav>

 <nav class="project-related" data-header="dark" aria-labelledby="studio-projects-title">
  <div class="project-related-head"><h2 id="studio-projects-title">{{ c.projectsEyebrow }}</h2><NuxtLink class="text-link" :to="projectsIndexPath[locale]"><span>{{ c.projectsLink }}</span><span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></NuxtLink></div>
  <ul class="studio-projects"><li v-for="item in featured" :key="item.id"><NuxtLink :to="item.path"><DisenoProjectImage class="project-photo" :image="item.image" :alt="item.alt" sizes="(max-width:700px) calc(100vw - 52px), 20vw" /><span class="project-related-name">{{ item.name }}</span><em>{{ item.heading }}</em></NuxtLink></li></ul>
 </nav>

 <section class="project-cta" data-header="light" aria-labelledby="studio-cta-title">
  <div data-reveal><p class="eyebrow">{{ c.ctaEyebrow }}</p><h2 id="studio-cta-title">{{ c.ctaTitle }} <em>{{ c.ctaItalic }}</em></h2></div>
  <div data-reveal><p>{{ c.ctaText }}</p><a class="text-link" :href="contact.path.value" @click="contact.show($event)"><span>{{ c.ctaLink }}</span><span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></a>
   <p class="project-direct"><a :href="'mailto:' + negocio.contacto.email">{{ negocio.contacto.email }}</a><a :href="'tel:' + negocio.contacto.telefono.replaceAll(' ', '')">{{ negocio.contacto.telefono }}</a></p></div>
 </section>
 <div class="project-end" data-header="light"><span>{{ negocio.marca.toUpperCase() }} · MARBELLA</span><a href="#studio-top">{{ projectUi[locale].top }} <DisenoIcon name="arrow-up" /></a><NuxtLink :to="page.alternates[other]" :hreflang="other">{{ projectUi[locale].language }}</NuxtLink></div>
</main>
</template>

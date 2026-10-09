<script setup>
// Studio page (/studio · /es/estudio): the architect, what the studio defends, how it works, the team, physical models, the studio itself, map, projects.
// Same editorial family as the project archive (project.css); motion from project-motion.js.
import { studioCopy } from '~/data/studio'
import { projectUi } from '~/data/projects/ui'
import { projects, projectById, projectCard, projectPath, projectsIndexPath } from '~/data/projects/projects'
import { studioModelMedia } from '~/data/studio-models.generated'
import { negocio, telefonos } from '~/data/negocio'
import { areaIds, areaPath } from '~/data/areas'
import { locations } from '~/data/taxonomy'
import { createProjectMotion } from './motion/project-motion'
const props = defineProps({ page: { type: Object, required: true } })
const { tone } = useGalvan()
const contact = useContact()
const locale = computed(() => props.page.locale)
const other = computed(() => locale.value === 'en' ? 'es' : 'en')
const c = computed(() => studioCopy[locale.value])
const principles = computed(() => projectUi[locale.value].architect.principles)
const areas = computed(() => [{ label: 'Marbella', path: locale.value === 'en' ? '/' : '/es' }, ...areaIds.map(id => ({ label: locations[id].name[locale.value], path: areaPath(id, locale.value) }))])
const featured = computed(() => projects.filter(p => p.featured).map(p => projectCard(p, locale.value)))
// Physical models: photographs (generated manifest) + copy, each linked to its project.
const models = computed(() => studioModelMedia.map(({ id, images }) => {
 const project = projectById(id)
 return { id, images, name: project.name[locale.value], path: projectPath(project, locale.value), ...c.value.models[id] }
}))
const modelUi = computed(() => ({ label: c.value.modelLabel, view: c.value.modelView, show: c.value.modelShow, open: projectUi[locale.value].open, viewer: projectUi[locale.value] }))
const root = ref(null)
let motion = null, alive = false
useHead({ bodyAttrs: { class: 'project-archive-page' } })
onMounted(async () => {
 alive = true
 await document.fonts.ready
 const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
 if (alive && root.value) motion = createProjectMotion({ root: root.value, gsap, ScrollTrigger, onTone: v => { tone.value = v } })
})
function stop() { alive = false; motion?.destroy(); motion = null }
onBeforeRouteLeave(stop)
onBeforeUnmount(stop)
</script>
<template>
<main ref="root" class="studio-page">
 <section class="project-architect studio-bio" id="studio-top" data-header="light" aria-labelledby="studio-bio-title">
  <figure class="project-architect-portrait" data-reveal><img src="/media/studio/francisco-martinez-galvan.avif" :alt="c.portraitAlt" width="740" height="980" fetchpriority="high"></figure>
  <div class="project-architect-copy">
   <p class="eyebrow" data-reveal>{{ c.bioEyebrow }}</p>
   <h1 id="studio-bio-title" data-reveal>{{ c.bioTitle }} <em>{{ c.bioItalic }}</em></h1>
   <p v-for="text in c.bio" :key="text" data-reveal>{{ text }}</p>
   <blockquote class="studio-quote" data-reveal><p>“{{ c.quote }}”</p><footer>{{ c.quoteNote }}</footer></blockquote>
  </div>
 </section>

 <section class="studio-principles" data-header="dark" aria-labelledby="studio-principles-title">
  <div class="studio-principles-head" data-reveal><p class="eyebrow">{{ c.principlesEyebrow }}</p><h2 id="studio-principles-title">{{ c.principlesTitle }} <em>{{ c.principlesItalic }}</em></h2></div>
  <ol class="studio-principles-list"><li v-for="([term, text], i) in principles" :key="term" data-reveal><span aria-hidden="true">0{{ i + 1 }}</span><h3>{{ term }}</h3><p>{{ text }}</p></li></ol>
 </section>

 <section class="studio-method" data-header="light" aria-labelledby="studio-method-title">
  <div class="studio-method-intro">
   <div class="studio-method-head" data-reveal><p class="eyebrow">{{ c.methodEyebrow }}</p><h2 id="studio-method-title">{{ c.methodTitle }} <em>{{ c.methodItalic }}</em></h2></div>
   <figure class="studio-method-photo" data-reveal><img src="/media/studio/studio-on-site-1382.avif" srcset="/media/studio/studio-on-site-800.avif 800w, /media/studio/studio-on-site-1382.avif 1382w" sizes="(max-width:700px) 52vw, 20vw" :alt="c.methodPhotoAlt" width="1382" height="1322" loading="lazy" decoding="async"></figure>
  </div>
  <ol class="studio-method-list">
   <li v-for="([title, text], i) in c.method" :key="title" :class="'studio-method-' + i">
    <span aria-hidden="true">0{{ i + 1 }}</span><h3>{{ title }}</h3><p>{{ text }}</p>
   </li>
  </ol>
 </section>

 <!-- Team as editorial credits: no portraits until there are real photographs -->
 <section class="studio-team" data-header="dark" aria-labelledby="studio-team-title">
  <div class="studio-credits-head">
   <div data-reveal><p class="eyebrow">{{ c.teamEyebrow }}</p><h2 id="studio-team-title">{{ c.teamTitle }} <em>{{ c.teamItalic }}</em></h2></div>
   <p data-reveal>{{ c.teamText }}</p>
  </div>
  <ul class="studio-credits">
   <li v-for="([role, names], i) in c.team" :key="role">
    <span class="studio-credits-rule" data-draw aria-hidden="true"></span>
    <h3 data-reveal><span aria-hidden="true">0{{ i + 1 }}</span>{{ role }}</h3>
    <ul class="studio-credits-names" data-rise><li v-for="name in names" :key="name"><span data-rise-line>{{ name }}</span></li></ul>
   </li>
  </ul>
 </section>

 <section class="studio-partners" data-header="light" aria-labelledby="studio-partners-title">
  <div class="studio-credits-head">
   <div data-reveal><p class="eyebrow">{{ c.partnersEyebrow }}</p><h2 id="studio-partners-title">{{ c.partnersTitle }} <em>{{ c.partnersItalic }}</em></h2></div>
   <p data-reveal>{{ c.partnersText }}</p>
  </div>
  <ul class="studio-credits">
   <li v-for="([field, firms], i) in c.partners" :key="field">
    <span class="studio-credits-rule" data-draw aria-hidden="true"></span>
    <h3 data-reveal><span aria-hidden="true">0{{ i + 1 }}</span>{{ field }}</h3>
    <ul class="studio-credits-names" data-rise><li v-for="firm in firms" :key="firm"><span data-rise-line>{{ firm }}</span></li></ul>
   </li>
  </ul>
 </section>

 <section class="studio-models" data-header="dark" aria-labelledby="studio-models-title">
  <div class="studio-credits-head">
   <div data-reveal><p class="eyebrow">{{ c.modelsEyebrow }}</p><h2 id="studio-models-title">{{ c.modelsTitle }} <em>{{ c.modelsItalic }}</em></h2></div>
   <p data-reveal>{{ c.modelsText }}</p>
  </div>
  <ol class="studio-models-list"><DisenoStudioModel v-for="(model, i) in models" :key="model.id" :model="model" :index="i" :ui="modelUi" /></ol>
 </section>

 <section class="studio-place" data-header="light" aria-labelledby="studio-place-title">
  <div class="studio-credits-head">
   <div data-reveal><p class="eyebrow">{{ c.placeEyebrow }}</p><h2 id="studio-place-title">{{ c.placeTitle }} <em>{{ c.placeItalic }}</em></h2></div>
   <p data-reveal>{{ c.placeText }}</p>
  </div>
  <div class="studio-place-photos">
   <figure class="studio-place-facade" data-reveal><img src="/media/studio/studio-facade-1280.avif" srcset="/media/studio/studio-facade-1280.avif 1280w, /media/studio/studio-facade-2560.avif 2560w" sizes="(max-width:700px) 100vw, 60vw" :alt="c.facadeAlt" width="2560" height="1707" loading="lazy" decoding="async"></figure>
   <figure class="studio-place-office" data-reveal><img src="/media/studio/studio-office-800.avif" srcset="/media/studio/studio-office-800.avif 800w, /media/studio/studio-office-1600.avif 1600w" sizes="(max-width:700px) 82vw, 34vw" :alt="c.officeAlt" width="1600" height="1754" loading="lazy" decoding="async"></figure>
  </div>
 </section>

 <section class="studio-map" data-header="dark" aria-labelledby="studio-map-title">
  <picture class="studio-map-image"><source media="(max-width:700px)" srcset="/media/studio/studio-map-mobile.svg" width="660" height="860"><img src="/media/studio/studio-map.svg" :alt="c.mapAlt" width="1800" height="860" loading="lazy" decoding="async"></picture>
  <div class="studio-map-card" data-reveal>
   <p class="eyebrow">{{ c.mapEyebrow }}</p>
   <h2 id="studio-map-title">{{ negocio.contacto.direccionLineas[0] }} <em>{{ negocio.contacto.direccionLineas[1] }}</em></h2>
   <p>{{ c.mapText }}</p>
   <a class="text-link" :href="negocio.mapa" target="_blank" rel="noopener"><span>{{ c.mapLink }}</span><span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></a>
  </div>
  <a class="studio-map-credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">{{ c.mapCredit }}</a>
 </section>

 <section class="studio-press" data-header="light" aria-labelledby="studio-press-title">
  <div class="studio-press-copy" data-reveal><p class="eyebrow">{{ c.pressEyebrow }}</p><h2 id="studio-press-title">{{ c.pressTitle }} <em>{{ c.pressItalic }}</em></h2><p>{{ c.pressText }}</p>
   <p class="eyebrow studio-collab-eyebrow">{{ c.collabEyebrow }}</p><p>{{ c.collabText }}</p></div>
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
   <p class="project-direct"><a :href="'mailto:' + negocio.contacto.email">{{ negocio.contacto.email }}</a><a v-for="p in telefonos" :key="p.href" :href="p.href">{{ p.label[locale] }} {{ p.numero }}</a><a :href="negocio.mapa" target="_blank" rel="noopener">{{ negocio.contacto.direccionTexto }}</a></p></div>
 </section>
 <div class="project-end" data-header="light"><span>{{ negocio.marca.toUpperCase() }} · MARBELLA</span><a href="#studio-top">{{ projectUi[locale].top }} <DisenoIcon name="arrow-up" /></a><NuxtLink :to="page.alternates[other]" :hreflang="other">{{ projectUi[locale].language }}</NuxtLink></div>
</main>
</template>

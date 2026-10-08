<script setup>
// Area page («Architect in Benahavís»): the area, the four services there, projects confirmed there, FAQ, nearby areas.
import { areaUi, areaPath } from '~/data/areas'
import { locations, services, serviceIds } from '~/data/taxonomy'
import { locationCopy } from '~/data/content/locations'
import { areaHero, projectsIn } from '~/data/content/service-images'
import { projectCard } from '~/data/projects/projects'
import { servicesIn } from '~/data/pages'
import { createProjectMotion } from './motion/project-motion'
const props = defineProps({ page: { type: Object, required: true } })
const { tone } = useGalvan()
const contact = useContact()
const locale = computed(() => props.page.locale)
const loc = computed(() => props.page.definition.locationId)
const place = computed(() => locations[loc.value])
const t = computed(() => areaUi[locale.value])
const inPlace = computed(() => place.value.in[locale.value])
const copy = computed(() => locationCopy[loc.value])
const local = computed(() => projectsIn(loc.value))
// Hero: a photograph of a project confirmed in the area, otherwise the area's new-build image.
const hero = computed(() => local.value[0]?.media.hero ?? null)
const heroMedia = computed(() => areaHero('architecture', loc.value, locale.value))
// Archive image (no project confirmed here): say so, so the photo is not read as a project in this area.
const caption = computed(() => hero.value ? local.value[0].name[locale.value] : `${heroMedia.value.caption} · ${locale.value === 'en' ? 'Studio archive' : 'Archivo del estudio'}`)
const cells = computed(() => { const links = servicesIn(loc.value, locale.value); return serviceIds.map((id, i) => ({ id, name: services[id].name[locale.value], text: copy.value.focus[id]?.[locale.value] ?? '', path: links.find(l => l.label === services[id].name[locale.value])?.path, image: areaHero(id, loc.value, locale.value) })).filter(c => c.path) })
const projectCards = computed(() => local.value.map(p => projectCard(p, locale.value)))
const near = computed(() => place.value.near.map(n => ({ label: locations[n].name[locale.value], path: areaPath(n, locale.value) })))
const root = ref(null)
let motion = null, alive = false
useHead({ bodyAttrs: { class: 'project-archive-page' } })
onMounted(async () => { alive = true; await document.fonts.ready; const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]); if (alive && root.value) motion = createProjectMotion({ root: root.value, gsap, ScrollTrigger, onTone: v => { tone.value = v } }) })
function stop() { alive = false; motion?.destroy(); motion = null }
onBeforeRouteLeave(stop); onBeforeUnmount(stop)
</script>
<template>
<main ref="root" class="area-page">
 <section class="projects-hero" id="area-top" data-header="light" aria-labelledby="area-title">
  <DisenoProjectImage v-if="hero" class="projects-hero-media" :image="hero" :alt="local[0].copy[locale].heroAlt" sizes="100vw" eager />
  <img v-else class="projects-hero-media" :src="heroMedia.src" :srcset="heroMedia.srcset" sizes="100vw" :alt="heroMedia.alt" :width="heroMedia.width" :height="heroMedia.height" fetchpriority="high">
  <div class="project-hero-shade" aria-hidden="true"></div>
  <span class="project-hero-caption">{{ caption }}</span>
  <div class="projects-hero-copy"><p class="eyebrow" data-reveal>{{ place.name[locale] }} · {{ place.area }}</p><h1 id="area-title" data-reveal>{{ t.heading(inPlace) }} <em>{{ t.italic }}</em></h1><p class="projects-hero-lead" data-reveal>{{ t.lead(inPlace) }}</p></div>
 </section>
 <section class="project-story" data-header="light" :aria-label="t.introEyebrow">
  <nav class="project-breadcrumb" :aria-label="locale === 'en' ? 'Breadcrumb' : 'Ruta de navegación'"><template v-for="(crumb, i) in page.breadcrumb" :key="i"><span v-if="i" aria-hidden="true">/</span><span v-if="i === page.breadcrumb.length - 1" aria-current="page">{{ crumb.label }}</span><NuxtLink v-else-if="crumb.path" :to="crumb.path">{{ crumb.label }}</NuxtLink></template></nav>
  <div class="project-intro"><span class="project-rule" aria-hidden="true"></span><p class="project-lead" data-reveal>{{ copy.context[locale] }}</p></div>
  <div class="project-columns"><div data-reveal><h2>{{ t.introEyebrow }}</h2><p>{{ copy.setting[locale] }}</p></div><div data-reveal><h2>{{ copy.faq[locale][0] }}</h2><p>{{ copy.faq[locale][1] }}</p></div></div>
 </section>
 <section class="area-services" data-header="dark" aria-labelledby="area-services">
  <h2 id="area-services" data-reveal>{{ t.servicesTitle(inPlace) }}</h2>
  <ul><li v-for="cell in cells" :key="cell.id" data-reveal><NuxtLink :to="cell.path">
   <div class="project-photo project-image"><img :src="cell.image.src" :srcset="cell.image.srcset" sizes="(max-width:700px) 90vw, 45vw" :alt="cell.image.alt" :width="cell.image.width" :height="cell.image.height" loading="lazy" decoding="async"></div>
   <h3>{{ cell.name }} <span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></h3><p>{{ cell.text }}</p></NuxtLink></li></ul>
 </section>
 <nav v-if="projectCards.length" class="project-setting-projects area-projects" data-header="dark" :aria-label="t.projectsTitle(inPlace)">
  <h3>{{ t.projectsTitle(inPlace) }}</h3>
  <ul><li v-for="item in projectCards" :key="item.id"><NuxtLink :to="item.path"><DisenoProjectImage class="project-photo" :image="item.image" :alt="item.alt" sizes="(max-width:700px) calc(100vw - 52px), 30vw" /><span class="project-related-name">{{ item.name }}</span><em>{{ item.heading }}</em></NuxtLink></li></ul>
 </nav>
 <nav class="area-near" data-header="dark" :aria-label="t.nearTitle"><h3>{{ t.nearTitle }}</h3><ul><li v-for="n in near" :key="n.path"><NuxtLink :to="n.path">{{ n.label }} <span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></NuxtLink></li></ul></nav>
 <section class="project-cta" data-header="light"><div data-reveal><h2>{{ t.ctaTitle }} <em>{{ t.ctaItalic }}</em></h2></div><div data-reveal><p>{{ t.lead(inPlace) }}</p><a class="text-link" :href="contact.path.value" @click="contact.show($event)"><span>{{ t.cta }}</span><span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></a></div></section>
</main>
</template>

<script setup>
// International clients (app/data/international.ts): hero, how working from abroad works, what you can count on, FAQ, projects.
import { internationalCopy } from '~/data/international'
import { projects, projectPath, projectById } from '~/data/projects/projects'
import { guidePath } from '~/data/guides'
import { createProjectMotion } from './motion/project-motion'
const props = defineProps({ page: { type: Object, required: true } })
const { tone } = useGalvan()
const contact = useContact()
const locale = computed(() => props.page.locale)
const c = computed(() => internationalCopy[locale.value])
const hero = projectById('the-villas').media.pause
const featured = computed(() => projects.filter(p => p.featured).map(p => ({ id: p.id, name: p.name[locale.value], heading: p.copy[locale.value].heading, alt: p.copy[locale.value].heroAlt, image: p.media.hero, path: projectPath(p, locale.value) })))
const guide = computed(() => guidePath(locale.value, locale.value === 'en' ? 'following-your-villa-project-from-abroad' : 'seguir-tu-proyecto-desde-otro-pais'))
const root = ref(null)
let motion = null, alive = false
useHead({ bodyAttrs: { class: 'project-archive-page' } })
onMounted(async () => { alive = true; await document.fonts.ready; const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]); if (alive && root.value) motion = createProjectMotion({ root: root.value, gsap, ScrollTrigger, onTone: v => { tone.value = v } }) })
function stop() { alive = false; motion?.destroy(); motion = null }
onBeforeRouteLeave(stop); onBeforeUnmount(stop)
</script>
<template>
<main ref="root" class="intl-page">
 <section class="projects-hero" id="intl-top" data-header="light" aria-labelledby="intl-title">
  <DisenoProjectImage class="projects-hero-media" :image="hero" :alt="c.heroAlt" sizes="100vw" eager />
  <div class="project-hero-shade" aria-hidden="true"></div>
  <div class="projects-hero-copy"><p class="eyebrow" data-reveal>{{ c.eyebrow }}</p><h1 id="intl-title" data-reveal>{{ c.heading }} <em>{{ c.italic }}</em></h1><p class="projects-hero-lead" data-reveal>{{ c.lead }}</p></div>
 </section>
 <section class="project-story" data-header="light" :aria-label="c.introTitle">
  <nav class="project-breadcrumb" :aria-label="locale === 'en' ? 'Breadcrumb' : 'Ruta de navegación'"><template v-for="(crumb, i) in page.breadcrumb" :key="i"><span v-if="i" aria-hidden="true">/</span><span v-if="i === page.breadcrumb.length - 1" aria-current="page">{{ crumb.label }}</span><NuxtLink v-else-if="crumb.path" :to="crumb.path">{{ crumb.label }}</NuxtLink></template></nav>
  <div class="project-columns intl-intro"><h2 data-reveal>{{ c.introTitle }} <em>{{ c.introItalic }}</em></h2><div><p v-for="t in c.intro" :key="t" data-reveal>{{ t }}</p></div></div>
 </section>
 <section class="studio-principles" data-header="dark" aria-labelledby="intl-steps">
  <div class="studio-principles-head" data-reveal><p class="eyebrow">{{ c.stepsEyebrow }}</p><h2 id="intl-steps">{{ c.stepsTitle }} <em>{{ c.stepsItalic }}</em></h2></div>
  <ol class="studio-principles-list"><li v-for="([t, x], i) in c.steps" :key="t" data-reveal><span aria-hidden="true">0{{ i + 1 }}</span><h3>{{ t }}</h3><p>{{ x }}</p></li></ol>
 </section>
 <section class="project-cta intl-points" data-header="light" aria-labelledby="intl-points">
  <div data-reveal><p class="eyebrow" id="intl-points">{{ c.pointsEyebrow }}</p></div>
  <dl class="project-principles"><div v-for="[t, x] in c.points" :key="t" data-reveal><dt>{{ t }}</dt><dd>{{ x }}</dd></div></dl>
 </section>
 <section class="intl-faq" data-header="dark" aria-labelledby="intl-faq">
  <h2 id="intl-faq" data-reveal>{{ c.faqTitle }}</h2>
  <div class="service-faq"><details v-for="([q, a], i) in c.faqs" :key="i"><summary>{{ q }}<span aria-hidden="true">+</span></summary><p>{{ a }}</p></details></div>
  <NuxtLink class="intl-guide" :to="guide"><span class="eyebrow">{{ locale === 'en' ? 'Guide' : 'Guía' }}</span><strong>{{ c.guideTitle }} ↗</strong><span>{{ c.guideText }}</span></NuxtLink>
 </section>
 <nav class="project-related" data-header="dark" aria-labelledby="intl-projects">
  <div class="project-related-head"><h2 id="intl-projects">{{ c.projectsTitle }}</h2></div>
  <ul class="studio-projects"><li v-for="item in featured" :key="item.id"><NuxtLink :to="item.path"><DisenoProjectImage class="project-photo" :image="item.image" :alt="item.alt" sizes="(max-width:700px) calc(100vw - 52px), 20vw" /><span class="project-related-name">{{ item.name }}</span><em>{{ item.heading }}</em></NuxtLink></li></ul>
 </nav>
 <section class="project-cta" data-header="light"><div data-reveal><h2>{{ c.heading }} <em>{{ c.italic }}</em></h2></div><div data-reveal><p>{{ c.lead }}</p><a class="text-link" :href="contact.path.value" @click="contact.show($event)"><span>{{ c.cta }}</span><span aria-hidden="true">↗</span></a></div></section>
</main>
</template>

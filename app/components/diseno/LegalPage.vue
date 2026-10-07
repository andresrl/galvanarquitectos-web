<script setup>
// Legal notice, privacy and cookie policy (app/data/legal.ts): a quiet reading page on paper.
import { legalCopy } from '~/data/legal'
const props = defineProps({ page: { type: Object, required: true } })
const doc = computed(() => legalCopy[props.page.definition.id.replace(/^legal-/, '')][props.page.locale])
useHead({ bodyAttrs: { class: 'project-archive-page' } })
</script>
<template>
<main class="legal-page">
 <nav class="project-breadcrumb" :aria-label="page.locale === 'en' ? 'Breadcrumb' : 'Ruta de navegación'"><template v-for="(crumb, i) in page.breadcrumb" :key="i"><span v-if="i" aria-hidden="true">/</span><span v-if="i === page.breadcrumb.length - 1" aria-current="page">{{ crumb.label }}</span><NuxtLink v-else-if="crumb.path" :to="crumb.path">{{ crumb.label }}</NuxtLink></template></nav>
 <article class="legal-body">
  <h1>{{ doc.heading }}</h1>
  <p class="legal-updated">{{ doc.updated }}</p>
  <section v-for="s in doc.sections" :key="s.heading"><h2>{{ s.heading }}</h2><p v-for="(p, i) in s.paragraphs" :key="i">{{ p }}</p><ul v-if="s.list"><li v-for="item in s.list" :key="item">{{ item }}</li></ul></section>
 </article>
</main>
</template>

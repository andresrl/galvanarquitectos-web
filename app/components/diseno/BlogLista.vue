<script setup>
// Guide index. Data comes from useGuideList (pages/journal, pages/es/guias).
import { archive } from '~/data/content/archive'
import { guideCopy } from '~/data/guides'
const props = defineProps({ locale: { type: String, required: true }, guides: { type: Array, default: () => [] } })
const t = computed(() => guideCopy[props.locale])
const image = key => archive[key]
useHead({ bodyAttrs: { class: 'luxury-service-page' } })
</script>
<template>
<main class="guides">
 <header class="guides-head service-container">
  <p class="eyebrow">{{t.eyebrow}}</p>
  <h1 class="service-heading">{{t.heading}}{{' '}}<em>{{t.italic}}</em></h1>
  <p class="guides-lead">{{t.lead}}</p>
 </header>
 <ol class="guides-list service-container">
  <li v-for="(guide,i) in guides" :key="guide.path">
   <NuxtLink :to="guide.href">
    <span class="guides-number">{{String(i+1).padStart(2,'0')}}</span>
    <span class="guides-thumb"><img v-if="image(guide.image)" :src="image(guide.image).src" :alt="image(guide.image).alt[locale]" loading="lazy" decoding="async" width="720" height="720"></span>
    <span class="guides-copy"><span class="guides-title">{{guide.title}}</span><span class="guides-description">{{guide.description}}</span><small v-if="guide.draft">{{t.draft}}</small></span>
    <span class="guides-arrow" aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span>
   </NuxtLink>
  </li>
 </ol>
</main>
</template>

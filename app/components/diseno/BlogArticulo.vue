<script setup>
// Guide reading template. Data comes from useGuide (pages/journal/[slug], pages/es/guias/[slug]).
import { archive } from '~/data/content/archive'
import { guideCopy, guideIndex } from '~/data/guides'
import { commonCopy } from '~/data/content/services'
const props = defineProps({ locale: { type: String, required: true }, post: { type: Object, required: true }, more: { type: Array, default: () => [] }, alternates: Object })
const t = computed(() => guideCopy[props.locale])
const image = computed(() => archive[props.post.image])
const date = computed(() => new Intl.DateTimeFormat(props.locale === 'en' ? 'en-GB' : 'es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(props.post.date)))
useHead({ bodyAttrs: { class: 'luxury-service-page' } })
</script>
<template>
<main class="guide">
 <header class="guide-head service-container">
  <div class="guide-head-copy">
   <p class="eyebrow">{{t.guide}} · <time :datetime="post.date">{{date}}</time></p>
   <h1>{{post.title}}</h1>
   <p class="guide-lead">{{post.description}}</p>
   <p class="guide-meta">{{t.by}} {{post.author}}<span v-if="post.draft"> · {{t.draft}}</span></p>
  </div>
  <figure v-if="image" class="guide-figure"><div class="service-photo"><img :src="image.src" :alt="image.alt[locale]" fetchpriority="high" :width="image.width" :height="image.height"></div><figcaption>{{image.name}} · {{commonCopy[locale].archiveCaption}}</figcaption></figure>
 </header>
 <nav class="guide-breadcrumb service-container" :aria-label="locale==='en'?'Breadcrumb':'Ruta de navegación'"><NuxtLink to="/">{{commonCopy[locale].home}}</NuxtLink><span aria-hidden="true">/</span><NuxtLink :to="guideIndex[locale]">{{t.title}}</NuxtLink><span aria-hidden="true">/</span><span aria-current="page">{{post.title}}</span></nav>
 <article class="guide-body"><ContentRenderer :value="post" class="guide-prose" /></article>
 <aside class="guide-service" :aria-label="t.related">
  <div class="service-container guide-service-inner">
   <p class="eyebrow">{{t.related}}</p>
   <NuxtLink class="guide-service-link" :to="post.service">{{post.serviceAnchor}} <span aria-hidden="true">↗</span></NuxtLink>
   <NuxtLink class="text-link" :to="post.service+'#enquiry'"><span>{{t.contact}}</span><span aria-hidden="true">↗</span></NuxtLink>
  </div>
 </aside>
 <nav v-if="more.length" class="guide-more service-container" :aria-label="t.more">
  <p class="eyebrow">{{t.more}}</p>
  <ul><li v-for="item in more" :key="item.href"><NuxtLink :to="item.href">{{item.title}}<span aria-hidden="true">↗</span></NuxtLink></li></ul>
  <NuxtLink class="text-link" :to="guideIndex[locale]"><span>{{t.all}}</span><span aria-hidden="true">↗</span></NuxtLink>
 </nav>
</main>
</template>

<script setup>
// Approved service template. Receives a page resolved by app/data/pages; holds no copy of its own.
import { createServiceMotion } from './motion/service-motion'
const props = defineProps({ page: { type: Object, required: true } })
const { tone } = useGalvan()
const content = computed(() => props.page.content)
const locale = computed(() => props.page.locale)
const otherLocale = computed(() => locale.value==='en'?'es':'en')
const root = ref(null)
const form = reactive({name:'',email:'',phone:'',location:props.page.locationName??'',message:''})
const navTargets = ['overview','transformation','process','questions']
let motion = null, alive = false
useHead({bodyAttrs:{class:'luxury-service-page'}})
async function startMotion() {
 const [{gsap},{ScrollTrigger}] = await Promise.all([import('gsap'),import('gsap/ScrollTrigger')])
 if (!alive || !root.value) return
 motion = createServiceMotion({root:root.value,gsap,ScrollTrigger,onTone:value=>{tone.value=value}})
}
onMounted(async()=>{alive=true;await document.fonts.ready;if(alive)await startMotion()})
function stop(){alive=false;motion?.destroy();motion=null}
onBeforeRouteLeave(stop)
onBeforeUnmount(stop)
function prepareEnquiry(){
 const c=content.value
 const body=[`${c.fields.name}: ${form.name}`,`${c.fields.email}: ${form.email}`,form.phone?`${c.fields.phone}: ${form.phone}`:'',`${c.fields.location}: ${form.location}`,'',form.message].filter(Boolean).join('\n')
 window.location.href=`mailto:info@galvanarquitectos.com?subject=${encodeURIComponent(c.label)}&body=${encodeURIComponent(body)}`
}
</script>
<template>
<main ref="root" class="service-editorial">
 <section class="service-hero" id="service-top" aria-labelledby="service-title">
  <div class="service-hero-image"><img :src="content.media.hero.src" :alt="content.media.hero.alt" fetchpriority="high" :width="content.media.hero.width" :height="content.media.hero.height"></div>
  <div class="service-hero-shade"></div>
  <div class="service-hero-copy">
   <p class="eyebrow" data-reveal>{{content.eyebrow}}</p>
   <h1 id="service-title" data-reveal>{{content.heading}}{{' '}}<em>{{content.italic}}</em></h1>
   <p class="service-hero-lead" data-reveal>{{content.lead}}</p>
   <a class="text-link" href="#enquiry" data-reveal><span>{{content.enquire}}</span><span aria-hidden="true">↗</span></a>
  </div>
  <a class="service-discover" href="#overview">{{content.discover}} <span aria-hidden="true">↓</span></a>
  <span class="service-hero-caption">{{content.media.hero.caption}}</span>
 </section>
 <div class="service-navigation">
  <nav class="service-breadcrumb" :aria-label="locale==='en'?'Breadcrumb':'Ruta de navegación'"><template v-for="(crumb,i) in page.breadcrumb" :key="i"><span v-if="i" aria-hidden="true">/</span><span v-if="i===page.breadcrumb.length-1" aria-current="page">{{crumb.label}}</span><NuxtLink v-else-if="crumb.path" :to="crumb.path">{{crumb.label}}</NuxtLink><span v-else>{{crumb.label}}</span></template></nav>
  <nav :aria-label="locale==='en'?'On this page':'En esta página'" class="service-index"><a v-for="(label,i) in content.navigation" :key="navTargets[i]" :href="'#'+navTargets[i]">{{label}}</a></nav>
 </div>
 <section class="service-intro service-container" id="overview" aria-labelledby="overview-title">
  <div data-reveal><p class="eyebrow">{{content.introEyebrow}}</p><h2 class="service-heading" id="overview-title">{{content.introTitle}}{{' '}}<em>{{content.introItalic}}</em></h2></div>
  <div class="service-intro-body" data-reveal><p class="service-lead">{{content.introLead}}</p><p>{{content.introText}}</p><a class="text-link" href="#enquiry"><span>{{content.enquire}}</span><span aria-hidden="true">↗</span></a></div>
 </section>
 <section class="service-transformation service-container" id="transformation" aria-labelledby="transformation-title">
  <figure class="service-tall-photo"><div class="service-photo"><img :src="content.media.feature.src" :alt="content.media.feature.alt" loading="lazy" decoding="async" :width="content.media.feature.width" :height="content.media.feature.height"></div><figcaption>{{content.media.feature.caption}}</figcaption></figure>
  <div class="service-scope"><div data-reveal><p class="eyebrow">{{content.transformationEyebrow}}</p><h2 id="transformation-title" class="service-heading">{{content.transformationTitle}}{{' '}}<em>{{content.transformationItalic}}</em></h2></div><ol class="service-scope-list"><li v-for="(item,i) in content.scope" :key="i" data-reveal><span aria-hidden="true">0{{i+1}}</span><div><h3>{{item.title}}</h3><p>{{item.text}}</p></div></li></ol></div>
 </section>
 <section class="service-vision" aria-labelledby="vision-title">
  <div class="service-photo"><img :src="content.media.pause.src" :alt="content.media.pause.alt" loading="lazy" decoding="async" :width="content.media.pause.width" :height="content.media.pause.height"></div>
  <div class="service-vision-copy" data-reveal><p class="eyebrow">{{content.visionEyebrow}}</p><h2 class="service-heading" id="vision-title">{{content.visionTitle}}{{' '}}<em>{{content.visionItalic}}</em></h2><p>{{content.visionText}}</p></div>
 </section>
 <section class="service-process service-container" id="process" aria-labelledby="process-title">
  <div class="service-process-copy" data-reveal><p class="eyebrow">{{content.processEyebrow}}</p><h2 class="service-heading" id="process-title">{{content.processTitle}}{{' '}}<em>{{content.processItalic}}</em></h2><p>{{content.processText}}</p></div>
  <div class="service-process-drawing"><DisenoLineArt kind="services" /><p class="service-image-note">{{content.illustration}}</p></div>
  <ol class="service-steps"><li v-for="(step,i) in content.steps" :key="i" data-reveal><span class="service-step-number">0{{i+1}}</span><h3>{{step.title}}</h3><p>{{step.text}}</p></li></ol>
 </section>
 <section class="service-archive service-container" aria-labelledby="archive-title">
  <div class="service-archive-intro"><div data-reveal><p class="eyebrow">{{content.archiveEyebrow}}</p><h2 class="service-heading" id="archive-title">{{content.archiveTitle}}{{' '}}<em>{{content.archiveItalic}}</em></h2></div><p data-reveal>{{content.archiveText}}</p></div>
  <div class="service-projects"><figure v-for="(project,i) in content.projects" :key="project.name" :class="{'service-project-offset':i===1}"><div class="service-photo"><img :src="'/photos/'+project.image" :alt="project.alt" loading="lazy" decoding="async"></div><figcaption><div><h3>{{project.name}}</h3><p>{{project.text}}</p></div><span>{{content.reference}}</span></figcaption></figure></div>
  <p class="service-image-note">{{content.archiveNote}}</p>
 </section>
 <section class="service-local" aria-labelledby="local-title"><div class="service-container service-local-grid">
  <div data-reveal><p class="eyebrow">{{content.localEyebrow}}</p><h2 class="service-heading" id="local-title">{{content.localTitle}}{{' '}}<em>{{content.localItalic}}</em></h2></div>
  <div data-reveal><p class="service-lead">{{content.localText}}</p><p>{{content.remoteText}}</p><ul><li v-for="point in content.localPoints" :key="point">{{point}}</li></ul></div>
 </div></section>
 <section class="service-questions service-container" id="questions" aria-labelledby="questions-title"><div data-reveal><p class="eyebrow">{{content.faqEyebrow}}</p><h2 class="service-heading" id="questions-title">{{content.faqTitle}}</h2></div><div class="service-faq" data-reveal><details v-for="([question,answer],i) in content.faqs" :key="i"><summary>{{question}}<span aria-hidden="true">+</span></summary><p>{{answer}}</p></details></div></section>
 <section class="service-enquiry service-container" id="enquiry" aria-labelledby="enquiry-title"><div data-reveal><p class="eyebrow">{{content.contactEyebrow}}</p><h2 class="service-heading" id="enquiry-title">{{content.contactTitle}}{{' '}}<em>{{content.contactItalic}}</em></h2><p>{{content.contactText}}</p><div class="service-direct-contact"><span>{{content.contactAlternative}}</span><a href="mailto:info@galvanarquitectos.com">info@galvanarquitectos.com ↗</a><a href="tel:+34679979487">+34 679 97 94 87</a></div></div>
  <form class="service-form" @submit.prevent="prepareEnquiry" data-reveal><div class="service-form-row"><label for="enquiry-name">{{content.fields.name}}<input v-model="form.name" id="enquiry-name" name="name" autocomplete="name" required maxlength="150"></label><label for="enquiry-email">{{content.fields.email}}<input v-model="form.email" id="enquiry-email" name="email" type="email" autocomplete="email" required maxlength="254"></label></div><div class="service-form-row"><label for="enquiry-phone">{{content.fields.phone}}<input v-model="form.phone" id="enquiry-phone" name="phone" type="tel" autocomplete="tel" maxlength="50"></label><label for="enquiry-location">{{content.fields.location}}<input v-model="form.location" id="enquiry-location" name="location" required maxlength="200"></label></div><label for="enquiry-message">{{content.fields.message}}<textarea v-model="form.message" id="enquiry-message" name="message" rows="4" required maxlength="5000"></textarea></label><button type="submit" class="service-submit">{{content.submit}} <span aria-hidden="true">↗</span></button><p class="service-form-note">{{content.formNote}}</p></form>
 </section>
 <div class="service-end service-container"><span>GALVÁN ARQUITECTOS{{page.locationName?' · '+page.locationName.toUpperCase():''}}</span><a href="#service-top">{{content.footerLink}} ↑</a><NuxtLink :to="page.alternates[otherLocale]" :hreflang="otherLocale">{{content.languageLabel}}</NuxtLink></div>
</main>
</template>

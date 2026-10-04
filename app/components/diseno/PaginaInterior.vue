<script setup>
import {cases,casePaths} from '~/data/demo'
const props=defineProps({pagina:Object,contenido:Object})
const {locale,t,tone,requestScene}=useGalvan()
const {openPreferences}=useCookieConsent()
const caseKey=computed(()=>Object.keys(casePaths).find(key=>casePaths[key]===props.pagina?.path))
const data=computed(()=>caseKey.value?cases[caseKey.value]:null)
const content=computed(()=>data.value?.[locale.value])
useHead({bodyAttrs:{class:'case-page'}})
useSeoMeta({title:()=>content.value?content.value.label+' · Galván Arquitectos':props.contenido.title,description:()=>content.value?.lead??props.contenido.description,ogLocale:()=>locale.value==='en'?'en_GB':'es_ES'})
onMounted(()=>{tone.value='dark'})
</script>
<template>
<main class="service-demo" id="demostracion" tabindex="-1" :aria-label="locale==='en'?'Service page example':'Ejemplo de página interior'">
  <div class="section" v-if="content">
    <a class="case-back text-link" href="/" @click.prevent="requestScene('inicio')">{{t('backHome')}}</a>
    <div class="demo-toolbar"><span class="eyebrow">{{t('interiorPreview')}}</span><nav class="demo-tabs" :aria-label="locale==='en'?'Illustrative case studies':'Casos demostrativos'"><NuxtLink v-for="(path,key) in casePaths" :key="key" :to="path" :aria-current="caseKey===key?'true':undefined">{{t(key==='reforma'?'renovationTab':key==='interiorismo'?'interiorName':'landscapeName')}}</NuxtLink></nav></div>
    <article id="case-content">
      <div class="case-intro"><div><span class="demo-pill" data-borrador>{{t('demoLabel')}}</span><p class="eyebrow">{{content.label}}</p><h1 v-html="content.title"></h1></div><p class="case-lead">{{content.lead}}</p></div>
      <figure class="demo-figure"><img :src="'/photos/'+data.image" :alt="locale==='en'?'Reference image from the studio archive':'Imagen de referencia del archivo del estudio'" decoding="async"><figcaption>{{locale==='en'?'Illustrative case. Reference image from the studio archive; it does not document this commission.':'Caso demostrativo. Imagen de referencia del archivo del estudio; no documenta este encargo.'}}</figcaption></figure>
      <div class="case-story"><aside><p><strong>{{locale==='en'?'SERVICE':'SERVICIO'}}</strong>{{content.scope}}</p><p><strong>{{locale==='en'?'FOCUS':'ENFOQUE'}}</strong>{{content.focus}}</p></aside><div>
        <section class="story-section" v-for="([title,text],index) in content.sections" :key="index"><h2>{{title}}</h2><p>{{text}}</p></section>
        <div class="faq"><h2>{{locale==='en'?'Useful questions':'Preguntas útiles'}}</h2><details v-for="([question,answer],index) in content.faqs" :key="index"><summary>{{question}}</summary><p>{{answer}}</p></details></div>
        <p class="image-note">{{locale==='en'?'The case study describes an imagined scenario. No location, completion status or outcome is attributed to a real project.':'El relato describe un supuesto. No se atribuyen ubicación, estado de ejecución ni resultados a un proyecto real.'}}</p>
        <a class="text-link" href="/#contacto" @click.prevent="requestScene('contacto')"><span>{{t('talkProject')}}</span><span aria-hidden="true">↗</span></a>
      </div></div>
    </article>
  </div>
  <div v-else class="section"><h1>{{contenido.h1}}</h1><p>{{contenido.intro}}</p><section v-for="block in contenido.bloques" :key="block.titulo"><h2>{{block.titulo}}</h2><p>{{block.texto}}</p></section></div>
</main>
</template>

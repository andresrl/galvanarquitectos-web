<script setup>
import {casePaths} from '~/data/demo'
import {pageById} from '~/data/pages'
const renovationPaths=pageById('renovation-marbella').paths
import {createHomeMotion} from './motion/home-motion'
defineProps({pagina:Object,contenido:Object})
const {locale,t,chapter,tone,scenes,requestedScene,requestScene}=useGalvan()
const {openPreferences}=useCookieConsent()
const route=useRoute()
const root=ref(null)
const heroVideo=ref(null)
const videoMotionAllowed=ref(false)
let videoObserver=null,videoMotionQuery=null,heroVisible=true
function syncHeroVideo(){
 const video=heroVideo.value
 if(!video)return
 if(videoMotionAllowed.value&&heroVisible&&!document.hidden){video.muted=true;video.play().catch(()=>{})}
 else video.pause()
}
function updateVideoPreference(){videoMotionAllowed.value=!videoMotionQuery.matches;syncHeroVideo()}
function setupHeroVideo(){
 videoMotionQuery=window.matchMedia('(prefers-reduced-motion: reduce)')
 updateVideoPreference()
 videoMotionQuery.addEventListener('change',updateVideoPreference)
 document.addEventListener('visibilitychange',syncHeroVideo)
 videoObserver=new IntersectionObserver(([entry])=>{heroVisible=entry.isIntersecting;syncHeroVideo()},{threshold:.01})
 videoObserver.observe(root.value.querySelector('#inicio'))
}
function stopHeroVideo(){
 videoObserver?.disconnect();videoObserver=null
 videoMotionQuery?.removeEventListener('change',updateVideoPreference)
 document.removeEventListener('visibilitychange',syncHeroVideo)
 heroVideo.value?.pause()
}
let motion=null,alive=false,mountReady=false,savedScroll=0,motionGeneration=0
const heroHeading=computed(()=>'<span>'+t('heroTitle')+'</span><em>'+t('heroItalic')+'</em>')
function stop(){motionGeneration++;motion?.destroy();motion=null}
async function start(){
 if(!alive||!root.value)return
 const generation=++motionGeneration
 const [{gsap},{ScrollTrigger},{SplitText}]=await Promise.all([import('gsap'),import('gsap/ScrollTrigger'),import('gsap/SplitText')])
 if(!alive||generation!==motionGeneration)return
 motion=createHomeMotion({root:root.value,gsap,ScrollTrigger,SplitText,onChapter:(index,slideTone)=>{chapter.value=index;tone.value=slideTone}})
}
async function go(id){
 if(casePaths[id]){await navigateTo(casePaths[id]);return}
 if(motion)motion.goToScene(id,true)
}
watch(locale,()=>{if(import.meta.client){savedScroll=window.scrollY;stop()}},{flush:'sync'})
watch(locale,async()=>{if(!mountReady)return;await nextTick();await start();if(!alive)return;window.scrollTo({top:savedScroll,behavior:'instant'});motion?.sync()},{flush:'post'})
watch(()=>route.hash,async(hash)=>{if(mountReady){await nextTick();go(hash.slice(1)||'inicio')}})
watch(requestedScene,()=>{if(mountReady)go(requestedScene.value.id)})
onMounted(async()=>{
 alive=true
 setupHeroVideo()
 await document.fonts.ready
 await start()
 if(!alive)return
 mountReady=true
 const id=route.hash.slice(1)||'inicio'
 if(casePaths[id])await navigateTo(casePaths[id]);else motion?.goToScene(id,false)
})
onBeforeRouteLeave(()=>{alive=false;mountReady=false;stopHeroVideo();stop();tone.value='dark'})
onBeforeUnmount(()=>{alive=false;mountReady=false;stopHeroVideo();stop()})
useSeoMeta({title:()=>locale.value==='en'?'Galván Arquitectos · Editorial preview':'Galván Arquitectos · Propuesta editorial',description:()=>locale.value==='en'?'Architecture, interiors and landscape design on the Costa del Sol. Design preview with illustrative case studies.':'Arquitectura, interiorismo y paisajismo en la Costa del Sol. Propuesta con casos demostrativos.',ogLocale:()=>locale.value==='en'?'en_GB':'es_ES'})
</script>
<template><main ref="root"><nav class="chapter-nav" :data-tone="tone" :aria-label="locale==='en'?'Scenes':'Diapositivas'"><span class="chapter-current" aria-hidden="true">{{String(chapter+1).padStart(2,'0')}}</span><div class="chapter-dots"><a v-for="(scene,index) in scenes" :key="scene.id" :href="'/#'+scene.id" :aria-label="String(index+1).padStart(2,'0')+' · '+scene[locale]" :aria-current="chapter===index?'true':undefined" @click.prevent="requestScene(scene.id)"><span class="visually-hidden">{{scene[locale]}}</span></a></div><span class="chapter-total" aria-hidden="true">08</span></nav><div class="scroll-progress" aria-hidden="true"><span></span></div>    <div id="home-slides">
      <section class="slide hero" id="inicio" data-tone="light" data-chapter="Home">
        <div class="visual hero-visual" aria-hidden="true">
          <video ref="heroVideo" class="hero-video" :autoplay="videoMotionAllowed" muted loop playsinline preload="metadata" poster="/photos/web-villa-silver-01.jpg" @loadeddata="syncHeroVideo">
            <source src="/video/viseni.mp4" type="video/mp4">
            <source src="/video/viseni.webm" type="video/webm">
          </video>
        </div>
        <div class="hero-shade"></div>
        <div class="hero-content scene-copy">
          <p class="eyebrow" v-html="t('heroEyebrow')"></p>
          <h1 class="display-title" v-html="heroHeading"></h1>
          <p class="hero-summary" v-html="t('heroSummary')"></p>
          <a class="text-link light" href="/#servicios" @click.prevent="requestScene('servicios')"><span v-html="t('explore')"></span><span aria-hidden="true">↗</span></a>
        </div>
        <span class="hero-caption">Galván Arquitectos · Costa del Sol</span>
        <a class="scroll-hint" href="/#servicios" @click.prevent="requestScene('servicios')" :aria-label="locale==='en'?'View services':'Ver servicios'"><span v-html="t('scroll')"></span><span aria-hidden="true">↓</span></a>
        <div class="hero-frame" aria-hidden="true"></div>
      </section>
      <section class="slide introduction" id="servicios" data-tone="dark" data-chapter="Services">
<DisenoLineArt kind="services" />
        <div class="slide-inner">
          <p class="eyebrow" v-html="t('introEyebrow')"></p>
          <h2 class="display-title" v-html="t('introTitle')"></h2>
          <div class="intro-bottom"><p v-html="t('introText')"></p><p class="muted" v-html="t('introLocation')"></p></div>
        </div>
        <span class="scene-number" aria-hidden="true">02 — 08</span>
        <span class="intro-caption" v-html="t('graphicConcept')"></span>
      </section>
      <section class="slide service-slide renovation" id="villas" data-tone="light" data-chapter="Villa renovation">
        <div class="visual service-visual"><img src="/photos/web-villa-silver-02.jpg" :alt="locale==='en'?'View of a villa from the studio archive':'Vista de una villa del archivo del estudio'" loading="lazy"></div><div class="image-shade"></div>
        <div class="slide-inner scene-copy"><p class="eyebrow" v-html="t('renovationName')"></p><h2 class="display-title" v-html="t('renovationBrief')"></h2><NuxtLink class="text-link case" :to="renovationPaths[locale]"><span>{{locale==='en'?'Explore villa renovation':'Explorar reformas de villas'}}</span><span aria-hidden="true">↗</span></NuxtLink></div>
        <div class="scene-foot"><span v-html="t('demoLabel')"></span><span v-html="t('referenceShort')"></span></div>
      </section>
      <section class="slide service-slide interiors" id="interiores" data-tone="dark" data-chapter="Interior design">
        <div class="slide-inner scene-copy"><p class="eyebrow" v-html="t('interiorName')"></p><h2 class="display-title" v-html="t('interiorBrief')"></h2><NuxtLink class="text-link case" :to="casePaths.interiorismo"><span v-html="t('viewDemo')"></span><span aria-hidden="true">↗</span></NuxtLink><p class="image-note" v-html="t('demoLabel')"></p></div>
        <div class="visual service-visual"><img src="/photos/web-villa-silver-01.jpg" :alt="locale==='en'?'Interiors opening onto a terrace, from the studio archive':'Interiores abiertos a una terraza, archivo del estudio'" loading="lazy" class="interior-crop"></div>
        <span class="vertical-caption" v-html="t('referenceShort')"></span>
      </section>
      <section class="slide service-slide landscape" id="exteriores" data-tone="light" data-chapter="Landscape design">
        <div class="visual service-visual"><img src="/photos/web-cortijo-nagueles-01.jpg" :alt="locale==='en'?'Reference image with planting and outdoor spaces':'Imagen de referencia con vegetación y espacios exteriores'" loading="lazy"></div><div class="image-shade"></div>
        <div class="slide-inner scene-copy"><p class="eyebrow" v-html="t('landscapeName')"></p><h2 class="display-title" v-html="t('landscapeBrief')"></h2><NuxtLink class="text-link case" :to="casePaths.paisajismo"><span v-html="t('viewDemo')"></span><span aria-hidden="true">↗</span></NuxtLink></div>
        <div class="scene-foot"><span v-html="t('demoLabel')"></span><span v-html="t('referenceShort')"></span></div>
      </section>
      <section class="slide studio" id="estudio" data-tone="dark" data-chapter="Studio">
        <DisenoLineArt kind="studio" />
        <div class="slide-inner scene-copy"><p class="eyebrow" v-html="t('studioEyebrow')"></p><h2 class="display-title" v-html="t('studioTitle')"></h2><p class="body-copy" v-html="t('studioText')"></p><p class="muted small" v-html="t('studioSeparate')"></p></div>
      </section>
      <section class="slide international" id="internacional" data-tone="dark" data-chapter="International clients">
        <div class="visual international-visual"><img src="/photos/web-villa-silver-02.jpg" :alt="locale==='en'?'Villa and pool at dusk, from the studio archive':'Villa y piscina al atardecer, archivo del estudio'" loading="lazy"></div>
        <div class="slide-inner scene-copy"><p class="eyebrow" v-html="t('internationalEyebrow')"></p><h2 class="display-title" v-html="t('internationalTitle')"></h2><p class="body-copy" v-html="t('internationalText')"></p><a class="text-link" href="/#contacto" @click.prevent="requestScene('contacto')"><span v-html="t('talkProject')"></span><span aria-hidden="true">↗</span></a></div>
      </section>
      <section class="slide contact" id="contacto" data-tone="light" data-chapter="Contact">
        <div class="contact-ring" aria-hidden="true"></div>
        <div class="slide-inner scene-copy"><p class="eyebrow" v-html="t('contactEyebrow')"></p><h2 class="display-title" v-html="t('contactTitle')"></h2><a class="contact-email" href="mailto:info@galvanarquitectos.com">info@galvanarquitectos.com ↗</a><a class="contact-phone" href="tel:+34679979487">+34 679 97 94 87</a></div>
        <footer><span>GALVÁN ARQUITECTOS</span><span v-html="t('footerLocation')"></span><a href="/#inicio" @click.prevent="requestScene('inicio')" v-html="t('backTop')"></a><button class="cookie-settings" type="button" @click="openPreferences">{{locale==='en'?'Cookie settings':'Configurar cookies'}}</button></footer>
      </section>
    </div>
</main></template>

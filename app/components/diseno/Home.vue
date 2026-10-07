<script setup>
import {casePaths} from '~/data/demo'
import {homeReel} from '~/data/home-reel'
import {pageById} from '~/data/pages'
const hub=id=>pageById(id+'-hub').paths
import {createHomeMotion} from './motion/home-motion'
import {projectById,projectPath,projectsIndexPath} from '~/data/projects/projects'
import {projectUi} from '~/data/projects/ui'
import {studioPaths} from '~/data/studio'
import {services,serviceIds} from '~/data/taxonomy'
// Archive photographs (4K originals, AVIF srcset) and the project each one belongs to.
const pic=(id,file)=>{const m=projectById(id).media;return [m.hero,m.pause,...m.gallery].find(i=>i.file===file)}
const credit=id=>{const p=projectById(id);return {name:p.name[locale.value],path:projectPath(p,locale.value),label:projectUi[locale.value].imagery[p.imagery]}}
const photos={servicios:['the-house','the_house_06.jpg'],villas:['villa-paris','villa_paris_02.jpg'],interiores:['bleu-royal','bleu_royal_01.jpg'],exteriores:['cutar','cutar_05.jpg'],internacional:['la-resina','la_resina_07.jpg']}
const photo=key=>pic(...photos[key])
const serviceLinks=computed(()=>serviceIds.map(id=>({label:services[id].name[locale.value],path:pageById(id+'-hub').paths[locale.value]})))
defineProps({pagina:Object,contenido:Object})
const {locale,t,chapter,tone,scenes,requestedScene,requestScene}=useGalvan()
const route=useRoute()
const contact=useContact()
const home=computed(()=>locale.value==='es'?'/es':'/')
const root=ref(null)
const pageScroll=usePageScroll()
const heroVideo=ref(null)
const videoMotionAllowed=ref(false)
let videoObserver=null,videoMotionQuery=null,heroVisible=true
// Other background videos (studio chapter): same rules as the hero.
let ambientObserver=null
function syncAmbient(video,visible){if(videoMotionAllowed.value&&visible&&!document.hidden){video.muted=true;video.play().catch(()=>{})}else video.pause()}
function syncHeroVideo(){
 const video=heroVideo.value
 if(!video)return
 if(videoMotionAllowed.value&&heroVisible&&!document.hidden){video.muted=true;video.play().catch(()=>{})}
 else video.pause()
}
function updateVideoPreference(){videoMotionAllowed.value=!videoMotionQuery.matches;syncHeroVideo();if(!videoMotionAllowed.value)root.value?.querySelectorAll('video[data-ambient]').forEach(v=>v.pause())}
function setupHeroVideo(){
 videoMotionQuery=window.matchMedia('(prefers-reduced-motion: reduce)')
 updateVideoPreference()
 videoMotionQuery.addEventListener('change',updateVideoPreference)
 document.addEventListener('visibilitychange',syncHeroVideo)
 videoObserver=new IntersectionObserver(([entry])=>{heroVisible=entry.isIntersecting;syncHeroVideo()},{threshold:.01})
 videoObserver.observe(root.value.querySelector('#inicio'))
 ambientObserver=new IntersectionObserver(entries=>entries.forEach(e=>syncAmbient(e.target,e.isIntersecting)),{threshold:.01})
 root.value.querySelectorAll('video[data-ambient]').forEach(v=>ambientObserver.observe(v))
}
function stopHeroVideo(){
 videoObserver?.disconnect();videoObserver=null
 ambientObserver?.disconnect();ambientObserver=null;root.value?.querySelectorAll('video[data-ambient]').forEach(v=>v.pause())
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
 if(!pageScroll.isRestoring()){
  if(casePaths[id])await navigateTo(casePaths[id]);else if(route.hash)motion?.goToScene(id,false)
 }
 pageScroll.ready()
})
onBeforeRouteLeave(()=>{alive=false;mountReady=false;stopHeroVideo();stop();tone.value='dark'})
onBeforeUnmount(()=>{alive=false;mountReady=false;stopHeroVideo();stop()})
useSeoMeta({title:()=>locale.value==='en'?'Martínez Galván · Architect in Marbella, Costa del Sol':'Martínez Galván · Arquitecto en Marbella, Costa del Sol',description:()=>locale.value==='en'?'Architect in Marbella: new-build villas, complete renovations, interior and landscape design on the Costa del Sol, with personal attention from idea to site.':'Arquitectura, interiorismo y paisajismo para villas en Marbella y la Costa del Sol, con trato directo con el arquitecto, de la idea a la obra.',ogLocale:()=>locale.value==='en'?'en_GB':'es_ES'})
</script>
<template><main ref="root"><nav class="chapter-nav" :data-tone="tone" :aria-label="locale==='en'?'Scenes':'Diapositivas'"><span class="chapter-current" aria-hidden="true">{{String(chapter+1).padStart(2,'0')}}</span><div class="chapter-dots"><a v-for="(scene,index) in scenes" :key="scene.id" :href="home+'#'+scene.id" :aria-label="String(index+1).padStart(2,'0')+' · '+scene[locale]" :aria-current="chapter===index?'true':undefined" @click.prevent="requestScene(scene.id)"><span class="visually-hidden">{{scene[locale]}}</span></a></div><span class="chapter-total" aria-hidden="true">08</span></nav><div class="scroll-progress" aria-hidden="true"><span></span></div>    <div id="home-slides">
      <section class="slide hero" id="inicio" data-tone="light" data-chapter="Home">
        <div class="visual hero-visual" :style="{backgroundImage:'url('+homeReel.poster+')'}" aria-hidden="true">
          <video ref="heroVideo" class="hero-video" :autoplay="videoMotionAllowed" muted loop playsinline preload="metadata" :poster="homeReel.poster" @loadeddata="syncHeroVideo">
            <source :src="homeReel.mobile" type="video/mp4" media="(max-width: 700px)">
            <source :src="homeReel.desktop" type="video/mp4">
          </video>
        </div>
        <div class="hero-shade"></div>
        <div class="hero-content scene-copy">
          <p class="eyebrow" v-html="t('heroEyebrow')"></p>
          <h1 class="display-title" v-html="heroHeading"></h1>
          <p class="hero-summary" v-html="t('heroSummary')"></p>
          <a class="text-link light" :href="home+'#servicios'" @click.prevent="requestScene('servicios')"><span v-html="t('explore')"></span><span aria-hidden="true">↗</span></a>
        </div>
        <span class="hero-caption">Martínez Galván · Costa del Sol</span>
        <a class="scroll-hint" :href="home+'#servicios'" @click.prevent="requestScene('servicios')" :aria-label="locale==='en'?'View services':'Ver servicios'"><span v-html="t('scroll')"></span><span aria-hidden="true">↓</span></a>
        <div class="hero-frame" aria-hidden="true"></div>
      </section>
      <section class="slide introduction photo-slide" id="servicios" data-tone="light" data-chapter="Services">
        <div class="visual photo-bg"><img :src="photo('servicios').src" :srcset="photo('servicios').srcset" sizes="100vw" :width="photo('servicios').width" :height="photo('servicios').height" alt="" loading="lazy" decoding="async"></div><div class="photo-shade" aria-hidden="true"></div>
        <div class="slide-inner">
          <p class="eyebrow" v-html="t('introEyebrow')"></p>
          <h2 class="display-title" v-html="t('introTitle')"></h2>
          <div class="intro-bottom"><p v-html="t('introText')"></p><p class="muted" v-html="t('introLocation')"></p></div>
          <ul class="intro-services"><li v-for="link in serviceLinks" :key="link.path"><NuxtLink :to="link.path">{{link.label}}<span aria-hidden="true">↗</span></NuxtLink></li></ul>
        </div>
        <span class="scene-number" aria-hidden="true">02 — 08</span>
        <NuxtLink class="intro-caption photo-credit" :to="credit('the-house').path">{{credit('the-house').name}} · {{credit('the-house').label}} ↗</NuxtLink>
      </section>
      <section class="slide service-slide renovation" id="villas" data-tone="light" data-chapter="Villa renovation">
        <div class="visual service-visual"><img :src="photo('villas').src" :srcset="photo('villas').srcset" sizes="100vw" :width="photo('villas').width" :height="photo('villas').height" :alt="projectById('villa-paris').copy[locale].heroAlt" loading="lazy" decoding="async"></div><div class="image-shade"></div>
        <div class="slide-inner scene-copy"><p class="eyebrow" v-html="t('renovationName')"></p><h2 class="display-title" v-html="t('renovationBrief')"></h2><NuxtLink class="text-link case" :to="hub('renovation')[locale]"><span>{{locale==='en'?'Explore villa renovation':'Explorar reformas de villas'}}</span><span aria-hidden="true">↗</span></NuxtLink></div>
        <div class="scene-foot"><NuxtLink class="photo-credit" :to="credit('villa-paris').path">{{credit('villa-paris').name}} · {{credit('villa-paris').label}} ↗</NuxtLink><NuxtLink class="photo-credit" :to="projectsIndexPath[locale]">{{locale==='en'?'All projects':'Todos los proyectos'}} ↗</NuxtLink></div>
      </section>
      <section class="slide service-slide interiors" id="interiores" data-tone="dark" data-chapter="Interior design">
        <div class="slide-inner scene-copy"><p class="eyebrow" v-html="t('interiorName')"></p><h2 class="display-title" v-html="t('interiorBrief')"></h2><NuxtLink class="text-link case" :to="hub('interiors')[locale]"><span>{{locale==='en'?'Explore interior design':'Explorar interiorismo'}}</span><span aria-hidden="true">↗</span></NuxtLink></div>
        <div class="visual service-visual"><img :src="photo('interiores').src" :srcset="photo('interiores').srcset" sizes="(max-width:700px) 100vw, 50vw" :width="photo('interiores').width" :height="photo('interiores').height" :alt="locale==='en'?'Vaulted living room opening onto the garden, Bleu Royal':'Salón abovedado abierto al jardín, Bleu Royal'" loading="lazy" decoding="async" class="interior-crop"></div>
        <NuxtLink class="vertical-caption photo-credit" :to="credit('bleu-royal').path">{{credit('bleu-royal').name}} · {{credit('bleu-royal').label}} ↗</NuxtLink>
      </section>
      <section class="slide service-slide landscape" id="exteriores" data-tone="light" data-chapter="Landscape design">
        <div class="visual service-visual"><img :src="photo('exteriores').src" :srcset="photo('exteriores').srcset" sizes="100vw" :width="photo('exteriores').width" :height="photo('exteriores').height" :alt="locale==='en'?'Garden with a pond and planting in front of the villa, Cútar':'Jardín con estanque y vegetación frente a la villa, Cútar'" loading="lazy" decoding="async"></div><div class="image-shade"></div>
        <div class="slide-inner scene-copy"><p class="eyebrow" v-html="t('landscapeName')"></p><h2 class="display-title" v-html="t('landscapeBrief')"></h2><NuxtLink class="text-link case" :to="hub('landscape')[locale]"><span>{{locale==='en'?'Explore landscape design':'Explorar paisajismo'}}</span><span aria-hidden="true">↗</span></NuxtLink></div>
        <div class="scene-foot"><NuxtLink class="photo-credit" :to="credit('cutar').path">{{credit('cutar').name}} · {{credit('cutar').label}} ↗</NuxtLink></div>
      </section>
      <section class="slide studio photo-slide" id="estudio" data-tone="light" data-chapter="Studio">
        <div class="visual photo-bg studio-visual"><video class="ambient-video" data-ambient muted loop playsinline preload="none" poster="/media/studio/studio-drawing-2560.avif" aria-hidden="true"><source src="/video/studio-drawing.webm" type="video/webm"><source src="/video/studio-drawing.mp4" type="video/mp4"></video></div><div class="photo-shade" aria-hidden="true"></div>
        <div class="slide-inner scene-copy"><p class="eyebrow" v-html="t('studioEyebrow')"></p><h2 class="display-title" v-html="t('studioTitle')"></h2><p class="body-copy" v-html="t('studioText')"></p><p class="muted small" v-html="t('studioSeparate')"></p><NuxtLink class="text-link" :to="studioPaths[locale]"><span>{{locale==='en'?'Discover the studio':'Conoce el estudio'}}</span><span aria-hidden="true">↗</span></NuxtLink></div>
      </section>
      <section class="slide international" id="internacional" data-tone="dark" data-chapter="International clients">
        <div class="visual international-visual"><img :src="photo('internacional').src" :srcset="photo('internacional').srcset" sizes="(max-width:700px) 90vw, 45vw" :width="photo('internacional').width" :height="photo('internacional').height" :alt="locale==='en'?'Aerial view at dusk of villas on the hillside, La Resina, Estepona':'Vista aérea al anochecer de villas en la ladera, La Resina, Estepona'" loading="lazy" decoding="async"></div>
        <div class="slide-inner scene-copy"><p class="eyebrow" v-html="t('internationalEyebrow')"></p><h2 class="display-title" v-html="t('internationalTitle')"></h2><p class="body-copy" v-html="t('internationalText')"></p><a class="text-link" :href="contact.path.value" @click="contact.show($event)"><span v-html="t('talkProject')"></span><span aria-hidden="true">↗</span></a></div>
      </section>
      <section class="slide contact" id="contacto" data-tone="light" data-chapter="Contact">
        <div class="contact-ring" aria-hidden="true"></div>
        <div class="slide-inner scene-copy"><p class="eyebrow" v-html="t('contactEyebrow')"></p><h2 class="display-title" v-html="t('contactTitle')"></h2><a class="contact-email" href="mailto:info@galvanarquitectos.com">info@galvanarquitectos.com ↗</a><a class="contact-phone" href="tel:+34679979487">+34 679 97 94 87</a></div>
      </section>
    </div>
</main></template>

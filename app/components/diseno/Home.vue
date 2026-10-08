<script setup>
import {casePaths} from '~/data/demo'
import {homeReel} from '~/data/home-reel'
import {homeProjects} from '~/data/home-projects'
import {createHomeMotion} from './motion/home-motion'
import {projectPath,projectsIndexPath} from '~/data/projects/projects'
import {projectUi} from '~/data/projects/ui'
import {studioPaths} from '~/data/studio'
defineProps({pagina:Object,contenido:Object})
const {locale,t,chapter,tone,scenes,requestedScene,requestScene}=useGalvan()
const route=useRoute()
const contact=useContact()
const home=computed(()=>locale.value==='es'?'/es':'/')
const root=ref(null)
const pageScroll=usePageScroll()
const heroVideo=ref(null)
const videoMotionAllowed=ref(false)
let videoMotionQuery=null,videos=null
// Hero and studio-chapter videos: shared rules in utils/ambient-video.ts (view, tab, sleep, reduced motion).
function syncHeroVideo(){videos?.sync()}
function updateVideoPreference(){videoMotionAllowed.value=!videoMotionQuery.matches;syncHeroVideo()}
function setupHeroVideo(){
 videoMotionQuery=window.matchMedia('(prefers-reduced-motion: reduce)')
 videoMotionAllowed.value=!videoMotionQuery.matches
 videoMotionQuery.addEventListener('change',updateVideoPreference)
 videos=createAmbientVideos(()=>videoMotionAllowed.value)
 if(heroVideo.value)videos.observe(heroVideo.value,root.value.querySelector('#inicio'))
 root.value.querySelectorAll('video[data-ambient]').forEach(v=>videos.observe(v))
}
function stopHeroVideo(){
 videos?.destroy();videos=null
 videoMotionQuery?.removeEventListener('change',updateVideoPreference)
 heroVideo.value?.pause()
}
// Project scenes: each cross-fades its four images while it is on screen (never with reduced motion or a hidden tab).
const slideIndex=ref(homeProjects.map(()=>0))
const SLIDE_MS=4800
let slideTimer=null,slideObserver=null
const visibleSlides=new Set()
const imageAlt=(item,i)=>i===0?item.project.copy[locale.value].heroAlt:`${item.project.name[locale.value]} · ${projectUi[locale.value].imagery[item.project.imagery]} ${i+1} ${projectUi[locale.value].of} ${item.images.length}`
function advanceSlides(){
 if(!videoMotionAllowed.value||document.hidden)return
 visibleSlides.forEach(i=>{slideIndex.value[i]=(slideIndex.value[i]+1)%homeProjects[i].images.length})
}
function setupSlideshows(){
 slideObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{const i=Number(entry.target.dataset.slideshow);entry.isIntersecting?visibleSlides.add(i):visibleSlides.delete(i)}),{threshold:.35})
 root.value.querySelectorAll('[data-slideshow]').forEach(el=>slideObserver.observe(el))
 slideTimer=window.setInterval(advanceSlides,SLIDE_MS)
}
function stopSlideshows(){window.clearInterval(slideTimer);slideTimer=null;slideObserver?.disconnect();slideObserver=null;visibleSlides.clear()}
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
 setupSlideshows()
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
onBeforeRouteLeave(()=>{alive=false;mountReady=false;stopHeroVideo();stopSlideshows();stop();tone.value='dark'})
onBeforeUnmount(()=>{alive=false;mountReady=false;stopHeroVideo();stopSlideshows();stop()})
useSeoMeta({title:()=>locale.value==='en'?'Martínez Galván · Architect in Marbella, Costa del Sol':'Martínez Galván · Arquitecto en Marbella, Costa del Sol',description:()=>locale.value==='en'?'Architect in Marbella: new-build villas and complete villa renovations on the Costa del Sol, with personal attention from idea to site.':'Arquitectura y reformas de villas en Marbella y la Costa del Sol, con trato directo con el arquitecto, de la idea a la obra.',ogLocale:()=>locale.value==='en'?'en_GB':'es_ES'})
</script>
<template><main ref="root"><nav class="chapter-nav" :data-tone="tone" :aria-label="locale==='en'?'Scenes':'Diapositivas'"><span class="chapter-current" aria-hidden="true">{{String(chapter+1).padStart(2,'0')}}</span><div class="chapter-dots"><a v-for="(scene,index) in scenes" :key="scene.id" :href="home+'#'+scene.id" :aria-label="String(index+1).padStart(2,'0')+' · '+scene[locale]" :aria-current="chapter===index?'true':undefined" @click.prevent="requestScene(scene.id)"><span class="visually-hidden">{{scene[locale]}}</span></a></div><span class="chapter-total" aria-hidden="true">{{String(scenes.length).padStart(2,'0')}}</span></nav><div class="scroll-progress" aria-hidden="true"><span></span></div>    <div id="home-slides">
      <section class="slide hero" id="inicio" data-tone="light" data-chapter="Home">
        <div class="visual hero-visual" :style="{backgroundImage:'url('+homeReel.poster+')'}" aria-hidden="true">
          <video ref="heroVideo" class="hero-video" :autoplay="videoMotionAllowed" muted loop playsinline preload="metadata" :poster="homeReel.poster" @loadeddata="syncHeroVideo">
            <source :src="homeReel.mobile" type="video/mp4" media="(max-width: 700px)">
            <source :src="homeReel.desktop" type="video/mp4">
          </video>
        </div>
        <div class="hero-shade" aria-hidden="true"></div>
        <div class="hero-content scene-copy">
          <h1 class="display-title" v-html="heroHeading"></h1>
        </div>
        <div class="hero-frame" aria-hidden="true"></div>
      </section>
      <section v-for="(item,p) in homeProjects" :key="item.id" class="slide project-slide" :id="item.id" data-tone="light" :data-chapter="item.project.name.en" :data-slideshow="p">
        <div class="visual project-visual"><div class="project-slides"><img v-for="(image,i) in item.images" :key="image.file" :class="{'is-active':slideIndex[p]===i}" :src="image.src" :srcset="image.srcset" sizes="100vw" :width="image.width" :height="image.height" :alt="imageAlt(item,i)" :aria-hidden="slideIndex[p]===i?undefined:'true'" loading="lazy" decoding="async"></div></div><div class="image-shade"></div>
        <div class="slide-inner scene-copy"><h2 class="display-title">{{item.project.name[locale]}}</h2><NuxtLink class="text-link case" :to="projectPath(item.project,locale)"><span>{{projectUi[locale].list.view}}</span><span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></NuxtLink></div>
        <div class="scene-foot project-progress" aria-hidden="true"><span v-for="(image,i) in item.images" :key="image.file" :class="{'is-active':slideIndex[p]===i}"></span></div>
      </section>
      <div class="home-more"><NuxtLink :to="projectsIndexPath[locale]"><span>{{locale==='en'?'See more projects':'Ver más proyectos'}}</span><i aria-hidden="true"></i><DisenoIcon name="arrow-up-right" /></NuxtLink></div>
      <section class="slide studio photo-slide" id="estudio" data-tone="light" data-chapter="Studio">
        <div class="visual photo-bg studio-visual"><!-- The encoded file names are swapped: studio-conversation.* shows Francisco drawing on a plan. --><video class="ambient-video" data-ambient muted loop playsinline preload="none" poster="/media/studio/studio-drawing-2560.avif" aria-hidden="true"><source src="/video/studio-conversation.webm" type="video/webm"><source src="/video/studio-conversation.mp4" type="video/mp4"></video></div><div class="photo-shade" aria-hidden="true"></div>
        <div class="slide-inner scene-copy"><p class="eyebrow" v-html="t('studioEyebrow')"></p><h2 class="display-title" v-html="t('studioTitle')"></h2><p class="body-copy" v-html="t('studioText')"></p><NuxtLink class="text-link" :to="studioPaths[locale]"><span>{{locale==='en'?'Discover the studio':'Conoce el estudio'}}</span><span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></NuxtLink></div>
      </section>
      <section class="slide contact" id="contacto" data-tone="light" data-chapter="Contact">
        <div class="contact-ring" aria-hidden="true"></div>
        <div class="slide-inner scene-copy"><p class="eyebrow" v-html="t('contactEyebrow')"></p><h2 class="display-title" v-html="t('contactTitle')"></h2><a class="contact-email" href="mailto:info@galvanarquitectos.com">info@galvanarquitectos.com <DisenoIcon name="arrow-up-right" /></a><a class="contact-phone" href="tel:+34679979487">+34 679 97 94 87</a></div>
      </section>
    </div>
</main></template>

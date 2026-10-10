<script setup>
import {casePaths} from '~/data/demo'
import {homeReel} from '~/data/home-reel'
import {homeProjects} from '~/data/home-projects'
import {createHomeMotion} from './motion/home-motion'
import {projects,projectPath,projectsIndexPath} from '~/data/projects/projects'
import {projectUi} from '~/data/projects/ui'
import {studioPaths} from '~/data/studio'
import {negocio,telefonos} from '~/data/negocio'
import {homeProcess} from '~/data/home-process'
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
// The process block sits on paper between two photo scenes: while it is under the header, the header turns dark.
let processObserver=null,processUnderHeader=false,sceneTone='light'
function applyTone(){tone.value=processUnderHeader?'dark':sceneTone}
function setupProcessTone(){
 const section=root.value.querySelector('.home-process')
 if(!section)return
 processObserver=new IntersectionObserver(([entry])=>{processUnderHeader=entry.isIntersecting;applyTone()},{rootMargin:'0px 0px -90% 0px'})
 processObserver.observe(section)
}
function stopProcessTone(){processObserver?.disconnect();processObserver=null;processUnderHeader=false}
// Mobile scenes (home-photo.css): --stage-h is the screen with Safari's toolbars retracted, so no strip shows under a
// pinned scene; --stage-cut is the part the toolbars hide while they are out, and lifts the copy above the contact bar.
// The probe measures the area fixed elements get (iOS Safari 26 sizes 100svh like 100lvh). The height changes only on
// mount and rotation, before the debounced ScrollTrigger refresh, so the pins keep their length; the cut follows resizes.
let stageProbe=null,stageWidth=0,stageHeight=0
function measureStage(){
 const style=document.documentElement.style
 if(innerWidth!==stageWidth){
  stageWidth=innerWidth
  stageProbe.style.height='100lvh'
  const large=stageProbe.offsetHeight
  stageProbe.style.height=''
  stageHeight=Math.max(large,stageProbe.offsetHeight)
  style.setProperty('--stage-h',stageHeight+'px')
 }
 style.setProperty('--stage-cut',Math.max(0,stageHeight-stageProbe.offsetHeight)+'px')
}
function setupStage(){
 stageProbe=document.createElement('div')
 stageProbe.style.cssText='position:fixed;top:0;bottom:0;width:0;visibility:hidden;pointer-events:none'
 document.body.append(stageProbe)
 stageWidth=0
 measureStage()
 window.addEventListener('resize',measureStage)
}
function stopStage(){window.removeEventListener('resize',measureStage);stageProbe?.remove();stageProbe=null}
let motion=null,alive=false,mountReady=false,savedScroll=0,motionGeneration=0
// Brand and what it is, both in the H1 (two lines); the space keeps the words apart in the extracted text.
const heroHeading=computed(()=>'<span class="hero-name">'+t('heroTitle')+'</span> <em class="hero-kind">'+t('heroItalic')+'</em>')
function stop(){motionGeneration++;motion?.destroy();motion=null}
async function start(){
 if(!alive||!root.value)return
 const generation=++motionGeneration
 const [{gsap},{ScrollTrigger},{SplitText}]=await Promise.all([import('gsap'),import('gsap/ScrollTrigger'),import('gsap/SplitText')])
 if(!alive||generation!==motionGeneration)return
 motion=createHomeMotion({root:root.value,gsap,ScrollTrigger,SplitText,after:pageTransitionReady(),onChapter:(index,slideTone)=>{chapter.value=index;sceneTone=slideTone;applyTone()}})
}
async function go(id){
 if(casePaths[id]){await navigateTo(casePaths[id]);return}
 if(motion)motion.goToScene(id,true)
}
watch(locale,()=>{if(import.meta.client){savedScroll=window.scrollY;stop()}},{flush:'sync'})
watch(locale,async()=>{if(!mountReady)return;await nextTick();await start();if(!alive)return;scrollPage(savedScroll);motion?.sync()},{flush:'post'})
watch(()=>route.hash,async(hash)=>{if(mountReady){await nextTick();go(hash.slice(1)||'inicio')}})
watch(requestedScene,()=>{if(mountReady)go(requestedScene.value.id)})
onMounted(async()=>{
 alive=true
 setupStage()
 setupHeroVideo()
 setupSlideshows()
 setupProcessTone()
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
// A page transition captures the scene as it is on screen before the pins come down.
onBeforeRouteLeave(async(to,from)=>{await awaitPageCapture(to,from);alive=false;mountReady=false;stopStage();stopHeroVideo();stopSlideshows();stopProcessTone();stop();tone.value='dark'})
onBeforeUnmount(()=>{alive=false;mountReady=false;stopStage();stopHeroVideo();stopSlideshows();stopProcessTone();stop()})
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
      <section v-for="(item,p) in homeProjects" :key="item.id" class="slide project-slide" :id="item.id" data-tone="light" :data-chapter="item.project.name.en" :data-slideshow="p" :data-vt-frame="item.project.id">
        <div class="visual project-visual"><div class="project-slides" data-vt="media"><img v-for="(image,i) in item.images" :key="image.file" :class="{'is-active':slideIndex[p]===i}" :src="image.src" :srcset="image.srcset" sizes="100vw" :width="image.width" :height="image.height" :alt="imageAlt(item,i)" :aria-hidden="slideIndex[p]===i?undefined:'true'" loading="lazy" decoding="async"></div></div><div class="image-shade" data-vt="shade"></div>
        <div class="slide-inner scene-copy" data-vt="copy"><h2 class="display-title" translate="no"><NuxtLink class="display-link" :to="projectPath(item.project,locale)" tabindex="-1">{{item.project.name[locale]}}</NuxtLink></h2><NuxtLink class="text-link case" :to="projectPath(item.project,locale)"><span>{{projectUi[locale].list.view}}</span><span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></NuxtLink></div>
        <div class="scene-foot project-progress" data-vt="copy" aria-hidden="true"><span v-for="(image,i) in item.images" :key="image.file" :class="{'is-active':slideIndex[p]===i}"></span></div>
      </section>
      <div class="home-more"><p class="home-more-note"><span class="home-more-count" aria-hidden="true">{{String(homeProjects.length).padStart(2,'0')}} / {{projects.length}}</span><span class="home-more-text"><em>{{locale==='en'?'This is only a brief selection.':'Esto es solo una breve selección.'}}</em> {{locale==='en'?`The full archive brings together ${projects.length} projects.`:`El archivo completo reúne ${projects.length} proyectos.`}}</span></p><NuxtLink :to="projectsIndexPath[locale]"><span>{{locale==='en'?'See more projects':'Ver más proyectos'}}</span><i aria-hidden="true"></i><DisenoIcon name="arrow-up-right" /></NuxtLink></div>
      <section class="slide studio photo-slide" id="estudio" data-tone="light" data-chapter="Studio">
        <div class="visual photo-bg studio-visual"><!-- The encoded file names are swapped: studio-conversation_white.* shows Francisco drawing on a plan. --><video class="ambient-video" data-ambient muted loop playsinline preload="none" data-rate=".75" poster="/video/studio-conversation_white-poster.avif" aria-hidden="true"><source src="/video/studio-conversation_white-pingpong.webm" type="video/webm"><source src="/video/studio-conversation_white-pingpong.mp4" type="video/mp4"></video></div><div class="photo-shade" aria-hidden="true"></div>
        <div class="slide-inner scene-copy"><p class="eyebrow" v-html="t('studioEyebrow')"></p><h2 class="display-title" v-html="t('studioTitle')"></h2><p class="body-copy" v-html="t('studioText')"></p><NuxtLink class="text-link" :to="studioPaths[locale]"><span>{{locale==='en'?'Discover the studio':'Conoce el estudio'}}</span><span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></NuxtLink></div>
      </section>
      <section class="home-process" aria-labelledby="home-process-title"><div class="service-process service-container">
        <div class="service-process-copy" data-reveal><p class="eyebrow">{{homeProcess[locale].eyebrow}}</p><h2 class="service-heading" id="home-process-title">{{homeProcess[locale].title}}{{' '}}<em>{{homeProcess[locale].italic}}</em></h2><p>{{homeProcess[locale].text}}</p></div>
        <div class="service-process-drawing"><DisenoLineArt kind="services" /><p class="service-image-note">{{homeProcess[locale].illustration}}</p></div>
        <ol class="service-steps"><li v-for="(step,i) in homeProcess[locale].steps" :key="i" data-reveal><span class="service-step-number">0{{i+1}}</span><h3>{{step.title}}</h3><p>{{step.text}}</p></li></ol>
      </div></section>
      <section class="slide contact" id="contacto" data-tone="light" data-chapter="Contact">
        <div class="contact-ring" aria-hidden="true"></div>
        <div class="slide-inner scene-copy"><p class="eyebrow" v-html="t('contactEyebrow')"></p><h2 class="display-title" v-html="t('contactTitle')"></h2><a class="contact-email" href="mailto:info@galvanarquitectos.com">info@galvanarquitectos.com <DisenoIcon name="arrow-up-right" /></a><a v-for="p in telefonos" :key="p.href" class="contact-phone" :href="p.href">{{p.label[locale]}} {{p.numero}}</a><a class="contact-address" :href="negocio.mapa" target="_blank" rel="noopener">{{negocio.contacto.direccionTexto}}</a></div>
      </section>
    </div>
</main></template>

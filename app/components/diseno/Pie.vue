<script setup>
// Site footer on every page, with the same design as the full-screen menu (services with their areas, explore).
// Links come from app/data/navigation.ts.
import { siteNavigation } from '~/data/navigation'
const route=useRoute()
const {locale,requestScene,toggleLanguage}=useGalvan()
const {openPreferences}=useCookieConsent()
const groups=computed(()=>siteNavigation(locale.value,{withAreas:true}))
const isCurrent=link=>!link.scene&&route.path.replace(/\/$/,'')===link.path.replace(/\/$/,'')
function go(link,event){if(!link.scene)return;event.preventDefault();requestScene(link.scene)}
// Marks <html> while the footer is on screen: the Home hides its chapter dots and the transparent header gets a background.
const footer=ref(null)
let observer=null
onMounted(()=>{observer=new IntersectionObserver(([entry])=>document.documentElement.classList.toggle('footer-in-view',entry.isIntersecting));observer.observe(footer.value)})
onBeforeUnmount(()=>{observer?.disconnect();document.documentElement.classList.remove('footer-in-view')})
function top(){if(route.path==='/')requestScene('inicio');else window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
</script>
<template><footer ref="footer" :class="['site-footer',{'site-footer--home':route.path==='/'}]">
 <div class="site-menu-top">
  <NuxtLink class="brand" to="/" :aria-label="locale==='en'?'Martínez Galván Arquitecto, home':'Martínez Galván Arquitecto, inicio'"><DisenoMarca /></NuxtLink>
  <button type="button" class="site-menu-close" @click="top">{{locale==='en'?'Back to the top':'Volver arriba'}} <span aria-hidden="true">↑</span></button>
 </div>
 <div class="site-menu-body">
  <nav v-for="(group,g) in groups" :key="group.title" :class="['site-menu-group',{'site-menu-primary':g===0}]" :aria-label="group.title">
   <p class="eyebrow">{{group.title}}</p>
   <ul><li v-for="link in group.links" :key="link.path+link.label">
    <NuxtLink :to="link.path" :aria-current="isCurrent(link)?'page':undefined" @click="go(link,$event)"><span>{{link.label}}</span><small v-if="link.detail">{{link.detail}}</small></NuxtLink>
    <ul v-if="link.children?.length" class="site-menu-areas"><li v-for="area in link.children" :key="area.path"><NuxtLink :to="area.path" :aria-current="isCurrent(area)?'page':undefined">{{area.label}}</NuxtLink></li></ul>
   </li></ul>
  </nav>
 </div>
 <div class="site-menu-foot">
  <a href="mailto:info@galvanarquitectos.com">info@galvanarquitectos.com</a>
  <a href="tel:+34679979487">+34 679 97 94 87</a>
  <span>Marbella · Costa del Sol</span>
  <button type="button" class="site-menu-language" @click="toggleLanguage">{{locale==='en'?'Español':'English'}}</button>
  <button type="button" class="site-footer-cookies" @click="openPreferences">{{locale==='en'?'Cookie settings':'Configurar cookies'}}</button>
 </div>
</footer></template>

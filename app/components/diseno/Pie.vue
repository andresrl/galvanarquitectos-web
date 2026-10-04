<script setup>
// Site footer on every page, Home included. Links come from app/data/navigation.ts.
import { siteNavigation } from '~/data/navigation'
const route=useRoute()
const {locale,requestScene,toggleLanguage}=useGalvan()
const {openPreferences}=useCookieConsent()
const groups=computed(()=>siteNavigation(locale.value))
function go(link,event){if(!link.scene)return;event.preventDefault();requestScene(link.scene)}
// Marks <html> while the footer is on screen: the Home hides its chapter dots and the transparent header gets a background.
const footer=ref(null)
let observer=null
onMounted(()=>{observer=new IntersectionObserver(([entry])=>document.documentElement.classList.toggle('footer-in-view',entry.isIntersecting));observer.observe(footer.value)})
onBeforeUnmount(()=>{observer?.disconnect();document.documentElement.classList.remove('footer-in-view')})
function top(){if(route.path==='/')requestScene('inicio');else window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
</script>
<template><footer ref="footer" :class="['site-footer',{'site-footer--home':route.path==='/'}]">
 <div class="site-footer-grid">
  <div class="site-footer-brand">
   <NuxtLink class="brand" to="/">GALVÁN<span>ARQUITECTOS</span></NuxtLink>
   <p>{{locale==='en'?'Architecture, interiors and landscape on the Costa del Sol.':'Arquitectura, interiorismo y paisajismo en la Costa del Sol.'}}</p>
   <address><a href="mailto:info@galvanarquitectos.com">info@galvanarquitectos.com</a><a href="tel:+34679979487">+34 679 97 94 87</a><span>Marbella · Costa del Sol</span></address>
  </div>
  <nav v-for="group in groups" :key="group.title" class="site-footer-group" :aria-label="group.title">
   <p class="eyebrow">{{group.title}}</p>
   <ul><li v-for="link in group.links" :key="link.path+link.label"><NuxtLink :to="link.path" @click="go(link,$event)">{{link.label}}</NuxtLink></li></ul>
  </nav>
 </div>
 <div class="site-footer-base">
  <span>Galván Arquitectos · Marbella</span>
  <button type="button" @click="toggleLanguage">{{locale==='en'?'Español':'English'}}</button>
  <button type="button" class="cookie-settings" @click="openPreferences">{{locale==='en'?'Cookie settings':'Configurar cookies'}}</button>
  <button type="button" @click="top">{{locale==='en'?'Back to the top':'Volver arriba'}} ↑</button>
 </div>
</footer></template>

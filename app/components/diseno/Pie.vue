<script setup>
// Minimal site footer (8 Oct 2026, Andrés: «reduce, simplifica»): three short text columns and one quiet line
// with areas, legal pages, cookies and language. Links come from app/data/navigation.ts.
import { siteNavigation } from '~/data/navigation'
import { isHome, homePath } from '~/data/pages'
import { areaIds, areaPath } from '~/data/areas'
import { legalCopy, legalPaths } from '~/data/legal'
import { locations } from '~/data/taxonomy'
import { negocio } from '~/data/negocio'
const route=useRoute()
const {locale,requestScene,toggleLanguage}=useGalvan()
const {openPreferences}=useCookieConsent()
const areas=computed(()=>areaIds.map(id=>({label:locations[id].name[locale.value],path:areaPath(id,locale.value)})))
const legal=computed(()=>Object.keys(legalPaths).map(id=>({label:legalCopy[id][locale.value].label,path:legalPaths[id][locale.value]})))
const groups=computed(()=>{const [services,explore]=siteNavigation(locale.value);return [{...explore,links:explore.links.filter(l=>l.path!==homePath(locale.value))},services]})
const isCurrent=link=>!link.scene&&route.path.replace(/\/$/,'')===link.path.replace(/\/$/,'')
const contact=useContact()
function go(link,event){if(link.contact)return contact.show(event);if(!link.scene)return;event.preventDefault();requestScene(link.scene)}
// Marks <html> while the footer is on screen: the Home hides its chapter dots and the transparent header gets a background.
const footer=ref(null)
let observer=null
onMounted(()=>{observer=new IntersectionObserver(([entry])=>document.documentElement.classList.toggle('footer-in-view',entry.isIntersecting));observer.observe(footer.value)})
onBeforeUnmount(()=>{observer?.disconnect();document.documentElement.classList.remove('footer-in-view')})
function top(){if(isHome(route.path))requestScene('inicio');else scrollPage(0,!matchMedia('(prefers-reduced-motion: reduce)').matches)}
</script>
<template><footer ref="footer" :class="['site-footer',{'site-footer--home':isHome(route.path)}]">
 <div class="footer-top">
  <NuxtLink class="brand" :to="homePath(locale)" :aria-label="locale==='en'?'Martínez Galván Arquitecto, home':'Martínez Galván Arquitecto, inicio'"><DisenoMarca /></NuxtLink>
  <button type="button" class="footer-top-link" @click="top">{{locale==='en'?'Back to the top':'Volver arriba'}} <DisenoIcon name="arrow-up" /></button>
 </div>
 <div class="footer-cols">
  <nav v-for="group in groups" :key="group.title" class="footer-col" :aria-label="group.title">
   <p class="footer-label">{{group.title}}</p>
   <ul><li v-for="link in group.links" :key="link.path+link.label">
    <a v-if="link.contact" :href="link.path" @click="go(link,$event)">{{link.label}}</a><NuxtLink v-else :to="link.path" :aria-current="isCurrent(link)?'page':undefined">{{link.label}}</NuxtLink>
   </li></ul>
  </nav>
  <div class="footer-col">
   <p class="footer-label">{{locale==='en'?'Contact':'Contacto'}}</p>
   <ul><li><a href="mailto:info@galvanarquitectos.com">info@galvanarquitectos.com</a></li><li><a href="tel:+34679979487">+34 679 97 94 87</a></li><li><a :href="negocio.mapa" target="_blank" rel="noopener">{{ negocio.contacto.direccionTexto }}</a></li></ul>
  </div>
 </div>
 <div class="footer-base">
  <nav :aria-label="locale==='en'?'Areas':'Zonas'"><span>{{locale==='en'?'Architect in':'Arquitecto en'}}</span><NuxtLink :to="homePath(locale)">Marbella</NuxtLink><NuxtLink v-for="a in areas" :key="a.path" :to="a.path">{{a.label}}</NuxtLink></nav>
  <nav :aria-label="locale==='en'?'Legal':'Legal'"><NuxtLink v-for="l in legal" :key="l.path" :to="l.path">{{l.label}}</NuxtLink><button type="button" @click="openPreferences">{{locale==='en'?'Cookies':'Cookies'}}</button><button type="button" @click="toggleLanguage">{{locale==='en'?'Español':'English'}}</button></nav>
 </div>
</footer></template>

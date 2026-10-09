<script setup>
// Full-screen site menu. Links come from app/data/navigation.ts (page registry + Home chapters).
import { siteNavigation } from '~/data/navigation'
import { homePath } from '~/data/pages'
import { negocio, telefonos } from '~/data/negocio'
const { locale, requestScene, toggleLanguage } = useGalvan()
const open = useState('galvan:menu', () => false)
const route = useRoute()
const groups = computed(() => siteNavigation(locale.value).filter(group => group.links.some(link => link.path === homePath(locale.value))))
const panel = ref(null)
let returnFocus = null
const isCurrent = link => !link.scene && route.path.replace(/\/$/, '') === link.path.replace(/\/$/, '')
function close() { open.value = false }
const contact = useContact()
function go(link, event) {
  if (link.contact) { close(); return contact.show(event) }
  if (!link.scene) return close()
  event.preventDefault(); close(); requestScene(link.scene)
}
function onKey(event) { if (event.key === 'Escape') close() }
watch(open, async value => {
  if (!import.meta.client) return
  document.documentElement.classList.toggle('menu-open', value)
  if (value) {
    returnFocus = document.activeElement
    window.addEventListener('keydown', onKey)
    await nextTick(); panel.value?.querySelector('.site-menu-body a')?.focus()
  } else {
    window.removeEventListener('keydown', onKey)
    returnFocus?.focus?.(); returnFocus = null
  }
})
watch(() => route.fullPath, close)
onBeforeUnmount(() => { if (import.meta.client) { window.removeEventListener('keydown', onKey); document.documentElement.classList.remove('menu-open') } })
</script>
<template>
<Transition name="site-menu">
 <div v-if="open" id="site-menu" ref="panel" class="site-menu" role="dialog" aria-modal="true" :aria-label="locale==='en'?'Site menu':'Menú del sitio'">
  <div class="site-menu-top">
   <NuxtLink class="brand" :to="homePath(locale)" :aria-label="locale==='en'?'Martínez Galván Arquitecto, home':'Martínez Galván Arquitecto, inicio'" @click="close"><DisenoMarca /></NuxtLink>
   <button type="button" class="site-menu-close" @click="close">{{locale==='en'?'Close':'Cerrar'}} <span aria-hidden="true"><DisenoIcon name="close" /></span></button>
  </div>
  <div class="site-menu-body">
   <nav v-for="group in groups" :key="group.title" class="site-menu-group site-menu-explore" :aria-label="group.title">
    <p class="eyebrow">{{group.title}}</p>
    <ul><li v-for="link in group.links" :key="link.path+link.label">
     <a v-if="link.contact" :href="link.path" @click="go(link,$event)"><span>{{link.label}}</span></a><NuxtLink v-else :to="link.path" :aria-current="isCurrent(link)?'page':undefined" @click="go(link,$event)"><span>{{link.label}}</span><small v-if="link.detail">{{link.detail}}</small></NuxtLink>
     <ul v-if="link.children?.length" class="site-menu-areas"><li v-for="area in link.children" :key="area.path"><NuxtLink :to="area.path" :aria-current="isCurrent(area)?'page':undefined" @click="close">{{area.label}}</NuxtLink></li></ul>
    </li></ul>
   </nav>
  </div>
  <div class="site-menu-foot">
   <a href="mailto:info@galvanarquitectos.com">info@galvanarquitectos.com</a>
   <a v-for="p in telefonos" :key="p.href" :href="p.href">{{ p.label[locale] }} {{ p.numero }}</a>
   <a :href="negocio.mapa" target="_blank" rel="noopener">{{ negocio.contacto.direccionTexto }}</a>
   <button type="button" class="site-menu-language" @click="toggleLanguage">{{locale==='en'?'Español':'English'}}</button>
  </div>
 </div>
</Transition>
</template>

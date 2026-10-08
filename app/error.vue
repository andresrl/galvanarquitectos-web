<script setup lang="ts">
// Error page (404 and others). Replaces the whole app shell, so it mounts the same header, menu, footer and contact drawer.
// Language comes from the requested path: anything under /es is Spanish. Styles in app/assets/css/error.css.
import type { NuxtError } from '#app'
import ContactDrawer from '~/components/diseno/ContactDrawer.vue'
import MobileContactBar from '~/components/diseno/MobileContactBar.vue'
import { siteNavigation } from '~/data/navigation'
import { homePath } from '~/data/pages'
import { projectsIndexPath } from '~/data/projects/projects'

const props = defineProps<{ error: NuxtError }>()
const route = useRoute()
const { locale, tone } = useGalvan()
locale.value = /^\/es(\/|$)/.test(route.path) ? 'es' : 'en'
tone.value = 'light'
const contact = useContact()
const missing = computed(() => props.error?.statusCode === 404)

const copy = {
 en: {
  eyebrow: 'Error', heading: 'No way through.', italic: 'But what a view.',
  lead: 'The page you were looking for has moved or no longer exists. From here, these are the ways back in.',
  failHeading: 'Something', failItalic: 'went wrong.', failLead: 'The page could not be displayed. Please try again in a moment.',
  home: 'Back to home', projects: 'See the projects', retry: 'Try again', asked: 'Requested address',
  more: 'Other ways in', caption: 'Villa Silver · Terrace at sunset', title: 'Page not found', failTitle: 'Error'
 },
 es: {
  eyebrow: 'Error', heading: 'Sin salida.', italic: 'Pero con vistas.',
  lead: 'La página que buscabas ha cambiado de dirección o ya no existe. Desde aquí, estos son los caminos de vuelta.',
  failHeading: 'Algo', failItalic: 'no ha ido bien.', failLead: 'No hemos podido mostrar la página. Vuelve a intentarlo en unos momentos.',
  home: 'Volver al inicio', projects: 'Ver los proyectos', retry: 'Reintentar', asked: 'Dirección solicitada',
  more: 'Otros caminos', caption: 'Villa Silver · Terraza al atardecer', title: 'Página no encontrada', failTitle: 'Error'
 }
}
const t = computed(() => copy[locale.value])
const ways = computed(() => {
 const [services, explore] = siteNavigation(locale.value)
 const pick = (path: string) => explore.links.find(l => l.path === path)
 return [pick(projectsIndexPath[locale.value]), ...services.links, ...explore.links.filter(l => !['/', '/es'].includes(l.path) && l.path !== projectsIndexPath[locale.value])].filter(Boolean)
})

useHead(() => ({
 htmlAttrs: { lang: locale.value },
 bodyAttrs: { class: 'error-shell' },
 title: `${missing.value ? t.value.title : t.value.failTitle} · Martínez Galván`,
 meta: [{ name: 'robots', content: 'noindex' }]
}))

function goHome() { clearError({ redirect: homePath(locale.value) }) }
function retry() { clearError({ redirect: route.fullPath }) }
function follow(link: any, event: Event) {
 if (link.contact) return contact.show(event)
 event.preventDefault(); clearError({ redirect: link.path })
}

// The header stays light over the photograph and turns dark once the list on paper reaches it.
const hero = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null
onMounted(() => {
 if (!hero.value) return
 observer = new IntersectionObserver(([entry]) => { tone.value = entry.isIntersecting ? 'light' : 'dark' }, { rootMargin: '-100px 0px 0px 0px', threshold: 0 })
 observer.observe(hero.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
 <div>
  <DisenoCabecera /><DisenoMenu />
  <main class="error-page">
   <section ref="hero" class="error-hero">
    <figure class="error-hero-image">
     <img src="/media/projects/villa-silver/terraza-atardecer-1600.avif" srcset="/media/projects/villa-silver/terraza-atardecer-800.avif 800w, /media/projects/villa-silver/terraza-atardecer-1600.avif 1600w, /media/projects/villa-silver/terraza-atardecer-2000.avif 2000w" sizes="100vw" width="2000" height="1335" alt="" fetchpriority="high">
    </figure>
    <div class="error-hero-shade" aria-hidden="true"></div>
    <div class="error-code" aria-hidden="true">{{ error?.statusCode || 500 }}</div>
    <div class="error-hero-copy">
     <p class="error-eyebrow"><span>{{ t.eyebrow }} {{ error?.statusCode || 500 }}</span></p>
     <h1 v-if="missing">{{ t.heading }} <em>{{ t.italic }}</em></h1>
     <h1 v-else>{{ t.failHeading }} <em>{{ t.failItalic }}</em></h1>
     <p class="error-lead">{{ missing ? t.lead : t.failLead }}</p>
     <div class="error-actions">
      <a v-if="missing" :href="homePath(locale)" class="error-button" @click.prevent="goHome">{{ t.home }}</a>
      <button v-else type="button" class="error-button" @click="retry">{{ t.retry }}</button>
      <a :href="projectsIndexPath[locale]" class="error-link" @click.prevent="follow({ path: projectsIndexPath[locale] }, $event)">{{ t.projects }}</a>
     </div>
    </div>
    <p class="error-path" v-if="missing"><span>{{ t.asked }}</span> <code>{{ route.path }}</code></p>
    <p class="error-caption">{{ t.caption }}</p>
   </section>
   <nav class="error-ways" :aria-label="t.more">
    <h2>{{ t.more }}</h2>
    <ol>
     <li v-for="(link, i) in ways" :key="link.path">
      <a :href="link.path" @click="follow(link, $event)">
       <span class="error-way-number">{{ String(i + 1).padStart(2, '0') }}</span>
       <span class="error-way-label">{{ link.label }}</span>
       <DisenoIcon name="arrow-right" class="error-way-arrow" />
      </a>
     </li>
    </ol>
   </nav>
  </main>
  <DisenoPie /><ContactDrawer /><MobileContactBar /><CookieBanner />
 </div>
</template>

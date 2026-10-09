<script setup lang="ts">
// Infraestructura: datos, 404 y SEO. Las páginas del registro (app/data/pages) usan su plantilla; el resto, PaginaInterior.vue.
import { routes } from '~/data/routes'
import { contenidos } from '~/data/contenidos'
import { resolvePage } from '~/data/pages'
import { projectById, projects, projectPath, projectsIndexPath } from '~/data/projects/projects'
import { place } from '~/data/schema'
import StudioPage from '~/components/diseno/StudioPage.vue'
import ContactPage from '~/components/diseno/ContactPage.vue'
import LegalPage from '~/components/diseno/LegalPage.vue'
import InternationalPage from '~/components/diseno/InternationalPage.vue'
import AreaPage from '~/components/diseno/AreaPage.vue'
import FilmsPage from '~/components/diseno/films/FilmsPage.vue'
import { films, filmsPublished, filmProjectPath, isoDuration } from '~/data/films'
definePageMeta({ key: (route) => route.path })
const route = useRoute(), cfg = useRuntimeConfig().public, path = route.path.replace(/\/$/, '') || '/'
const page = resolvePage(path)
const project = page?.definition.template === 'project' ? projectById(page.definition.projectIds![0]) : undefined
const hidden = (draft: boolean) => draft && cfg.indexable && !cfg.showDrafts
// Project archive: the work itself (CreativeWork by Paco and the studio) or the list of works (CollectionPage + ItemList).
function archiveSchema(site: string, url: string, businessId: string) {
 if (!page) return []
 const locale = page.locale as 'en' | 'es', abs = (p: string) => new URL(p, site).href, paco = site + '/#paco'
 if (project) {
  const m = project.media, images = [m.hero, ...m.gallery, m.pause]
  return [{ '@type': 'CreativeWork', '@id': url + '#project', name: project.name[locale], description: project.copy[locale].lead,
   genre: locale === 'en' ? 'Residential architecture' : 'Arquitectura residencial',
   image: images.map(i => ({ '@type': 'ImageObject', url: abs(i.src.replace(/-1600\.avif$/, '-1600.avif')), width: i.width, height: i.height })),
   thumbnailUrl: abs(m.hero.jpg!), creator: [{ '@id': paco }, { '@id': businessId }], copyrightHolder: { '@id': businessId },
   inLanguage: locale, isPartOf: { '@id': abs(projectsIndexPath[locale]) + '#webpage' }, mainEntityOfPage: { '@id': url + '#webpage' },
   ...(project.status ? { creativeWorkStatus: project.status === 'completed' ? 'Completed' : 'In progress' } : {}),
   ...(project.zone ? { contentLocation: place(project.zone, locale), locationCreated: place(project.zone, locale) } : {}) }]
 }
 // Videos: one VideoObject per video (the project video is about the project's CreativeWork) and the list of them.
 if (page.definition.template === 'films') {
  const videos = films.map(f => {
   const project = filmProjectPath(f, locale), m = f.media
   return { '@type': 'VideoObject', '@id': url + '#video-' + f.id, name: f.title[locale], description: f.text[locale],
    thumbnailUrl: [abs(m.poster.jpg)], uploadDate: filmsPublished, duration: isoDuration(m.duration), contentUrl: abs(m.sources[1080].mp4),
    encodingFormat: 'video/mp4', width: m.width, height: m.height, publisher: { '@id': businessId }, isPartOf: { '@id': url + '#webpage' },
    ...(f.credit ? { creator: { '@type': 'Person', name: f.credit.name, jobTitle: f.credit.role[locale] } } : {}),
    ...(project ? { about: { '@id': abs(project) + '#project' } } : {}) }
  })
  return [...videos, { '@type': 'ItemList', '@id': url + '#videos', numberOfItems: videos.length, itemListElement: videos.map((v, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@id': v['@id'] } })) }]
 }
 if (page.definition.template === 'projects') return [{ '@type': 'ItemList', '@id': url + '#projects', numberOfItems: projects.length,
  itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(projectPath(p, locale)), name: p.name[locale], image: abs(p.media.hero.jpg!) })) }]
 return []
}
if (page) {
 const draft = page.definition.status !== 'published'
 if (hidden(draft)) throw createError({ statusCode: 404, statusMessage: 'Página no encontrada' })
 usePageSeo({ title: page.content.title, description: page.content.description, path, draft, page, legal: page.definition.template === 'legal', extraSchema: archiveSchema, about: project ? (site: string) => ({ '@id': new URL(path, site).href + '#project' }) : undefined, servicio: page.definition.serviceId ? page.content.label : undefined })
}
const pagina = page ? undefined : routes.find((r: any) => r.path === path), contenido = page ? undefined : contenidos[path]
if (!page) {
 if (!pagina || !contenido || hidden(contenido.estado !== 'confirmado')) throw createError({ statusCode: 404, statusMessage: 'Página no encontrada' })
 usePageSeo({ title: contenido.title, description: contenido.description, path, draft: contenido.estado !== 'confirmado', legal: pagina.kind === 'legal', faqs: contenido.faqs, servicio: ['hub', 'ficha', 'service'].includes(pagina.plantilla) ? pagina.label : undefined })
}
</script>
<template>
 <DisenoServicePage v-if="page?.definition.template === 'service'" :page="page" />
 <DisenoProjectPage v-else-if="project" :page="page" :project="project" />
 <DisenoProjectList v-else-if="page?.definition.template === 'projects'" :page="page" />
 <StudioPage v-else-if="page?.definition.template === 'studio'" :page="page" />
 <FilmsPage v-else-if="page?.definition.template === 'films'" :page="page" />
 <ContactPage v-else-if="page?.definition.template === 'contact'" :page="page" />
 <LegalPage v-else-if="page?.definition.template === 'legal'" :page="page" />
 <InternationalPage v-else-if="page?.definition.template === 'international'" :page="page" />
 <AreaPage v-else-if="page?.definition.template === 'area'" :page="page" />
 <DisenoPaginaInterior v-else :pagina="pagina" :contenido="contenido" />
</template>

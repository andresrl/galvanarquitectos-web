<script setup lang="ts">
// Infraestructura: datos, 404 y SEO. Las páginas del registro (app/data/pages) usan su plantilla; el resto, PaginaInterior.vue.
import { routes } from '~/data/routes'
import { contenidos } from '~/data/contenidos'
import { resolvePage } from '~/data/pages'
import { projectById, projects, projectPath } from '~/data/projects/projects'
import { locations } from '~/data/taxonomy'
import StudioPage from '~/components/diseno/StudioPage.vue'
import ContactPage from '~/components/diseno/ContactPage.vue'
definePageMeta({ key: (route) => route.path })
const route = useRoute(), cfg = useRuntimeConfig().public, path = route.path.replace(/\/$/, '') || '/'
const page = resolvePage(path)
const project = page?.definition.template === 'project' ? projectById(page.definition.projectIds![0]) : undefined
const hidden = (draft: boolean) => draft && cfg.indexable && !cfg.showDrafts
// Project archive: the work itself (CreativeWork) or the list of works, linked to the studio.
function archiveSchema(site: string, url: string, businessId: string) {
 if (!page) return []
 const locale = page.locale as 'en' | 'es'
 if (project) return [{ '@type': 'CreativeWork', '@id': url + '#project', name: project.name[locale], headline: project.copy[locale].heading, description: project.copy[locale].lead,
  image: new URL(project.media.hero.jpg!, site).href, creator: { '@id': businessId }, inLanguage: locale, mainEntityOfPage: { '@id': url + '#webpage' },
  ...(project.zone ? { contentLocation: { '@type': 'Place', name: locations[project.zone].name[locale] } } : {}) }]
 if (page.definition.template === 'projects') return [{ '@type': 'ItemList', '@id': url + '#projects', itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name[locale], url: new URL(projectPath(p, locale), site).href })) }]
 return []
}
if (page) {
 const draft = page.definition.status !== 'published'
 if (hidden(draft)) throw createError({ statusCode: 404, statusMessage: 'Página no encontrada' })
 usePageSeo({ title: page.content.title, description: page.content.description, path, draft, page, extraSchema: archiveSchema, servicio: page.definition.serviceId ? page.content.label : undefined })
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
 <ContactPage v-else-if="page?.definition.template === 'contact'" :page="page" />
 <DisenoPaginaInterior v-else :pagina="pagina" :contenido="contenido" />
</template>

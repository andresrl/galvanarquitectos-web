<script setup lang="ts">
// Infraestructura: datos, 404 y SEO. Las páginas del registro (app/data/pages) usan su plantilla; el resto, PaginaInterior.vue.
import { routes } from '~/data/routes'
import { contenidos } from '~/data/contenidos'
import { resolvePage } from '~/data/pages'
definePageMeta({ key: (route) => route.path })
const route = useRoute(), cfg = useRuntimeConfig().public, path = route.path.replace(/\/$/, '') || '/'
const page = resolvePage(path)
const hidden = (draft: boolean) => draft && cfg.indexable && !cfg.showDrafts
if (page) {
 const draft = page.definition.status !== 'published'
 if (hidden(draft)) throw createError({ statusCode: 404, statusMessage: 'Página no encontrada' })
 usePageSeo({ title: page.content.title, description: page.content.description, path, draft, page, servicio: page.definition.serviceId ? page.content.label : undefined })
}
const pagina = page ? undefined : routes.find((r: any) => r.path === path), contenido = page ? undefined : contenidos[path]
if (!page) {
 if (!pagina || !contenido || hidden(contenido.estado !== 'confirmado')) throw createError({ statusCode: 404, statusMessage: 'Página no encontrada' })
 usePageSeo({ title: contenido.title, description: contenido.description, path, draft: contenido.estado !== 'confirmado', legal: pagina.kind === 'legal', faqs: contenido.faqs, servicio: ['hub', 'ficha', 'service'].includes(pagina.plantilla) ? pagina.label : undefined })
}
</script>
<template><DisenoServicePage v-if="page?.definition.template === 'service'" :page="page" /><DisenoPaginaInterior v-else :pagina="pagina" :contenido="contenido" /></template>

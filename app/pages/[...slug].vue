<script setup lang="ts">
// Infraestructura: datos, 404 y SEO. El aspecto está en app/components/diseno/PaginaInterior.vue.
import { routes } from '~/data/routes'
import { contenidos } from '~/data/contenidos'
import { renovationLocale } from '~/data/services/renovation'
definePageMeta({ key: (route) => route.path })
const route = useRoute(), cfg = useRuntimeConfig().public, path = route.path.replace(/\/$/, '') || '/'
const pagina = routes.find((r: any) => r.path === path), contenido = contenidos[path]
if (!pagina || !contenido || (contenido.estado !== 'confirmado' && cfg.indexable && !cfg.showDrafts)) throw createError({ statusCode: 404, statusMessage: 'Página no encontrada' })
const serviceLocale=renovationLocale(path)
usePageSeo({ title: contenido.title, description: contenido.description, path, draft: contenido.estado !== 'confirmado', legal: pagina.kind === 'legal', faqs: contenido.faqs, servicio: ['hub', 'ficha', 'service'].includes(pagina.plantilla) ? pagina.label : undefined })
</script>
<template><DisenoServicePage v-if="serviceLocale" /><DisenoPaginaInterior v-else :pagina="pagina" :contenido="contenido" /></template>

<script setup lang="ts">
// Infraestructura: datos y SEO. El aspecto está en app/components/diseno/Home.vue.
import { contenidos } from '~/data/contenidos'
import { routes } from '~/data/routes'
const contenido = contenidos['/']
const pagina = routes.find((r: any) => r.path === '/')
usePageSeo({ title: contenido.title, description: contenido.description, path: '/', draft: contenido.estado !== 'confirmado', faqs: contenido.faqs })
</script>
<template><DisenoHome :pagina="pagina" :contenido="contenido" /></template>

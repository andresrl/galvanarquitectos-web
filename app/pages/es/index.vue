<script setup lang="ts">
// Home ES (/es): same approved Home, Spanish from SSR. Title and description come from Home.vue by language.
import { contenidos } from '~/data/contenidos'
import { routes } from '~/data/routes'
const contenido = contenidos['/']
const pagina = routes.find((r: any) => r.path === '/')
usePageSeo({ title: 'Martínez Galván · Arquitecto en Marbella, Costa del Sol', description: 'Arquitectura, interiorismo y paisajismo para villas en Marbella y la Costa del Sol, con trato directo con el arquitecto, de la idea a la obra.', path: '/es', draft: contenido.estado !== 'confirmado', alternates: { en: '/', es: '/es' } })
</script>
<template><DisenoHome :pagina="pagina" :contenido="contenido" /></template>

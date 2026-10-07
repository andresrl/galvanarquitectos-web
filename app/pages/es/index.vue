<script setup lang="ts">
// Home ES (/es): same approved Home, Spanish from SSR. Title and description come from Home.vue by language.
import { contenidos } from '~/data/contenidos'
import { routes } from '~/data/routes'
import { homePublished } from '~/data/pages'
import { homeReel } from '~/data/home-reel'
const contenido = contenidos['/']
const pagina = routes.find((r: any) => r.path === '/')
usePageSeo({ title: 'Martínez Galván · Arquitecto en Marbella, Costa del Sol', description: 'Arquitectura, interiorismo y paisajismo para villas en Marbella y la Costa del Sol, con trato directo con el arquitecto, de la idea a la obra.', path: '/es', draft: !homePublished, alternates: { en: '/', es: '/es' } })
// LCP: the reel poster is the first paint of the hero.
useHead({ link: [{ rel: 'preload', as: 'image', href: homeReel.poster, type: 'image/avif', fetchpriority: 'high' }] })
</script>
<template><DisenoHome :pagina="pagina" :contenido="contenido" /></template>

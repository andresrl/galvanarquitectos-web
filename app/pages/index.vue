<script setup lang="ts">
// Infraestructura: datos y SEO. El aspecto está en app/components/diseno/Home.vue.
import { contenidos } from '~/data/contenidos'
import { routes } from '~/data/routes'
import { homePublished } from '~/data/pages'
import { homeReel } from '~/data/home-reel'
const contenido = contenidos['/']
const pagina = routes.find((r: any) => r.path === '/')
usePageSeo({ title: contenido.title, description: contenido.description, path: '/', alternates: { en: '/', es: '/es' }, draft: !homePublished, faqs: contenido.faqs })
// LCP: the reel poster is the first paint of the hero.
useHead({ link: [{ rel: 'preload', as: 'image', href: homeReel.poster, type: 'image/avif', fetchpriority: 'high' }] })
</script>
<template><DisenoHome :pagina="pagina" :contenido="contenido" /></template>

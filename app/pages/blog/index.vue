<script setup lang="ts">
// Infraestructura: datos y SEO. El aspecto está en app/components/diseno/BlogLista.vue.
import { negocio } from '~/data/negocio'
const cfg = useRuntimeConfig().public
const { data: posts } = await useAsyncData('blog', () => queryCollection('blog').order('date', 'DESC').all())
const visibles = computed(() => (posts.value ?? []).filter((p: any) => !cfg.indexable || cfg.showDrafts || !p.draft))
// El índice se indexa cuando hay al menos 3 artículos publicados (antes sería una página casi vacía)
usePageSeo({ title: 'Blog | ' + negocio.nombre, description: 'Preguntas y orientaciones de ' + negocio.actividad, path: '/blog', draft: (posts.value ?? []).filter((p: any) => !p.draft).length < 3 })
</script>
<template><DisenoBlogLista :posts="visibles" /></template>

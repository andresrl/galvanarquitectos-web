<script setup lang="ts">
// Infraestructura: datos, 404 y SEO en useGuides. El aspecto está en app/components/diseno/BlogArticulo.vue.
definePageMeta({ key: (route) => route.path })
const slug = String(useRoute().params.slug)
const { data: post } = await guideData('es', slug)
const { data: list } = await guideListData('es')
const { more, alternates } = useGuidePage('es', slug, post, list)
</script>
<template><DisenoBlogArticulo v-if="post" locale="es" :post="post" :more="more" :alternates="alternates" /></template>

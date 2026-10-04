<script setup lang="ts">
// Infraestructura: datos, 404 y SEO en useGuides. El aspecto está en app/components/diseno/BlogArticulo.vue.
definePageMeta({ key: (route) => route.path })
const slug = String(useRoute().params.slug)
const { data: post } = await guideData('en', slug)
const { data: list } = await guideListData('en')
const { more, alternates } = useGuidePage('en', slug, post, list)
</script>
<template><DisenoBlogArticulo v-if="post" locale="en" :post="post" :more="more" :alternates="alternates" /></template>

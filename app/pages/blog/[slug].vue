<script setup lang="ts">
// Infraestructura: datos, 404 y SEO. El aspecto está en app/components/diseno/BlogArticulo.vue.
const route = useRoute(), cfg = useRuntimeConfig().public
const { data: post } = await useAsyncData('blog-' + route.params.slug, () => queryCollection('blog').path('/blog/' + route.params.slug).first())
if (!post.value || (post.value.draft && cfg.indexable && !cfg.showDrafts)) throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado' })
usePageSeo({ title: post.value.title, description: post.value.description ?? '', path: post.value.path, draft: post.value.draft })
</script>
<template><DisenoBlogArticulo v-if="post" :post="post" /></template>

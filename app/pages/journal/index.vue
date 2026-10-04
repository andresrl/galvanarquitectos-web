<script setup lang="ts">
// Infraestructura: datos y SEO en useGuides. El aspecto está en app/components/diseno/BlogLista.vue.
const { data } = await guideListData('en')
const guides = useGuideIndex('en', data)
</script>
<template><DisenoBlogLista locale="en" :guides="guides" /></template>

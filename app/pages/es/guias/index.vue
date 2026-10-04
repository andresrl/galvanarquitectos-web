<script setup lang="ts">
// Infraestructura: datos y SEO en useGuides. El aspecto está en app/components/diseno/BlogLista.vue.
const { data } = await guideListData('es')
const guides = useGuideIndex('es', data)
</script>
<template><DisenoBlogLista locale="es" :guides="guides" /></template>

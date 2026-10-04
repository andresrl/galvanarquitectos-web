<script setup>
const {vistaPrevia}=useSitio()
const {locale}=useGalvan()
</script>
<template><p v-if="vistaPrevia" role="status" class="preview-status">{{locale==='en'?'Design preview · Content pending review':'Propuesta visual · Contenido pendiente de revisión'}}</p></template>

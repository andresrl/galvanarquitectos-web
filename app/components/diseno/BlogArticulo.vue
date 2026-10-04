<script setup>
defineProps({post:Object})
const {locale}=useGalvan()
</script>
<template><main class="section blog-page"><h1>{{post.title}}</h1><p v-if="post.draft" data-borrador>{{locale==='en'?'Draft':'Borrador'}}</p><ContentRenderer :value="post" /></main></template>

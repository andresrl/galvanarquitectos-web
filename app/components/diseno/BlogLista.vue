<script setup>
defineProps({posts:Array})
const {locale}=useGalvan()
</script>
<template><main class="section blog-page"><h1>{{locale==='en'?'Journal':'Artículos'}}</h1><p v-if="!posts?.length">{{locale==='en'?'Articles are being prepared.':'Los artículos están en preparación.'}}</p><article v-for="post in posts" :key="post.path"><NuxtLink :to="post.path"><h2>{{post.title}}</h2></NuxtLink><p>{{post.description}}</p><span v-if="post.draft" data-borrador>{{locale==='en'?'Draft':'Borrador'}}</span></article></main></template>

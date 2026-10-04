<script setup>
const {locale,t,tone,requestScene,toggleLanguage}=useGalvan()
const route=useRoute()
useHead({htmlAttrs:{lang:()=>locale.value}})
</script>
<template><header class="header" :data-tone="tone">
    <a class="brand" href="/#inicio" @click.prevent="requestScene('inicio')" :aria-label="locale==='en'?'Galván Arquitectos, home':'Galván Arquitectos, inicio'">GALVÁN<span>ARQUITECTOS</span></a>
    <span class="preview-note" v-html="t('preview')"></span>
    <nav :aria-label="locale==='en'?'Main navigation':'Principal'"><a href="/#servicios" @click.prevent="requestScene('servicios')" v-html="t('services')"></a><a href="/#estudio" @click.prevent="requestScene('estudio')" v-html="t('studio')"></a><a href="/#contacto" @click.prevent="requestScene('contacto')" v-html="t('contact')"></a></nav>
    <button id="language" type="button" :aria-label="locale==='en'?'Cambiar a español':'Switch to English'" @click="toggleLanguage">{{locale==='en'?'ES':'EN'}}</button>
  </header></template>

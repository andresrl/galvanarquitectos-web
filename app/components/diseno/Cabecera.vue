<script setup>
import {projectsIndexPath} from '~/data/projects/projects'
const {locale,t,tone,requestScene,toggleLanguage}=useGalvan()
const route=useRoute()
const menuOpen=useState('galvan:menu',()=>false)
useHead({htmlAttrs:{lang:()=>locale.value}})
</script>
<template><header class="header" :data-tone="tone">
    <a class="brand" href="/#inicio" @click.prevent="requestScene('inicio')" :aria-label="locale==='en'?'Martínez Galván Arquitecto, home':'Martínez Galván Arquitecto, inicio'"><DisenoMarca /></a>
    <nav :aria-label="locale==='en'?'Main navigation':'Principal'"><NuxtLink :to="projectsIndexPath[locale]">{{locale==='en'?'Projects':'Proyectos'}}</NuxtLink><a href="/#servicios" @click.prevent="requestScene('servicios')" v-html="t('services')"></a><a href="/#estudio" @click.prevent="requestScene('estudio')" v-html="t('studio')"></a><a href="/#contacto" @click.prevent="requestScene('contacto')" v-html="t('contact')"></a></nav>
    <button type="button" class="menu-toggle" aria-controls="site-menu" :aria-expanded="menuOpen" @click="menuOpen=true"><span>{{locale==='en'?'Menu':'Menú'}}</span><span class="menu-lines" aria-hidden="true"></span></button>
    <button id="language" type="button" :aria-label="locale==='en'?'Cambiar a español':'Switch to English'" @click="toggleLanguage">{{locale==='en'?'ES':'EN'}}</button>
  </header></template>

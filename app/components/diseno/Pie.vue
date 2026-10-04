<script setup>
const route=useRoute()
const {locale,requestScene}=useGalvan()
const {openPreferences}=useCookieConsent()
</script>
<template><footer v-if="route.path!=='/'" class="site-footer"><a href="/" @click.prevent="requestScene('inicio')">GALVÁN ARQUITECTOS</a><span>Marbella · Costa del Sol</span><button type="button" class="cookie-settings" @click="openPreferences">{{locale==='en'?'Cookie settings':'Configurar cookies'}}</button></footer></template>

<script setup lang="ts">
import ContactDrawer from '~/components/diseno/ContactDrawer.vue'
import MobileContactBar from '~/components/diseno/MobileContactBar.vue'
// Infraestructura: el armazón es fijo; cabecera, páginas y pie los pinta app/components/diseno/.
</script>
<template><div><DisenoCabecera /><DisenoMenu /><NuxtPage /><DisenoPie /><ContactDrawer /><MobileContactBar /><CookieBanner /></div></template>

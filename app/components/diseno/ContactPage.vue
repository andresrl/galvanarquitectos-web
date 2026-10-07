<script setup>
// /contact · /es/contacto: the same panel as the drawer, as a page of its own.
import ContactPanel from './ContactPanel.vue'
const props = defineProps({ page: { type: Object, required: true } })
const { tone } = useGalvan()
useHead({ bodyAttrs: { class: 'project-archive-page' } })
onMounted(() => { tone.value = 'light' })
</script>
<template>
<main class="contact-page">
 <nav class="project-breadcrumb" :aria-label="page.locale === 'en' ? 'Breadcrumb' : 'Ruta de navegación'"><template v-for="(crumb, i) in page.breadcrumb" :key="i"><span v-if="i" aria-hidden="true">/</span><span v-if="i === page.breadcrumb.length - 1" aria-current="page">{{ crumb.label }}</span><NuxtLink v-else-if="crumb.path" :to="crumb.path">{{ crumb.label }}</NuxtLink></template></nav>
 <ContactPanel heading-tag="h1" id-prefix="page" />
</main>
</template>

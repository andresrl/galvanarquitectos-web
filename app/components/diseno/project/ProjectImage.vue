<script setup>
// One archive image: AVIF srcset over its blurred placeholder. Explicit size avoids layout shift.
defineProps({ image: { type: Object, required: true }, alt: { type: String, required: true }, sizes: { type: String, default: '100vw' }, eager: Boolean })
</script>
<template><div class="project-image" :style="{ backgroundImage: `url(${image.lqip})` }"><img :src="image.src" :srcset="image.srcset" :sizes="sizes" :alt="alt" :width="image.width" :height="image.height" :loading="eager ? 'eager' : 'lazy'" :fetchpriority="eager ? 'high' : undefined" decoding="async"></div></template>

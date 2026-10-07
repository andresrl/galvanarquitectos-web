<script setup lang="ts">
// Decorative UI icons use paths so their appearance never depends on an OS font.
type IconName = 'arrow-up-right' | 'arrow-down' | 'arrow-up' | 'arrow-left' | 'arrow-right' | 'close' | 'menu'
defineProps<{ name: IconName }>()
const paths: Record<IconName, string> = {
 'arrow-up-right': 'M5 19 19 5M5 5h14v14',
 'arrow-down': 'M12 4v16M5 13l7 7 7-7',
 'arrow-up': 'M12 20V4M5 11l7-7 7 7',
 'arrow-left': 'M20 12H4M11 5l-7 7 7 7',
 'arrow-right': 'M4 12h16M13 5l7 7-7 7',
 close: 'M5 5l14 14M19 5 5 19',
 menu: 'M2 8h20M2 16h20',
}
</script>
<template><svg class="site-icon" :data-icon="name" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path :d="paths[name]" /></svg></template>

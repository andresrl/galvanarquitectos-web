<script setup lang="ts">
// Decorative UI icons use paths so their appearance never depends on an OS font.
type IconName = 'arrow-up-right' | 'arrow-down' | 'arrow-up' | 'arrow-left' | 'arrow-right' | 'close' | 'menu' | 'play' | 'pause' | 'sound' | 'muted' | 'expand' | 'shrink' | 'replay' | 'previous' | 'next'
defineProps<{ name: IconName }>()
const paths: Record<IconName, string> = {
 'arrow-up-right': 'M5 19 19 5M5 5h14v14',
 'arrow-down': 'M12 4v16M5 13l7 7 7-7',
 'arrow-up': 'M12 20V4M5 11l7-7 7 7',
 'arrow-left': 'M20 12H4M11 5l-7 7 7 7',
 'arrow-right': 'M4 12h16M13 5l7 7-7 7',
 close: 'M5 5l14 14M19 5 5 19',
 menu: 'M2 8h20M2 16h20',
 play: 'M7.5 4.8v14.4L19 12z',
 pause: 'M8.5 5v14M15.5 5v14',
 sound: 'M3.5 9.5H7l4.5-4v13L7 14.5H3.5zM15 9.2a4 4 0 0 1 0 5.6M17.6 6.6a7.6 7.6 0 0 1 0 10.8',
 muted: 'M3.5 9.5H7l4.5-4v13L7 14.5H3.5zM15.5 9.5l5 5M20.5 9.5l-5 5',
 expand: 'M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5',
 shrink: 'M9 4v5H4M20 9h-5V4M15 20v-5h5M4 15h5v5',
 replay: 'M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v3.8h3.8',
 previous: 'M6 5v14M18.5 5.5 9 12l9.5 6.5z',
 next: 'M18 5v14M5.5 5.5 15 12l-9.5 6.5z',
}
</script>
<template><svg class="site-icon" :data-icon="name" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path :d="paths[name]" /></svg></template>

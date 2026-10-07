<script setup>
// Full-screen viewer on a native <dialog>: focus stays inside, Esc closes, arrows navigate, focus returns to the opener.
const props = defineProps({ items: { type: Array, required: true }, ui: { type: Object, required: true } })
const index = defineModel({ type: Number, default: -1 })
const dialog = ref(null)
let opener = null
const current = computed(() => props.items[index.value])
function go(step) { index.value = (index.value + step + props.items.length) % props.items.length }
function close() { index.value = -1 }
function onKey(event) {
 if (event.key === 'ArrowRight') go(1)
 else if (event.key === 'ArrowLeft') go(-1)
}
watch(index, (value, previous) => {
 const el = dialog.value
 if (!el) return
 if (value >= 0 && previous < 0) { opener = document.activeElement; el.showModal(); document.documentElement.classList.add('menu-open') }
 if (value < 0 && el.open) { el.close(); document.documentElement.classList.remove('menu-open'); opener?.focus?.(); opener = null }
})
onBeforeUnmount(() => { if (import.meta.client) document.documentElement.classList.remove('menu-open') })
</script>
<template>
<dialog ref="dialog" class="project-lightbox" :aria-label="ui.gallery" @close="index >= 0 && close()" @keydown="onKey" @click.self="close">
 <template v-if="current">
  <figure>
   <img :src="current.image.src" :srcset="current.image.srcset" sizes="100vw" :alt="current.alt" :width="current.image.width" :height="current.image.height">
   <figcaption><span>{{ String(index + 1).padStart(2, '0') }} {{ ui.of }} {{ String(items.length).padStart(2, '0') }}</span>{{ current.alt }}</figcaption>
  </figure>
  <button type="button" class="project-lightbox-close" @click="close">{{ ui.close }} <span aria-hidden="true"><DisenoIcon name="close" /></span></button>
  <template v-if="items.length > 1">
   <button type="button" class="project-lightbox-nav project-lightbox-prev" :aria-label="ui.previous" @click="go(-1)"><span aria-hidden="true"><DisenoIcon name="arrow-left" /></span></button>
   <button type="button" class="project-lightbox-nav project-lightbox-next" :aria-label="ui.next" @click="go(1)"><span aria-hidden="true"><DisenoIcon name="arrow-right" /></span></button>
  </template>
 </template>
</dialog>
</template>

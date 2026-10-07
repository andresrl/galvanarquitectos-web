<script setup>
// Contact drawer from the right (ARK-style), mounted once in app.vue. Esc, the close button or the backdrop close it;
// focus moves inside and returns to the link that opened it.
import { contactCopy } from '~/data/contact'
import ContactPanel from './ContactPanel.vue'
const { open, close } = useContact()
const { locale } = useGalvan()
const route = useRoute()
const c = computed(() => contactCopy[locale.value])
const panel = ref(null)
let returnFocus = null
function onKey(e) {
 if (e.key === 'Escape') return close()
 if (e.key !== 'Tab' || !panel.value) return
 const items = [...panel.value.querySelectorAll('a[href],button,input,textarea')].filter(el => !el.disabled && el.offsetParent)
 const first = items[0], last = items.at(-1)
 if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
 else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
}
watch(open, async value => {
 if (!import.meta.client) return
 document.documentElement.classList.toggle('menu-open', value)
 if (value) {
  returnFocus = document.activeElement
  window.addEventListener('keydown', onKey)
  await nextTick(); setTimeout(() => panel.value?.querySelector('input')?.focus({ preventScroll: true }), 380)
 } else {
  window.removeEventListener('keydown', onKey)
  returnFocus?.focus?.(); returnFocus = null
 }
})
watch(() => route.fullPath, close)
onBeforeUnmount(() => { if (import.meta.client) { window.removeEventListener('keydown', onKey); document.documentElement.classList.remove('menu-open') } })
</script>
<template>
<Teleport to="body">
 <Transition name="contact-drawer">
  <div v-if="open" class="contact-drawer" @click.self="close">
   <div ref="panel" class="contact-drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
    <button type="button" class="contact-drawer-close" @click="close">{{ c.close }} <span aria-hidden="true">×</span></button>
    <ContactPanel :active="open" id-prefix="drawer" />
   </div>
  </div>
 </Transition>
</Teleport>
</template>

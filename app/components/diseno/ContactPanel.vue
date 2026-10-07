<script setup>
// Contact content (ARK-style): title, studio video and tagline on the left; the agreed form on the right.
// Used inside ContactDrawer.vue (every page) and on the /contact page.
import { contactCopy } from '~/data/contact'
import { negocio } from '~/data/negocio'
import { locations, locationIds } from '~/data/taxonomy'
import { resolvePage } from '~/data/pages'
const props = defineProps({ active: { type: Boolean, default: true }, headingTag: { type: String, default: 'h2' }, idPrefix: { type: String, default: 'contact' } })
const { locale } = useGalvan()
const route = useRoute()
const c = computed(() => contactCopy[locale.value])
// What the visitor was looking at: a project or a service area pre-fills the form.
const context = computed(() => {
 const page = resolvePage(route.path.replace(/\/$/, '') || '/')
 if (!page || page.definition.template === 'contact') return null
 return { label: page.content.label, area: page.locationName ?? '' }
})
const form = reactive({ name: '', email: '', phone: '', area: '', message: '' })
watch(context, value => { if (value?.area && !form.area) form.area = value.area }, { immediate: true })
const video = ref(null), reduced = ref(false)
onMounted(() => { reduced.value = matchMedia('(prefers-reduced-motion: reduce)').matches; sync() })
function sync() { const v = video.value; if (!v) return; props.active && !reduced.value ? v.play().catch(() => {}) : v.pause() }
watch(() => props.active, sync)
function send() {
 const t = c.value, f = t.fields
 const body = [context.value ? `${t.regarding}: ${context.value.label}` : '', `${f.name}: ${form.name}`, `${f.email}: ${form.email}`, form.phone ? `${f.phone}: ${form.phone}` : '', `${f.area}: ${form.area}`, '', form.message].filter((l, i) => l || i > 4).join('\n')
 const subject = context.value ? `${t.subject} · ${context.value.label}` : t.subject
 window.location.href = `mailto:${negocio.contacto.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
const tel = computed(() => 'tel:' + negocio.contacto.telefono.replaceAll(' ', ''))
const id = s => `${props.idPrefix}-${s}`
</script>
<template>
<div class="contact-panel">
 <div class="contact-panel-intro">
  <component :is="headingTag" :id="id('title')" class="contact-panel-title">{{ c.heading }}</component>
  <div class="contact-panel-media">
   <video v-if="!reduced" ref="video" muted loop playsinline preload="none" poster="/media/studio/studio-conversation-1280.avif" aria-hidden="true"><source src="/video/studio-conversation.webm" type="video/webm"><source src="/video/studio-conversation.mp4" type="video/mp4"></video>
   <img v-else src="/media/studio/studio-conversation-1280.avif" :alt="c.videoAlt" width="1280" height="720">
  </div>
  <p class="contact-panel-tagline">{{ c.tagline }} <em>{{ c.taglineItalic }}</em></p>
 </div>
 <form class="contact-panel-form" @submit.prevent="send">
  <p class="contact-panel-lead">{{ c.lead }}</p>
  <p v-if="context" class="contact-panel-context"><span>{{ c.regarding }}</span> {{ context.label }}</p>
  <div class="contact-panel-row">
   <label :for="id('name')">{{ c.fields.name }}<input :id="id('name')" v-model="form.name" name="name" autocomplete="name" required maxlength="150"></label>
   <label :for="id('email')">{{ c.fields.email }}<input :id="id('email')" v-model="form.email" name="email" type="email" autocomplete="email" required maxlength="254"></label>
  </div>
  <div class="contact-panel-row">
   <label :for="id('phone')">{{ c.fields.phone }}<input :id="id('phone')" v-model="form.phone" name="phone" type="tel" autocomplete="tel" maxlength="50"></label>
   <label :for="id('area')">{{ c.fields.area }}<input :id="id('area')" v-model="form.area" name="area" :list="id('areas')" :placeholder="c.areaHint" required maxlength="200"><datalist :id="id('areas')"><option v-for="loc in locationIds" :key="loc" :value="locations[loc].name[locale]" /></datalist></label>
  </div>
  <label :for="id('message')">{{ c.fields.message }}<textarea :id="id('message')" v-model="form.message" name="message" rows="4" required maxlength="5000"></textarea></label>
  <p class="contact-panel-note">{{ c.note }}</p>
  <div class="contact-panel-actions">
   <button type="submit" class="contact-panel-button">{{ c.send }} <span aria-hidden="true">↗</span></button>
   <a :href="tel" class="contact-panel-button">{{ c.call }} <span aria-hidden="true">↗</span></a>
  </div>
  <p class="contact-panel-direct"><a :href="'mailto:' + negocio.contacto.email">{{ negocio.contacto.email }}</a><a :href="tel">{{ negocio.contacto.telefono }}</a><span>Marbella · Costa del Sol</span></p>
 </form>
</div>
</template>

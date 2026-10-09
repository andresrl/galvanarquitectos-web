<script setup>
// Contact content (ARK-style): title, studio video and tagline on the left; the agreed form on the right.
// Used inside ContactDrawer.vue (every page) and on the /contact page.
import { contactCopy } from '~/data/contact'
import { negocio, telefonos } from '~/data/negocio'
import { resolvePage } from '~/data/pages'
const props = defineProps({ active: { type: Boolean, default: true }, headingTag: { type: String, default: 'h2' }, idPrefix: { type: String, default: 'contact' } })
const { locale } = useGalvan()
const route = useRoute()
const c = computed(() => contactCopy[locale.value])
// Include the page the visitor was looking at in the enquiry.
const context = computed(() => {
 const page = resolvePage(route.path.replace(/\/$/, '') || '/')
 if (!page || page.definition.template === 'contact') return null
 return { label: page.content.label }
})
const form = reactive({ name: '', email: '', phone: '', message: '', website: '' })
const { status, submit } = useEnquiry()
const video = ref(null), reduced = ref(false)
// Plays while the panel is open; resumes after a hidden tab or sleep (utils/ambient-video.ts).
let videos = null
onMounted(async () => { reduced.value = matchMedia('(prefers-reduced-motion: reduce)').matches; await nextTick(); videos = createAmbientVideos(() => !reduced.value); sync() })
function sync() { if (video.value) videos?.set(video.value, props.active) }
watch(() => props.active, sync)
onBeforeUnmount(() => { videos?.destroy(); videos = null })
// Sent by /api/contact; if that fails, the same enquiry prepared for the visitor's email app.
const mailto = computed(() => {
 const t = c.value, f = t.fields
 const details = [context.value ? `${t.regarding}: ${context.value.label}` : '', `${f.name}: ${form.name}`, `${f.email}: ${form.email}`, form.phone ? `${f.phone}: ${form.phone}` : ''].filter(Boolean)
 const body = [...details, '', form.message].join('\n')
 const subject = context.value ? `${t.subject} · ${context.value.label}` : t.subject
 return `mailto:${negocio.contacto.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})
async function send() {
 const sent = await submit({ ...form, regarding: context.value?.label ?? '', page: route.path, locale: locale.value })
 if (sent) Object.assign(form, { name: '', email: '', phone: '', message: '' })
}
const id = s => `${props.idPrefix}-${s}`
</script>
<template>
<div class="contact-panel">
 <div class="contact-panel-intro">
  <component :is="headingTag" :id="id('title')" class="contact-panel-title">{{ c.heading }}</component>
  <div class="contact-panel-media">
   <video v-if="!reduced" ref="video" muted loop playsinline preload="none" data-rate=".75" poster="/video/studio-conversation_white-poster.avif" aria-hidden="true"><source src="/video/studio-conversation_white-pingpong.webm" type="video/webm"><source src="/video/studio-conversation_white-pingpong.mp4" type="video/mp4"></video>
   <img v-else src="/video/studio-conversation_white-poster.avif" :alt="c.videoAlt" width="1264" height="720">
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
  <label :for="id('phone')">{{ c.fields.phone }}<input :id="id('phone')" v-model="form.phone" name="phone" type="tel" autocomplete="tel" maxlength="50"></label>
  <label :for="id('message')">{{ c.fields.message }}<textarea :id="id('message')" v-model="form.message" name="message" rows="4" required maxlength="5000"></textarea></label>
  <div class="visually-hidden" aria-hidden="true"><label :for="id('website')">Website<input :id="id('website')" v-model="form.website" name="website" tabindex="-1" autocomplete="off"></label></div>
  <p class="contact-panel-note">{{ c.note }}</p>
  <div class="contact-panel-actions">
   <button type="submit" class="contact-panel-button" :disabled="status === 'sending'">{{ status === 'sending' ? c.sending : c.send }} <span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></button>
   <a :href="telefonos[0].href" class="contact-panel-button">{{ c.call }} <span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></a>
  </div>
  <p class="contact-panel-status" role="status"><template v-if="status === 'sent'">{{ c.sent }}</template><template v-else-if="status === 'error'">{{ c.error }} <a :href="mailto">{{ c.fallback }}</a></template></p>
  <p class="contact-panel-direct"><a :href="'mailto:' + negocio.contacto.email">{{ negocio.contacto.email }}</a><a v-for="p in telefonos" :key="p.href" :href="p.href">{{ p.label[locale] }} {{ p.numero }}</a><a :href="negocio.mapa" target="_blank" rel="noopener">{{ negocio.contacto.direccionTexto }}</a></p>
 </form>
</div>
</template>

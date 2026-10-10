<script setup>
// Mobile only: slim fixed bar to reach the studio from anywhere. Contact opens the drawer; Call dials.
// Hidden while the menu, the contact drawer or the cookie banner is open, and while the footer is on screen.
import { negocio } from '~/data/negocio'
import { contactCopy } from '~/data/contact'
const { locale } = useGalvan()
const contact = useContact()
const menuOpen = useState('galvan:menu', () => false)
const { bannerOpen } = useCookieConsent()
const hidden = computed(() => contact.open.value || menuOpen.value || bannerOpen.value)
const c = computed(() => contactCopy[locale.value])
// iPhones with a home indicator (Face ID models, screen at least 812pt tall): Safari paints the strip under the bar.
const chin = ref(false)
onMounted(() => { chin.value = /iP(hone|od)/.test(navigator.userAgent) && Math.max(screen.width, screen.height) >= 812 })
</script>
<template>
<nav class="mobile-contact" :class="{ 'is-hidden': hidden, 'has-chin': chin }" :aria-label="c.label" :aria-hidden="hidden ? 'true' : undefined">
 <a :href="contact.path.value" :tabindex="hidden ? -1 : undefined" @click="contact.show($event)">{{ c.label }} <span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></a>
 <a :href="'tel:' + negocio.contacto.telefono.replaceAll(' ', '')" :tabindex="hidden ? -1 : undefined">{{ c.call }} <span aria-hidden="true"><DisenoIcon name="arrow-up-right" /></span></a>
</nav>
</template>

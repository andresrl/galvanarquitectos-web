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
</script>
<template>
<nav class="mobile-contact" :class="{ 'is-hidden': hidden }" :aria-label="c.label" :aria-hidden="hidden ? 'true' : undefined">
 <a :href="contact.path.value" :tabindex="hidden ? -1 : undefined" @click="contact.show($event)">{{ c.label }} <span aria-hidden="true">↗</span></a>
 <a :href="'tel:' + negocio.contacto.telefono.replaceAll(' ', '')" :tabindex="hidden ? -1 : undefined">{{ c.call }} <span aria-hidden="true">↗</span></a>
</nav>
</template>

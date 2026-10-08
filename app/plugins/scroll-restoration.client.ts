// vue-router stores a page's offset in its history entry (history.state.scroll) only while
// history.scrollRestoration is 'manual'; with 'auto' it stores null and going back has nothing to restore.
// GSAP ScrollTrigger puts back the value it found on loading ('auto', set by Nuxt for the first page) after
// every refresh, so from the second visit on the entry lost its offset. Each navigation sets 'manual' again
// before vue-router saves the page being left. The first load keeps Nuxt's 'auto' for a native reload.
import { START_LOCATION } from 'vue-router'

export default defineNuxtPlugin(() => {
 useRouter().beforeEach((_to, from) => {
  if (from !== START_LOCATION) window.history.scrollRestoration = 'manual'
 })
})

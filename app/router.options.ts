import type {RouterConfig} from '@nuxt/schema'
import type { RouteLocationNormalized } from 'vue-router'
import { START_LOCATION } from 'vue-router'
import { savedPageScroll, waitForPageScroll } from '~/utils/page-scroll'
import { haltSmoothScroll, scrollPage } from '~/utils/smooth-scroll'
import { pagePlaced } from '~/utils/page-transition'
async function place(to: RouteLocationNormalized, from: RouteLocationNormalized, savedPosition: { left: number; top: number } | null) {
    const nuxtApp = useNuxtApp(), router = useRouter()
    if (to.path !== from.path && from !== START_LOCATION) {
      await new Promise<void>(resolve => nuxtApp.hooks.hookOnce('page:loading:end', () => { resolve() }))
    }
    await waitForPageScroll(to.fullPath)
    if (router.currentRoute.value.fullPath !== to.fullPath) return false
    const restored = savedPosition && (savedPageScroll(to.fullPath) ?? savedPosition)
    // Through Lenis, not window.scrollTo: a wheel glide or trackpad momentum would put back the previous offset.
    if (restored) { scrollPage(restored.top); return false }
    if(to.path===from.path)return false
    // Home's ScrollTrigger pins decide the offset for a scene; avoid a second scroll.
    if((to.path==='/'||to.path==='/es')&&to.hash){haltSmoothScroll();return false}
    if(to.hash){haltSmoothScroll();return {el:to.hash,top:90}}
    scrollPage(0)
    return false
}
export default {
  // A page transition captures the destination only once it is in place (utils/page-transition.ts).
  async scrollBehavior(to,from,savedPosition){
    try { return await place(to, from, savedPosition) } finally { pagePlaced() }
  }
} satisfies RouterConfig

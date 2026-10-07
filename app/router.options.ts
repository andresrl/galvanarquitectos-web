import type {RouterConfig} from '@nuxt/schema'
import { START_LOCATION } from 'vue-router'
import { savedPageScroll, waitForPageScroll } from '~/utils/page-scroll'
export default {
  async scrollBehavior(to,from,savedPosition){
    const nuxtApp = useNuxtApp(), router = useRouter()
    if (to.path !== from.path && from !== START_LOCATION) {
      await new Promise<void>(resolve => nuxtApp.hooks.hookOnce('page:loading:end', () => { resolve() }))
    }
    await waitForPageScroll(to.fullPath)
    if (router.currentRoute.value.fullPath !== to.fullPath) return false
    const restored = savedPosition && (savedPageScroll(to.fullPath) ?? savedPosition)
    if (restored) return { ...restored, behavior: 'instant' }
    // Home's ScrollTrigger pins decide the offset for a scene; avoid a second scroll.
    if((to.path==='/'||to.path==='/es')&&to.hash)return false
    if(to.path===from.path)return false
    if(to.hash)return {el:to.hash,top:90}
    return {left:0,top:0}
  }
} satisfies RouterConfig

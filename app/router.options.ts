import type {RouterConfig} from '@nuxt/schema'
export default {
  scrollBehavior(to,from,savedPosition){
    // Home's ScrollTrigger pins decide the offset for a scene; avoid a second scroll.
    if((to.path==='/'||to.path==='/es')&&to.hash)return false
    if(savedPosition)return savedPosition
    if(to.path===from.path)return false
    return {left:0,top:0}
  }
} satisfies RouterConfig

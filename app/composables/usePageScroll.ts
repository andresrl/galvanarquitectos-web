import { registerPageScroll, rememberPageScroll, savedPageScroll } from '~/utils/page-scroll'
import { scrollPage } from '~/utils/smooth-scroll'

// Capture before GSAP removes pins; restore only after the destination builds its layout.
// early: a page without pins has its final layout on mount, so it takes the saved offset there,
// before its first paint; the router then finds the position already in place. A new visit starts at the top
// there too, so its scroll reveals are set up from the top and not from the offset of the page left behind.
export function usePageScroll({ early = false } = {}) {
  if (import.meta.server) return { ready: () => {}, isRestoring: () => false, savedTop: () => undefined }
  const route = useRoute(), router = useRouter(), path = route.path
  let entry = window.history.state?.position
  const ready = registerPageScroll(route.fullPath)
  const unhook = router.afterEach((to, _from, failure) => {
    if (!failure && to.path === path) entry = window.history.state?.position
  })
  function remember(_to: unknown, from: { fullPath: string }) {
    if (typeof entry === 'number') rememberPageScroll(entry, from.fullPath)
  }
  // savedTop: the offset history back/forward will return to, before it is applied (undefined on a new visit).
  const savedTop = () => savedPageScroll(route.fullPath)?.top
  if (early) onMounted(() => {
    const top = savedTop()
    if (top != null) scrollPage(top)
    else if (!route.hash && !window.history.state?.scroll) scrollPage(0)
  })
  onBeforeRouteLeave(remember)
  onBeforeRouteUpdate(remember)
  onBeforeUnmount(() => { ready(); unhook() })
  return { ready, isRestoring: () => !!savedPageScroll(route.fullPath), savedTop }
}

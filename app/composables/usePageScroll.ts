import { registerPageScroll, rememberPageScroll, savedPageScroll } from '~/utils/page-scroll'

// Capture before GSAP removes pins; restore only after the destination builds its layout.
export function usePageScroll() {
  if (import.meta.server) return { ready: () => {}, isRestoring: () => false }
  const route = useRoute(), router = useRouter(), path = route.path
  let entry = window.history.state?.position
  const ready = registerPageScroll(route.fullPath)
  const unhook = router.afterEach((to, _from, failure) => {
    if (!failure && to.path === path) entry = window.history.state?.position
  })
  function remember(_to: unknown, from: { fullPath: string }) {
    if (typeof entry === 'number') rememberPageScroll(entry, from.fullPath)
  }
  onBeforeRouteLeave(remember)
  onBeforeRouteUpdate(remember)
  onBeforeUnmount(() => { ready(); unhook() })
  return { ready, isRestoring: () => !!savedPageScroll(route.fullPath) }
}

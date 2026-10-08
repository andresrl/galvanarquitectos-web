import { preferredLanguage, languageCrawler } from '~/utils/language'

export default defineNuxtPlugin(nuxtApp => {
 const choice = useCookie<'en' | 'es' | undefined>('galvan-lang')
 const router = useRouter()
 // Covers static/cached entry pages and browsers whose HTTP language differs from navigator.languages.
 // Runs once on entry, so an explicit language URL and subsequent navigation remain stable.
 nuxtApp.hook('app:mounted', async () => {
  const route = router.currentRoute.value
  if (route.path !== '/' || choice.value === 'en' || languageCrawler.test(navigator.userAgent)) return
  if (choice.value !== 'es' && preferredLanguage(navigator.languages?.length ? navigator.languages : [navigator.language]) !== 'es') return
  await navigateTo({ path: '/es', query: route.query, hash: route.hash }, { replace: true })
 })
})

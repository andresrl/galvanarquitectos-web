// Feeds utils/page-transition.ts: the link a visitor clicks (its photograph is the one that carries over) and whether
// the browser animates a history step itself. Also warms the project hero while a link to it is pointed at, so the
// photograph is decoded when the page swaps.
import { projectById } from '~/data/projects/projects'
import { normalisePath } from '~/data/pages'
import { noteBrowserAnimation, notePageLink, pagePlaced, projectIdAt } from '~/utils/page-transition'

export default defineNuxtPlugin(() => {
 const router = useRouter()
 const linkOf = (e: Event) => {
  const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href]')
  return link && link.origin === location.origin && (!link.target || link.target === '_self') ? link : null
 }

 document.addEventListener('click', e => {
  const link = linkOf(e)
  if (link) notePageLink(link, link.pathname)
 }, true)
 // Swipe back on iOS and Android already animates the page: no second transition on top.
 addEventListener('popstate', e => { noteBrowserAnimation(!!(e as PopStateEvent & { hasUAVisualTransition?: boolean }).hasUAVisualTransition) })
 router.afterEach((_to, _from, failure) => { noteBrowserAnimation(false); if (failure) pagePlaced() })

 const warmed = new Set<string>()
 const warm = (e: Event) => {
  const link = linkOf(e), path = link && normalisePath(link.pathname)
  const id = path && !warmed.has(path) ? projectIdAt(path) : undefined
  const hero = id && projectById(id)?.media.hero
  if (!hero) return
  warmed.add(path!)
  const img = new Image()
  img.sizes = '100vw'; img.srcset = hero.srcset; img.src = hero.src
  img.decode().catch(() => {})
 }
 for (const type of ['pointerover', 'pointerdown', 'focusin']) document.addEventListener(type, warm, { capture: true, passive: true })
})

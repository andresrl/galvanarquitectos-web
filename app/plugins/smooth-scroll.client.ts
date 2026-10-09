// Smooth wheel scrolling (Lenis): mouse wheels and trackpads glide instead of jumping in steps.
// Lenis moves the real window scroll, so ScrollTrigger pins, the scrollbar, keyboard and anchors keep working;
// touch keeps native scrolling. Off with prefers-reduced-motion. GSAP's ticker drives Lenis and ScrollTrigger
// updates on each Lenis frame, so pins and scrubbed animations move in the same frame as the page.
import Lenis from 'lenis'
import { setSmoothScroll } from '~/utils/smooth-scroll'

export default defineNuxtPlugin(() => {
 const reduce = matchMedia('(prefers-reduced-motion: reduce)')
 // The menu, the contact drawer and the video player hold the page still underneath them; their own content scrolls natively.
 const menuOpen = useState('galvan:menu', () => false)
 const contactOpen = useState('galvan:contact', () => false)
 const filmOpen = useState('galvan:film', () => false)
 let lenis: Lenis | null = null
 let detach: (() => void) | null = null
 let pending = false

 const sync = () => { if (lenis) menuOpen.value || contactOpen.value || filmOpen.value ? lenis.stop() : lenis.start() }

 async function enable() {
  if (lenis || pending || reduce.matches) return
  pending = true
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
  pending = false
  if (lenis || reduce.matches) return
  gsap.registerPlugin(ScrollTrigger)
  const instance = new Lenis({
   lerp: .15,
   stopInertiaOnNavigate: true,
   prevent: node => node.classList.contains('site-menu') || node.classList.contains('contact-drawer') || node.classList.contains('film-player'),
  })
  const tick = (time: number) => instance.raf(time * 1000)
  instance.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  // Without lag smoothing a slow frame does not make the glide jump to catch up.
  gsap.ticker.lagSmoothing(0)
  lenis = instance
  setSmoothScroll(instance)
  sync()
  detach = () => {
   gsap.ticker.remove(tick)
   gsap.ticker.lagSmoothing(500, 33)
   instance.destroy()
   lenis = null
   setSmoothScroll(null)
  }
 }
 function disable() { detach?.(); detach = null }

 watch([menuOpen, contactOpen, filmOpen], sync)
 reduce.addEventListener('change', () => reduce.matches ? disable() : enable())
 enable()
})

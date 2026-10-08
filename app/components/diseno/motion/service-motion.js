import { createSpaceGraphics } from './space-graphic'
export function createServiceMotion({ root, gsap, ScrollTrigger, onTone }) {
 gsap.registerPlugin(ScrollTrigger)
 const media = gsap.matchMedia()
 media.add({ reduced: '(prefers-reduced-motion: reduce)', mobile: '(max-width: 700px)', desktop: '(min-width: 701px)' }, ({ conditions }) => {
  const { reduced, mobile } = conditions
  const hero = root.querySelector('.service-hero')
  // Split heroes keep a paper header: the copy and the navigation never sit on the photo.
  const split = hero.classList.contains('service-hero--split')
  const toneObserver = new IntersectionObserver(([entry]) => onTone(entry.isIntersecting && !split ? 'light' : 'dark'), { rootMargin: '-100px 0px 0px 0px', threshold: 0 })
  toneObserver.observe(hero)
  onTone(hero.getBoundingClientRect().bottom > 100 && !split ? 'light' : 'dark')
  const graphics = createSpaceGraphics({ sections: [root.querySelector('.service-process')], gsap, ScrollTrigger, mobile, reduced })
  if (!reduced) {
   gsap.from(root.querySelectorAll('.service-hero [data-reveal]'), { y: 35, opacity: 0, duration: 1.3, stagger: .13, ease: 'power3.out' })
   gsap.to(hero.querySelector('img'), { yPercent: 9, scale: 1.07, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .6 } })
   root.querySelectorAll('[data-reveal]').forEach(element => {
    if (hero.contains(element)) return
    gsap.from(element, { y: mobile ? 20 : 40, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 92%', toggleActions: 'play none none none' } })
   })
   root.querySelectorAll('.service-photo img').forEach(img => {
    gsap.fromTo(img, { scale: 1.08 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: .75 } })
   })
   const section = root.querySelector('.service-process')
   const reveal = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' } })
   const hold = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: .65 } })
   graphics.attachScroll(section, hold, reveal)
  }
  return () => { toneObserver.disconnect(); graphics.destroy() }
 }, root)
 return { destroy: () => media.revert() }
}

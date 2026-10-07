// Project archive motion (project pages and listing): soft reveals, slow photographic zoom and parallax.
// No pins, no snapping. Header tone follows the band under it: data-header="light" (dark band) or "dark" (paper).
export function createProjectMotion({ root, gsap, ScrollTrigger, onTone }) {
 gsap.registerPlugin(ScrollTrigger)
 const bands = [...root.querySelectorAll('[data-header]')]
 const LINE = 70 // header height: the band under this line decides the tone
 const toneAt = () => {
  const band = bands.find(b => { const r = b.getBoundingClientRect(); return r.top <= LINE && r.bottom > LINE })
  onTone(band?.dataset.header ?? 'dark')
 }
 const triggers = bands.map(band => ScrollTrigger.create({ trigger: band, start: `top ${LINE}px`, end: `bottom ${LINE}px`, onToggle: self => self.isActive && onTone(band.dataset.header) }))
 toneAt()
 // Past the hero, the header gets a solid background so text never runs underneath it (mobile above all).
 const heroBand = root.querySelector('.project-hero, .projects-hero')
 const solidAt = () => document.documentElement.classList.toggle('header-solid', !!heroBand && heroBand.getBoundingClientRect().bottom <= LINE)
 addEventListener('scroll', solidAt, { passive: true }); solidAt()
 const media = gsap.matchMedia()
 media.add({ reduced: '(prefers-reduced-motion: reduce)', mobile: '(max-width: 700px)', desktop: '(min-width: 701px)' }, ({ conditions }) => {
  const { reduced, mobile } = conditions
  if (reduced) return
  const hero = root.querySelector('.project-hero, .projects-hero')
  if (hero) {
   gsap.from(hero.querySelectorAll('[data-reveal]'), { y: 40, opacity: 0, duration: 1.4, stagger: .14, ease: 'power3.out', delay: .1 })
   const media = hero.querySelector('img, video')
   if (media) gsap.fromTo(media, { scale: 1 }, { scale: 1.12, yPercent: 6, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.2 } })
  }
  root.querySelectorAll('[data-reveal]').forEach(el => {
   if (hero?.contains(el)) return
   gsap.from(el, { y: mobile ? 22 : 44, opacity: 0, duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' } })
  })
  root.querySelectorAll('.project-photo img').forEach(img => {
   gsap.fromTo(img, { scale: 1.1 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: img.closest('.project-photo'), start: 'top bottom', end: 'bottom top', scrub: 1.4 } })
  })
  const italic = root.querySelector('.project-crossing-italic')
  if (italic) gsap.fromTo(italic, { xPercent: mobile ? 0 : -4 }, { xPercent: mobile ? 0 : 6, ease: 'none', scrollTrigger: { trigger: italic.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.5 } })
  const offset = root.querySelector('.project-pair-2')
  if (offset && !mobile) gsap.fromTo(offset, { yPercent: 12 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: offset.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.4 } })
  root.querySelectorAll('.projects-card').forEach(card => {
   gsap.from(card, { y: mobile ? 26 : 60, opacity: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 94%', toggleActions: 'play none none none' } })
  })
 }, root)
 return { destroy: () => { triggers.forEach(t => t.kill()); removeEventListener('scroll', solidAt); document.documentElement.classList.remove('header-solid'); media.revert() }, refresh: () => { ScrollTrigger.refresh(); toneAt() } }
}

// Videos page motion (FilmsPage.vue). No GSAP pins: the hero stage is CSS sticky inside a taller section.
// Hero: one scrubbed variable, --p (0 → 1), takes the full-bleed reel into a framed 16:9 screen. Its geometry
// (--win-*, --k, --dx, --dy, --bx, --by) is measured on every refresh and films.css composes clip-path and transforms
// from it, so the frame shows the whole picture once settled and the play button lands on its centre.
// Programme: each frame opens like a letterbox, the preview eases in, the copy rises. Header tone as in project-motion.
export function createFilmMotion({ root, gsap, ScrollTrigger, onTone }) {
 gsap.registerPlugin(ScrollTrigger)
 const bands = [...root.querySelectorAll('[data-header]')]
 const LINE = 70 // header height: the band under this line decides the tone
 const toneAt = () => {
  const band = bands.find(b => { const r = b.getBoundingClientRect(); return r.top <= LINE && r.bottom > LINE })
  onTone(band?.dataset.header ?? 'dark')
 }
 const triggers = bands.map(band => ScrollTrigger.create({ trigger: band, start: `top ${LINE}px`, end: `bottom ${LINE}px`, onToggle: self => self.isActive && onTone(band.dataset.header) }))
 toneAt()
 // The header is transparent over the full-bleed reel and solid once the stage gives way to the page.
 const hero = root.querySelector('.films-hero'), stage = root.querySelector('.films-stage')
 const solidAt = () => document.documentElement.classList.toggle('header-solid', !hero || hero.getBoundingClientRect().bottom <= LINE)
 addEventListener('scroll', solidAt, { passive: true }); solidAt()

 const media = gsap.matchMedia()
 // GSAP runs this when any condition matches, so one of them always does (desktop or mobile).
 media.add({ reduced: '(prefers-reduced-motion: reduce)', mobile: '(max-width: 700px)', desktop: '(min-width: 701px)' }, ({ conditions }) => {
  const { reduced, mobile } = conditions
  if (reduced || !hero || !stage) return

  // Hero copy rises on arrival; the scrubbed --p then carries it away.
  gsap.from(hero.querySelectorAll('[data-reveal]'), { y: 40, opacity: 0, duration: 1.4, stagger: .14, ease: 'power3.out', delay: .15 })
  const button = stage.querySelector('.films-play') // its own transform comes from --p in films.css: animate its children
  if (button) gsap.from(button.children, { opacity: 0, y: 24, duration: 1.2, stagger: .1, ease: 'power3.out', delay: .6, clearProps: 'opacity,transform' })

  const screenMedia = stage.querySelector('.films-screen-media')
  const set = (name, value) => stage.style.setProperty(name, value)
  function measure() {
   const W = stage.clientWidth, H = stage.clientHeight, gutter = parseFloat(getComputedStyle(stage).paddingLeft) || 26
   const ratio = 16 / 9
   const top = mobile ? 96 : 118, bottom = mobile ? Math.max(168, H * .36) : 132 // room for the header above and the caption below (larger on phones)
   const availW = W - gutter * 2, availH = H - top - bottom
   const w = Math.min(availW, availH * ratio), h = w / ratio
   const left = (W - w) / 2, y = top + (availH - h) / 2
   const cover = screenMedia.offsetWidth // the element is the whole picture, covering the stage (films.css)
   set('--win-t', y + 'px'); set('--win-r', W - left - w + 'px'); set('--win-b', H - y - h + 'px'); set('--win-l', left + 'px')
   set('--k', String(w / cover)); set('--dx', left + w / 2 - W / 2 + 'px'); set('--dy', y + h / 2 - H / 2 + 'px')
   // Play disc: from its corner to the centre of the screen (offsetLeft/Top ignore the transform the button carries).
   const disc = button?.querySelector('.films-play-disc')
   if (button && disc) { set('--bx', left + w / 2 - (button.offsetLeft + disc.offsetLeft + disc.offsetWidth / 2) + 'px'); set('--by', y + h / 2 - (button.offsetTop + disc.offsetTop + disc.offsetHeight / 2) + 'px') }
  }
  measure()
  ScrollTrigger.addEventListener('refreshInit', measure)
  const settle = gsap.fromTo(stage, { '--p': 0 }, { '--p': 1, ease: 'power1.inOut', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: .6 } })

  // Programme: letterbox opening, the preview settles, copy and number rise.
  root.querySelectorAll('.films-item').forEach(item => {
   const frame = item.querySelector('.films-media'), preview = frame?.querySelector('.films-preview'), copy = item.querySelectorAll('.films-copy > :not(.films-number)')
   const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 82%', toggleActions: 'play none none none' } })
   tl.fromTo(frame, { clipPath: 'inset(48% 0% 48% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut', clearProps: 'clipPath' })
    .fromTo(preview, { scale: 1.3 }, { scale: 1, duration: 2, ease: 'power3.out' }, 0)
    .from(copy, { y: mobile ? 22 : 40, opacity: 0, duration: 1.1, stagger: .09, ease: 'power3.out' }, .45)
   const number = item.querySelector('.films-number')
   if (number && !mobile) gsap.fromTo(number, { yPercent: 40 }, { yPercent: -30, ease: 'none', scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: .7 } })
  })
  root.querySelectorAll('[data-reveal]').forEach(el => {
   if (hero.contains(el)) return
   gsap.from(el, { y: mobile ? 22 : 40, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' } })
  })
  return () => { ScrollTrigger.removeEventListener('refreshInit', measure); settle.kill(); ['--p', '--win-t', '--win-r', '--win-b', '--win-l', '--k', '--dx', '--dy', '--bx', '--by'].forEach(n => stage.style.removeProperty(n)) }
 }, root)

 return { destroy: () => { triggers.forEach(t => t.kill()); removeEventListener('scroll', solidAt); document.documentElement.classList.remove('header-solid'); media.revert() }, refresh: () => { ScrollTrigger.refresh(); toneAt() } }
}

// Transitions between the Home, the project archive and the project pages (View Transitions API).
// The photograph the visitor chose (an archive card, a Home scene, a related project) grows into the project hero,
// and the hero settles back into its card on the way back; the rest of the page dissolves and the fixed header stays.
// The first guard of a navigation that would change the page on screen starts it and waits until the browser has
// captured that page: the global middleware 0-page-transition (before the header tone and language change) and the
// leave guards that tear down Home or archive motion. The router runs them before any popstate listener of ours,
// so a history step is handled the same way as a click. plugins/page-transition.client.ts notes the clicked link.
// Off with prefers-reduced-motion, without browser support and when the browser animates a swipe back itself.
import { nextTick } from 'vue'
import { findPage, isHome, normalisePath } from '~/data/pages'

// Photographs that carry over between pages are marked data-vt-frame="<project id>". A full-screen frame (Home scene,
// project hero) names its layers: data-vt="media" travels and scales, "shade" cross-fades, "copy" fades out on the
// page left and in on the destination, always above the photograph (page-transition.css).
type Side = 'out' | 'in'
function layers(frame: HTMLElement, side: Side): [HTMLElement, string][] {
 const out: [HTMLElement, string][] = [[frame.querySelector<HTMLElement>('[data-vt=media]') ?? frame, 'project-frame']]
 const shade = frame.querySelector<HTMLElement>('[data-vt=shade]')
 if (shade) out.push([shade, 'project-shade'])
 frame.querySelectorAll<HTMLElement>('[data-vt=copy]').forEach((el, i) => out.push([el, `project-copy-${side}${i ? '-' + (i + 1) : ''}`]))
 return out
}
type Route = { path: string }
let clicked: { path: string; link: Element; time: number } | null = null
let browserAnimates = false
let capture: Promise<void> | null = null
let active: { run: number; ready: Promise<void> } | null = null
let runs = 0
const seen = new WeakSet<Route>()
const placed = new Set<() => void>()
const wait = (ms: number) => new Promise<void>(resolve => { setTimeout(resolve, ms) })

export const projectIdAt = (path: string) => { const d = findPage(path)?.definition; return d?.template === 'project' ? d.projectIds?.[0] as string | undefined : undefined }
const archive = (path: string) => isHome(path) || ['project', 'projects'].includes(findPage(path)?.definition.template ?? '')

// The most visible frame of a project, if at least a third of it is on screen.
function frameInView(id: string) {
 let best: HTMLElement | undefined, most = 0
 document.querySelectorAll<HTMLElement>(`[data-vt-frame="${CSS.escape(id)}"]`).forEach(el => {
  const r = el.getBoundingClientRect()
  const w = Math.min(r.right, innerWidth) - Math.max(r.left, 0), h = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)
  const area = w > 0 && h > 0 ? w * h : 0
  if (area > most && area >= r.width * r.height / 3) { best = el; most = area }
 })
 return best
}

// Visible images only (a Home scene hides the slides it is not showing).
const decoded = (frame: HTMLElement) => Promise.all([...frame.querySelectorAll<HTMLImageElement>('img:not([aria-hidden=true])')].map(img => img.decode().catch(() => {})))

export function notePageLink(link: Element, path: string) { clicked = { path: normalisePath(path), link, time: performance.now() } }
export function noteBrowserAnimation(animates: boolean) { browserAnimates = animates }

// Router: the destination is mounted and at its scroll offset, or the navigation failed.
export function pagePlaced() { placed.forEach(done => done()); placed.clear() }

// Intro animations of the destination start once the transition is running (null without one).
export const pageTransitionReady = () => active?.ready ?? null

// Guards that change what is on screen await this first. The first one of a navigation decides on the transition.
export async function awaitPageCapture(to: Route, from: Route) {
 if (!seen.has(to)) {
  seen.add(to)
  await wait(0) // a history step: its popstate listeners (swipe-back animation) run after the router's guards start
  start(to.path, from.path)
 }
 if (capture) await Promise.race([capture, wait(500)])
}

function start(toPath: string, fromPath: string) {
 const to = normalisePath(toPath), from = normalisePath(fromPath)
 const link = clicked && clicked.path === to && performance.now() - clicked.time < 1500 ? clicked.link : null
 clicked = null
 if (to === from || browserAnimates || !archive(to) || !archive(from) || !document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return
 const id = projectIdAt(to) ?? projectIdAt(from)
 const own = link && (link.closest<HTMLElement>('[data-vt-frame]') ?? link.querySelector<HTMLElement>('[data-vt-frame]'))
 const source = !id ? undefined : own?.dataset.vtFrame === id ? own : frameInView(id)
 const run = ++runs, named: HTMLElement[] = []
 const name = (frame: HTMLElement | undefined, side: Side) => frame && layers(frame, side).forEach(([el, n]) => { el.style.viewTransitionName = n; named.push(el) })
 name(source, 'out')
 // Into a project page, its hero copy rises with its own reveal (project-motion.js) instead of a fade.
 document.documentElement.classList.add('page-transition', ...(projectIdAt(to) ? ['page-transition-project'] : []))
 let captured!: () => void
 const current = capture = new Promise<void>(resolve => { captured = resolve })
 const transition = document.startViewTransition(async () => {
  const arrived = new Promise<void>(resolve => placed.add(resolve))
  if (capture === current) capture = null
  captured()
  await Promise.race([arrived, wait(2500)])
  await wait(0) // unhead writes body classes in a timeout
  dispatchEvent(new Event('scroll')) // scroll-bound state (header tone, solid header) at the final offset
  await nextTick()
  const target = id && frameInView(id)
  if (target && target !== source) { await Promise.race([decoded(target), wait(600)]); name(target, 'in') }
 })
 transition.updateCallbackDone.catch(() => {})
 active = { run, ready: transition.ready.then(() => {}, () => {}) }
 const done = () => {
  named.forEach(el => el.style.removeProperty('view-transition-name'))
  if (active?.run === run) { active = null; document.documentElement.classList.remove('page-transition', 'page-transition-project') }
 }
 transition.finished.then(done, done)
}

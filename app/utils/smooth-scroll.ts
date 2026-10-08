// Shared handle on the smooth wheel scroll (Lenis, plugins/smooth-scroll.client.ts) for code that scrolls the page.
// While Lenis is gliding it ignores outside scrolls, so programmatic scrolls go through it or stop its glide first.
import type Lenis from 'lenis'
let lenis: Lenis | null = null

export function setSmoothScroll(instance: Lenis | null) { lenis = instance }

// Scrolls the window to `top`; `smooth` glides there (with Lenis when active), otherwise jumps.
// Lenis measures the page again first: after a route change its height (and scroll limit) is a different one.
// Its target becomes `top`, so trackpad momentum still arriving carries on from there, not from the previous page.
export function scrollPage(top: number, smooth = false) {
 if (!lenis) return window.scrollTo({ top, behavior: smooth ? 'smooth' : 'instant' })
 haltSmoothScroll()
 lenis.resize()
 lenis.scrollTo(top, { immediate: !smooth, force: true })
}

// Drops any glide in progress, so a scroll set right after (router, restored position) is not overridden.
export function haltSmoothScroll() {
 if (!lenis || lenis.isStopped) return
 lenis.stop(); lenis.start()
}

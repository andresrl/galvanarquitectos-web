// Muted background videos: they play only while in view, with the tab shown and motion allowed.
// Browsers pause media when the tab is hidden or the computer sleeps, and an IntersectionObserver does
// not fire again on return, so every video is checked again on visibilitychange, focus, pageshow
// (back/forward cache) and online. A pause the page did not ask for is retried once the page is shown.
// An optional data-rate attribute sets the playback speed (e.g. data-rate=".75").
export function createAmbientVideos(allowed: () => boolean = () => true) {
 const inView = new Map<HTMLVideoElement, boolean>()
 const targets = new Map<Element, HTMLVideoElement>()
 const shouldPlay = (v: HTMLVideoElement) => allowed() && !!inView.get(v) && document.visibilityState === 'visible'
 function sync(v: HTMLVideoElement) {
  if (!shouldPlay(v)) { v.pause(); return }
  if (!v.paused) return
  v.muted = true
  const rate = Number(v.dataset.rate) || 1
  if (v.playbackRate !== rate) { v.defaultPlaybackRate = rate; v.playbackRate = rate }
  // After a long sleep the connection may have dropped and left the element in error: reload it.
  if (v.error || v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) v.load()
  v.play().catch(() => {})
 }
 const syncAll = () => inView.forEach((_, v) => sync(v))
 let retry = 0
 const onPause = (e: Event) => { const v = e.target as HTMLVideoElement; if (shouldPlay(v)) { clearTimeout(retry); retry = window.setTimeout(syncAll, 300) } }
 const observer = new IntersectionObserver(entries => entries.forEach(e => {
  const v = targets.get(e.target)
  if (v) { inView.set(v, e.isIntersecting); sync(v) }
 }), { threshold: .01 })
 const events = ['focus', 'pageshow', 'online'] as const
 document.addEventListener('visibilitychange', syncAll)
 events.forEach(name => window.addEventListener(name, syncAll))
 return {
  // Plays while `target` (the video itself by default) is in view.
  observe(v: HTMLVideoElement, target: Element = v) { inView.set(v, false); targets.set(target, v); v.addEventListener('pause', onPause); observer.observe(target) },
  // Manual control for videos without an observed target (e.g. the contact drawer).
  set(v: HTMLVideoElement, active: boolean) { if (!inView.has(v)) v.addEventListener('pause', onPause); inView.set(v, active); sync(v) },
  sync: syncAll,
  destroy() {
   observer.disconnect(); clearTimeout(retry)
   document.removeEventListener('visibilitychange', syncAll)
   events.forEach(name => window.removeEventListener(name, syncAll))
   inView.forEach((_, v) => { v.removeEventListener('pause', onPause); v.pause() })
   inView.clear(); targets.clear()
  }
 }
}

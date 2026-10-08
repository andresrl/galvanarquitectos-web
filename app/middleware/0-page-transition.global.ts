// Runs before the other global middleware: a page transition captures the page on screen before
// the header tone and language they set can change (utils/page-transition.ts).
export default defineNuxtRouteMiddleware(async (to, from) => {
 if (import.meta.client) await awaitPageCapture(to, from)
})

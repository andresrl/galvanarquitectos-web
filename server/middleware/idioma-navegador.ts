// First visit only: a browser that prefers Spanish is taken from an English page to its Spanish equivalent (302).
// Never for crawlers or link previews, never when the visitor already chose a language (cookie galvan-lang),
// never for assets or non-HTML requests. Decision of Andrés, 7 Oct 2026 (replaces «English always»).
import { alternatePath, routeLocale, normalisePath } from '../../app/data/pages'
import { guideIndex } from '../../app/data/guides'
const BOTS = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegram|twitterbot|linkedin|embedly|lighthouse|headless|preview|validator|curl|wget/i
// Prefers Spanish when Spanish ranks before English in Accept-Language (or English is absent).
function prefersSpanish(header = '') {
 const langs = header.split(',').map(part => { const [tag, q] = part.trim().split(';q='); return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 } }).filter(l => l.tag).sort((a, b) => b.q - a.q)
 const es = langs.findIndex(l => l.tag === 'es' || l.tag.startsWith('es-') || l.tag === 'ca' || l.tag.startsWith('ca-') || l.tag === 'gl' || l.tag === 'eu')
 const en = langs.findIndex(l => l.tag === 'en' || l.tag.startsWith('en-'))
 return es !== -1 && (en === -1 || es < en)
}
export default defineEventHandler(event => {
 if (event.method !== 'GET') return
 const url = getRequestURL(event), path = normalisePath(url.pathname)
 if (path.includes('.') || path.startsWith('/_') || path.startsWith('/api')) return
 if (!(getRequestHeader(event, 'accept') ?? '').includes('text/html')) return
 appendResponseHeader(event, 'Vary', 'Accept-Language, Cookie')
 if (getCookie(event, 'galvan-lang') || BOTS.test(getRequestHeader(event, 'user-agent') ?? '')) return
 if (routeLocale(path) !== 'en' || !prefersSpanish(getRequestHeader(event, 'accept-language'))) return
 const target = alternatePath(path, 'es') ?? (path === guideIndex.en ? guideIndex.es : undefined)
 if (!target) return
 setCookie(event, 'galvan-lang', 'es', { path: '/', maxAge: 31536000, sameSite: 'lax' })
 return sendRedirect(event, target + (url.search || '') + (url.hash || ''), 302)
})

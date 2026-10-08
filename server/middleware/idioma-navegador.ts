// First visit only: a browser that prefers Spanish is taken from an English page to its Spanish equivalent (302).
// Never for crawlers or link previews. On /, a manual language choice (cookie galvan-lang) wins;
// on other URLs an explicit language choice is respected.
// never for assets or non-HTML requests. Decision of Andrés, 7 Oct 2026 (replaces «English always»).
import { alternatePath, routeLocale, normalisePath } from '../../app/data/pages'
import { guideIndex } from '../../app/data/guides'
import { languageFromHeader, languageCrawler } from '../../app/utils/language'
export default defineEventHandler(event => {
 if (event.method !== 'GET') return
 const url = getRequestURL(event), path = normalisePath(url.pathname)
 if (path.includes('.') || path.startsWith('/_') || path.startsWith('/api')) return
 if (!(getRequestHeader(event, 'accept') ?? '').includes('text/html')) return
 appendResponseHeader(event, 'Vary', 'Accept-Language, Cookie')
 const choice = getCookie(event, 'galvan-lang')
 if (languageCrawler.test(getRequestHeader(event, 'user-agent') ?? '')) return
 const manual = choice === 'en' || choice === 'es' ? choice : undefined
 if (manual && path !== '/') return
 if (routeLocale(path) !== 'en' || (manual ?? languageFromHeader(getRequestHeader(event, 'accept-language'))) !== 'es') return
 const target = alternatePath(path, 'es') ?? (path === guideIndex.en ? guideIndex.es : undefined)
 if (!target) return
 // Only an explicit click on the language selector is stored as a manual preference.
 return sendRedirect(event, target + (url.search || '') + (url.hash || ''), 302)
})

// Sitemap: only published pages (app/data/publish.ts, guides with draft: false), and only while indexing is enabled.
// Each registry page lists its language equivalents; project pages list their photographs (image sitemap).
import { routes } from '../../app/data/routes'
import { allPages as pages, homePaths, homePublished } from '../../app/data/pages'
import { projectById } from '../../app/data/projects/projects'

const lastmod = new Date().toISOString().slice(0, 10) // build date: pages change with each deploy

export default defineEventHandler(event => {
 const cfg = useRuntimeConfig(event).public
 setResponseHeader(event, 'content-type', 'application/xml')
 const escape = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;'), abs = (p: string) => escape(new URL(p, cfg.siteUrl).href)
 const registered = new Set([...pages.flatMap(p => Object.values(p.paths)), ...Object.values(homePaths)])
 type Entry = { loc: string; alternates?: Record<string, string>; images?: string[] }
 const imagesOf = (projectIds?: string[]) => (projectIds ?? []).flatMap(id => { const m = projectById(id)?.media; return m ? [m.hero, ...m.gallery, m.pause].map(i => i.src) : [] })
 const entries: Entry[] = cfg.indexable ? [
  ...(homePublished ? Object.values(homePaths).map(loc => ({ loc, alternates: homePaths })) : []),
  ...pages.filter(p => p.status === 'published').flatMap(p => Object.values(p.paths).map(loc => ({ loc, alternates: p.paths, images: p.template === 'project' ? imagesOf(p.projectIds) : undefined }))),
  ...routes.filter(r => r.status === 'publicada' && !registered.has(r.path) && !['legal', 'interna'].includes(r.kind)).map(r => ({ loc: r.path })),
  ...cfg.publishedPosts.map((loc: string) => ({ loc }))
 ] : []
 const url = (e: Entry) => '<url><loc>' + abs(e.loc) + '</loc><lastmod>' + lastmod + '</lastmod>'
  + (e.alternates ? Object.entries(e.alternates).map(([l, p]) => '<xhtml:link rel="alternate" hreflang="' + l + '" href="' + abs(p) + '"/>').join('') + '<xhtml:link rel="alternate" hreflang="x-default" href="' + abs(e.alternates.en) + '"/>' : '')
  + (e.images ?? []).map(src => '<image:image><image:loc>' + abs(src) + '</image:loc></image:image>').join('') + '</url>'
 return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' + entries.map(url).join('') + '</urlset>'
})

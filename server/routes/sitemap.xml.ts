// Sitemap: only published pages (app/data/publish.ts, guides with draft: false), and only while indexing is enabled.
// Each registry page lists its language equivalents; project pages list their photographs (image sitemap)
// and the videos page its videos (video sitemap, with the title and description of that language).
import { routes } from '../../app/data/routes'
import { allPages as pages, homePaths, homePublished } from '../../app/data/pages'
import { projectById } from '../../app/data/projects/projects'
import { films, filmsPublished } from '../../app/data/films'

const lastmod = new Date().toISOString().slice(0, 10) // build date: pages change with each deploy

export default defineEventHandler(event => {
 const cfg = useRuntimeConfig(event).public
 setResponseHeader(event, 'content-type', 'application/xml')
 const escape = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;'), abs = (p: string) => escape(new URL(p, cfg.siteUrl).href)
 const registered = new Set([...pages.flatMap(p => Object.values(p.paths)), ...Object.values(homePaths)])
 type Video = { thumbnail: string; title: string; description: string; content: string; duration: number }
 type Entry = { loc: string; alternates?: Record<string, string>; images?: string[]; videos?: Video[] }
 const imagesOf = (projectIds?: string[]) => (projectIds ?? []).flatMap(id => { const m = projectById(id)?.media; return m ? [m.hero, ...m.gallery, m.pause].map(i => i.src) : [] })
 const videosIn = (lang: 'en' | 'es'): Video[] => films.map(f => ({ thumbnail: f.media.poster.jpg, title: f.title[lang], description: f.text[lang], content: f.media.sources[1080].mp4, duration: Math.round(f.media.duration) }))
 const entries: Entry[] = cfg.indexable ? [
  ...(homePublished ? Object.values(homePaths).map(loc => ({ loc, alternates: homePaths })) : []),
  ...pages.filter(p => p.status === 'published').flatMap(p => Object.entries(p.paths).map(([lang, loc]) => ({ loc, alternates: p.paths, images: p.template === 'project' ? imagesOf(p.projectIds) : undefined, videos: p.template === 'films' ? videosIn(lang as 'en' | 'es') : undefined }))),
  ...routes.filter(r => r.status === 'publicada' && !registered.has(r.path) && !['legal', 'interna'].includes(r.kind)).map(r => ({ loc: r.path })),
  ...cfg.publishedPosts.map((loc: string) => ({ loc }))
 ] : []
 const url = (e: Entry) => '<url><loc>' + abs(e.loc) + '</loc><lastmod>' + lastmod + '</lastmod>'
  + (e.alternates ? Object.entries(e.alternates).map(([l, p]) => '<xhtml:link rel="alternate" hreflang="' + l + '" href="' + abs(p) + '"/>').join('') + '<xhtml:link rel="alternate" hreflang="x-default" href="' + abs(e.alternates.en) + '"/>' : '')
  + (e.images ?? []).map(src => '<image:image><image:loc>' + abs(src) + '</image:loc></image:image>').join('')
  + (e.videos ?? []).map(v => '<video:video><video:thumbnail_loc>' + abs(v.thumbnail) + '</video:thumbnail_loc><video:title>' + escape(v.title) + '</video:title><video:description>' + escape(v.description) + '</video:description><video:content_loc>' + abs(v.content) + '</video:content_loc><video:duration>' + v.duration + '</video:duration><video:publication_date>' + filmsPublished + '</video:publication_date></video:video>').join('') + '</url>'
 return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">' + entries.map(url).join('') + '</urlset>'
})

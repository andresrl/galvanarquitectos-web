import { routes } from '../../app/data/routes'
import { allPages as pages } from '../../app/data/pages'
// Only published pages, and only while indexing is enabled. Registry pages list their language equivalents.
export default defineEventHandler(event=>{
 const cfg=useRuntimeConfig(event).public;setResponseHeader(event,'content-type','application/xml')
 const escape=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;'),abs=(p:string)=>escape(new URL(p,cfg.siteUrl).href)
 const registered=new Set(pages.flatMap(p=>Object.values(p.paths)))
 const entries:{loc:string;alternates?:Record<string,string>}[]=cfg.indexable?[
  ...pages.filter(p=>p.status==='published').flatMap(p=>Object.values(p.paths).map(loc=>({loc,alternates:p.paths}))),
  ...routes.filter(r=>r.status==='publicada'&&!registered.has(r.path)&&!['legal','interna'].includes(r.kind)).map(r=>({loc:r.path})),
  ...cfg.publishedPosts.map((loc:string)=>({loc}))
 ]:[]
 return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+entries.map(e=>'<url><loc>'+abs(e.loc)+'</loc>'+(e.alternates?Object.entries(e.alternates).map(([l,p])=>'<xhtml:link rel="alternate" hreflang="'+l+'" href="'+abs(p)+'"/>').join('')+'<xhtml:link rel="alternate" hreflang="x-default" href="'+abs(e.alternates.en)+'"/>':'')+'</url>').join('')+'</urlset>'
})

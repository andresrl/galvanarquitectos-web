// /llms.txt and /llms-full.txt (llmstxt.org): a plain, factual map of the studio for language models and AI search.
// Built from the page registry, so it always matches the site. Only confirmed facts; guides only when published.
import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'
import { allPages, homePaths } from '../../app/data/pages'
import { negocio } from '../../app/data/negocio'
import { projects, projectPath, projectsIndexPath } from '../../app/data/projects/projects'
import { locations, locationIds, services, serviceIds } from '../../app/data/taxonomy'
import { studioPaths } from '../../app/data/studio'
import { films, filmsPaths, clock } from '../../app/data/films'
import { contactPaths } from '../../app/data/contact'
import { guideIndex, guidePath, guideSlug } from '../../app/data/guides'
import { internationalPaths } from '../../app/data/international'
import { areaIds, areaPath } from '../../app/data/areas'

export async function buildLlms(event: H3Event, full: boolean) {
 const cfg = useRuntimeConfig(event).public, req = getRequestURL(event)
 const site = cfg.indexable ? cfg.siteUrl : req.origin
 const u = (p: string) => new URL(p, site).href
 const a = negocio.arquitecto, d = negocio.contacto.direccion
 const hub = (id: string) => allPages.find(p => p.id === `${id}-hub`)!
 const out: string[] = []
 const line = (s = '') => out.push(s)

 line(`# ${negocio.nombre}`)
 line()
 line(`> Architecture studio in Marbella (Costa del Sol, Spain) led by architect ${a.nombre}. New-build luxury villas and complete villa renovations, with design, planning permissions, site supervision and contractor coordination according to the agreed scope. Personal attention from the architect, in English and Spanish, including clients who live abroad.`)
 line()
 line('## Key facts')
 line(`- Architect: ${a.nombre}. Trained at the ${a.formacion}; in Marbella since 1998; studio consolidated in 2003.`)
 line(`- Address: ${d.streetAddress}, ${d.postalCode} ${d.addressLocality} (${d.addressRegion}), Spain`)
 line(`- Contact: ${negocio.contacto.email} · ${negocio.contacto.telefono} (mobile) · ${negocio.contacto.telefonoEstudio} (studio) · ${u(contactPaths.en)}`)
 line('- Languages: English and Spanish (website in both: English at /, Spanish at /es)')
 line(`- Areas: Costa del Sol — ${locationIds.map(l => locations[l].name.en).join(', ')}`)
 line(`- Services: ${serviceIds.map(id => services[id].name.en).join(', ')}.`)
 line(`- Instagram: ${negocio.sameAs[0]}`)
 line()

 line('## Services')
 for (const id of serviceIds) {
  const h = hub(id), en = h.content.en
  line(`- [${services[id].name.en}](${u(h.paths.en)}): ${en.description} (Spanish: ${u(h.paths.es)})`)
  if (full) {
   line(`  ${en.introLead} ${en.introText}`)
   for (const [q, ans] of en.faqs) line(`  - Q: ${q} A: ${ans}`)
   const zones = allPages.filter(p => p.type === 'service-location' && p.serviceId === id)
   line(`  - By area: ${zones.map(z => `[${locations[z.locationId as keyof typeof locations].name.en}](${u(z.paths.en)})`).join(', ')}`)
  }
 }
 line()

 line(`## Projects (${projects.length})`)
 line(`Archive: ${u(projectsIndexPath.en)} · Spanish: ${u(projectsIndexPath.es)}`)
 for (const p of projects) {
  const facts = [p.zone ? locations[p.zone].name.en : null, p.status === 'completed' ? 'completed' : p.status === 'ongoing' ? 'in progress' : null, p.kind === 'renovation' ? 'complete renovation' : p.kind === 'hospitality' ? 'boutique hotel' : p.kind === 'tender' ? 'tender proposal' : null, p.imagery === 'visualisation' ? 'shown with architectural visualisations' : 'photographed'].filter(Boolean).join(', ')
  line(`- [${p.name.en}](${u(projectPath(p, 'en'))}): ${p.copy.en.lead} (${facts})`)
  if (full && p.copy.en.body[2]) line(`  ${p.copy.en.body[2]}`)
 }
 line()

 line('## Studio and contact')
 line(`- [The studio and the architect](${u(studioPaths.en)}): ${a.descripcion.en}`)
 line(`- [Videos](${u(filmsPaths.en)}): ${films.map(f => `${f.title.en} (${clock(f.media.duration)}${f.kind === 'built' ? ', built villa filmed on site' : f.kind === 'visualisation' ? ', architectural visualisation' : f.kind === 'tender' ? ', visualisation of a tender proposal' : ', studio reel'})`).join('; ')}. Spanish: ${u(filmsPaths.es)}`)
 line(`- [International clients](${u(internationalPaths.en)}): how projects are followed from abroad — video calls, site visits, follow-up of the works, English and Spanish.`)
 line(`- [Contact](${u(contactPaths.en)}): form, email and phone; replies in English or Spanish.`)
 line()
 line('## Areas')
 line(`- Marbella (the studio's base): ${u(homePaths.en)}`)
 for (const id of areaIds) line(`- [Architect ${locations[id].in.en}](${u(areaPath(id, 'en'))})`)
 line(`- [Home](${u(homePaths.en)}) · [Inicio](${u(homePaths.es)})`)
 line()

 const guides = (await queryCollection(event, 'blog').where('draft', '=', false).order('order', 'ASC').all().catch(() => [])) as any[]
 if (guides.length) {
  line('## Guides')
  for (const g of guides) line(`- [${g.title}](${u(guidePath(g.lang, guideSlug(g.path)))}): ${g.description ?? ''}`)
  line(`Index: ${u(guideIndex.en)} · ${u(guideIndex.es)}`)
  line()
 }
 if (!full) { line('## Optional'); line(`- [Full version with service texts, FAQs and project descriptions](${u('/llms-full.txt')})`) }
 setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
 return out.join('\n') + '\n'
}

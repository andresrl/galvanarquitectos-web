// Project archive: curation (scripts/media/projects.json) + facts + copy + generated media.
// Facts come only from each proyecto.md and the user's confirmations; unknown fields stay out of the public view.
import curation from '../../../scripts/media/projects.json'
import type { Locale } from '../pages/types'
import type { Project, ProjectFacts } from './types'
import type { ServiceId } from '../taxonomy'
import { projectCopy } from './content'
import { projectMedia } from './media.generated'

const pendingCommon = 'Validate the editorial reading of the images with Paco'
const facts: Record<string, ProjectFacts> = {
 'villa-paris': { status: 'completed', zone: 'nueva-andalucia', imagery: 'photography', pending: [pendingCommon] },
 'la-resina': { status: 'completed', zone: 'estepona', imagery: 'photography', pending: [pendingCommon] },
 'villa-alcala': { status: 'ongoing', imagery: 'visualisation', pending: ['Zone', pendingCommon] },
 'villa-pino': { status: 'completed', imagery: 'visualisation', pending: ['Zone and type of intervention', pendingCommon] },
 atalaya: { status: 'completed', kind: 'renovation', imagery: 'visualisation', pending: ['Zone', pendingCommon] },
 'villa-pareja': { status: null, kind: 'tender', imagery: 'visualisation', pending: ['Status', 'Zone', 'Never present as built or awarded'] },
 'cortijo-nagueles': { status: 'ongoing', imagery: 'visualisation', pending: ['Zone (the name is not a confirmed location)', pendingCommon] },
 'hotel-boutique': { status: 'ongoing', zone: 'marbella', kind: 'hospitality', imagery: 'visualisation', pending: ['No rooms, category or spa facilities may be stated', pendingCommon] },
 'huerta-belon': { status: null, imagery: 'visualisation', pending: ['Status', 'Zone', pendingCommon] },
 'altos-de-los-monteros': { status: null, imagery: 'visualisation', pending: ['Status, intervention and location (the name does not prove it)', pendingCommon] },
 'the-house': { status: 'completed', imagery: 'photography', pending: ['Zone and type of intervention', pendingCommon] },
 'villa-soal': { status: 'ongoing', imagery: 'visualisation', pending: ['Zone', pendingCommon] },
 'the-villas': { status: 'ongoing', imagery: 'visualisation', pending: ['Zone', pendingCommon] },
 'villas-in-the-landscape': { status: 'ongoing', imagery: 'visualisation', pending: ['Provisional public name (internal reference P8)', 'Which images belong to each villa', 'Zone'] },
 'bleu-royal': { status: null, imagery: 'visualisation', pending: ['Status, intervention and zone', 'No structural vaults, age or restoration may be stated'] },
 'villa-feliz': { status: 'ongoing', imagery: 'visualisation', pending: ['Zone and type of intervention', pendingCommon] },
 'villa-ambar': { status: 'completed', imagery: 'photography', pending: ['Zone', pendingCommon] },
 castilla: { status: null, imagery: 'visualisation', pending: ['Status, intervention and zone', pendingCommon] },
 'alcala-solvilla': { status: null, imagery: 'visualisation', pending: ['Status, intervention and zone'] },
 cutar: { status: 'completed', imagery: 'visualisation', pending: ['Zone and intervention (the name is not a location)', pendingCommon] },
 orion: { status: 'completed', imagery: 'visualisation', pending: ['Zone and type of intervention', pendingCommon] },
 sirio: { status: 'completed', imagery: 'photography', pending: ['Zone and type of intervention', pendingCommon] },
 'villa-relojero': { status: 'completed', imagery: 'photography', pending: ['Zone', 'Higher-resolution photographs (source is 1920 px)'] },
 elviria: { status: null, imagery: 'visualisation', pending: ['Status, intervention and zone (the name is not a confirmed location)'] },
 'la-montua': { status: null, imagery: 'visualisation', pending: ['Status, intervention and location'] },
 'villa-del-golf': { status: null, imagery: 'visualisation', pending: ['Provisional public name', 'Status, intervention and zone'] },
 'villa-silver': { status: 'completed', imagery: 'photography', pending: ['Project text: only a short visual reading is published', 'Zone'] }
}

// Services shown by each project (text of proyecto.md + images). Pending Paco's confirmation; used for
// «related by service» links, never as a claim about the commission's contract.
const servicesOf = (id: string): ServiceId[] => [id === 'atalaya' ? 'renovation' : 'architecture']

export const projects: Project[] = curation.projects.map((c, order) => {
 const copy = projectCopy[c.id], media = projectMedia[c.id], fact = facts[c.id]
 if (!copy || !media || !fact) throw new Error(`Project ${c.id} is missing copy, media or facts`)
 if (media.card && !(copy.es.cardAlt && copy.en.cardAlt)) throw new Error(`Project ${c.id} has a card image without cardAlt`)
 const { name, nameEn, ...byLocale } = copy
 return { id: c.id, order, name: { en: nameEn ?? name, es: name }, slug: c.slug as Record<Locale, string>, featured: !!c.featured, copy: byLocale, media, services: servicesOf(c.id), ...fact }
})

export const projectById = (id: string) => projects.find(p => p.id === id)
export const projectPath = (project: Project, locale: Locale) => locale === 'en' ? `/projects/${project.slug.en}` : `/es/proyectos/${project.slug.es}`
// Thumbnail for listings and related-project cards: media.card when curated, otherwise the hero.
export const projectCard = (p: Project, locale: Locale) => ({ id: p.id, name: p.name[locale], heading: p.copy[locale].heading,
 alt: p.media.card ? p.copy[locale].cardAlt! : p.copy[locale].heroAlt, image: p.media.card ?? p.media.hero, path: projectPath(p, locale) })
export const projectsIndexPath: Record<Locale, string> = { en: '/projects', es: '/es/proyectos' }

// Next projects for a page: the following two in curated order, then two more with the same status.
export function relatedProjects(project: Project, count = 4): Project[] {
 const after = [...projects.slice(project.order + 1), ...projects.slice(0, project.order)]
 const next = after.slice(0, 2)
 const same = after.filter(p => !next.includes(p) && p.status && p.status === project.status)
 return [...next, ...same, ...after.filter(p => !next.includes(p) && !same.includes(p))].slice(0, count)
}

// Projects sharing a service with this one (most shared services first), excluding itself.
export function projectsByService(project: Project, count = 3): Project[] {
 const mine = new Set(project.services ?? [])
 return projects.filter(p => p !== project).map(p => ({ p, shared: (p.services ?? []).filter(s => mine.has(s) && s !== 'architecture').length * 2 + ((p.services ?? []).includes('architecture') && mine.has('architecture') ? 1 : 0) }))
  .sort((a, b) => b.shared - a.shared || ((a.p.order - project.order + projects.length) % projects.length) - ((b.p.order - project.order + projects.length) % projects.length)).slice(0, count).map(x => x.p)
}

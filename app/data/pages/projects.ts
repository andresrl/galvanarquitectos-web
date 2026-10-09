// Registry definitions for the project archive: the listing and one page per project, EN and ES.
import type { Locale, PageDefinition, ProjectPageContent } from './types'
import { projects, projectPath, projectsIndexPath } from '../projects/projects'
import { negocio } from '../negocio'
import { locations } from '../taxonomy'
import { studioCopy, studioPaths } from '../studio'
import { contactCopy, contactPaths } from '../contact'
import { filmsCopy, filmsPaths, reel } from '../films'

const ui = {
 en: { home: 'Home', projects: 'Projects' },
 es: { home: 'Inicio', projects: 'Proyectos' }
}
const page = (locale: Locale, c: Omit<ProjectPageContent, 'home' | 'projects' | 'faqs'>): ProjectPageContent => ({ ...ui[locale], faqs: [], ...c })

export const projectsIndexPage: PageDefinition<ProjectPageContent> = {
 id: 'projects', type: 'editorial', template: 'projects', paths: projectsIndexPath, status: 'draft',
 content: {
  en: page('en', { label: 'Projects', title: 'Villa projects on the Costa del Sol',
   description: 'Villas, renovations and residential projects by architect Francisco Martínez Galván in Marbella and on the Costa del Sol: villa architecture and renovation.' }),
  es: page('es', { label: 'Proyectos', title: 'Proyectos de villas en la Costa del Sol',
   description: 'Villas, reformas y proyectos residenciales del arquitecto Francisco Martínez Galván en Marbella y la Costa del Sol: arquitectura y reformas de villas.' })
 },
 sources: ['Graphics/VISENI/proyectos'], pending: ['Review the listing order with Paco']
}

export const projectPages: PageDefinition<ProjectPageContent>[] = projects.map(p => ({
 id: `project-${p.id}`, type: 'project', template: 'project', projectIds: [p.id],
 paths: { en: projectPath(p, 'en'), es: projectPath(p, 'es') }, status: 'draft',
 content: {
  en: page('en', { label: p.name.en, title: `${p.name.en} · ${p.zone ? locations[p.zone].name.en : 'Costa del Sol'}`, description: p.copy.en.lead, image: { src: p.media.hero.jpg!, alt: p.copy.en.heroAlt } }),
  es: page('es', { label: p.name.es, title: `${p.name.es} · ${p.zone ? locations[p.zone].name.es : 'Costa del Sol'}`, description: p.copy.es.lead, image: { src: p.media.hero.jpg!, alt: p.copy.es.heroAlt } })
 },
 sources: [`Graphics/VISENI/proyectos (${p.id})`], pending: p.pending
}))

export const studioPage: PageDefinition<ProjectPageContent> = {
 id: 'studio', type: 'editorial', template: 'studio', paths: studioPaths, status: 'draft',
 content: {
  en: page('en', { label: studioCopy.en.label, title: studioCopy.en.title, description: studioCopy.en.description, image: { src: '/media/studio/studio-og.jpg', alt: studioCopy.en.portraitAlt } }),
  es: page('es', { label: studioCopy.es.label, title: studioCopy.es.title, description: studioCopy.es.description, image: { src: '/media/studio/studio-og.jpg', alt: studioCopy.es.portraitAlt } })
 },
 sources: ['CLAUDE.md §5 and §9.6', 'Graphics/VISENI (portrait, studio scenes)'], pending: ['Review biography and approach with Paco', 'The studio scenes are AI-generated; Paco approved their use']
}

export const contactPage: PageDefinition<ProjectPageContent> = {
 id: 'contact', type: 'editorial', template: 'contact', paths: contactPaths, status: 'draft',
 content: {
  en: page('en', { label: contactCopy.en.label, title: contactCopy.en.title, description: contactCopy.en.description, image: { src: '/media/studio/studio-og.jpg', alt: contactCopy.en.videoAlt } }),
  es: page('es', { label: contactCopy.es.label, title: contactCopy.es.title, description: contactCopy.es.description, image: { src: '/media/studio/studio-og.jpg', alt: contactCopy.es.videoAlt } })
 },
 sources: ['CLAUDE.md §5 and §9.7 (agreed form fields, contact details)'], pending: ['Form has no backend: it prepares an email in the visitor’s app']
}

// Videos: the 2026 reel and the project videos (FilmsPage.vue). Open Graph falls back to the reel poster.
export const filmsPage: PageDefinition<ProjectPageContent> = {
 id: 'films', type: 'editorial', template: 'films', paths: filmsPaths, status: 'draft',
 content: {
  en: page('en', { label: filmsCopy.en.label, title: filmsCopy.en.title, description: filmsCopy.en.description, image: { src: reel.media.poster.jpg, alt: filmsCopy.en.lead } }),
  es: page('es', { label: filmsCopy.es.label, title: filmsCopy.es.title, description: filmsCopy.es.description, image: { src: reel.media.poster.jpg, alt: filmsCopy.es.lead } })
 },
 sources: ['__Material__/videos-reel (reel and project videos with their posters, 9 Oct 2026)', 'app/data/projects (names, status and imagery of each project)'],
 pending: ['Review the video descriptions with Paco', 'Authorship of the videos (filming and visualisation credits) if it should be shown', 'uploadDate of the VideoObjects: set it to the publication date']
}

// Legal pages: drafts until the identification data pending below is confirmed (never published with placeholders).
import { legalCopy, legalPaths, type LegalId } from '../legal'
export const legalPages: PageDefinition<ProjectPageContent>[] = (Object.keys(legalPaths) as LegalId[]).map(id => ({
 id: `legal-${id}`, type: 'editorial', template: 'legal', paths: legalPaths[id], status: 'draft',
 content: { en: page('en', { label: legalCopy[id].en.label, title: legalCopy[id].en.title, description: legalCopy[id].en.description }), es: page('es', { label: legalCopy[id].es.label, title: legalCopy[id].es.title, description: legalCopy[id].es.description }) },
 sources: ['CLAUDE.md §5 (contact details, address)', 'How the site works (no form backend, analytics disabled)'],
 pending: ['Tax ID (NIF) of the holder', 'Professional association and registration number (Colegio de Arquitectos)', 'Legal form if the studio is a company', 'Hosting and email providers (processors)']
}))

// International clients.
import { internationalCopy, internationalPaths } from '../international'
export const internationalPage: PageDefinition<ProjectPageContent> = {
 id: 'international', type: 'editorial', template: 'international', paths: internationalPaths, status: 'draft',
 content: {
  en: { ...page('en', { label: internationalCopy.en.label, title: internationalCopy.en.title, description: internationalCopy.en.description }), faqs: internationalCopy.en.faqs },
  es: { ...page('es', { label: internationalCopy.es.label, title: internationalCopy.es.title, description: internationalCopy.es.description }), faqs: internationalCopy.es.faqs }
 },
 sources: ['CLAUDE.md §5 (clients abroad: video calls, visits, follow-up; EN/ES)'], pending: ['Review with Paco']
}

// Area pages (all areas except Marbella, covered by the Home).
import { areaIds, areaPath, areaUi } from '../areas'
import { locationCopy } from '../content/locations'
export const areaPages: PageDefinition<ProjectPageContent>[] = areaIds.map(loc => ({
 id: `area-${loc}`, type: 'editorial', template: 'area', locationId: loc, paths: { en: areaPath(loc, 'en'), es: areaPath(loc, 'es') }, status: 'draft',
 content: {
  en: { ...page('en', { label: locations[loc].name.en, title: areaUi.en.heading(locations[loc].in.en), description: areaUi.en.description(locations[loc].in.en) }), faqs: [locationCopy[loc].faq.en] },
  es: { ...page('es', { label: locations[loc].name.es, title: areaUi.es.heading(locations[loc].in.es), description: areaUi.es.description(locations[loc].in.es) }), faqs: [locationCopy[loc].faq.es] }
 },
 sources: ['app/data/content/locations.ts (general geography of the area)'], pending: ['Review of the local copy with Paco', 'Projects confirmed in this area']
}))

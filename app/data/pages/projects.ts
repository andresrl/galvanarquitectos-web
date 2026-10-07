// Registry definitions for the project archive: the listing and one page per project, EN and ES.
import type { Locale, PageDefinition, ProjectPageContent } from './types'
import { projects, projectPath, projectsIndexPath } from '../projects/projects'
import { negocio } from '../negocio'
import { locations } from '../taxonomy'
import { studioCopy, studioPaths } from '../studio'
import { contactCopy, contactPaths } from '../contact'

const ui = {
 en: { home: 'Home', projects: 'Projects' },
 es: { home: 'Inicio', projects: 'Proyectos' }
}
const page = (locale: Locale, c: Omit<ProjectPageContent, 'home' | 'projects' | 'faqs'>): ProjectPageContent => ({ ...ui[locale], faqs: [], ...c })

export const projectsIndexPage: PageDefinition<ProjectPageContent> = {
 id: 'projects', type: 'editorial', template: 'projects', paths: projectsIndexPath, status: 'draft',
 content: {
  en: page('en', { label: 'Projects', title: 'Villa projects on the Costa del Sol',
   description: 'Villas, renovations and residential projects by architect Francisco Martínez Galván in Marbella and on the Costa del Sol: architecture, interiors, landscape.' }),
  es: page('es', { label: 'Proyectos', title: 'Proyectos de villas en la Costa del Sol',
   description: 'Villas, reformas y proyectos residenciales del arquitecto Francisco Martínez Galván en Marbella y la Costa del Sol: arquitectura, interiores y paisaje.' })
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

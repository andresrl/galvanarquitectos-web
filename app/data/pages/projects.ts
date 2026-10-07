// Registry definitions for the project archive: the listing and one page per project, EN and ES.
import type { Locale, PageDefinition, ProjectPageContent } from './types'
import { projects, projectPath, projectsIndexPath } from '../projects/projects'
import { negocio } from '../negocio'

const ui = {
 en: { home: 'Home', projects: 'Projects' },
 es: { home: 'Inicio', projects: 'Proyectos' }
}
const page = (locale: Locale, c: Omit<ProjectPageContent, 'home' | 'projects' | 'faqs'>): ProjectPageContent => ({ ...ui[locale], faqs: [], ...c })

export const projectsIndexPage: PageDefinition<ProjectPageContent> = {
 id: 'projects', type: 'editorial', template: 'projects', paths: projectsIndexPath, status: 'draft',
 content: {
  en: page('en', { label: 'Projects', title: `Projects: villas on the Costa del Sol · ${negocio.marca}`,
   description: 'Explore the studio’s project archive: villas, renovations and residential proposals in Marbella and on the Costa del Sol, where architecture, interiors and landscape work together.' }),
  es: page('es', { label: 'Proyectos', title: `Proyectos: villas en la Costa del Sol · ${negocio.marca}`,
   description: 'Explora el archivo de proyectos del estudio: villas, reformas y propuestas residenciales en Marbella y la Costa del Sol, donde arquitectura, interiores y paisaje trabajan juntos.' })
 },
 sources: ['Graphics/VISENI/proyectos'], pending: ['Review the listing order with Paco']
}

export const projectPages: PageDefinition<ProjectPageContent>[] = projects.map(p => ({
 id: `project-${p.id}`, type: 'project', template: 'project', projectIds: [p.id],
 paths: { en: projectPath(p, 'en'), es: projectPath(p, 'es') }, status: 'draft',
 content: {
  en: page('en', { label: p.name.en, title: `${p.name.en}: ${p.copy.en.heading} · ${negocio.marca}`, description: p.copy.en.lead, image: { src: p.media.hero.jpg!, alt: p.copy.en.heroAlt } }),
  es: page('es', { label: p.name.es, title: `${p.name.es}: ${p.copy.es.heading} · ${negocio.marca}`, description: p.copy.es.lead, image: { src: p.media.hero.jpg!, alt: p.copy.es.heroAlt } })
 },
 sources: [`Graphics/VISENI/proyectos (${p.id})`], pending: p.pending
}))

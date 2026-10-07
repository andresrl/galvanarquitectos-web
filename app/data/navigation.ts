// Site navigation for the header menu and the footer. Built from the page registry, so new pages appear here automatically.
// The menu lists every service hub with its areas; the footer lists only the hubs (no wall of service × area links).
import type { Locale, NavItem } from './pages/types'
import { pageById, homePath, zonesFor } from './pages'
import { services, serviceIds } from './taxonomy'
import { guideIndex } from './guides'
import { projectsIndexPath } from './projects/projects'
import { studioPaths } from './studio'

export type NavLink = { label: string; path: string; scene?: string; detail?: string; children?: NavItem[] }
export type NavGroup = { title: string; links: NavLink[] }

const text = {
  en: { projects: 'Projects', home: 'Home', services: 'Services', explore: 'Explore', studio: 'The studio', guides: 'Journal', contact: 'Contact', international: 'International clients' },
  es: { projects: 'Proyectos', home: 'Inicio', services: 'Servicios', explore: 'Explorar', studio: 'El estudio', guides: 'Guías', contact: 'Contacto', international: 'Clientes internacionales' }
}

export function siteNavigation(locale: Locale, { withAreas = false } = {}): NavGroup[] {
  const t = text[locale], home = homePath(locale)
  const serviceLinks: NavLink[] = serviceIds.flatMap(id => {
    const hub = pageById(`${id}-hub`)
    return hub ? [{ label: services[id].name[locale], path: hub.paths[locale], children: withAreas ? zonesFor(id, locale) : undefined }] : []
  })
  return [
    { title: t.services, links: serviceLinks },
    { title: t.explore, links: [
      { label: t.projects, path: projectsIndexPath[locale] },
      { label: t.home, path: home },
      { label: t.studio, path: studioPaths[locale] },
      { label: t.international, path: home + '#internacional', scene: 'internacional' },
      { label: t.guides, path: guideIndex[locale] },
      { label: t.contact, path: home + '#contacto', scene: 'contacto' }
    ] }
  ]
}

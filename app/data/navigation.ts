// Site navigation for the header menu and the footer. Built from the page registry, so new pages appear here automatically.
import type { Locale } from './pages/types'
import { pages, homePath } from './pages'
import { services, type ServiceId } from './taxonomy'
import { casePaths } from './demo'

export type NavLink = { label: string; path: string; demo?: boolean; scene?: string; detail?: string }
export type NavGroup = { title: string; links: NavLink[] }

// Former illustrative cases still live on their English URLs until each hub replaces them.
const demoByService: Partial<Record<ServiceId, string>> = { renovation: casePaths.reforma, interiors: casePaths.interiorismo, landscape: casePaths.paisajismo }

const text = {
  en: { home: 'Home', services: 'Services', studio: 'Studio', explore: 'Explore', studioLink: 'The studio', contact: 'Contact', international: 'International clients', demo: 'Illustrative example' },
  es: { home: 'Inicio', services: 'Servicios', studio: 'Estudio', explore: 'Explorar', studioLink: 'El estudio', contact: 'Contacto', international: 'Clientes internacionales', demo: 'Ejemplo demostrativo' }
}

export function siteNavigation(locale: Locale): NavGroup[] {
  const t = text[locale]
  const serviceLinks: NavLink[] = []
  for (const id of Object.keys(services) as ServiceId[]) {
    const built = pages.filter(p => p.serviceId === id).sort((a, b) => (a.type === 'service' ? -1 : b.type === 'service' ? 1 : 0))
    for (const page of built) serviceLinks.push({ label: page.content[locale].label, path: page.paths[locale] })
    const demo = demoByService[id]
    if (demo) serviceLinks.push({ label: services[id].name[locale], path: demo, demo: true, detail: t.demo })
  }
  const home = homePath(locale)
  return [
    { title: t.services, links: serviceLinks },
    { title: t.explore, links: [
      { label: t.home, path: home },
      { label: t.studioLink, path: home + '#estudio', scene: 'estudio' },
      { label: t.international, path: home + '#internacional', scene: 'internacional' },
      { label: t.contact, path: home + '#contacto', scene: 'contacto' }
    ] }
  ]
}

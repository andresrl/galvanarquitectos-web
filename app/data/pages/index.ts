// Page registry: one place to resolve a path into its language, equivalents and content.
import type { Crumb, Locale, NavItem, PageDefinition, ProjectPageContent, ResolvedPage } from './types'
import { services, serviceIds, locations, locationIds, type ServiceId, type LocationId } from '../taxonomy'
import { linkCopy } from '../content/services'
import { renovationMarbella } from './renovation-marbella'
import { hubPages, locationPages } from './generated'
import { guideLocale } from '../guides'
import { projectsIndexPage, projectPages, studioPage, contactPage, legalPages, internationalPage, areaPages } from './projects'
import { publishedIds } from '../publish'
import { projectsIndexPath } from '../projects/projects'

export const pages: PageDefinition[] = [...hubPages, renovationMarbella, ...locationPages]
// Project archive: listing + one page per project (ProjectList.vue / ProjectPage.vue).
export const archivePages: PageDefinition<ProjectPageContent>[] = [projectsIndexPage, ...projectPages, studioPage, contactPage, internationalPage, ...areaPages, ...legalPages]
// Every registered page, whatever its template: paths, languages, alternates, sitemap.
export const allPages: PageDefinition<any>[] = [...pages, ...archivePages]
// Publication switch (app/data/publish.ts) applied once, so every consumer (SEO, sitemap, headers) agrees.
for (const p of allPages) if (publishedIds.has(p.id)) p.status = 'published'
export const homePublished = publishedIds.has('home')

export const normalisePath = (path: string) => path.replace(/\/$/, '') || '/'

const byPath = new Map<string, { definition: PageDefinition<any>; locale: Locale }>()
for (const definition of allPages) for (const [locale, path] of Object.entries(definition.paths) as [Locale, string][]) {
  if (byPath.has(path)) throw new Error(`Duplicate page path ${path}`)
  byPath.set(path, { definition, locale })
}

export const pageById = (id: string) => allPages.find(p => p.id === id)
export const findPage = (path: string) => byPath.get(normalisePath(path))
export const pathLocale = (path: string) => findPage(path)?.locale
// Language fixed by the URL: registry pages and guides. The Home keeps the visitor's choice during SPA navigation.
// Home: / is English, /es is Spanish (7 Oct 2026, browser-language detection on first visit).
export const homePaths: Record<Locale, string> = { en: '/', es: '/es' }
export const isHome = (path: string) => Object.values(homePaths).includes(normalisePath(path))
const homeLocale = (path: string) => (Object.entries(homePaths) as [Locale, string][]).find(([, p]) => p === normalisePath(path))?.[0]
export const routeLocale = (path: string) => homeLocale(path) ?? pathLocale(path) ?? guideLocale(normalisePath(path))
export const heroLayout = (path: string) => findPage(path)?.definition.hero ?? 'full'
// Header tone on first paint: light over photographic heroes and dark pages, dark over paper (legal pages, split heroes).
export const headerTone = (path: string): 'light' | 'dark' => { const d = findPage(path)?.definition; return !d || d.template === 'legal' || (d.hero && d.hero !== 'full') ? 'dark' : 'light' }
export const alternatePath = (path: string, locale: Locale) => homeLocale(path) ? homePaths[locale] : findPage(path)?.definition.paths[locale]

export const homePath = (locale: Locale) => homePaths[locale]

const hubOf = (serviceId: ServiceId) => pages.find(p => p.type === 'service' && p.serviceId === serviceId)
const cellOf = (serviceId: ServiceId, locationId: LocationId) => pages.find(p => p.type === 'service-location' && p.serviceId === serviceId && p.locationId === locationId)

// Service pages available in one area (service × location), for project «setting» sections.
export function servicesIn(locationId: LocationId, locale: Locale): NavItem[] {
  return serviceIds.flatMap(id => { const p = cellOf(id, locationId); return p ? [{ label: services[id].name[locale], path: p.paths[locale] }] : [] })
}

export function zonesFor(serviceId: ServiceId, locale: Locale): NavItem[] {
  return locationIds.flatMap(loc => { const p = cellOf(serviceId, loc); return p ? [{ label: locations[loc].name[locale], path: p.paths[locale] }] : [] })
}

function relatedFor(serviceId: ServiceId, locationId: LocationId, locale: Locale) {
  const t = linkCopy[locale], loc = locations[locationId]
  const samePlace = serviceIds.filter(id => id !== serviceId).flatMap(id => { const p = cellOf(id, locationId); return p ? [{ label: services[id].name[locale], path: p.paths[locale] }] : [] })
  const nearby = loc.near.flatMap(near => { const p = cellOf(serviceId, near); return p ? [{ label: locations[near].name[locale], path: p.paths[locale] }] : [] })
  const hub = hubOf(serviceId)
  if (hub) nearby.push({ label: t.allAreas, path: hub.paths[locale] })
  // The area page gathers every service and project in this area (none for Marbella: the Home covers it).
  const area = allPages.find(p => p.template === 'area' && p.locationId === locationId)
  if (area) samePlace.unshift({ label: locale === 'en' ? `Architect ${loc.in.en}` : `Arquitecto ${loc.in.es}`, path: area.paths[locale] })
  return [{ title: t.samePlace(loc.in[locale]), links: samePlace }, { title: t.sameService(services[serviceId].name[locale]), links: nearby }]
}

export function resolvePage(path: string): ResolvedPage<any> | undefined {
  const hit = findPage(path)
  if (!hit) return
  const { definition, locale } = hit
  const content = definition.content[locale]
  const serviceId = definition.serviceId as ServiceId | undefined
  const locationId = definition.locationId as LocationId | undefined
  const location = locationId ? locations[locationId] : undefined
  const breadcrumb: Crumb[] = [{ label: content.home, path: homePath(locale) }]
  if (serviceId) breadcrumb.push({ label: services[serviceId].name[locale], path: hubOf(serviceId)?.paths[locale] })
  if (location) breadcrumb.push({ label: location.name[locale] })
  if (definition.template === 'project') breadcrumb.push({ label: content.projects, path: projectsIndexPath[locale] }, { label: content.label })
  if (['projects', 'studio', 'contact', 'legal', 'international'].includes(definition.template)) breadcrumb.push({ label: content.label })
  return {
    definition, locale, path: definition.paths[locale], content, alternates: definition.paths, breadcrumb,
    locationName: location?.name[locale],
    hero: definition.hero ?? 'full',
    zones: definition.type === 'service' && serviceId ? zonesFor(serviceId, locale) : undefined,
    related: serviceId && locationId ? relatedFor(serviceId, locationId, locale) : undefined,
    relatedEyebrow: linkCopy[locale].relatedEyebrow
  }
}

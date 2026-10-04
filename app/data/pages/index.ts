// Page registry: one place to resolve a path into its language, equivalents and content.
import type { Crumb, Locale, NavItem, PageDefinition, ResolvedPage } from './types'
import { services, serviceIds, locations, locationIds, type ServiceId, type LocationId } from '../taxonomy'
import { linkCopy } from '../content/services'
import { renovationMarbella } from './renovation-marbella'
import { hubPages, locationPages } from './generated'

export const pages: PageDefinition[] = [...hubPages, renovationMarbella, ...locationPages]

export const normalisePath = (path: string) => path.replace(/\/$/, '') || '/'

const byPath = new Map<string, { definition: PageDefinition; locale: Locale }>()
for (const definition of pages) for (const [locale, path] of Object.entries(definition.paths) as [Locale, string][]) {
  if (byPath.has(path)) throw new Error(`Duplicate page path ${path}`)
  byPath.set(path, { definition, locale })
}

export const pageById = (id: string) => pages.find(p => p.id === id)
export const findPage = (path: string) => byPath.get(normalisePath(path))
export const pathLocale = (path: string) => findPage(path)?.locale
export const heroLayout = (path: string) => findPage(path)?.definition.hero ?? 'full'
export const alternatePath = (path: string, locale: Locale) => findPage(path)?.definition.paths[locale]

// Home ES (/es/) is not built yet; both languages link to / until it is.
export const homePath = (_locale: Locale) => '/'

const hubOf = (serviceId: ServiceId) => pages.find(p => p.type === 'service' && p.serviceId === serviceId)
const cellOf = (serviceId: ServiceId, locationId: LocationId) => pages.find(p => p.type === 'service-location' && p.serviceId === serviceId && p.locationId === locationId)

export function zonesFor(serviceId: ServiceId, locale: Locale): NavItem[] {
  return locationIds.flatMap(loc => { const p = cellOf(serviceId, loc); return p ? [{ label: locations[loc].name[locale], path: p.paths[locale] }] : [] })
}

function relatedFor(serviceId: ServiceId, locationId: LocationId, locale: Locale) {
  const t = linkCopy[locale], loc = locations[locationId]
  const samePlace = serviceIds.filter(id => id !== serviceId).flatMap(id => { const p = cellOf(id, locationId); return p ? [{ label: services[id].name[locale], path: p.paths[locale] }] : [] })
  const nearby = loc.near.flatMap(near => { const p = cellOf(serviceId, near); return p ? [{ label: locations[near].name[locale], path: p.paths[locale] }] : [] })
  const hub = hubOf(serviceId)
  if (hub) nearby.push({ label: t.allAreas, path: hub.paths[locale] })
  return [{ title: t.samePlace(loc.in[locale]), links: samePlace }, { title: t.sameService(services[serviceId].name[locale]), links: nearby }]
}

export function resolvePage(path: string): ResolvedPage | undefined {
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
  return {
    definition, locale, path: definition.paths[locale], content, alternates: definition.paths, breadcrumb,
    locationName: location?.name[locale],
    hero: definition.hero ?? 'full',
    zones: definition.type === 'service' && serviceId ? zonesFor(serviceId, locale) : undefined,
    related: serviceId && locationId ? relatedFor(serviceId, locationId, locale) : undefined,
    relatedEyebrow: linkCopy[locale].relatedEyebrow
  }
}

// Page registry: one place to resolve a path into its language, equivalents and content.
import type { Crumb, Locale, PageDefinition, ResolvedPage } from './types'
import { services, locations, type ServiceId, type LocationId } from '../taxonomy'
import { renovationMarbella } from './renovation-marbella'

export const pages: PageDefinition[] = [renovationMarbella]

export const normalisePath = (path: string) => path.replace(/\/$/, '') || '/'

const byPath = new Map<string, { definition: PageDefinition; locale: Locale }>()
for (const definition of pages) for (const [locale, path] of Object.entries(definition.paths) as [Locale, string][]) byPath.set(path, { definition, locale })

export const pageById = (id: string) => pages.find(p => p.id === id)
export const findPage = (path: string) => byPath.get(normalisePath(path))
export const pathLocale = (path: string) => findPage(path)?.locale
export const alternatePath = (path: string, locale: Locale) => findPage(path)?.definition.paths[locale]

// Home ES (/es/) is not built yet; both languages link to / until it is.
export const homePath = (_locale: Locale) => '/'

function serviceHubPath(serviceId: ServiceId, locale: Locale) {
  return pages.find(p => p.type === 'service' && p.serviceId === serviceId)?.paths[locale]
}

export function resolvePage(path: string): ResolvedPage | undefined {
  const hit = findPage(path)
  if (!hit) return
  const { definition, locale } = hit
  const content = definition.content[locale]
  const location = definition.locationId ? locations[definition.locationId as LocationId] : undefined
  const breadcrumb: Crumb[] = [{ label: content.home, path: homePath(locale) }]
  if (definition.serviceId) breadcrumb.push({ label: services[definition.serviceId as ServiceId].name[locale], path: serviceHubPath(definition.serviceId as ServiceId, locale) })
  if (location) breadcrumb.push({ label: location.name })
  return { definition, locale, path: definition.paths[locale], content, alternates: definition.paths, breadcrumb, locationName: location?.name }
}

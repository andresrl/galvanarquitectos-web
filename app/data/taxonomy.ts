// Services and locations shared by every page definition. Slugs follow CLAUDE.md §8.
import type { Locale } from './pages/types'

export type ServiceId = 'architecture' | 'renovation' | 'interiors' | 'landscape'
export type LocationId = 'marbella' | 'benahavis' | 'los-monteros'

export const services: Record<ServiceId, { name: Record<Locale, string>; slug: Record<Locale, string> }> = {
  architecture: { name: { en: 'New-build villas', es: 'Villas de nueva construcción' }, slug: { en: 'villa-architecture', es: 'arquitectura-villas' } },
  renovation: { name: { en: 'Villa renovation', es: 'Reformas de villas' }, slug: { en: 'villa-renovation', es: 'reformas-villas' } },
  interiors: { name: { en: 'Interior design', es: 'Interiorismo' }, slug: { en: 'interior-design', es: 'interiorismo' } },
  landscape: { name: { en: 'Landscape design', es: 'Paisajismo' }, slug: { en: 'landscape-design', es: 'paisajismo' } }
}

// Los Monteros is a residential area of Marbella, not a separate municipality.
export const locations: Record<LocationId, { name: string; slug: string; parent?: LocationId }> = {
  marbella: { name: 'Marbella', slug: 'marbella' },
  benahavis: { name: 'Benahavís', slug: 'benahavis' },
  'los-monteros': { name: 'Los Monteros', slug: 'los-monteros', parent: 'marbella' }
}

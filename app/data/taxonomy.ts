// Services and locations shared by every page definition. Slugs follow CLAUDE.md §8.
import type { Locale } from './pages/types'

export type ServiceId = 'architecture' | 'renovation'
export type LocationId = 'marbella' | 'benahavis' | 'los-monteros' | 'nueva-andalucia' | 'estepona' | 'guadalmina' | 'la-zagaleta' | 'golden-mile' | 'rio-real' | 'elviria'

export const services: Record<ServiceId, { name: Record<Locale, string>; slug: Record<Locale, string> }> = {
  architecture: { name: { en: 'New-build villas', es: 'Villas de nueva construcción' }, slug: { en: 'villa-architecture', es: 'arquitectura-villas' } },
  renovation: { name: { en: 'Villa renovation', es: 'Reformas de villas' }, slug: { en: 'villa-renovation', es: 'reformas-villas' } }
}
export const serviceIds = Object.keys(services) as ServiceId[]

type Location = {
  name: Record<Locale, string>
  in: Record<Locale, string>           // "in Benahavís" / "on the Golden Mile"
  slug: Record<Locale, string>
  area: string                         // second part of the eyebrow
  near: LocationId[]                   // related pages: a few neighbours, never the whole matrix
}

// Los Monteros, Nueva Andalucía, Guadalmina, Golden Mile, Río Real and Elviria are areas of Marbella.
// La Zagaleta is a private estate in Benahavís. Los Monteros is not Los Altos de los Monteros.
const place = (en: string, es: string, enIn: string, esIn: string, slugEn: string, slugEs: string, area: string, near: LocationId[]): Location =>
  ({ name: { en, es }, in: { en: enIn, es: esIn }, slug: { en: slugEn, es: slugEs }, area, near })

export const locations: Record<LocationId, Location> = {
  marbella: place('Marbella', 'Marbella', 'in Marbella', 'en Marbella', 'marbella', 'marbella', 'COSTA DEL SOL', ['golden-mile', 'nueva-andalucia', 'rio-real']),
  benahavis: place('Benahavís', 'Benahavís', 'in Benahavís', 'en Benahavís', 'benahavis', 'benahavis', 'COSTA DEL SOL', ['la-zagaleta', 'estepona', 'nueva-andalucia']),
  'los-monteros': place('Los Monteros', 'Los Monteros', 'in Los Monteros', 'en Los Monteros', 'los-monteros', 'los-monteros', 'MARBELLA', ['elviria', 'rio-real', 'marbella']),
  'nueva-andalucia': place('Nueva Andalucía', 'Nueva Andalucía', 'in Nueva Andalucía', 'en Nueva Andalucía', 'nueva-andalucia', 'nueva-andalucia', 'MARBELLA', ['golden-mile', 'benahavis', 'guadalmina']),
  estepona: place('Estepona', 'Estepona', 'in Estepona', 'en Estepona', 'estepona', 'estepona', 'COSTA DEL SOL', ['benahavis', 'guadalmina', 'la-zagaleta']),
  guadalmina: place('Guadalmina', 'Guadalmina', 'in Guadalmina', 'en Guadalmina', 'guadalmina', 'guadalmina', 'SAN PEDRO · MARBELLA', ['nueva-andalucia', 'estepona', 'golden-mile']),
  'la-zagaleta': place('La Zagaleta', 'La Zagaleta', 'in La Zagaleta', 'en La Zagaleta', 'la-zagaleta', 'la-zagaleta', 'BENAHAVÍS', ['benahavis', 'estepona', 'nueva-andalucia']),
  'golden-mile': place('Golden Mile', 'Milla de Oro', 'on the Golden Mile', 'en la Milla de Oro', 'golden-mile', 'milla-de-oro', 'MARBELLA', ['marbella', 'nueva-andalucia', 'guadalmina']),
  'rio-real': place('Río Real', 'Río Real', 'in Río Real', 'en Río Real', 'rio-real', 'rio-real', 'MARBELLA', ['los-monteros', 'marbella', 'elviria']),
  elviria: place('Elviria', 'Elviria', 'in Elviria', 'en Elviria', 'elviria', 'elviria', 'MARBELLA', ['los-monteros', 'rio-real', 'marbella'])
}
export const locationIds = Object.keys(locations) as LocationId[]

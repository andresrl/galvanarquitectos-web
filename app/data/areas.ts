// Area pages (AreaPage.vue): «Architect in Benahavís», «Arquitecto en la Milla de Oro»… One per area except Marbella,
// which the Home already covers (no duplicate «architect Marbella» pages, CLAUDE.md §8).
// Content reuses the area copy (content/locations.ts), the service × area pages and the projects confirmed there.
import type { Locale } from './pages/types'
import { locations, locationIds, type LocationId } from './taxonomy'

export const areaIds = locationIds.filter(id => id !== 'marbella') as LocationId[]
export const areaPath = (loc: LocationId, locale: Locale) => loc === 'marbella' ? (locale === 'en' ? '/' : '/es') : locale === 'en' ? `/areas/${locations[loc].slug.en}` : `/es/zonas/${locations[loc].slug.es}`

export const areaUi = {
 en: {
  heading: (inPlace: string) => `Architect ${inPlace}`, italic: 'New-build villas and renovations.',
  lead: (inPlace: string) => `New-build villas and complete renovations ${inPlace}, with personal attention from the architect.`,
  description: (inPlace: string) => `Architect ${inPlace}: new-build villas and complete villa renovations by Francisco Martínez Galván, in English and Spanish.`,
  introEyebrow: 'The area', servicesTitle: (inPlace: string) => `Our services ${inPlace}`, explore: 'Explore',
  projectsTitle: (inPlace: string) => `Projects ${inPlace}`, faqTitle: 'Questions about the area', nearTitle: 'Nearby areas',
  ctaTitle: 'Your project', ctaItalic: 'starts with a conversation.', cta: 'Tell us about your project', label: 'Areas'
 },
 es: {
  heading: (inPlace: string) => `Arquitecto ${inPlace}`, italic: 'Villas nuevas y reformas.',
  lead: (inPlace: string) => `Villas de nueva construcción y reformas integrales ${inPlace}, con trato directo con el arquitecto.`,
  description: (inPlace: string) => `Arquitecto ${inPlace}: villas de nueva construcción y reformas integrales de villas con Francisco Martínez Galván, en español e inglés.`,
  introEyebrow: 'La zona', servicesTitle: (inPlace: string) => `Nuestros servicios ${inPlace}`, explore: 'Ver',
  projectsTitle: (inPlace: string) => `Proyectos ${inPlace}`, faqTitle: 'Preguntas sobre la zona', nearTitle: 'Zonas cercanas',
  ctaTitle: 'Tu proyecto', ctaItalic: 'empieza con una conversación.', cta: 'Cuéntanos tu proyecto', label: 'Zonas'
 }
}

// Schema.org nodes shared by every page: the studio, the architect, the website and the areas served.
// Stable @id values (/#studio, /#paco, /#website) let every page graph point to the same entities.
import type { Locale } from './pages/types'
import { negocio } from './negocio'
import { locations, locationIds, type LocationId } from './taxonomy'

export const ids = (site: string) => ({ studio: site + '/#studio', paco: site + '/#paco', website: site + '/#website' })
const abs = (site: string, path: string) => new URL(path, site).href
const region = { '@type': 'AdministrativeArea', name: 'Costa del Sol, Málaga, Spain' }

// An area of work as a Place (Marbella neighbourhoods, Benahavís, Estepona…), always within the Costa del Sol.
export const place = (loc: LocationId, locale: Locale) => ({ '@type': 'Place', name: locations[loc].name[locale], containedInPlace: region })
export const allAreas = (locale: Locale) => locationIds.map(loc => place(loc, locale))

const studioDescription: Record<Locale, string> = {
 en: 'Architecture studio in Marbella led by architect Francisco Martínez Galván: new-build villas, complete villa renovations, interior design and landscape design on the Costa del Sol, with personal attention in English and Spanish.',
 es: 'Estudio de arquitectura en Marbella dirigido por el arquitecto Francisco Martínez Galván: villas de nueva construcción, reformas integrales, interiorismo y paisajismo en la Costa del Sol, con trato directo en español e inglés.'
}

export function studioNode(site: string, locale: Locale) {
 const i = ids(site), a = negocio.arquitecto
 return {
  '@type': ['ProfessionalService', 'LocalBusiness'], '@id': i.studio,
  name: negocio.nombre, alternateName: negocio.alternateNames, url: site,
  description: studioDescription[locale],
  logo: { '@type': 'ImageObject', url: abs(site, negocio.logo.src), width: negocio.logo.width, height: negocio.logo.height },
  image: abs(site, negocio.imagen.src),
  telephone: negocio.contacto.telefono, email: negocio.contacto.email,
  address: negocio.contacto.direccion,
  geo: { '@type': 'GeoCoordinates', ...negocio.geo }, hasMap: negocio.mapa,
  areaServed: [{ '@type': 'Place', name: 'Costa del Sol' }, ...allAreas(locale)],
  knowsLanguage: negocio.idiomas, knowsAbout: negocio.knowsAbout[locale],
  founder: { '@id': i.paco }, employee: { '@id': i.paco },
  sameAs: negocio.sameAs
 }
}

export function personNode(site: string, locale: Locale) {
 const i = ids(site), a = negocio.arquitecto
 return {
  '@type': 'Person', '@id': i.paco, name: a.nombre,
  jobTitle: a.cargo[locale], description: a.descripcion[locale],
  image: { '@type': 'ImageObject', url: abs(site, a.retrato.src), width: a.retrato.width, height: a.retrato.height },
  worksFor: { '@id': i.studio }, alumniOf: { '@type': 'EducationalOrganization', name: a.formacion },
  workLocation: { '@type': 'Place', name: 'Marbella', address: negocio.contacto.direccion },
  knowsLanguage: negocio.idiomas, knowsAbout: negocio.knowsAbout[locale], sameAs: negocio.sameAs
 }
}

export const websiteNode = (site: string) => {
 const i = ids(site)
 return { '@type': 'WebSite', '@id': i.website, url: site, name: negocio.marca, alternateName: negocio.nombre, inLanguage: negocio.idiomas, publisher: { '@id': i.studio } }
}

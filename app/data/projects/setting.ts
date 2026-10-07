// «The setting / El entorno» on each project page (ARK-style location section).
// With a confirmed zone: that area's copy (content/locations.ts), other projects there and the services in that area.
// Without one: Marbella and the Costa del Sol in general, never stating where the house is.
import type { Locale, NavItem } from '../pages/types'
import type { LocationId } from '../taxonomy'
import { locations } from '../taxonomy'
import { locationCopy } from '../content/locations'
import { pageById, servicesIn } from '../pages'
import { services, serviceIds } from '../taxonomy'
import { projects, projectPath } from './projects'
import type { Project } from './types'

const ui = {
 en: { eyebrow: 'The setting', projectsIn: (p: string) => `Other projects ${p}`, servicesIn: (p: string) => `Our services ${p}`, studio: 'The studio works from Marbella, so visits to each property and to the site are part of everyday work.' },
 es: { eyebrow: 'El entorno', projectsIn: (p: string) => `Otros proyectos ${p}`, servicesIn: (p: string) => `Nuestros servicios ${p}`, studio: 'El estudio trabaja desde Marbella, así que las visitas a cada propiedad y a la obra forman parte del trabajo diario.' }
}

// General setting: geography of the coast, no claims about a particular plot.
const general = {
 en: { name: 'Costa del Sol', italic: 'Between the mountains and the sea.', place: 'on the Costa del Sol',
  text: [
   'The Costa del Sol runs along the Mediterranean coast of Málaga, with a chain of sierras rising close behind the shore. Between the two lie hillsides, valleys and coastal plains, each with its own light, views and way of living outdoors.',
   'Marbella sits at its heart, beneath Sierra Blanca and the outline of La Concha: a historic old town, residential areas among golf courses such as Nueva Andalucía, hillside neighbourhoods looking out to sea and quieter areas to the east. Its mild climate makes terraces, gardens and pools part of daily life for much of the year.',
   'Every plot on this coast raises its own questions: orientation, slope, privacy, the relationship with neighbouring properties and with the landscape. They are studied on site, project by project.'
  ] },
 es: { name: 'Costa del Sol', italic: 'Entre la montaña y el mar.', place: 'en la Costa del Sol',
  text: [
   'La Costa del Sol recorre el litoral mediterráneo de Málaga, con una cadena de sierras que se eleva muy cerca de la orilla. Entre ambas hay laderas, valles y llanuras costeras, cada una con su propia luz, sus vistas y su manera de vivir el exterior.',
   'Marbella está en su centro, bajo Sierra Blanca y la silueta de La Concha: un casco antiguo histórico, zonas residenciales entre campos de golf como Nueva Andalucía, barrios en ladera que miran al mar y áreas más tranquilas hacia el este. Su clima suave hace que terrazas, jardines y piscinas formen parte de la vida diaria buena parte del año.',
   'Cada parcela de esta costa plantea sus propias preguntas: la orientación, la pendiente, la privacidad, la relación con las propiedades vecinas y con el paisaje. Se estudian sobre el terreno, proyecto a proyecto.'
  ] }
}

export type ProjectSetting = {
 eyebrow: string; name: string; italic: string; text: string[]
 projectsTitle?: string; projects: { id: string; name: string; heading: string; alt: string; image: Project['media']['hero']; path: string }[]
 servicesTitle: string; services: NavItem[]
}

export function projectSetting(project: Project, locale: Locale): ProjectSetting {
 const t = ui[locale], zone = project.zone as LocationId | undefined
 if (!zone) {
  const g = general[locale]
  return { eyebrow: t.eyebrow, name: g.name, italic: g.italic, text: [...g.text, t.studio], projects: [],
   servicesTitle: t.servicesIn(g.place),
   services: serviceIds.map(id => ({ label: services[id].name[locale], path: pageById(`${id}-hub`)!.paths[locale] })) }
 }
 const place = locations[zone], copy = locationCopy[zone]
 const neighbours = projects.filter(p => p.zone === zone && p.id !== project.id).map(p => ({ id: p.id, name: p.name[locale], heading: p.copy[locale].heading, alt: p.copy[locale].heroAlt, image: p.media.hero, path: projectPath(p, locale) }))
 return {
  eyebrow: t.eyebrow, name: place.name[locale], italic: general[locale].italic,
  text: [copy.context[locale], copy.setting[locale], t.studio],
  projectsTitle: t.projectsIn(place.in[locale]), projects: neighbours,
  servicesTitle: t.servicesIn(place.in[locale]), services: servicesIn(zone, locale)
 }
}

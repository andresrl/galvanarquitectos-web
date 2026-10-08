// Hero of each service × location page: its own lead and its own archive image.
// Images: heroOrder[(location + 4 × service) % 16] never repeats within a service (10 areas) or within an area (4 services).
import type { Locale } from '../pages/types'
import type { LocationId, ServiceId } from '../taxonomy'
import type { ArchiveKey } from './archive'

type L = Record<Locale, string>

export const heroOrder: ArchiveKey[] = [
  'villa-ambar', 'villas-j6a-j6b', 'villa-los-altos-53', 'villa-bruselas', 'villa-flamingos-58', 'zagaleta-210', 'villa-paris', 'paraiba-residencial',
  'villa-pareja', 'hotel-boutique', 'villa-guadalmina-27', 'villa-poniente-96', 'villa-silver-03', 'cortijo-nagueles', 'villa-la-resina-six', 'villa-carril'
]

export const heroLeads: Record<LocationId, Partial<Record<ServiceId, L>>> = {
  marbella: {
    architecture: { en: 'A new villa in Marbella, designed around its plot, its light and the way you want to live.', es: 'Una villa nueva en Marbella, diseñada a partir de su parcela, su luz y tu forma de vivir.' }
  },
  benahavis: {
    architecture: { en: 'A house that works with the hillside: arrival, levels and terraces drawn with the land.', es: 'Una casa que trabaja con la ladera: llegada, niveles y terrazas dibujados con el terreno.' },
    renovation: { en: 'Open your villa to the views and rethink the way it meets the slope.', es: 'Abre tu villa a las vistas y repiensa cómo se apoya en la pendiente.' }
  },
  'los-monteros': {
    architecture: { en: 'A new home near the coast, organised around its garden and outdoor rooms.', es: 'Una casa nueva cerca de la costa, organizada en torno a su jardín y sus estancias exteriores.' },
    renovation: { en: 'Keep the garden you love and give the house a new layout around it.', es: 'Conserva el jardín que te gusta y dale a la casa una nueva distribución a su alrededor.' }
  },
  'nueva-andalucia': {
    architecture: { en: 'Frame the views towards La Concha and the greens, without giving up privacy.', es: 'Enmarca las vistas hacia La Concha y los greens sin renunciar a la privacidad.' },
    renovation: { en: 'Bring a villa from another era up to date: layout, light and terraces.', es: 'Pon al día una villa de otra época: distribución, luz y terrazas.' }
  },
  estepona: {
    architecture: { en: 'Near the sea or up in the hills: a new villa that starts from its exact site.', es: 'Junto al mar o en las colinas: una villa nueva que parte de su emplazamiento exacto.' },
    renovation: { en: 'Open your villa to the outdoors and rethink how it responds to sun and views.', es: 'Abre tu villa al exterior y repiensa cómo responde al sol y a las vistas.' }
  },
  guadalmina: {
    architecture: { en: 'A new villa designed from the garden outwards, with privacy studied from day one.', es: 'Una villa nueva diseñada desde el jardín, con la privacidad estudiada desde el primer día.' },
    renovation: { en: 'Open the house to the garden and bring light into rooms that feel closed.', es: 'Abre la casa al jardín y lleva luz a las estancias que se sienten cerradas.' }
  },
  'la-zagaleta': {
    architecture: { en: 'Architecture at the scale of the estate: arrival, levels, views and privacy as one.', es: 'Arquitectura a la escala de la parcela: llegada, niveles, vistas y privacidad en conjunto.' },
    renovation: { en: 'Rethink large spaces and refine the way your villa meets the landscape.', es: 'Repiensa los grandes espacios y afina la relación de tu villa con el paisaje.' }
  },
  'golden-mile': {
    architecture: { en: 'Between the sea and Sierra Blanca: a new villa that answers to its exact position.', es: 'Entre el mar y Sierra Blanca: una villa nueva que responde a su posición exacta.' },
    renovation: { en: 'Update an established home and bring it closer to its garden.', es: 'Actualiza una vivienda consolidada y acércala a su jardín.' }
  },
  'rio-real': {
    architecture: { en: 'A new villa oriented to its garden and, where the plot allows, to the golf course.', es: 'Una villa nueva orientada a su jardín y, cuando la parcela lo permite, al campo de golf.' },
    renovation: { en: 'Bring your villa up to date, open to light and outdoor living.', es: 'Pon tu villa al día, abierta a la luz y a la vida exterior.' }
  },
  elviria: {
    architecture: { en: 'A villa placed among the trees, where shade and light decide each room.', es: 'Una villa situada entre los árboles, donde la sombra y la luz deciden cada estancia.' },
    renovation: { en: 'Reorganise the house around light and shade, and reconnect it with the garden.', es: 'Reorganiza la casa en torno a la luz y la sombra, y reconéctala con el jardín.' }
  }
}

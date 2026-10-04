// Hero of each service × location page: its own lead and its own archive image.
// Images: heroOrder[(location + 4 × service) % 16] never repeats within a service (10 areas) or within an area (4 services).
import type { Locale } from '../pages/types'
import type { LocationId, ServiceId } from '../taxonomy'
import type { ArchiveKey } from './archive'

type L = Record<Locale, string>

// Positions 8–15 and 0–1 go to interior design: covered living areas and terraces first.
export const heroOrder: ArchiveKey[] = [
  'villa-ambar', 'villas-j6a-j6b', 'villa-los-altos-53', 'villa-bruselas', 'villa-flamingos-58', 'zagaleta-210', 'villa-paris', 'paraiba-residencial',
  'villa-pareja', 'hotel-boutique', 'villa-guadalmina-27', 'villa-poniente-96', 'villa-silver-03', 'cortijo-nagueles', 'villa-la-resina-six', 'villa-carril'
]

export const heroLeads: Record<LocationId, Partial<Record<ServiceId, L>>> = {
  marbella: {
    architecture: { en: 'A new villa in Marbella, designed around its plot, its light and the way you want to live.', es: 'Una villa nueva en Marbella, diseñada a partir de su parcela, su luz y tu forma de vivir.' },
    interiors: { en: 'Rooms in your Marbella home, shaped around how and when you live in them.', es: 'Las estancias de tu casa en Marbella, pensadas para cómo y cuándo las vives.' },
    landscape: { en: 'Sun, shade and privacy: outdoor spaces in Marbella designed together with the house.', es: 'Sol, sombra y privacidad: espacios exteriores en Marbella diseñados junto con la casa.' }
  },
  benahavis: {
    architecture: { en: 'A house that works with the hillside: arrival, levels and terraces drawn with the land.', es: 'Una casa que trabaja con la ladera: llegada, niveles y terrazas dibujados con el terreno.' },
    renovation: { en: 'Open your villa to the views and rethink the way it meets the slope.', es: 'Abre tu villa a las vistas y repiensa cómo se apoya en la pendiente.' },
    interiors: { en: 'Interiors that follow the light of the hills and frame the landscape from every room.', es: 'Interiores que siguen la luz de las colinas y enmarcan el paisaje desde cada estancia.' },
    landscape: { en: 'Terraces, walls and planting that turn a sloping plot into a garden to live in.', es: 'Terrazas, muros y vegetación que convierten una parcela en pendiente en un jardín para vivir.' }
  },
  'los-monteros': {
    architecture: { en: 'A new home near the coast, organised around its garden and outdoor rooms.', es: 'Una casa nueva cerca de la costa, organizada en torno a su jardín y sus estancias exteriores.' },
    renovation: { en: 'Keep the garden you love and give the house a new layout around it.', es: 'Conserva el jardín que te gusta y dale a la casa una nueva distribución a su alrededor.' },
    interiors: { en: 'Rooms that open onto the terraces, with materials that join inside and out.', es: 'Estancias que se abren a las terrazas, con materiales que unen interior y exterior.' },
    landscape: { en: 'A garden near the sea, designed for privacy, shade and everyday use.', es: 'Un jardín cerca del mar, pensado para la privacidad, la sombra y el uso diario.' }
  },
  'nueva-andalucia': {
    architecture: { en: 'Frame the views towards La Concha and the greens, without giving up privacy.', es: 'Enmarca las vistas hacia La Concha y los greens sin renunciar a la privacidad.' },
    renovation: { en: 'Bring a villa from another era up to date: layout, light and terraces.', es: 'Pon al día una villa de otra época: distribución, luz y terrazas.' },
    interiors: { en: 'Interiors that look out to gardens and greens, and change with the light of the day.', es: 'Interiores que miran a jardines y greens, y cambian con la luz del día.' },
    landscape: { en: 'Extend the feeling of open green space while keeping your garden private.', es: 'Prolonga la sensación de espacio verde abierto manteniendo tu jardín privado.' }
  },
  estepona: {
    architecture: { en: 'Near the sea or up in the hills: a new villa that starts from its exact site.', es: 'Junto al mar o en las colinas: una villa nueva que parte de su emplazamiento exacto.' },
    renovation: { en: 'Open your villa to the outdoors and rethink how it responds to sun and views.', es: 'Abre tu villa al exterior y repiensa cómo responde al sol y a las vistas.' },
    interiors: { en: 'Interiors that respond to the character of the house and the light it receives.', es: 'Interiores que responden al carácter de la casa y a la luz que recibe.' },
    landscape: { en: 'Between coast and hills, terraces and pool designed around shade and exposure.', es: 'Entre la costa y las colinas, terrazas y piscina diseñadas según la sombra y la exposición.' }
  },
  guadalmina: {
    architecture: { en: 'A new villa designed from the garden outwards, with privacy studied from day one.', es: 'Una villa nueva diseñada desde el jardín, con la privacidad estudiada desde el primer día.' },
    renovation: { en: 'Open the house to the garden and bring light into rooms that feel closed.', es: 'Abre la casa al jardín y lleva luz a las estancias que se sienten cerradas.' },
    interiors: { en: 'The calm of the garden, carried inside through proportion, light and material.', es: 'La calma del jardín, llevada al interior con proporción, luz y materia.' },
    landscape: { en: 'Lawn, shade, paths and pool, arranged around the way you use your garden.', es: 'Césped, sombra, recorridos y piscina, ordenados según cómo vives tu jardín.' }
  },
  'la-zagaleta': {
    architecture: { en: 'Architecture at the scale of the estate: arrival, levels, views and privacy as one.', es: 'Arquitectura a la escala de la parcela: llegada, niveles, vistas y privacidad en conjunto.' },
    renovation: { en: 'Rethink large spaces and refine the way your villa meets the landscape.', es: 'Repiensa los grandes espacios y afina la relación de tu villa con el paisaje.' },
    interiors: { en: 'Many rooms, one language: interiors with coherence across a large home.', es: 'Muchas estancias, un mismo lenguaje: interiores coherentes en una casa amplia.' },
    landscape: { en: 'A hillside garden that links terraces and paths with the surrounding nature.', es: 'Un jardín en ladera que une terrazas y recorridos con la naturaleza que lo rodea.' }
  },
  'golden-mile': {
    architecture: { en: 'Between the sea and Sierra Blanca: a new villa that answers to its exact position.', es: 'Entre el mar y Sierra Blanca: una villa nueva que responde a su posición exacta.' },
    renovation: { en: 'Update an established home and bring it closer to its garden.', es: 'Actualiza una vivienda consolidada y acércala a su jardín.' },
    interiors: { en: 'Rooms to receive and rooms to live in, with material and light considered as one.', es: 'Estancias para recibir y estancias para vivir, con materia y luz pensadas en conjunto.' },
    landscape: { en: 'A garden that mediates between the house, the views and the neighbours.', es: 'Un jardín que media entre la casa, las vistas y los vecinos.' }
  },
  'rio-real': {
    architecture: { en: 'A new villa oriented to its garden and, where the plot allows, to the golf course.', es: 'Una villa nueva orientada a su jardín y, cuando la parcela lo permite, al campo de golf.' },
    renovation: { en: 'Bring your villa up to date, open to light and outdoor living.', es: 'Pon tu villa al día, abierta a la luz y a la vida exterior.' },
    interiors: { en: 'A calm, coherent home whose rooms flow out to the terraces and garden.', es: 'Una casa serena y coherente cuyas estancias se prolongan hacia las terrazas y el jardín.' },
    landscape: { en: 'Green views and sheltered places to sit, eat and swim.', es: 'Vistas verdes y rincones resguardados para sentarse, comer y bañarse.' }
  },
  elviria: {
    architecture: { en: 'A villa placed among the trees, where shade and light decide each room.', es: 'Una villa situada entre los árboles, donde la sombra y la luz deciden cada estancia.' },
    renovation: { en: 'Reorganise the house around light and shade, and reconnect it with the garden.', es: 'Reorganiza la casa en torno a la luz y la sombra, y reconéctala con el jardín.' },
    interiors: { en: 'Filtered light and a green setting for a relaxed, everyday home.', es: 'Luz filtrada y un entorno verde para una casa relajada y cotidiana.' },
    landscape: { en: 'Existing trees and shade as the starting point of a garden that belongs to its setting.', es: 'Los árboles existentes y la sombra como punto de partida de un jardín que pertenece a su entorno.' }
  }
}

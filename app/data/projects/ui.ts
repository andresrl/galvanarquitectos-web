// Interface copy for the project archive (listing and project pages), EN and ES.
import type { Locale } from '../pages/types'
import type { Imagery, ProjectKind } from './types'

export const projectUi: Record<Locale, {
 project: string; status: { completed: string; ongoing: string }; kind: Record<ProjectKind, string>; imagery: Record<Imagery, string>
 facts: { status: string; location: string; type: string; images: string }
 architecture: string; experience: string; discover: string; gallery: string
 open: string; close: string; previous: string; next: string; of: string; scrollHint: string
 other: string; all: string
 ctaEyebrow: string; ctaTitle: string; ctaItalic: string; ctaText: string; ctaLink: string; direct: string
 top: string; language: string
 architect: { eyebrow: string; name: string; italic: string; background: string; approach: string; principles: [string, string][]; portraitAlt: string; studioAlt: string; link: string }
 list: { eyebrow: string; title: string; italic: string; lead: string; count: (n: number) => string; filters: { all: string; completed: string; ongoing: string }; filterLabel: string
  selected: string; selectedItalic: string; view: string; closingTitle: string; closingItalic: string; closingText: string }
}> = {
 en: {
  project: 'Project', status: { completed: 'Completed', ongoing: 'In progress' },
  kind: { renovation: 'Complete villa renovation', hospitality: 'Boutique hotel', tender: 'Tender proposal' },
  imagery: { photography: 'Photography', visualisation: 'Architectural visualisation' },
  facts: { status: 'Status', location: 'Location', type: 'Commission', images: 'Images' },
  architecture: 'The architecture', experience: 'The experience', discover: 'Discover', gallery: 'Gallery',
  open: 'Open image', close: 'Close', previous: 'Previous', next: 'Next', of: 'of', scrollHint: 'Drag or scroll',
  other: 'Other projects', all: 'All projects',
  ctaEyebrow: 'Your project', ctaTitle: 'What space', ctaItalic: 'do you imagine?',
  ctaText: 'A new villa or a renovation. Let’s start with what you have in mind.', ctaLink: 'Tell us about your project', direct: 'Or write directly',
  top: 'Back to top', language: 'Español',
  // Closing block on every project page. Biography from the reviewed LanzaderaWeb history; approach from confirmed communication axes. Pending Francisco Martínez Galván's review.
  architect: { eyebrow: 'The architect', name: 'Francisco Martínez Galván', italic: 'Architecture with a personal signature.',
   background: 'Trained at the Escuela Politécnica in Madrid, Francisco Martínez Galván arrived in Marbella in 1998 and consolidated his studio there in 2003. Since then he has worked on new-build villas and complete renovations across the Costa del Sol, attending personally to every commission.',
   approach: 'He defends an architecture that begins by listening: to the way each client lives, to the site and to its light. Design, planning permissions, site supervision and the coordination of contractors come together in one vision, according to the scope agreed, with sustainability and respect for the setting as working criteria.',
   principles: [['Light', 'Natural light orders the spaces by day; after dark, lighting reveals the volumes and the places to gather.'], ['Materials', 'Chosen for their relationship with the climate, the landscape and the passing of time.'], ['Textures', 'Stone-like surfaces, timber tones and light planes that give the geometry scale and warmth.'], ['Volumes', 'Clear volumes, overhangs and terraces that build shade and extend the house outdoors.']],
   portraitAlt: 'Francisco Martínez Galván, architect, in his studio', studioAlt: 'Francisco Martínez Galván drawing at his desk in the studio', link: 'Discover the studio' },
  list: { eyebrow: 'Projects', title: 'Architecture, spaces', italic: 'and ways of living.',
   lead: 'Explore the studio’s project archive and the relationship between architecture, light and setting.',
   count: n => `${n} projects`, filters: { all: 'All', completed: 'Completed', ongoing: 'In progress' }, filterLabel: 'Filter projects',
   selected: 'Selected', selectedItalic: 'villas', view: 'View project',
   closingTitle: 'Your project here.', closingItalic: 'Wherever you are.', closingText: 'Video calls, site visits and follow-up of the works, in English and Spanish.' }
 },
 es: {
  project: 'Proyecto', status: { completed: 'Finalizado', ongoing: 'En curso' },
  kind: { renovation: 'Reforma integral de villa', hospitality: 'Hotel boutique', tender: 'Propuesta de licitación' },
  imagery: { photography: 'Fotografía', visualisation: 'Visualización arquitectónica' },
  facts: { status: 'Estado', location: 'Ubicación', type: 'Encargo', images: 'Imágenes' },
  architecture: 'La arquitectura', experience: 'La experiencia', discover: 'Descubrir', gallery: 'Galería',
  open: 'Abrir imagen', close: 'Cerrar', previous: 'Anterior', next: 'Siguiente', of: 'de', scrollHint: 'Arrastra o desliza',
  other: 'Otros proyectos', all: 'Todos los proyectos',
  ctaEyebrow: 'Tu proyecto', ctaTitle: '¿Qué espacio', ctaItalic: 'imaginas?',
  ctaText: 'Una nueva villa o una reforma. Empecemos por lo que tienes en mente.', ctaLink: 'Cuéntanos tu proyecto', direct: 'O escríbenos directamente',
  top: 'Volver arriba', language: 'English',
  architect: { eyebrow: 'El arquitecto', name: 'Francisco Martínez Galván', italic: 'Arquitectura con firma personal.',
   background: 'Formado en la Escuela Politécnica de Madrid, Francisco Martínez Galván llegó a Marbella en 1998 y en 2003 consolidó allí su estudio. Desde entonces trabaja en villas de nueva construcción y reformas integrales en la Costa del Sol, con atención directa en cada encargo.',
   approach: 'Defiende una arquitectura que empieza por escuchar: la forma de vivir de cada cliente, el lugar y su luz. Diseño, licencias, dirección de obra y coordinación de empresas se integran en una misma visión, según el alcance acordado, con la sostenibilidad y el respeto por el entorno como criterios de trabajo.',
   principles: [['Luz', 'La luz natural ordena los espacios de día; al anochecer, la iluminación revela los volúmenes y los lugares de encuentro.'], ['Materiales', 'Elegidos por su relación con el clima, el paisaje y el paso del tiempo.'], ['Texturas', 'Superficies pétreas, tonos de madera y planos claros que dan escala y calidez a la geometría.'], ['Volúmenes', 'Volúmenes nítidos, vuelos y terrazas que construyen sombra y prolongan la casa hacia el exterior.']],
   portraitAlt: 'Francisco Martínez Galván, arquitecto, en su estudio', studioAlt: 'Francisco Martínez Galván dibujando en su mesa del estudio', link: 'Conoce el estudio' },
  list: { eyebrow: 'Proyectos', title: 'Arquitectura, espacios', italic: 'y formas de vivir.',
   lead: 'Explora el archivo de proyectos del estudio y la relación entre arquitectura, luz y entorno.',
   count: n => `${n} proyectos`, filters: { all: 'Todos', completed: 'Finalizados', ongoing: 'En curso' }, filterLabel: 'Filtrar proyectos',
   selected: 'Villas', selectedItalic: 'seleccionadas', view: 'Ver proyecto',
   closingTitle: 'Tu proyecto aquí.', closingItalic: 'Estés donde estés.', closingText: 'Videollamadas, visitas y seguimiento de obra, en español e inglés.' }
 }
}

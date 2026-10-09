// Videos page (/videos · /es/videos): the 2026 studio reel and one video per project, played with sound in FilmPlayer.vue.
// Media: scripts/media/build_films.sh → app/data/films.generated.ts (originals in public/videos-reel, ignored by git).
// Honest labels: The House, Villa París and The Resina 6ix are built villas filmed on site; Villa Soal and Villa Pareja
// are architectural visualisations, and Villa Pareja is a tender proposal (never presented as built or awarded).
// `credit`: who filmed the video, shown on its programme entry, in the player and as the VideoObject creator.
import type { Locale } from './pages/types'
import { filmMedia, type FilmMedia } from './films.generated'
import { projectById, projectPath } from './projects/projects'

export const filmsPaths: Record<Locale, string> = { en: '/videos', es: '/es/videos' }
// uploadDate of every VideoObject: the day the web versions were made for this site. Update it when the page is published.
export const filmsPublished = '2026-10-09'

export type FilmKind = 'reel' | 'built' | 'visualisation' | 'tender'
export type FilmCredit = { name: string; role: Record<Locale, string>; label: Record<Locale, string> }
type FilmDefinition = { id: string; projectId?: string; kind: FilmKind; title?: Record<Locale, string>; text: Record<Locale, string>; credit?: FilmCredit }
export type Film = FilmDefinition & { title: Record<Locale, string>; media: FilmMedia }

const definitions: FilmDefinition[] = [
  {
    id: 'reel-2026', kind: 'reel', title: { en: 'Reel 2026', es: 'Reel 2026' }, text: {
      en: 'A selection of the studio’s villas, built and in development, in a single two-minute cut.',
      es: 'Una selección de villas del estudio, construidas y en desarrollo, en un solo montaje de dos minutos.'
    }
  },
  {
    id: 'the-house', projectId: 'the-house', kind: 'built', text: {
      en: 'From the air over the hillside to the rooms inside: long white planes, timber-toned walls and the pool at sunset.',
      es: 'Del vuelo sobre la ladera a las estancias interiores: largos planos blancos, frentes de tono madera y la piscina al atardecer.'
    },
    // Andrés, 9 Oct 2026: filmed by the photographer Gonzalo Botet.
    credit: { name: 'Gonzalo Botet', role: { en: 'Photographer', es: 'Fotógrafo' }, label: { en: 'Filmed by photographer', es: 'Vídeo del fotógrafo' } }
  },
  {
    id: 'villa-paris', projectId: 'villa-paris', kind: 'built', text: {
      en: 'The garden, the porches and the pool by day, the rooms inside, and the house lit up at nightfall.',
      es: 'El jardín, los porches y la piscina de día, las estancias interiores y la casa iluminada al anochecer.'
    }
  },
  {
    id: 'la-resina-six', projectId: 'la-resina', kind: 'built', title: { en: 'The Resina 6ix', es: 'The Resina 6ix' }, text: {
      en: 'Terraces, an infinity pool and rooms open to the views, from the morning sun to dusk.',
      es: 'Terrazas, una piscina desbordante y estancias abiertas a las vistas, del sol de la mañana al anochecer.'
    }
  },
  {
    id: 'villa-soal', projectId: 'villa-soal', kind: 'visualisation', text: {
      en: 'A visualisation of the design: terraces stepping down the slope, timber-toned planes and linear lighting at dusk.',
      es: 'Una visualización del diseño: terrazas escalonadas sobre la ladera, planos de tono madera e iluminación lineal al atardecer.'
    }
  },
  {
    id: 'villa-pareja', projectId: 'villa-pareja', kind: 'tender', text: {
      en: 'A visualisation of the tender proposal: low pavilions arranged around the garden and the pool.',
      es: 'Una visualización de la propuesta de licitación: pabellones bajos alrededor del jardín y la piscina.'
    }
  }
]

export const films: Film[] = definitions.map(d => {
  const media = filmMedia[d.id], project = d.projectId ? projectById(d.projectId) : undefined
  if (!media) throw new Error(`Film ${d.id} has no media (scripts/media/build_films.sh)`)
  if (d.projectId && !project) throw new Error(`Film ${d.id}: unknown project ${d.projectId}`)
  return { ...d, title: d.title ?? project!.name, media }
})
export const reel = films[0]!
export const projectFilms = films.slice(1)
export const filmProjectPath = (film: Film, locale: Locale) => { const p = film.projectId ? projectById(film.projectId) : undefined; return p ? projectPath(p, locale) : undefined }
export const filmByProject = (projectId: string) => films.find(f => f.projectId === projectId)

export const clock = (seconds: number) => { const s = Math.max(0, Math.floor(seconds)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}` }
export const isoDuration = (seconds: number) => `PT${Math.floor(seconds / 60)}M${Math.round(seconds % 60)}S`
export const totalRuntime = films.reduce((sum, f) => sum + f.media.duration, 0)

export const filmsCopy = {
  en: {
    label: 'Videos', title: 'Videos of villas on the Costa del Sol',
    description: 'The 2026 reel and videos of villas by architect Francisco Martínez Galván in Marbella and on the Costa del Sol: built homes and architectural visualisations.',
    eyebrow: 'Videos · Reel 2026', heading: 'Architecture', italic: 'in motion.',
    lead: 'Light across a façade, still water, a terrace opening to the landscape. Two minutes reviewing a selection of highlights.',
    playReel: 'Play the reel', withSound: 'with sound', screenCaption: 'Reel 2026', screenSign: 'Martínez Galván, architect',
    programmeEyebrow: 'Project videos', programmeTitle: 'Every villa,', programmeItalic: 'its own film.',
    programmeText: 'Built villas filmed on site, and projects presented through architectural visualisation. Each video says which it is, so you always know what you are seeing.',
    kind: { reel: 'Studio reel', built: 'Built villa', visualisation: 'Architectural visualisation', tender: 'Tender proposal · visualisation' } as Record<FilmKind, string>,
    watch: 'Watch the video', viewProject: 'View the project',
    playLabel: (title: string, time: string) => `Play ${title} (${time}) with sound`,
    count: (n: number) => `${n} videos`,
    ctaEyebrow: 'Start a conversation', ctaTitle: 'What space', ctaItalic: 'do you imagine?', ctaText: 'A new villa or a renovation. Let’s start with what you have in mind.',
    ctaLink: 'Tell us about your project', projectsLink: 'See all projects',
    player: {
      dialog: 'Video player', close: 'Close', play: 'Play', pause: 'Pause', mute: 'Mute', unmute: 'Turn the sound on', fullscreen: 'Full screen', exitFullscreen: 'Exit full screen',
      seek: 'Position in the video', previous: 'Previous video', next: 'Next video', replay: 'Watch again', upNext: 'Up next', loading: 'Loading', of: 'of', viewProject: 'View the project'
    }
  },
  es: {
    label: 'Vídeos', title: 'Vídeos de villas en la Costa del Sol',
    description: 'El reel 2026 y vídeos de villas del arquitecto Francisco Martínez Galván en Marbella y la Costa del Sol: obras construidas y visualizaciones arquitectónicas.',
    eyebrow: 'Vídeos · Reel 2026', heading: 'La arquitectura,', italic: 'en movimiento.',
    lead: 'La luz sobre una fachada, el agua en calma, una terraza que se abre al paisaje. Dos minutos por una selección de proyectos destacados.',
    playReel: 'Ver el reel', withSound: 'con sonido', screenCaption: 'Reel 2026', screenSign: 'Martínez Galván, arquitecto',
    programmeEyebrow: 'Vídeos de proyectos', programmeTitle: 'Cada villa,', programmeItalic: 'su propia película.',
    programmeText: 'Villas construidas, grabadas en la obra terminada, y proyectos presentados con visualización arquitectónica. Cada vídeo lo indica, para que sepas siempre qué estás viendo.',
    kind: { reel: 'Reel del estudio', built: 'Villa construida', visualisation: 'Visualización arquitectónica', tender: 'Propuesta de licitación · visualización' } as Record<FilmKind, string>,
    watch: 'Ver el vídeo', viewProject: 'Ver el proyecto',
    playLabel: (title: string, time: string) => `Ver ${title} (${time}) con sonido`,
    count: (n: number) => `${n} vídeos`,
    ctaEyebrow: 'Empecemos a hablar', ctaTitle: '¿Qué espacio', ctaItalic: 'imaginas?', ctaText: 'Una nueva villa o una reforma. Empecemos por lo que tienes en mente.',
    ctaLink: 'Cuéntanos tu proyecto', projectsLink: 'Ver todos los proyectos',
    player: {
      dialog: 'Reproductor de vídeo', close: 'Cerrar', play: 'Reproducir', pause: 'Pausa', mute: 'Silenciar', unmute: 'Activar el sonido', fullscreen: 'Pantalla completa', exitFullscreen: 'Salir de pantalla completa',
      seek: 'Posición en el vídeo', previous: 'Vídeo anterior', next: 'Vídeo siguiente', replay: 'Volver a ver', upNext: 'A continuación', loading: 'Cargando', of: 'de', viewProject: 'Ver el proyecto'
    }
  }
}

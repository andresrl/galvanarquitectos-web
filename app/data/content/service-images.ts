// Service pages (hubs and service × location) illustrated with the project archive (4K originals, AVIF srcset).
// Rules: a project confirmed in an area appears on every service page of that area, whatever the service,
// and its photographs are used first as heroes there. Otherwise each service draws from its own list:
// exteriors for new-build and renovation.
// Heroes never repeat within a service (10 areas) or within an area (2 services).
import type { Locale, Media } from '../pages/types'
import type { LocationId, ServiceId } from '../taxonomy'
import { locationIds } from '../taxonomy'
import { projects, projectById, projectPath } from '../projects/projects'
import { projectUi } from '../projects/ui'
import type { Project, ProjectImage } from '../projects/types'

type Ref = [projectId: string, file: string]

// Per service: hub hero, pause, and one hero per area in locationIds order
// (marbella, benahavis, los-monteros, nueva-andalucia, estepona, guadalmina, la-zagaleta, golden-mile, rio-real, elviria).
const lists: Record<ServiceId, { hub: Ref; pause: Ref; areas: Ref[] }> = {
 architecture: { hub: ['the-house', 'the_house_06.jpg'], pause: ['the-villas', 'the_villas_06.jpg'], areas: [
  ['the-villas', 'the_villas_01.jpg'], ['la-montua', 'la_montua_02.jpg'], ['villa-soal', 'villa_soal_01.jpg'], ['villa-feliz', 'villa_feliz_05.jpg'], ['alcala-solvilla', 'alcala_solvilla_02.jpg'],
  ['villa-alcala', 'calle_alcala_4_02.jpg'], ['altos-de-los-monteros', 'altos_de_los_monteros_04.jpg'], ['orion', 'orion_03.jpg'], ['huerta-belon', 'huerta_belon_34_01.jpg'], ['elviria', 'elviria_02.jpg']] },
 renovation: { hub: ['atalaya', 'atalaya_01.jpg'], pause: ['villa-ambar', 'villa_ambar_03.jpg'], areas: [
  ['villa-silver', 'silver 2.jpg'], ['villa-pino', 'calle_pino_01.jpg'], ['villa-relojero', 'carril_del_relojero_03.jpg'], ['villa-paris', 'villa_paris_02.jpg'], ['la-resina', 'la_resina_02.jpg'],
  ['sirio', 'sirio_01.jpg'], ['villa-ambar', 'villa_ambar_04.jpg'], ['cortijo-nagueles', 'cortijo_nagueles_44_04.jpg'], ['atalaya', 'atalaya_03.jpg'], ['villa-del-golf', 'parcelas_del_golf_02.jpg']] }
}
const serviceOrder: ServiceId[] = ['architecture', 'renovation']

const all = (p: Project) => [p.media.hero, ...p.media.gallery, p.media.pause]
function image(projectId: string, file: string): ProjectImage {
 const found = all(projectById(projectId)!).find(i => i.file === file)
 if (!found) throw new Error(`service-images: ${projectId}/${file} not in the project archive`)
 return found
}
const altFor = (p: Project, img: ProjectImage, locale: Locale) => img === p.media.hero ? p.copy[locale].heroAlt : `${p.name[locale]} · ${projectUi[locale].imagery[p.imagery]}`
function media(projectId: string, file: string, locale: Locale): Media {
 const p = projectById(projectId)!, img = image(projectId, file)
 return { src: img.src, srcset: img.srcset, width: img.width, height: img.height, alt: altFor(p, img, locale), caption: `${p.name[locale]} · ${projectUi[locale].imagery[p.imagery]}` }
}

export const projectsIn = (loc: LocationId) => projects.filter(p => p.zone === loc)

// Hero for a service × area page: photographs of projects in that area first (one per service, never repeated), else the service list.
export function areaHero(service: ServiceId, loc: LocationId, locale: Locale): Media {
 const local = projectsIn(loc).flatMap(p => all(p).map(img => [p.id, img.file] as Ref))
 const pick = local[serviceOrder.indexOf(service)]
 const [id, file] = pick ?? lists[service].areas[locationIds.indexOf(loc)]
 return media(id, file, locale)
}
export const hubHero = (service: ServiceId, locale: Locale) => media(...lists[service].hub, locale)
export function servicePause(service: ServiceId, locale: Locale, hero?: Media): Media {
 const pause = media(...lists[service].pause, locale)
 return hero && pause.src === hero.src ? media(...lists[service].hub, locale) : pause
}

// Tall feature photo: another image from the service list, offset so neighbouring pages differ, never the hero.
export function feature(service: ServiceId, offset: number, hero: Media, locale: Locale): Media {
 const refs = lists[service].areas
 for (let n = 0; n < refs.length; n++) {
  const m = media(...refs[(offset + 3 + n) % refs.length], locale)
  if (m.src !== hero.src) return m
 }
 return servicePause(service, locale)
}

// Projects module: projects confirmed in the area first (any service), then the service's own projects. Two, linked.
export function serviceProjects(service: ServiceId, loc: LocationId | undefined, offset: number, locale: Locale, heroSrc?: string) {
 const local = loc ? projectsIn(loc) : []
 const ids = [...new Set(lists[service].areas.map(([id]) => id))]
 const pool = ids.map(id => projectById(id)!).filter(p => !local.includes(p))
 const chosen = [...local, ...pool.slice(offset % pool.length), ...pool].filter((p, i, a) => a.indexOf(p) === i).slice(0, 2)
 return chosen.map(p => { const img = p.media.hero.src === heroSrc ? (p.media.gallery[0] ?? p.media.pause) : p.media.hero; return { name: p.name[locale], image: '', src: img.src, srcset: img.srcset, width: img.width, height: img.height,
  alt: altFor(p, img, locale), text: '', path: projectPath(p, locale), local: local.includes(p) } })
}

// Project archive model. Curation (order, slugs, hero) lives in scripts/media/projects.json;
// facts in projects.ts; copy in content.ts; image derivatives in media.generated.ts.
import type { Locale } from '../pages/types'
import type { LocationId, ServiceId } from '../taxonomy'

export type ProjectImage = {
  file: string            // original file name in Graphics/VISENI/proyectos (never served)
  src: string             // AVIF, ~1600 px
  srcset: string
  width: number; height: number
  lqip: string            // tiny blurred placeholder, data URI
  jpg?: string            // hero only: JPEG for Open Graph
}
export type ProjectMedia = { hero: ProjectImage; pause: ProjectImage; gallery: ProjectImage[] }

export type ProjectStatus = 'completed' | 'ongoing' | null   // null: not confirmed, never shown
export type ProjectKind = 'renovation' | 'hospitality' | 'tender'
export type Imagery = 'photography' | 'visualisation'

export type ProjectFacts = {
  status: ProjectStatus
  zone?: LocationId       // only when confirmed in the project sheet
  kind?: ProjectKind      // only when confirmed
  imagery: Imagery        // honest label: built photography or architectural visualisation
  services?: ServiceId[]  // services the images and text show; pending Paco's confirmation (see projects.ts)
  pending: string[]       // internal: what Paco must confirm before publishing
}

export type ProjectCopy = {
  heading: string         // editorial headline, set in italics under the name
  lead: string
  body: [string, string, string] | string[]
  heroAlt: string
}

export type Project = ProjectFacts & {
  id: string
  order: number
  name: Record<Locale, string>
  slug: Record<Locale, string>
  featured: boolean
  copy: Record<Locale, ProjectCopy>
  media: ProjectMedia
}

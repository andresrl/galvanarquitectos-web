// CAD → render comparisons on project pages (ProjectCompare.vue, after the gallery). At most one per project.
// Both images share the same view and size, so the drawing lines up exactly over the render.
// Derivatives: python scripts/media/build_compare.py → public/media/projects/<folder>/<name>-{cad,render}-<width>.avif
// Section copy (the care taken over renders) is common to every project: projectUi.compare in ui.ts.
import type { Locale } from '../pages/types'

export type CompareImage = { src: string; srcset: string; width: number; height: number }
export type ProjectCompare = { cad: CompareImage; render: CompareImage; alt: Record<Locale, { cad: string; render: string }> }

const derivatives = (base: string, widths: number[], width: number, height: number): CompareImage => ({
 src: `${base}-1600.avif`,
 srcset: widths.map(w => `${base}-${w}.avif ${w}w`).join(', '),
 width, height
})
const pair = (folder: string, widths: number[], width: number, height: number) => ({
 cad: derivatives(`/media/projects/${folder}/${folder}-compare-cad`, widths, width, height),
 render: derivatives(`/media/projects/${folder}/${folder}-compare-render`, widths, width, height)
})

export const projectCompares: Record<string, ProjectCompare> = {
 'the-house': {
  ...pair('the-house', [800, 1600, 2560], 2560, 1440),
  alt: {
   es: { cad: 'The House: dibujo CAD de la vista desde la piscina, en líneas blancas sobre fondo negro', render: 'The House: render de la villa de una planta, con frentes de lamas de madera, piscina desbordante y tumbonas junto al porche' },
   en: { cad: 'The House: CAD drawing of the view from the pool, white lines on black', render: 'The House: render of the single-storey villa, with timber-slatted elevations, overflow pool and loungers by the porch' }
  }
 }
}

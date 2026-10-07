// Approved pilot: villa renovation × Marbella. Copy in app/data/services/renovation.ts.
import type { PageDefinition } from './types'
import { renovation } from '../services/renovation'
import { serviceProjects } from '../content/service-images'

export const renovationMarbella: PageDefinition = {
  id: 'renovation-marbella',
  type: 'service-location',
  template: 'service',
  serviceId: 'renovation',
  locationId: 'marbella',
  paths: { en: '/villa-renovation/marbella', es: '/es/reformas-villas/marbella' },
  status: 'draft',
  // Approved copy and hero; the projects module now links real project pages (Marbella first).
  content: { en: { ...renovation.en, projects: serviceProjects('renovation', 'marbella', 0, 'en') }, es: { ...renovation.es, projects: serviceProjects('renovation', 'marbella', 0, 'es') } },
  sources: ['Decisiones de Andrés en la conversación de aprobación del piloto (CLAUDE.md §7)'],
  pending: ['Proyectos de reforma documentados en Marbella: las imágenes actuales son archivo arquitectónico']
}

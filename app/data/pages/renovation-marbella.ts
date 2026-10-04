// Approved pilot: villa renovation × Marbella. Copy in app/data/services/renovation.ts.
import type { PageDefinition } from './types'
import { renovation } from '../services/renovation'

export const renovationMarbella: PageDefinition = {
  id: 'renovation-marbella',
  type: 'service-location',
  template: 'service',
  serviceId: 'renovation',
  locationId: 'marbella',
  projectIds: ['villa-silver', 'villa-carril'],
  paths: { en: '/villa-renovation/marbella', es: '/es/reformas-villas/marbella' },
  status: 'draft',
  content: renovation,
  sources: ['Decisiones de Andrés en la conversación de aprobación del piloto (CLAUDE.md §7)'],
  pending: ['Proyectos de reforma documentados en Marbella: las imágenes actuales son archivo arquitectónico']
}

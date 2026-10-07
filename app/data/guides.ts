// Guides (journal): EN under /journal, ES under /es/guias. Files live in content/blog/{en,es}/<slug>.md.
import type { Locale } from './pages/types'

export const guideIndex: Record<Locale, string> = { en: '/journal', es: '/es/guias' }
export const guidePath = (locale: Locale, slug: string) => `${guideIndex[locale]}/${slug}`
export const guideContentPath = (locale: Locale, slug: string) => `/blog/${locale}/${slug}`
export const guideSlug = (contentPath: string) => contentPath.split('/').pop() as string
export const guideLocale = (path: string): Locale | undefined => path === guideIndex.en || path.startsWith(guideIndex.en + '/') ? 'en' : path === guideIndex.es || path.startsWith(guideIndex.es + '/') ? 'es' : undefined

export const guideCopy = {
  en: { seoTitle: 'Villa architecture guides, Costa del Sol', title: 'Journal', heading: 'Questions before', italic: 'your project.', eyebrow: 'GUIDES · MARTÍNEZ GALVÁN',
    lead: 'Practical guides for the decisions that come before and during a villa project: plots, permissions, budgets, drawings, and working with the architect from abroad.',
    guide: 'GUIDE', draft: 'Draft · pending review', by: 'By', related: 'RELATED SERVICE', more: 'MORE GUIDES', all: 'All guides', contact: 'Talk to the studio', read: 'Read the guide',
    description: 'Practical guides from Martínez Galván on villa architecture, renovation, interiors and landscape on the Costa del Sol.' },
  es: { seoTitle: 'Guías de arquitectura de villas, Costa del Sol', title: 'Guías', heading: 'Preguntas antes', italic: 'de tu proyecto.', eyebrow: 'GUÍAS · MARTÍNEZ GALVÁN',
    lead: 'Guías prácticas para las decisiones que llegan antes y durante el proyecto de una villa: parcelas, licencias, presupuestos, planos y cómo trabajar con el arquitecto desde otro país.',
    guide: 'GUÍA', draft: 'Borrador · pendiente de revisión', by: 'Por', related: 'SERVICIO RELACIONADO', more: 'MÁS GUÍAS', all: 'Todas las guías', contact: 'Habla con el estudio', read: 'Leer la guía',
    description: 'Guías prácticas de Martínez Galván sobre arquitectura, reformas, interiorismo y paisajismo de villas en la Costa del Sol.' }
}

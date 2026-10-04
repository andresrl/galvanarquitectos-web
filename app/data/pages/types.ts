// Shared page model. Definitions hold structure and paths; content holds the copy for one language.
export type Locale = 'en' | 'es'
export const locales: Locale[] = ['en', 'es']
export type PageStatus = 'draft' | 'reviewed' | 'published'
export type PageType = 'service' | 'service-location' | 'project' | 'editorial'
export type PageTemplate = 'service'

export type Media = { src: string; width: number; height: number; alt: string; caption: string }
export type Crumb = { label: string; path?: string }
export type Faq = [question: string, answer: string]

// Copy for the approved service template (ServicePage.vue). Every service × location page fills it.
export interface ServiceContent {
  label: string; title: string; description: string
  eyebrow: string; heading: string; italic: string; lead: string
  enquire: string; discover: string; home: string; service: string
  navigation: [string, string, string, string]
  media: { hero: Media; feature: Media; pause: Media }
  introEyebrow: string; introTitle: string; introItalic: string; introLead: string; introText: string
  transformationEyebrow: string; transformationTitle: string; transformationItalic: string
  scope: { title: string; text: string }[]
  secondaryCaption?: string; archiveNote: string
  visionEyebrow: string; visionTitle: string; visionItalic: string; visionText: string
  processEyebrow: string; processTitle: string; processItalic: string; processText: string
  steps: { title: string; text: string }[]
  archiveEyebrow: string; archiveTitle: string; archiveItalic: string; archiveText: string
  projects: { name: string; image: string; alt: string; text: string }[]
  localEyebrow: string; localTitle: string; localItalic: string; localText: string; remoteText: string
  localPoints: string[]
  faqEyebrow: string; faqTitle: string; faqs: Faq[]
  contactEyebrow: string; contactTitle: string; contactItalic: string; contactText: string
  fields: { name: string; email: string; phone: string; location: string; message: string }
  submit: string; formNote: string; contactAlternative: string
  footerLink: string; languageLabel: string; reference: string; illustration: string
  zonesEyebrow?: string; zonesTitle?: string; zonesItalic?: string; zonesText?: string
}

export type PageDefinition<C = ServiceContent> = {
  id: string
  type: PageType
  template: PageTemplate
  serviceId?: string
  locationId?: string
  projectIds?: string[]
  paths: Record<Locale, string>
  status: PageStatus
  content: Record<Locale, C>
  sources: string[]
  pending: string[]
}

export type ResolvedPage<C = ServiceContent> = {
  definition: PageDefinition<C>
  locale: Locale
  path: string
  content: C
  alternates: Record<Locale, string>
  breadcrumb: Crumb[]
  locationName?: string
  zones?: NavItem[]                         // hub: its location pages
  related?: { title: string; links: NavItem[] }[] // location page: a few neighbours, never the whole matrix
  relatedEyebrow?: string
}
export type NavItem = { label: string; path: string }

// Service hubs and service × location pages composed from service copy, local copy and the studio archive.
// The approved pilot (renovation × Marbella) keeps its own hand-written file and is not generated here.
import type { HeroLayout, Locale, Media, PageDefinition, ServiceContent } from './types'
import { locales } from './types'
import { services, serviceIds, locations, locationIds, type LocationId, type ServiceId } from '../taxonomy'
import { serviceCopy, serviceMedia, commonCopy } from '../content/services'
import { locationCopy } from '../content/locations'
import { archive, type ArchiveKey } from '../content/archive'
import { heroLeads, heroOrder } from '../content/hero'

const handWritten = new Set(['renovation-marbella'])

function media(key: ArchiveKey, locale: Locale): Media {
  const a = archive[key]
  return { src: a.src, width: a.width, height: a.height, alt: a.alt[locale], caption: `${a.name} · ${commonCopy[locale].archiveCaption}` }
}
function project(key: ArchiveKey, locale: Locale) {
  const a = archive[key]
  return { name: a.name, image: a.src.replace('/photos/', ''), alt: a.alt[locale], text: a.text[locale] }
}
const pick = (pool: ArchiveKey[], offset: number, skip?: ArchiveKey) => { const p = pool.filter(k => k !== skip); return [0, 1, 2].map(n => p[(offset + n) % p.length]) }

function compose(id: ServiceId, locale: Locale, offset: number, local?: { loc: LocationId; hero: ArchiveKey }): ServiceContent {
  const s = serviceCopy[id][locale], c = commonCopy[locale], m = serviceMedia[id]
  const [feature, first, second] = pick(m.pool, offset, local?.hero)
  const loc = local && locations[local.loc], lc = local && locationCopy[local.loc]
  const place = loc?.in[locale]
  const base = {
    enquire: s.enquire, discover: c.discover, home: c.home, service: services[id].name[locale], navigation: s.navigation,
    media: { hero: media(local?.hero ?? m.hero, locale), feature: media(feature, locale), pause: media(m.pause, locale) },
    introEyebrow: s.introEyebrow, introTitle: s.introTitle, introItalic: s.introItalic,
    transformationEyebrow: s.transformationEyebrow, transformationTitle: s.transformationTitle, transformationItalic: s.transformationItalic, scope: s.scope,
    archiveNote: s.archiveNote,
    visionEyebrow: s.visionEyebrow, visionTitle: s.visionTitle, visionItalic: s.visionItalic, visionText: s.visionText,
    processEyebrow: s.processEyebrow, processTitle: s.processTitle, processItalic: s.processItalic, processText: s.processText, steps: s.steps,
    archiveEyebrow: s.archiveEyebrow, archiveTitle: s.archiveTitle, archiveItalic: s.archiveItalic, archiveText: s.archiveText,
    projects: [project(first, locale), project(second, locale)],
    localEyebrow: c.localEyebrow, localItalic: s.localItalic, remoteText: c.remoteText, localPoints: c.localPoints,
    faqEyebrow: c.faqEyebrow, faqTitle: c.faqTitle,
    contactEyebrow: s.contactEyebrow, contactTitle: s.contactTitle, contactItalic: s.contactItalic,
    fields: c.fields, submit: c.submit, formNote: c.formNote, contactAlternative: c.contactAlternative,
    footerLink: c.footerLink, languageLabel: c.languageLabel, reference: c.reference, illustration: c.illustration
  }
  if (!loc || !lc || !place) return {
    ...base,
    label: services[id].name[locale], title: `${s.heading} ${s.hubItalic.replace(/\.$/, '')} · Galván Arquitectos`, description: s.hubDescription,
    eyebrow: c.hubEyebrow, heading: s.heading, italic: s.hubItalic, lead: s.hubLead,
    introLead: s.hubIntroLead, introText: s.hubIntroText,
    localTitle: s.hubLocalTitle, localText: c.hubLocalText, faqs: s.faqs, contactText: s.hubContactText,
    zonesEyebrow: s.zonesEyebrow, zonesTitle: s.zonesTitle, zonesItalic: s.zonesItalic, zonesText: s.zonesText
  }
  const focus = lc.focus[id]?.[locale], lead = heroLeads[local.loc][id]?.[locale]
  if (!focus || !lead) throw new Error(`Missing local copy for ${id} × ${local.loc} (${locale})`)
  return {
    ...base,
    label: `${services[id].name[locale]} ${place}`, title: `${s.heading} ${place} · Galván Arquitectos`, description: s.describe(place),
    eyebrow: `${loc.name[locale].toUpperCase()} · ${loc.area}`, heading: s.heading, italic: place + '.', lead,
    introLead: lc.context[locale], introText: `${focus} ${s.introText}`,
    localTitle: s.localTitle(place), localText: lc.setting[locale], faqs: [lc.faq[locale], ...s.faqs], contactText: s.contactText(place)
  }
}

const byLocale = <T>(make: (locale: Locale) => T) => Object.fromEntries(locales.map(l => [l, make(l)])) as Record<Locale, T>

export const hubPages: PageDefinition[] = serviceIds.map(id => ({
  id: `${id}-hub`, type: 'service', template: 'service', serviceId: id,
  paths: { en: `/${services[id].slug.en}`, es: `/es/${services[id].slug.es}` },
  status: 'draft', content: byLocale(locale => compose(id, locale, 5)),
  sources: ['CLAUDE.md §9 (borradores de servicio)', 'Piloto aprobado de reformas en Marbella'],
  pending: ['Imágenes propias del servicio: hoy se usa el archivo arquitectónico']
}))

export const locationPages: PageDefinition[] = serviceIds.flatMap((id, s) => locationIds.map((loc, i) => ({ id, loc, i, s })))
  .filter(({ id, loc }) => !handWritten.has(`${id}-${loc}`))
  .map(({ id, loc, i, s }) => ({
    id: `${id}-${loc}`, type: 'service-location', template: 'service', serviceId: id, locationId: loc,
    hero: ((i + s) % 2 ? 'split-left' : 'split-right') as HeroLayout,
    paths: { en: `/${services[id].slug.en}/${locations[loc].slug.en}`, es: `/es/${services[id].slug.es}/${locations[loc].slug.es}` },
    status: 'draft', content: byLocale(locale => compose(id, locale, i + s * 3, { loc, hero: heroOrder[(i + 4 * s) % heroOrder.length] })),
    sources: ['CLAUDE.md §9 (borradores de servicio)', 'app/data/content/locations.ts (geografía general de la zona)'],
    pending: ['Proyectos documentados en esta zona', 'Revisión de Paco del texto local', 'Imágenes propias del servicio']
  }))

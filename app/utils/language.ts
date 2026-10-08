// Both HTTP negotiation and the browser fallback use the same supported-language order.
export function preferredLanguage(languages: readonly string[]): 'en' | 'es' {
 for (const language of languages) {
  const tag = language.trim().toLowerCase().split('-')[0]
  if (tag === 'en') return 'en'
  if (['es', 'ca', 'gl', 'eu'].includes(tag ?? '')) return 'es'
 }
 return 'en'
}

export function languageFromHeader(header = ''): 'en' | 'es' {
 const languages = header.split(',').map(part => {
  const [tag, ...parameters] = part.trim().split(';')
  const quality = parameters.find(p => /^\s*q\s*=/i.test(p))
  return { tag: tag ?? '', q: quality ? Number(quality.split('=')[1]?.trim()) : 1 }
 }).filter(l => l.tag && l.q > 0 && l.q <= 1).sort((a, b) => b.q - a.q)
 return preferredLanguage(languages.map(l => l.tag))
}

// Match actual crawlers and link-preview clients; ordinary in-app and automated browsers are visitors.
export const languageCrawler = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegram|embedly/i

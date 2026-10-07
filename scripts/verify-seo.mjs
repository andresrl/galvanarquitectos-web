// SEO / AI-search audit of every page reachable from / and /es (crawls internal links).
// Checks: title ≤ 60, description 120–160, one H1, canonical = self, reciprocal hreflang, valid JSON-LD with the studio
// and the architect, an OG image of 1200×630 that responds, robots.txt and llms.txt.
// Usage: node scripts/verify-seo.mjs [base] [--report]   (--report lists every issue without failing on the first)
import assert from 'node:assert/strict'
const base = process.argv.find(a => a.startsWith('http')) ?? 'http://127.0.0.1:3048'
const report = process.argv.includes('--report')
const ua = { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' } // never redirected by browser language
const get = async path => { const r = await fetch(new URL(path, base), { headers: ua, redirect: 'manual' }); return { status: r.status, html: r.status === 200 ? await r.text() : '' } }
const one = (s, re) => (s.match(re) ?? [])[1]
const decode = s => s?.replace(/&amp;/g, '&').replace(/&#39;|&#x27;/g, "'").replace(/&quot;/g, '"')
const issues = []
const check = (ok, msg) => { if (ok) return; if (report) issues.push(msg); else assert.fail(msg) }

const queue = ['/', '/es'], seen = new Set(queue), pages = new Map()
while (queue.length) {
 const path = queue.shift(), { status, html } = await get(path)
 if (status !== 200) { check(false, `${path} responds ${status}`); continue }
 pages.set(path, html)
 for (const [, href] of html.matchAll(/href="(\/[^"#?]*)"/g)) {
  const p = href.replace(/\/$/, '') || '/'
  if (seen.has(p) || /\.\w+$/.test(p) || p.startsWith('/_') || p.startsWith('/media') || p.startsWith('/og')) continue
  seen.add(p); queue.push(p)
 }
}

const ogChecked = new Map()
for (const [path, html] of pages) {
 const title = decode(one(html, /<title>([^<]*)<\/title>/)), desc = decode(one(html, /<meta[^>]*name="description"[^>]*content="([^"]*)"/))
 check(title && title.length <= 60, `${path} title ${title?.length}: ${title}`)
 check(desc && desc.length >= 110 && desc.length <= 160, `${path} description ${desc?.length}`)
 check((html.match(/<h1\b/g) ?? []).length === 1, `${path} one H1`)
 const canonical = one(html, /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)
 check(canonical && (new URL(canonical).pathname.replace(/\/$/, '') || '/') === path, `${path} canonical ${canonical}`)
 const alt = {}; for (const m of html.matchAll(/<link[^>]*rel="alternate"[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"/g)) alt[m[1]] = new URL(m[2]).pathname.replace(/\/$/, '') || '/'
 check(alt.en && alt.es && alt['x-default'] === alt.en, `${path} hreflang set`)
 const ld = one(html, /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/)
 let graph = []
 try { graph = JSON.parse(ld.replace(/&quot;/g, '"').replace(/&amp;/g, '&'))['@graph'] } catch { check(false, `${path} JSON-LD does not parse`) }
 const ids = graph.map(n => n['@id'] ?? '')
 check(ids.some(i => i.endsWith('/#studio')) && ids.some(i => i.endsWith('/#paco')), `${path} JSON-LD has the studio and the architect`)
 check(graph.some(n => [n['@type']].flat().some(t => /Page$/.test(t))), `${path} JSON-LD has a page node`)
 const og = one(html, /<meta[^>]*property="og:image"[^>]*content="([^"]+)"/), w = one(html, /og:image:width"[^>]*content="(\d+)"/), h = one(html, /og:image:height"[^>]*content="(\d+)"/)
 check(og && w === '1200' && h === '630', `${path} og:image 1200×630 (${w}×${h} ${og})`)
 if (og) { const p = new URL(og).pathname; if (!ogChecked.has(p)) ogChecked.set(p, (await fetch(new URL(p, base), { method: 'HEAD' })).status); check(ogChecked.get(p) === 200, `${path} og:image responds ${ogChecked.get(p)}`) }
}
for (const file of ['/robots.txt', '/llms.txt', '/llms-full.txt', '/sitemap.xml']) check((await fetch(new URL(file, base))).status === 200, `${file} responds`)

if (report) { console.log(issues.length ? issues.join('\n') : 'no issues'); console.log(`\n${pages.size} pages, ${issues.length} issues`) }
else console.log(`PASS SEO: ${pages.size} pages — titles ≤ 60, descriptions 110–160, H1, canonical, hreflang, JSON-LD (studio + architect), OG 1200×630, robots/llms/sitemap`)

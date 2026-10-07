// Crawls the service hubs and their area pages through their own links and checks every page.
import assert from 'node:assert/strict'
const base=process.argv[2]??'http://127.0.0.1:3048'
const hubs={en:['/villa-architecture','/villa-renovation','/interior-design','/landscape-design'],es:['/es/arquitectura-villas','/es/reformas-villas','/es/interiorismo','/es/paisajismo']}
const get=async path=>{const r=await fetch(new URL(path,base));assert.equal(r.status,200,path);return r.text()}
const one=(html,re)=>(html.match(re)??[])[1]
const strip=s=>s.replace(/<[^>]+>/g,'').replace(/&#39;|&#x27;/g,"'").replace(/&amp;/g,'&').replace(/\s+/g,' ').trim()
const pages=new Map()
for(const [lang,list] of Object.entries(hubs))for(const hub of list){
 const html=await get(hub);pages.set(hub,{lang,html,hub:true})
 const zones=[...(html.match(/class="service-zones-list"[\s\S]*?<\/ol>/)?.[0]??'').matchAll(/href="([^"]+)"/g)].map(m=>m[1])
 assert.equal(zones.length,10,hub+' lists its 10 areas')
 for(const z of zones)pages.set(z,{lang,html:await get(z),hub:false})
}
assert.equal(pages.size,88,'4 hubs + 40 area pages per language')
const titles=new Set(),descriptions=new Set(),h1s=new Set(),intros=new Set()
for(const [path,{lang,html,hub}] of pages){
 assert.match(html,new RegExp('<html[^>]*lang="'+lang+'"'),path+' lang')
 assert.equal((html.match(/<h1\b/g)??[]).length,1,path+' one H1')
 assert.match(html,/noindex/,path+' preview stays noindex')
 const canonical=one(html,/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)
 assert.equal(new URL(canonical).pathname,path,path+' self canonical')
 const alt={};for(const m of html.matchAll(/<link[^>]*rel="alternate"[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"/g))alt[m[1]]=new URL(m[2]).pathname
 assert.equal(alt[lang],path,path+' hreflang self');assert.ok(alt.en&&alt.es&&alt['x-default']===alt.en,path+' hreflang set')
 const other=pages.get(alt[lang==='en'?'es':'en']);assert.ok(other,path+' equivalent was crawled')
 const back={};for(const m of other.html.matchAll(/<link[^>]*rel="alternate"[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"/g))back[m[1]]=new URL(m[2]).pathname
 assert.equal(back[lang],path,path+' hreflang reciprocal')
 const title=one(html,/<title>([^<]*)<\/title>/),desc=one(html,/<meta[^>]*name="description"[^>]*content="([^"]*)"/),h1=strip(one(html,/<h1[^>]*>([\s\S]*?)<\/h1>/))
 const intro=strip(one(html,/class="service-intro-body"[^>]*>([\s\S]*?)<a /)??'')
 for(const [set,v,n] of [[titles,title,'title'],[descriptions,desc,'description'],[h1s,h1,'H1'],[intros,intro,'intro']]){assert.ok(v,path+' has '+n);assert.ok(!set.has(v),path+' duplicate '+n+': '+v);set.add(v)}
 const schema=JSON.parse(one(html,/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/))
 const webpage=schema['@graph'].find(x=>x['@id'].endsWith('#webpage'))
 assert.equal(webpage.inLanguage,lang);assert.equal(webpage.mainEntity.length,(html.match(/<details\b/g)??[]).length,path+' FAQ schema matches visible FAQ')
 assert.ok(html.includes('id="enquiry-name"'),path+' enquiry form')
 if(!hub){const related=[...(html.match(/class="service-related[\s\S]*?<\/nav>/)?.[0]??'').matchAll(/href="([^"]+)"/g)].map(m=>m[1]);assert.ok(related.length>=6,path+' related links');for(const r of related)assert.ok(pages.has(r)||(r.startsWith('/areas/')||r.startsWith('/es/zonas/'))&&(await fetch(new URL(r,base))).status===200,path+' related link resolves: '+r)}
 assert.ok(!/undefined|\[object Object\]|NaN/.test(strip(html.match(/<main[\s\S]*<\/main>/)[0])),path+' no placeholder text')
}
const heroBy={service:{},area:{}},leads=new Set()
for(const [path,{html,hub}] of pages){
 if(hub)continue
 const parts=path.replace(/^\/es/,'').split('/').filter(Boolean),hero=one(html,/class="service-hero-image"><img src="([^"]+)"/),lead=strip(one(html,/class="service-hero-lead"[^>]*>([\s\S]*?)<\/p>/))
 assert.ok(hero&&lead,path+' hero image and lead')
 assert.ok(!leads.has(lead),path+' duplicate hero lead: '+lead);leads.add(lead)
 const lang=path.startsWith('/es/')?'es':'en'
 for(const [kind,key] of [['service',lang+parts[0]],['area',lang+parts[1]]]){const seen=heroBy[kind][key]??=new Map();assert.ok(!seen.has(hero)||seen.get(hero)===path,path+' repeats the hero of '+seen.get(hero));seen.set(hero,path)}
 const below=html.slice(html.indexOf('id="overview"'));if(html.includes('service-hero--split'))assert.ok(!below.includes('src="'+hero+'"'),path+' hero image is not reused further down')
}
console.log(`PASS pSEO: ${pages.size} pages, unique titles, descriptions, H1 and intros, reciprocal hreflang, FAQ schema = visible FAQ, related links resolve, hero image unique per service and per area, unique hero leads`)

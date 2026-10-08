// Crawls the guide indexes and every guide: language, H1, canonical, reciprocal hreflang, Article schema, internal links, old /blog redirects.
import assert from 'node:assert/strict'
const base=process.argv[2]??'http://127.0.0.1:3048'
const get=async path=>{const r=await fetch(new URL(path,base));assert.equal(r.status,200,path+' → '+r.status);return r.text()}
const one=(html,re)=>(html.match(re)??[])[1]
const alts=html=>{const a={};for(const m of html.matchAll(/<link[^>]*rel="alternate"[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"/g))a[m[1]]=new URL(m[2]).pathname;return a}
const guides=new Map(),checked=new Set()
for(const [lang,index] of [['en','/journal'],['es','/es/guias']]){
 const html=await get(index)
 assert.match(html,new RegExp('<html[^>]*lang="'+lang+'"'),index+' lang')
 const links=[...(html.match(/class="guides-list[\s\S]*?<\/ol>/)?.[0]??'').matchAll(/href="([^"]+)"/g)].map(m=>m[1])
 assert.equal(links.length,13,index+' lists 13 guides')
 for(const l of links)guides.set(l,{lang,html:await get(l)})
}
for(const [path,{lang,html}] of guides){
 assert.match(html,new RegExp('<html[^>]*lang="'+lang+'"'),path+' lang')
 assert.equal((html.match(/<h1\b/g)??[]).length,1,path+' one H1')
 assert.equal(new URL(one(html,/rel="canonical"[^>]*href="([^"]+)"/)).pathname,path,path+' canonical')
 const a=alts(html),other=a[lang==='en'?'es':'en'];assert.equal(a[lang],path);assert.ok(guides.has(other),path+' translation exists: '+other)
 assert.equal(alts(guides.get(other).html)[lang],path,path+' hreflang reciprocal')
 const schema=JSON.parse(one(html,/type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)),art=schema['@graph'].find(x=>x['@type']==='Article')
 assert.ok(art&&art.inLanguage===lang&&art.datePublished,path+' Article schema')
 const prose=html.match(/class="guide-prose[\s\S]*?<\/article>/)?.[0]??'';assert.ok(prose.replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length>380,path+' has the full text')
 for(const m of html.matchAll(/href="(\/[^"#]*)(#[^"]*)?"/g)){const l=m[1];if(checked.has(l)||l.startsWith('/_nuxt')||/\.(css|js|woff2|svg|png|jpg)$/.test(l))continue;checked.add(l);const r=await fetch(new URL(l,base));assert.equal(r.status,200,path+' links to '+l+' → '+r.status)}
 assert.ok(!html.includes('href="/blog'),path+' no links to the old /blog')
}
for(const [from,to] of [['/blog','/es/guias'],['/blog/planos-arquitectura-como-leerlos-preparar-dudas','/es/guias/planos-arquitectura-como-leerlos-preparar-dudas']]){const r=await fetch(new URL(from,base),{redirect:'manual'});assert.equal(r.status,301,from);assert.equal(r.headers.get('location'),to)}
console.log(`PASS guides: ${guides.size} guides (13 EN + 13 ES), lang, canonical, reciprocal hreflang, Article schema, ${checked.size} internal links resolve, /blog redirects`)

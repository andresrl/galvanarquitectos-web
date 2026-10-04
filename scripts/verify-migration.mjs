import assert from 'node:assert/strict'
const base=process.argv[2]??'http://127.0.0.1:3048'
const pages=[['/','Spaces for'],['/villa-renovation','One villa, a new way'],['/interior-design','Interiors shaped around'],['/landscape-design','The landscape is']]
for(const [path,title] of pages){
 const res=await fetch(new URL(path,base));assert.equal(res.status,200,path)
 assert.match(res.headers.get('x-robots-tag')??'',/noindex/)
 const html=await res.text()
 assert.match(html,/<html[^>]*lang="en"/)
 assert.equal((html.match(/<h1\b/g)??[]).length,1,path+' must render one H1')
 assert.ok(html.includes(title),path+' has its English content before JavaScript')
 assert.match(html,/rel="canonical"/)
 assert.ok(!html.includes('data-esqueleto'))
 const schema=html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)
 assert.ok(schema,path+' has structured data');JSON.parse(schema[1])
 if(path==='/')assert.equal((html.match(/class="slide /g)??[]).length,8)
 console.log('PASS SSR '+path)
}
for(const path of ['/app/demo','/demo']){
 const res=await fetch(new URL(path,base),{redirect:'manual'});assert.equal(res.status,301);assert.equal(res.headers.get('location'),'/');console.log('PASS former demo redirects '+path)
}
const missing=await fetch(new URL('/app/demo/index.html',base));assert.equal(missing.status,404);console.log('PASS no parallel static demo')
const robots=await(await fetch(new URL('/robots.txt',base))).text();assert.match(robots,/Disallow: \//);console.log('PASS preview robots')
for(const path of ['/photos/web-villa-silver-01.jpg','/photos/web-villa-silver-02.jpg','/photos/web-cortijo-nagueles-01.jpg','/diseno/fonts/manrope.woff2','/diseno/services-lineart.svg'])assert.equal((await fetch(new URL(path,base))).status,200,path)
console.log('PASS local assets')

for(const [path,language,heading] of [['/villa-renovation/marbella','en','Luxury villa renovations'],['/es/reformas-villas/marbella','es','Reformas integrales de villas']]){
 const res=await fetch(new URL(path,base));assert.equal(res.status,200,path)
 const html=await res.text()
 assert.match(html,new RegExp('<html[^>]*lang="'+language+'"'))
 assert.equal((html.match(/<h1\b/g)??[]).length,1)
 assert.ok(html.includes(heading))
 assert.ok(html.includes(language==='en'?'Cambiar a español':'Switch to English'), 'SSR language selector must agree with page language')
 assert.match(html,/noindex/)
 assert.ok(html.includes('hreflang="en"')&&html.includes('hreflang="es"')&&html.includes('hreflang="x-default"'))
 const schema=JSON.parse(html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1])
 const page=schema['@graph'].find(x=>x['@id'].endsWith('#webpage'))
 assert.equal(page.inLanguage,language);assert.equal(page.mainEntity.length,6)
 assert.ok(schema['@graph'].some(x=>x['@type']==='Service'))
 assert.ok(html.includes('id="enquiry-name"')&&html.includes('id="enquiry-message"'))
 assert.equal((html.match(/<details\b/g)??[]).length,6)
 const other=language==='en'?'/es/reformas-villas/marbella':'/villa-renovation/marbella'
 assert.match(html,new RegExp('<a href="'+other+'"[^>]*hreflang="'+(language==='en'?'es':'en')+'"'),'language link points to the registered equivalent')
 assert.match(html,/class="service-breadcrumb"[\s\S]*?aria-current="page">Marbella</,'breadcrumb resolved from the page registry')
 console.log('PASS bilingual service SSR '+path)
}
assert.equal((await fetch(new URL('/photos/web-villa-carril-01.jpg',base))).status,200)
console.log('PASS pilot archive assets')

for(const [path,services,pilot] of [['/','Services','/villa-renovation/marbella'],['/es/reformas-villas/marbella','Servicios','/es/reformas-villas/marbella'],['/interior-design','Services','/villa-renovation/marbella']]){
 const html=await(await fetch(new URL(path,base))).text()
 assert.ok(html.includes('class="menu-toggle"')&&html.includes('aria-controls="site-menu"'),path+' header has the site menu button')
 assert.match(html,new RegExp('class="site-footer"[\\s\\S]*'+services+'[\\s\\S]*href="'+pilot+'"'),path+' footer links to the service pages in its language')
 for(const demo of ['/villa-renovation','/interior-design','/landscape-design'])assert.ok(html.includes('href="'+demo+'"'),path+' footer links to '+demo)
 console.log('PASS site navigation '+path)
}

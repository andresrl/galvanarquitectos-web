// Starter SEO infrastructure, extended so visible EN/ES copy and structured data agree.
import {negocio} from '~/data/negocio'
import {routes} from '~/data/routes'
import {cases,casePaths} from '~/data/demo'
import type {ResolvedPage} from '~/data/pages/types'
import {ogImages} from '~/data/og-manifest'
import {ids,studioNode,personNode,websiteNode,place,allAreas} from '~/data/schema'
import {services as serviceNames} from '~/data/taxonomy'
export function migasDe(path:string){
 const out:{path:string;label:string}[]=[]
 let route:any=routes.find(r=>r.path===path)
 while(route){out.unshift({path:route.path,label:route.label});route=route.parent?routes.find(r=>r.path===route.parent):null}
 if(path!=='/'&&out[0]?.path!=='/')out.unshift({path:'/',label:'Home'})
 return out
}
// <title>: «Title | Martínez Galván» when it fits in 60 characters, otherwise the title alone (the brand is in og:site_name).
export function brandTitle(raw:string){
 const base=raw.replace(/\s*[·|]\s*Martínez Galván$/,'').trim(), branded=`${base} | Martínez Galván`
 return branded.length<=60?branded:base
}
// <meta description>: at most 160 characters, cut at a word boundary. The visible copy is never changed.
export function clampDescription(text:string,max=158){
 const t=text.replace(/\s+/g,' ').trim()
 if(t.length<=160)return t
 const cut=t.slice(0,max),at=cut.lastIndexOf(' ')
 return cut.slice(0,at>100?at:max).replace(/[,;:.\s]+$/,'')+'…'
}
export function usePageSeo(o:{title:string;description:string;path:string;draft?:boolean;legal?:boolean;faqs?:{pregunta:string;respuesta:string}[];servicio?:string;page?:ResolvedPage<any>;extraSchema?:(site:string,url:string,businessId:string)=>object[];pageType?:string;about?:(site:string)=>object;alternates?:Record<'en'|'es',string>;article?:{datePublished:string;dateModified:string;author:string}}){
 const cfg=useRuntimeConfig().public
 const {locale}=useGalvan()
 // Absolute URLs: the final domain once indexing is on; while the site is a noindex preview, the host serving it,
 // so shared links and preview images work on staging (galvanarquitectos.com does not serve this site yet).
 const request=useRequestURL({xForwardedHost:true,xForwardedProto:true})
 const site=cfg.indexable?cfg.siteUrl:(/^(localhost|127\.|\[::1\])/.test(request.hostname)?request.origin:'https://'+request.host)
 const url=new URL(o.path,site).href
 // Open Graph image generated per page by scripts/og/generate.py; the studio photo is the fallback.
 // Generated card first (scripts/og/generate.py), then the page's own image (project hero crop), then the studio photo.
 const og=ogImages[o.path]??(o.page?.content.image?{image:o.page.content.image.src,alt:o.page.content.image.alt}:undefined)
 const image={url:new URL(og?.image??'/photos/web-villa-silver-01.jpg',site).href,width:og?1200:2500,height:og?630:1500,type:'image/jpeg' as const,alt:og?.alt??negocio.nombre}
 const indexable=cfg.indexable&&!o.draft&&!o.legal
 const key=Object.keys(casePaths).find(key=>casePaths[key]===o.path) as keyof typeof cases|undefined
 // Registry pages carry their own language, copy and equivalents; nothing here depends on a specific service.
 const serviceCopy=computed(()=>o.page?.content??null)
 const alternates=o.page?.alternates??o.alternates
 // Pages outside the registry (guides) publish their equivalents so the language switch can follow them.
 if(alternates)useState<Record<string,Record<string,string>>>('galvan:alternates',()=>({})).value[o.path]=alternates
 const translatedCase=computed(()=>key?cases[key][locale.value]:null)
 const title=computed(()=>brandTitle(serviceCopy.value?.title??(translatedCase.value?translatedCase.value.label:o.title)))
 const description=computed(()=>clampDescription(serviceCopy.value?.description??translatedCase.value?.lead??o.description))
 const faqs=computed(()=>serviceCopy.value?serviceCopy.value.faqs.map(([pregunta,respuesta])=>({pregunta,respuesta})):(translatedCase.value?translatedCase.value.faqs.map(([pregunta,respuesta])=>({pregunta,respuesta})):o.faqs??[]))
 useSeoMeta({title:()=>title.value,description:()=>description.value,robots:indexable?'index, follow, max-image-preview:large':'noindex, nofollow',ogTitle:()=>title.value,ogDescription:()=>description.value,ogUrl:url,ogSiteName:negocio.nombre,ogLocale:()=>locale.value==='en'?'en_GB':'es_ES',
  ogLocaleAlternate:alternates?()=>locale.value==='en'?'es_ES':'en_GB':undefined,ogType:o.article?'article':'website',ogImage:image,
  articlePublishedTime:o.article?.datePublished,articleModifiedTime:o.article?.dateModified,
  twitterCard:'summary_large_image',twitterTitle:()=>title.value,twitterDescription:()=>description.value,twitterImage:image.url,twitterImageAlt:image.alt})
 useHead(()=>{
  const lang=locale.value as 'en'|'es', id=ids(site), businessId=id.studio
  const isHomePage=o.path==='/'||o.path==='/es'
  const template=o.page?.definition.template
  // Page type: registry templates and explicit overrides; FAQPage only when the FAQ is visible on the page.
  const baseType=o.pageType??(template==='projects'?'CollectionPage':template==='studio'?'ProfilePage':template==='contact'?'ContactPage':'WebPage')
  const pageNode:any={'@type':faqs.value.length?[baseType,'FAQPage']:baseType,'@id':url+'#webpage',url,name:title.value,description:description.value,inLanguage:lang,isPartOf:{'@id':id.website},
   primaryImageOfPage:{'@type':'ImageObject',url:image.url,width:image.width,height:image.height},
   ...(!isHomePage?{breadcrumb:{'@id':url+'#breadcrumb'}}:{}),
   ...(faqs.value.length?{mainEntity:faqs.value.map(f=>({'@type':'Question',name:f.pregunta,acceptedAnswer:{'@type':'Answer',text:f.respuesta}}))}:{})}
  if(isHomePage||template==='contact'){pageNode.about={'@id':businessId};if(!faqs.value.length)pageNode.mainEntity={'@id':businessId}}
  if(template==='studio'){pageNode.about={'@id':id.paco};pageNode.mainEntity={'@id':id.paco}}
  if(o.about)pageNode.about=o.about(site)
  const graph:any[]=[studioNode(site,lang),personNode(site,lang),websiteNode(site),pageNode]
  // Project archive pages carry their own trail (Home / Projects / name); the rest keep the starter's route tree.
  const trail=o.page&&['project','projects','studio','contact'].includes(o.page.definition.template)?o.page.breadcrumb.map((c:any)=>({path:c.path??o.path,label:c.label})):null
  if(trail)graph.push({'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:trail.map((m:any,i:number)=>({'@type':'ListItem',position:i+1,name:m.label,item:new URL(m.path,site).href}))})
  else if(o.page?.breadcrumb)graph.push({'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:o.page.breadcrumb.map((c:any,i:number)=>({'@type':'ListItem',position:i+1,name:c.label,item:new URL(c.path??o.path,site).href}))})
  else if(!isHomePage)graph.push({'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:migasDe(o.path).map((m,i)=>({'@type':'ListItem',position:i+1,name:m.path==='/'?(lang==='en'?'Home':'Inicio'):serviceCopy.value?.label??translatedCase.value?.label??m.label,item:new URL(m.path,site).href}))})
  if(o.article)graph.push({'@type':'Article','@id':url+'#article',headline:title.value.replace(/ [·|] Martínez Galván$/,''),description:description.value,inLanguage:lang,image:image.url,datePublished:o.article.datePublished,dateModified:o.article.dateModified,
   // Authored by the studio until Paco reviews each guide; then author becomes {'@id': paco}.
   author:{'@id':businessId},publisher:{'@id':businessId},mainEntityOfPage:{'@id':url+'#webpage'},...(o.about?{about:o.about(site)}:{})})
  if(o.extraSchema)graph.push(...o.extraSchema(site,url,businessId))
  if(o.servicio){
   const def=o.page?.definition, sid=def?.serviceId as keyof typeof serviceNames|undefined, loc=def?.locationId
   const service:any={'@type':'Service','@id':url+'#servicio',name:serviceCopy.value?.label??o.servicio,serviceType:sid?serviceNames[sid].name[lang]:o.servicio,description:description.value,image:image.url,url,
    provider:{'@id':businessId},areaServed:loc?place(loc,lang):[{'@type':'Place',name:'Costa del Sol'},...allAreas(lang)],availableLanguage:['en','es']}
   // Service hub: its areas as an offer catalogue (no prices: none are published).
   if(o.page?.zones?.length)service.hasOfferCatalog={'@type':'OfferCatalog',name:serviceCopy.value?.label,itemListElement:o.page.zones.map((z:any)=>({'@type':'Offer',itemOffered:{'@type':'Service',name:`${serviceCopy.value?.label} · ${z.label}`,url:new URL(z.path,site).href}}))}
   pageNode.about={'@id':url+'#servicio'}
   graph.push(service)
  }
  return {link:[{rel:'canonical',href:url},...(alternates?[...Object.entries(alternates).map(([hreflang,path])=>({rel:'alternate',hreflang,href:new URL(path,site).href})),{rel:'alternate',hreflang:'x-default',href:new URL(alternates.en,site).href}]:[])],script:[{key:'galvan-schema',type:'application/ld+json',textContent:JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')}]}
 })
}

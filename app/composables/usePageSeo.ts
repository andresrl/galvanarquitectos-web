// Starter SEO infrastructure, extended so visible EN/ES copy and structured data agree.
import {negocio} from '~/data/negocio'
import {routes} from '~/data/routes'
import {cases,casePaths} from '~/data/demo'
import type {ResolvedPage} from '~/data/pages/types'
import {ogImages} from '~/data/og-manifest'
export function migasDe(path:string){
 const out:{path:string;label:string}[]=[]
 let route:any=routes.find(r=>r.path===path)
 while(route){out.unshift({path:route.path,label:route.label});route=route.parent?routes.find(r=>r.path===route.parent):null}
 if(path!=='/'&&out[0]?.path!=='/')out.unshift({path:'/',label:'Home'})
 return out
}
export function usePageSeo(o:{title:string;description:string;path:string;draft?:boolean;legal?:boolean;faqs?:{pregunta:string;respuesta:string}[];servicio?:string;page?:ResolvedPage;alternates?:Record<'en'|'es',string>;article?:{datePublished:string;dateModified:string;author:string}}){
 const cfg=useRuntimeConfig().public
 const {locale}=useGalvan()
 // Absolute URLs: the final domain once indexing is on; while the site is a noindex preview, the host serving it,
 // so shared links and preview images work on staging (galvanarquitectos.com does not serve this site yet).
 const request=useRequestURL({xForwardedHost:true,xForwardedProto:true})
 const site=cfg.indexable?cfg.siteUrl:(/^(localhost|127\.|\[::1\])/.test(request.hostname)?request.origin:'https://'+request.host)
 const url=new URL(o.path,site).href
 // Open Graph image generated per page by scripts/og/generate.py; the studio photo is the fallback.
 const og=ogImages[o.path]
 const image={url:new URL(og?.image??'/photos/web-villa-silver-01.jpg',site).href,width:og?1200:2500,height:og?630:1500,type:'image/jpeg' as const,alt:og?.alt??negocio.nombre}
 const indexable=cfg.indexable&&!o.draft&&!o.legal
 const key=Object.keys(casePaths).find(key=>casePaths[key]===o.path) as keyof typeof cases|undefined
 // Registry pages carry their own language, copy and equivalents; nothing here depends on a specific service.
 const serviceCopy=computed(()=>o.page?.content??null)
 const alternates=o.page?.alternates??o.alternates
 // Pages outside the registry (guides) publish their equivalents so the language switch can follow them.
 if(alternates)useState<Record<string,Record<string,string>>>('galvan:alternates',()=>({})).value[o.path]=alternates
 const translatedCase=computed(()=>key?cases[key][locale.value]:null)
 const title=computed(()=>serviceCopy.value?.title??(translatedCase.value?translatedCase.value.label+' · Galván Arquitectos':o.title))
 const description=computed(()=>serviceCopy.value?.description??translatedCase.value?.lead??o.description)
 const faqs=computed(()=>serviceCopy.value?serviceCopy.value.faqs.map(([pregunta,respuesta])=>({pregunta,respuesta})):(translatedCase.value?translatedCase.value.faqs.map(([pregunta,respuesta])=>({pregunta,respuesta})):o.faqs??[]))
 useSeoMeta({title:()=>title.value,description:()=>description.value,robots:indexable?'index, follow, max-image-preview:large':'noindex, nofollow',ogTitle:()=>title.value,ogDescription:()=>description.value,ogUrl:url,ogSiteName:negocio.nombre,ogLocale:()=>locale.value==='en'?'en_GB':'es_ES',
  ogLocaleAlternate:alternates?()=>locale.value==='en'?'es_ES':'en_GB':undefined,ogType:o.article?'article':'website',ogImage:image,
  articlePublishedTime:o.article?.datePublished,articleModifiedTime:o.article?.dateModified,
  twitterCard:'summary_large_image',twitterTitle:()=>title.value,twitterDescription:()=>description.value,twitterImage:image.url,twitterImageAlt:image.alt})
 useHead(()=>{
  const businessId=site+'/#negocio'
  const graph:any[]=[
   {'@type':'LocalBusiness','@id':businessId,name:negocio.nombre,telephone:negocio.contacto.telefono,email:negocio.contacto.email,address:negocio.contacto.direccion,url:site},
   {'@type':'WebSite','@id':site+'/#website',url:site,name:negocio.nombre,inLanguage:locale.value},
   {'@type':faqs.value.length?['WebPage','FAQPage']:'WebPage','@id':url+'#webpage',url,name:title.value,description:description.value,inLanguage:locale.value,isPartOf:{'@id':site+'/#website'},...(o.path!=='/'?{breadcrumb:{'@id':url+'#breadcrumb'}}:{}),...(faqs.value.length?{mainEntity:faqs.value.map(f=>({'@type':'Question',name:f.pregunta,acceptedAnswer:{'@type':'Answer',text:f.respuesta}}))}:{})}
  ]
  if(o.path!=='/')graph.push({'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:migasDe(o.path).map((m,i)=>({'@type':'ListItem',position:i+1,name:m.path==='/'?(locale.value==='en'?'Home':'Inicio'):serviceCopy.value?.label??translatedCase.value?.label??m.label,item:new URL(m.path,site).href}))})
  if(o.article)graph.push({'@type':'Article','@id':url+'#article',headline:title.value.replace(/ · Galván Arquitectos$/,''),description:description.value,inLanguage:locale.value,datePublished:o.article.datePublished,dateModified:o.article.dateModified,author:{'@type':'Organization',name:o.article.author},publisher:{'@id':businessId},mainEntityOfPage:{'@id':url+'#webpage'}})
  if(o.servicio)graph.push({'@type':'Service','@id':url+'#servicio',name:serviceCopy.value?.label??o.servicio,provider:{'@id':businessId},areaServed:negocio.zonaServicio,url})
  return {link:[{rel:'canonical',href:url},...(alternates?[...Object.entries(alternates).map(([hreflang,path])=>({rel:'alternate',hreflang,href:new URL(path,site).href})),{rel:'alternate',hreflang:'x-default',href:new URL(alternates.en,site).href}]:[])],script:[{key:'galvan-schema',type:'application/ld+json',textContent:JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')}]}
 })
}

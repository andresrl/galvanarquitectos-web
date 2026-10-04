// Starter SEO infrastructure, extended so visible EN/ES copy and structured data agree.
import {negocio} from '~/data/negocio'
import {routes} from '~/data/routes'
import {cases,casePaths} from '~/data/demo'
import type {ResolvedPage} from '~/data/pages/types'
export function migasDe(path:string){
 const out:{path:string;label:string}[]=[]
 let route:any=routes.find(r=>r.path===path)
 while(route){out.unshift({path:route.path,label:route.label});route=route.parent?routes.find(r=>r.path===route.parent):null}
 if(path!=='/'&&out[0]?.path!=='/')out.unshift({path:'/',label:'Home'})
 return out
}
export function usePageSeo(o:{title:string;description:string;path:string;draft?:boolean;legal?:boolean;faqs?:{pregunta:string;respuesta:string}[];servicio?:string;page?:ResolvedPage}){
 const cfg=useRuntimeConfig().public
 const {locale}=useGalvan()
 const url=new URL(o.path,cfg.siteUrl).href
 const indexable=cfg.indexable&&!o.draft&&!o.legal
 const key=Object.keys(casePaths).find(key=>casePaths[key]===o.path) as keyof typeof cases|undefined
 // Registry pages carry their own language, copy and equivalents; nothing here depends on a specific service.
 const serviceCopy=computed(()=>o.page?.content??null)
 const alternates=o.page?.alternates
 const translatedCase=computed(()=>key?cases[key][locale.value]:null)
 const title=computed(()=>serviceCopy.value?.title??(translatedCase.value?translatedCase.value.label+' · Galván Arquitectos':o.title))
 const description=computed(()=>serviceCopy.value?.description??translatedCase.value?.lead??o.description)
 const faqs=computed(()=>serviceCopy.value?serviceCopy.value.faqs.map(([pregunta,respuesta])=>({pregunta,respuesta})):(translatedCase.value?translatedCase.value.faqs.map(([pregunta,respuesta])=>({pregunta,respuesta})):o.faqs??[]))
 useSeoMeta({title:()=>title.value,description:()=>description.value,robots:indexable?'index, follow, max-image-preview:large':'noindex, nofollow',ogTitle:()=>title.value,ogDescription:()=>description.value,ogUrl:url,ogSiteName:negocio.nombre,ogLocale:()=>locale.value==='en'?'en_GB':'es_ES',ogType:'website',ogImage:new URL('/photos/web-villa-silver-01.jpg',cfg.siteUrl).href,twitterCard:'summary_large_image'})
 useHead(()=>{
  const businessId=cfg.siteUrl+'/#negocio'
  const graph:any[]=[
   {'@type':'LocalBusiness','@id':businessId,name:negocio.nombre,telephone:negocio.contacto.telefono,email:negocio.contacto.email,address:negocio.contacto.direccion,url:cfg.siteUrl},
   {'@type':'WebSite','@id':cfg.siteUrl+'/#website',url:cfg.siteUrl,name:negocio.nombre,inLanguage:locale.value},
   {'@type':faqs.value.length?['WebPage','FAQPage']:'WebPage','@id':url+'#webpage',url,name:title.value,description:description.value,inLanguage:locale.value,isPartOf:{'@id':cfg.siteUrl+'/#website'},...(o.path!=='/'?{breadcrumb:{'@id':url+'#breadcrumb'}}:{}),...(faqs.value.length?{mainEntity:faqs.value.map(f=>({'@type':'Question',name:f.pregunta,acceptedAnswer:{'@type':'Answer',text:f.respuesta}}))}:{})}
  ]
  if(o.path!=='/')graph.push({'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:migasDe(o.path).map((m,i)=>({'@type':'ListItem',position:i+1,name:m.path==='/'?(locale.value==='en'?'Home':'Inicio'):serviceCopy.value?.label??translatedCase.value?.label??m.label,item:new URL(m.path,cfg.siteUrl).href}))})
  if(o.servicio)graph.push({'@type':'Service','@id':url+'#servicio',name:serviceCopy.value?.label??o.servicio,provider:{'@id':businessId},areaServed:negocio.zonaServicio,url})
  return {link:[{rel:'canonical',href:url},...(alternates?[...Object.entries(alternates).map(([hreflang,path])=>({rel:'alternate',hreflang,href:new URL(path,cfg.siteUrl).href})),{rel:'alternate',hreflang:'x-default',href:new URL(alternates.en,cfg.siteUrl).href}]:[])],script:[{key:'galvan-schema',type:'application/ld+json',textContent:JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')}]}
 })
}

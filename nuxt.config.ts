import tailwindcss from '@tailwindcss/vite'
import { existsSync,readdirSync,readFileSync } from 'node:fs'
const blogDir=new URL('./content/blog/',import.meta.url)
// Published guides only (draft: false). Git does not keep empty folders, so a fresh clone may lack a language folder.
const guideRoutes={en:'/journal/',es:'/es/guias/'} as const
const publishedPosts=(['en','es'] as const).flatMap(lang=>{const dir=new URL(lang+'/',blogDir);return existsSync(dir)?readdirSync(dir).filter(n=>n.endsWith('.md')&&/^draft:\s*false\s*$/m.test((/^---\n([\s\S]*?)\n---/.exec(readFileSync(new URL(n,dir),'utf8'))??[])[1]??'')).map(n=>guideRoutes[lang]+n.slice(0,-3)):[]})
import { site } from './app/data/site'
export default defineNuxtConfig({compatibilityDate:'2026-10-02',devtools:{enabled:false},modules:['@nuxt/content'],content:{experimental:{sqliteConnector:'native'}},css:['~/assets/css/diseno.css','~/assets/css/service.css','~/assets/css/navigation.css','~/assets/css/guides.css'],vite:{plugins:[tailwindcss()]},runtimeConfig:{public:{siteUrl:site.url,indexable:false,showDrafts:false,publishedPosts,analytics:{enabled:false,umamiSrc:'',umamiWebsiteId:'',gaId:''}}},app:{head:{htmlAttrs:{lang:'en'},title:site.nombre,meta:[{name:'viewport',content:'width=device-width, initial-scale=1'},{name:'theme-color',content:'#1c2a22'}],link:[{rel:'icon',href:'/favicon.ico',sizes:'48x48'},{rel:'icon',type:'image/png',sizes:'192x192',href:'/icon-192.png'},{rel:'apple-touch-icon',href:'/apple-touch-icon.png'},{rel:'manifest',href:'/site.webmanifest'}]}}})

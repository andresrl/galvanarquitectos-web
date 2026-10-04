import tailwindcss from '@tailwindcss/vite'
import { readdirSync,readFileSync } from 'node:fs'
const blogDir=new URL('./content/blog/',import.meta.url)
const publishedPosts=readdirSync(blogDir).filter(n=>n.endsWith('.md')&&/^draft:\s*false\s*$/m.test((/^---\n([\s\S]*?)\n---/.exec(readFileSync(new URL(n,blogDir),'utf8'))??[])[1]??'')).map(n=>'/blog/'+n.slice(0,-3))
import { site } from './app/data/site'
export default defineNuxtConfig({compatibilityDate:'2026-10-02',devtools:{enabled:false},modules:['@nuxt/content'],content:{experimental:{sqliteConnector:'native'}},css:['~/assets/css/diseno.css','~/assets/css/service.css','~/assets/css/navigation.css'],vite:{plugins:[tailwindcss()]},runtimeConfig:{public:{siteUrl:site.url,indexable:false,showDrafts:false,publishedPosts,analytics:{enabled:false,umamiSrc:'',umamiWebsiteId:'',gaId:''}}},app:{head:{htmlAttrs:{lang:'en'},title:site.nombre,meta:[{name:'viewport',content:'width=device-width, initial-scale=1'}]}}})

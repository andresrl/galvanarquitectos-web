// Starter route list (menus, breadcrumbs, sitemap). Registry pages are derived from app/data/pages.
import {pages} from './pages'
export const routes=[
 ...pages.flatMap(page=>Object.entries(page.paths).map(([language,path])=>({path,label:page.content[language as 'en'|'es'].label,kind:'servicio',plantilla:page.template,parent:'/',status:page.status==='published'?'publicada':'borrador',enlaces:['/'],language,pageId:page.id}))),
 {path:'/',label:'Home',kind:'pagina',plantilla:'home',parent:null,status:'borrador',enlaces:['/villa-renovation','/interior-design','/landscape-design']},
 {path:'/villa-renovation',label:'Villa renovation',kind:'pagina',plantilla:'pagina',parent:'/',status:'borrador',enlaces:['/','/interior-design','/landscape-design']},
 {path:'/interior-design',label:'Interior design',kind:'pagina',plantilla:'pagina',parent:'/',status:'borrador',enlaces:['/','/villa-renovation','/landscape-design']},
 {path:'/landscape-design',label:'Landscape design',kind:'pagina',plantilla:'pagina',parent:'/',status:'borrador',enlaces:['/','/villa-renovation','/interior-design']}
]

// Starter route list (menus, breadcrumbs, sitemap). Registry pages are derived from app/data/pages.
import {pages} from './pages'
import {casePaths} from './demo'
const demos=Object.values(casePaths)
export const routes=[
 ...pages.flatMap(page=>Object.entries(page.paths).map(([language,path])=>({path,label:page.content[language as 'en'|'es'].label,kind:'servicio',plantilla:page.template,parent:'/',status:page.status==='published'?'publicada':'borrador',enlaces:['/'],language,pageId:page.id}))),
 {path:'/',label:'Home',kind:'pagina',plantilla:'home',parent:null,status:'borrador',enlaces:demos},
 ...demos.map(path=>({path,label:({[casePaths.reforma]:'Villa renovation'} as Record<string,string>)[path],kind:'pagina',plantilla:'pagina',parent:'/',status:'borrador',enlaces:['/',...demos.filter(d=>d!==path)]}))
]

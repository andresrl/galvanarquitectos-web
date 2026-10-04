import {renovationPaths} from './services/renovation'
export const routes=[
 ...Object.entries(renovationPaths).map(([language,path])=>({path,label:language==='en'?'Villa renovation in Marbella':'Reformas de villas en Marbella',kind:'servicio',plantilla:'service',parent:'/',status:'borrador',enlaces:['/'],language})),
 {path:'/',label:'Home',kind:'pagina',plantilla:'home',parent:null,status:'borrador',enlaces:['/villa-renovation','/interior-design','/landscape-design']},
 {path:'/villa-renovation',label:'Villa renovation',kind:'pagina',plantilla:'pagina',parent:'/',status:'borrador',enlaces:['/','/interior-design','/landscape-design']},
 {path:'/interior-design',label:'Interior design',kind:'pagina',plantilla:'pagina',parent:'/',status:'borrador',enlaces:['/','/villa-renovation','/landscape-design']},
 {path:'/landscape-design',label:'Landscape design',kind:'pagina',plantilla:'pagina',parent:'/',status:'borrador',enlaces:['/','/villa-renovation','/interior-design']}
]

import {copy} from '~/data/demo'
import {pathLocale,alternatePath} from '~/data/pages'
export type GalvanLocale='en'|'es'
export function useGalvan(){
  // English always starts a new request. No storage or browser-language detection.
  const route=useRoute()
  const locale=useState<GalvanLocale>('galvan:language',()=>pathLocale(route.path)??'en')
  const chapter=useState('galvan:chapter',()=>0)
  const tone=useState('galvan:tone',()=> 'light')
  const requestedScene=useState('galvan:scene-request',()=>({id:'inicio',serial:0}))
  const router=useRouter()
  const t=(key:string)=>(copy[locale.value] as Record<string,string>)[key]??key
  const scenes=[
    {id:'inicio',en:'Home',es:'Inicio'},
    {id:'servicios',en:'Services',es:'Servicios'},
    {id:'villas',en:'Villa renovation',es:'Reforma integral'},
    {id:'interiores',en:'Interior design',es:'Interiorismo'},
    {id:'exteriores',en:'Landscape design',es:'Paisajismo'},
    {id:'estudio',en:'Studio',es:'El estudio'},
    {id:'internacional',en:'International clients',es:'Clientes internacionales'},
    {id:'contacto',en:'Contact',es:'Contacto'}
  ]
  async function requestScene(id:string){
    if(router.currentRoute.value.path==='/'&&router.currentRoute.value.hash==='#'+id){requestedScene.value={id,serial:requestedScene.value.serial+1};return}
    await router.push({path:'/',hash:'#'+id})
  }
  function toggleLanguage(){
    const next=locale.value==='en'?'es':'en'
    const equivalent=alternatePath(router.currentRoute.value.path,next)
    if(equivalent)return router.push(equivalent)
    locale.value=next
  }
  return {locale,t,chapter,tone,scenes,requestedScene,requestScene,toggleLanguage}
}

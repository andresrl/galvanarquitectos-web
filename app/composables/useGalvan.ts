import {copy} from '~/data/demo'
import {homeProjects} from '~/data/home-projects'
import {routeLocale,alternatePath,homePath} from '~/data/pages'
export type GalvanLocale='en'|'es'
export function useGalvan(){
  // The URL fixes the displayed language after HTTP/browser negotiation; manual choices are remembered.
  const route=useRoute()
  const locale=useState<GalvanLocale>('galvan:language',()=>routeLocale(route.path)??'en')
  const chapter=useState('galvan:chapter',()=>0)
  const tone=useState('galvan:tone',()=> 'light')
  const requestedScene=useState('galvan:scene-request',()=>({id:'inicio',serial:0}))
  const router=useRouter()
  const alternates=useState<Record<string,Record<string,string>>>('galvan:alternates',()=>({}))
  const t=(key:string)=>(copy[locale.value] as Record<string,string>)[key]??key
  const scenes=[
    {id:'inicio',en:'Home',es:'Inicio'},
    ...homeProjects.map(({id,project})=>({id,en:project.name.en,es:project.name.es})),
    {id:'estudio',en:'Studio',es:'El estudio'},
    {id:'contacto',en:'Contact',es:'Contacto'}
  ]
  async function requestScene(id:string){
    const home=homePath(locale.value)
    if(router.currentRoute.value.path===home&&router.currentRoute.value.hash==='#'+id){requestedScene.value={id,serial:requestedScene.value.serial+1};return}
    await router.push({path:home,hash:'#'+id})
  }
  function toggleLanguage(){
    const next=locale.value==='en'?'es':'en'
    // An explicit choice is remembered: the server never redirects this visitor by browser language again.
    if(import.meta.client)document.cookie=`galvan-lang=${next};path=/;max-age=31536000;samesite=lax`
    const current=router.currentRoute.value.path.replace(/\/$/,'')||'/'
    const equivalent=alternatePath(current,next)??alternates.value[current]?.[next]
    if(equivalent)return router.push({path:equivalent,query:router.currentRoute.value.query,hash:router.currentRoute.value.hash})
    locale.value=next
  }
  return {locale,t,chapter,tone,scenes,requestedScene,requestScene,toggleLanguage}
}

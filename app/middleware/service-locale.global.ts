import { routeLocale, pathLocale, headerTone, isHome } from '~/data/pages'
// Resolve the requested language before SSR renders the shared header and page.
export default defineNuxtRouteMiddleware(to => {
 const locale=useState<'en'|'es'>('galvan:language',()=>routeLocale(to.path)??'en')
 const tone=useState('galvan:tone',()=> 'light')
 const language=routeLocale(to.path)
 // Only a full-bleed photo hero starts with a light header; split heroes and guides sit on paper.
 if(language&&isHome(to.path))locale.value=language
 else if(language){locale.value=language;tone.value=pathLocale(to.path)?headerTone(to.path):'dark'}
 else if(!isHome(to.path))tone.value='dark'
})

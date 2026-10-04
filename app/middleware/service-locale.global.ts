import { pathLocale, heroLayout } from '~/data/pages'
// Resolve the requested language before SSR renders the shared header and page.
export default defineNuxtRouteMiddleware(to => {
 const locale=useState<'en'|'es'>('galvan:language',()=>pathLocale(to.path)??'en')
 const tone=useState('galvan:tone',()=> 'light')
 const language=pathLocale(to.path)
 // A split hero has its copy on paper, so the header starts dark there.
 if(language){locale.value=language;tone.value=heroLayout(to.path)==='full'?'light':'dark'}
 else if(to.path!=='/')tone.value='dark'
})

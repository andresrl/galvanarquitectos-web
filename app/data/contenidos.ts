// Legacy content for Home and the demo cases. Registry pages (app/data/pages) carry their own content.
import {cases,casePaths} from './demo'
export const contenidos: Record<string,any>={
 '/':{h1:'Spaces for living well.',title:'Galván Arquitectos · Editorial preview',description:'Architecture, interiors and landscape on the Costa del Sol. Design preview with illustrative case studies.',intro:'Architecture, interiors and landscape. A personal approach to every project.',bloques:[],estado:'borrador',faqs:[]},
 ...Object.fromEntries(Object.entries(casePaths).map(([key,path])=>{const c=cases[key as keyof typeof cases].en;return [path,{h1:c.title.replaceAll('<br>',' '),title:c.label+' · Galván Arquitectos',description:c.lead,intro:c.lead,bloques:c.sections.map(([titulo,texto])=>({titulo,texto})),estado:'borrador',faqs:c.faqs.map(([pregunta,respuesta])=>({pregunta,respuesta}))}]}))
}

// International clients page (InternationalPage.vue). Only confirmed ways of working (CLAUDE.md §5): video calls, visits,
// follow-up of the works, English and Spanish, Francisco Martínez Galván as the single point of contact. No report frequency, client portal,
// property sourcing or real-estate advice.
import type { Faq, Locale } from './pages/types'

export const internationalPaths: Record<Locale, string> = { en: '/international-clients', es: '/es/clientes-internacionales' }

export const internationalCopy: Record<Locale, {
 label: string; title: string; description: string; eyebrow: string; heading: string; italic: string; lead: string
 introTitle: string; introItalic: string; intro: string[]
 stepsEyebrow: string; stepsTitle: string; stepsItalic: string; steps: [string, string][]
 pointsEyebrow: string; points: [string, string][]
 faqTitle: string; faqs: Faq[]; projectsTitle: string; guideTitle: string; guideText: string; cta: string
 heroAlt: string
}> = {
 en: {
  label: 'International clients', title: 'Architect in Marbella for international clients',
  description: 'Build or renovate a villa in Marbella from abroad: video calls, site visits and follow-up of the works with architect Francisco Martínez Galván, in English.',
  eyebrow: 'International clients · Costa del Sol', heading: 'Your villa in Marbella.', italic: 'Wherever you live.',
  lead: 'Design, permissions and works followed from abroad, with one architect as your point of contact, in English or Spanish.',
  introTitle: 'Distance should not', introItalic: 'change the project.',
  intro: [
   'The studio works with clients who own, or plan, a villa on the Costa del Sol while living in another country. The way of working adapts to that from the start: how decisions are shared, when it is worth being there in person and what information you need to give an informed opinion.',
   'Francisco Martínez Galván leads each commission personally from Marbella. He is your point of contact throughout the design, the planning permissions and the works, and the studio coordinates the companies involved according to the agreed scope.'
  ],
  stepsEyebrow: 'How it works', stepsTitle: 'From your first call', stepsItalic: 'to the finished villa.',
  steps: [
   ['A first conversation', 'By video call or in Marbella: what you want to build or change, how you will use the house and when you plan to be here.'],
   ['On site, for you', 'Francisco Martínez Galván visits the plot or the villa and shares what he sees: orientation, views, surroundings and the questions to study. You can join on your next trip.'],
   ['Design reviewed together', 'Drawings and visualisations are shared and discussed on video calls, so every decision is clear before it is taken, wherever you are.'],
   ['Permissions and works, followed', 'The studio prepares the documentation for the permissions agreed for the project and follows the works on site, keeping you informed with the follow-up agreed at the start.']
  ],
  pointsEyebrow: 'What you can count on',
  points: [
   ['One architect', 'The person who designs your villa is the person you talk to.'],
   ['English and Spanish', 'Meetings, drawings and follow-up in the language you prefer.'],
   ['Local presence', 'The studio is in Marbella: visits to the property and the site are part of everyday work.'],
   ['Coordination', 'Architecture, interiors and landscape in one vision, with the companies coordinated according to the agreed scope.']
  ],
  faqTitle: 'Questions from clients abroad',
  faqs: [
   ['Do I need to be in Spain to start the project?', 'No. The first conversations, the design reviews and much of the follow-up can take place by video call. Visits in person are planned for the moments when they add most, according to your calendar.'],
   ['Can the architect visit the property for me?', 'Yes. Visits to the plot, the villa and the site are part of the work; what is seen is shared with you so that you can decide with full information.'],
   ['In which languages do you work?', 'In English and Spanish, both in conversation and in the documents of the project.'],
   ['How will I follow the works from abroad?', 'The way of following the works is agreed at the start of each commission: visits at key moments, video calls and the information you need to take decisions. There is no single system; it is defined for your project.'],
   ['Can you help me find a plot or a villa to buy?', 'The studio does not sell or broker property. Once you have a plot or a villa in mind, it can study its architectural possibilities with you before you decide.']
  ],
  projectsTitle: 'Selected projects', guideTitle: 'Following your villa project from abroad',
  guideText: 'A practical guide to what to organise from the start: communication, decisions, visits and documentation.',
  cta: 'Tell us about your project', heroAlt: 'Villas on a hillside above the coast at dusk, The Villas'
 },
 es: {
  label: 'Clientes internacionales', title: 'Arquitecto en Marbella para clientes que viven fuera',
  description: 'Construye o reforma tu villa en Marbella desde otro país: videollamadas, visitas y seguimiento de obra con el arquitecto Francisco Martínez Galván.',
  eyebrow: 'Clientes internacionales · Costa del Sol', heading: 'Tu villa en Marbella.', italic: 'Vivas donde vivas.',
  lead: 'Diseño, licencias y obra seguidos desde otro país, con un solo arquitecto como interlocutor, en español o inglés.',
  introTitle: 'La distancia no tiene', introItalic: 'que cambiar el proyecto.',
  intro: [
   'El estudio trabaja con clientes que tienen, o planean, una villa en la Costa del Sol mientras viven en otro país. La forma de trabajar se adapta a ello desde el principio: cómo se comparten las decisiones, cuándo merece la pena estar en persona y qué información necesitas para opinar con criterio.',
   'Francisco Martínez Galván dirige personalmente cada encargo desde Marbella. Es tu interlocutor durante el diseño, las licencias y la obra, y el estudio coordina a las empresas que intervienen según el alcance acordado.'
  ],
  stepsEyebrow: 'Cómo funciona', stepsTitle: 'De la primera llamada', stepsItalic: 'a la villa terminada.',
  steps: [
   ['Una primera conversación', 'Por videollamada o en Marbella: qué quieres construir o cambiar, cómo usarás la casa y cuándo piensas estar aquí.'],
   ['Sobre el terreno, por ti', 'Francisco Martínez Galván visita la parcela o la villa y comparte lo que ve: orientación, vistas, entorno y las cuestiones a estudiar. Puedes sumarte en tu próximo viaje.'],
   ['El diseño, revisado juntos', 'Planos y visualizaciones se comparten y se comentan por videollamada, para que cada decisión esté clara antes de tomarla, estés donde estés.'],
   ['Licencias y obra, seguidas', 'El estudio prepara la documentación de las licencias acordadas para el proyecto y sigue la obra sobre el terreno, manteniéndote informado con el seguimiento acordado al inicio.']
  ],
  pointsEyebrow: 'Con qué puedes contar',
  points: [
   ['Un solo arquitecto', 'La persona que diseña tu villa es la persona con la que hablas.'],
   ['Español e inglés', 'Reuniones, planos y seguimiento en el idioma que prefieras.'],
   ['Presencia local', 'El estudio está en Marbella: las visitas a la propiedad y a la obra forman parte del trabajo diario.'],
   ['Coordinación', 'Arquitectura, interiores y paisaje en una misma visión, con las empresas coordinadas según el alcance acordado.']
  ],
  faqTitle: 'Preguntas de quienes viven fuera',
  faqs: [
   ['¿Tengo que estar en España para empezar el proyecto?', 'No. Las primeras conversaciones, las revisiones del diseño y buena parte del seguimiento pueden hacerse por videollamada. Las visitas en persona se planifican para los momentos en que más aportan, según tu calendario.'],
   ['¿Puede el arquitecto visitar la propiedad por mí?', 'Sí. Las visitas a la parcela, a la villa y a la obra forman parte del trabajo; lo que se ve se comparte contigo para que decidas con toda la información.'],
   ['¿En qué idiomas trabajáis?', 'En español e inglés, tanto en las conversaciones como en los documentos del proyecto.'],
   ['¿Cómo seguiré la obra desde otro país?', 'La forma de seguir la obra se acuerda al inicio de cada encargo: visitas en los momentos clave, videollamadas y la información que necesites para tomar decisiones. No hay un sistema único; se define para tu proyecto.'],
   ['¿Podéis ayudarme a encontrar una parcela o una villa para comprar?', 'El estudio no vende ni intermedia en la compra de propiedades. Cuando tengas una parcela o una villa en mente, puede estudiar contigo sus posibilidades arquitectónicas antes de que decidas.']
  ],
  projectsTitle: 'Proyectos seleccionados', guideTitle: 'Seguir tu proyecto desde otro país',
  guideText: 'Una guía práctica sobre qué organizar desde el principio: comunicación, decisiones, visitas y documentación.',
  cta: 'Cuéntanos tu proyecto', heroAlt: 'Villas en la ladera sobre la costa al anochecer, The Villas'
 }
}

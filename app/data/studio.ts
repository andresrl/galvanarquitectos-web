// Studio page copy (/studio · /es/estudio). Facts: confirmed services and history (CLAUDE.md §5, §9.6).
// No awards, team, press or figures. Pending Paco's review before publishing.
import type { Locale } from './pages/types'

export const studioPaths: Record<Locale, string> = { en: '/studio', es: '/es/estudio' }

export const studioCopy = {
 en: {
  label: 'The studio', title: 'The studio: Francisco Martínez Galván, architect in Marbella · Martínez Galván',
  description: 'Francisco Martínez Galván brings a personal approach to architecture, interiors and landscape on the Costa del Sol, from the first conversation to the site.',
  eyebrow: 'The studio · Marbella', heading: 'Design and personal attention.', italic: 'From the idea to the site.',
  intro: 'Francisco Martínez Galván brings a personal approach to architecture, interiors and landscape on the Costa del Sol. Each commission starts with the client, the setting and the way the spaces will be used.',
  bioEyebrow: 'The architect', bioTitle: 'Francisco Martínez Galván', bioItalic: 'Paco, for his clients.',
  bio: [
   'Trained at the Escuela Politécnica in Madrid, Paco arrived in Marbella in 1998. In 2003 he consolidated his studio there, and since then he has designed villas, complete renovations, interiors and gardens across the Costa del Sol.',
   'He leads every project personally. The client talks to the architect who designs, from the first ideas to the decisions on site.'
  ],
  quote: 'A house begins with the way someone wants to live. The architecture comes afterwards.',
  quoteNote: 'The studio’s approach',
  principlesEyebrow: 'What the studio defends', principlesTitle: 'Light, materials,', principlesItalic: 'textures and volumes.',
  servicesEyebrow: 'What the studio does', servicesTitle: 'One vision,', servicesItalic: 'every scale.',
  servicesText: 'Architecture, interiors and landscape can form part of one commission or be commissioned separately. Design, planning permissions, site supervision and the coordination of contractors are defined according to the scope agreed.',
  methodEyebrow: 'How we work', methodTitle: 'From the first conversation', methodItalic: 'to the site.',
  method: [
   ['Listening', 'Your way of living, your priorities and the site. The brief is written together.'],
   ['Design', 'Architecture, interiors and landscape studied as one, with drawings and visualisations to decide with confidence.'],
   ['Permissions', 'The project documentation and the planning applications agreed for the commission.'],
   ['On site', 'Site supervision and coordination of the contractors, with the architect present at the key moments.']
  ],
  sceneAlts: ['Paco drawing at his desk in the studio', 'Reviewing drawings with the team on site', 'A design conversation in the studio', 'Inspecting the works on site'],
  intlEyebrow: 'Clients living abroad', intlTitle: 'Your project here.', intlItalic: 'Wherever you are.',
  intlText: 'Many clients follow their project from another country. Video calls, site visits and follow-up of the works keep every decision close, in English and Spanish.',
  projectsEyebrow: 'Selected projects', projectsLink: 'All projects',
  ctaEyebrow: 'Start a conversation', ctaTitle: 'What space', ctaItalic: 'do you imagine?', ctaText: 'A new villa, a renovation, interiors or a garden. Let’s start with what you have in mind.', ctaLink: 'Tell us about your project',
  portraitAlt: 'Francisco Martínez Galván, architect, in his studio in Marbella', home: 'Home'
 },
 es: {
  label: 'El estudio', title: 'El estudio: Francisco Martínez Galván, arquitecto en Marbella · Martínez Galván',
  description: 'Francisco Martínez Galván aporta un trato personal a la arquitectura, los interiores y el paisaje en la Costa del Sol, desde la primera conversación hasta la obra.',
  eyebrow: 'El estudio · Marbella', heading: 'Diseño y trato directo.', italic: 'De la idea a la obra.',
  intro: 'Francisco Martínez Galván aporta un trato personal a la arquitectura, los interiores y el paisaje en la Costa del Sol. Cada encargo empieza por el cliente, el lugar y la forma de utilizar los espacios.',
  bioEyebrow: 'El arquitecto', bioTitle: 'Francisco Martínez Galván', bioItalic: 'Paco, para sus clientes.',
  bio: [
   'Formado en la Escuela Politécnica de Madrid, Paco llegó a Marbella en 1998. En 2003 consolidó allí su estudio y desde entonces diseña villas, reformas integrales, interiores y jardines en la Costa del Sol.',
   'Dirige personalmente cada proyecto. El cliente habla con el arquitecto que diseña, desde las primeras ideas hasta las decisiones en obra.'
  ],
  quote: 'Una casa empieza por la forma en que alguien quiere vivir. La arquitectura viene después.',
  quoteNote: 'El enfoque del estudio',
  principlesEyebrow: 'Lo que defiende el estudio', principlesTitle: 'Luz, materiales,', principlesItalic: 'texturas y volúmenes.',
  servicesEyebrow: 'Lo que hace el estudio', servicesTitle: 'Una misma visión,', servicesItalic: 'a cada escala.',
  servicesText: 'Arquitectura, interiorismo y paisajismo pueden formar parte de un mismo encargo o contratarse por separado. El diseño, las licencias, la dirección de obra y la coordinación de empresas se definen según el alcance acordado.',
  methodEyebrow: 'Cómo trabajamos', methodTitle: 'De la primera conversación', methodItalic: 'a la obra.',
  method: [
   ['Escuchar', 'Tu forma de vivir, tus prioridades y el lugar. El programa se escribe juntos.'],
   ['Diseñar', 'Arquitectura, interiores y paisaje estudiados en conjunto, con planos y visualizaciones para decidir con seguridad.'],
   ['Licencias', 'La documentación del proyecto y las solicitudes acordadas para el encargo.'],
   ['En obra', 'Dirección de obra y coordinación de las empresas, con el arquitecto presente en los momentos clave.']
  ],
  sceneAlts: ['Paco dibujando en su mesa del estudio', 'Revisando planos con el equipo en obra', 'Una conversación de diseño en el estudio', 'Inspeccionando los trabajos en obra'],
  intlEyebrow: 'Clientes que viven fuera', intlTitle: 'Tu proyecto aquí.', intlItalic: 'Estés donde estés.',
  intlText: 'Muchos clientes siguen su proyecto desde otro país. Videollamadas, visitas y seguimiento de obra mantienen cada decisión cerca, en español e inglés.',
  projectsEyebrow: 'Proyectos seleccionados', projectsLink: 'Todos los proyectos',
  ctaEyebrow: 'Empecemos a hablar', ctaTitle: '¿Qué espacio', ctaItalic: 'imaginas?', ctaText: 'Una nueva villa, una reforma, los interiores o un jardín. Empecemos por lo que tienes en mente.', ctaLink: 'Cuéntanos tu proyecto',
  portraitAlt: 'Francisco Martínez Galván, arquitecto, en su estudio de Marbella', home: 'Inicio'
 }
}

// Studio page copy (/studio · /es/estudio). Facts: confirmed services and history (CLAUDE.md §5, §9.6).
// No awards, team, press or figures. Pending Francisco Martínez Galván's review before publishing.
import type { Locale } from './pages/types'

export const studioPaths: Record<Locale, string> = { en: '/studio', es: '/es/estudio' }

export const studioCopy = {
 en: {
  label: 'The studio', title: 'Francisco Martínez Galván, architect in Marbella',
  description: 'Francisco Martínez Galván brings a personal approach to villa architecture on the Costa del Sol, from the first conversation to the site.',
  bioEyebrow: 'The architect', bioTitle: 'Francisco Martínez Galván', bioItalic: 'Architecture with a personal signature.',
  bio: [
   'Trained at the Escuela Politécnica in Madrid, Francisco Martínez Galván arrived in Marbella in 1998. In 2003 he consolidated his studio there, and since then he has designed new-build villas and complete renovations across the Costa del Sol.',
   'He leads every project personally. The client talks to the architect who designs, from the first ideas to the decisions on site.'
  ],
  quote: 'A house begins with the way someone wants to live. The architecture comes afterwards.',
  quoteNote: 'The studio’s approach',
  principlesEyebrow: 'What the studio defends', principlesTitle: 'Light, materials,', principlesItalic: 'textures and volumes.',
  methodEyebrow: 'How we work', methodTitle: 'From the first conversation', methodItalic: 'to the site.',
  method: [
   ['Listening', 'Your way of living, your priorities and the site. The brief is written together.'],
   ['Design', 'The house, its outdoor spaces and its setting studied as one, with drawings and visualisations to decide with confidence.'],
   ['Permissions', 'The project documentation and the planning applications agreed for the commission.'],
   ['On site', 'Site supervision and coordination of the contractors, with the architect present at the key moments.']
  ],
  mapEyebrow: 'The studio in Marbella', mapText: 'A few steps from Avenida Ricardo Soriano, in the centre of Marbella.', mapLink: 'Open in Google Maps',
  mapAlt: 'Map of Marbella centre with the studio on Calle Estébanez Calderón, beside Avenida Ricardo Soriano and close to the seafront',
  mapCredit: 'Map data © OpenStreetMap contributors',
  pressEyebrow: 'Publications', pressTitle: 'ESPACIO,', pressItalic: 'the studio’s magazine.',
  pressText: 'The studio publishes ESPACIO, its own magazine about architecture and ways of living. Its editorial voice also shapes the way projects are presented on this website.',
  pressAlts: ['Cover of ESPACIO, issue 1', 'Cover of ESPACIO, issue 2'],
  collabEyebrow: 'Collaborations', collabText: 'Developers on the Costa del Sol trust the studio with the architecture of their villas. Matterhorn Estates credits Martínez Galván Arquitectos as the architect of Bleu Royal, in La Cerquilla, Nueva Andalucía.',
  whereEyebrow: 'Where we work', whereTitle: 'Marbella and the', whereItalic: 'Costa del Sol.',
  projectsEyebrow: 'Selected projects', projectsLink: 'All projects',
  ctaEyebrow: 'Start a conversation', ctaTitle: 'What space', ctaItalic: 'do you imagine?', ctaText: 'A new villa or a renovation. Let’s start with what you have in mind.', ctaLink: 'Tell us about your project',
  portraitAlt: 'Francisco Martínez Galván, architect, in his studio in Marbella', home: 'Home'
 },
 es: {
  label: 'El estudio', title: 'Francisco Martínez Galván, arquitecto en Marbella',
  description: 'Francisco Martínez Galván aporta un trato personal a la arquitectura de villas en la Costa del Sol, desde la primera conversación hasta la obra.',
  bioEyebrow: 'El arquitecto', bioTitle: 'Francisco Martínez Galván', bioItalic: 'Arquitectura con firma personal.',
  bio: [
   'Formado en la Escuela Politécnica de Madrid, Francisco Martínez Galván llegó a Marbella en 1998. En 2003 consolidó allí su estudio y desde entonces diseña villas de nueva construcción y reformas integrales en la Costa del Sol.',
   'Dirige personalmente cada proyecto. El cliente habla con el arquitecto que diseña, desde las primeras ideas hasta las decisiones en obra.'
  ],
  quote: 'Una casa empieza por la forma en que alguien quiere vivir. La arquitectura viene después.',
  quoteNote: 'El enfoque del estudio',
  principlesEyebrow: 'Lo que defiende el estudio', principlesTitle: 'Luz, materiales,', principlesItalic: 'texturas y volúmenes.',
  methodEyebrow: 'Cómo trabajamos', methodTitle: 'De la primera conversación', methodItalic: 'a la obra.',
  method: [
   ['Escuchar', 'Tu forma de vivir, tus prioridades y el lugar. El programa se escribe juntos.'],
   ['Diseñar', 'La casa, sus espacios exteriores y su entorno estudiados en conjunto, con planos y visualizaciones para decidir con seguridad.'],
   ['Licencias', 'La documentación del proyecto y las solicitudes acordadas para el encargo.'],
   ['En obra', 'Dirección de obra y coordinación de las empresas, con el arquitecto presente en los momentos clave.']
  ],
  mapEyebrow: 'El estudio en Marbella', mapText: 'A pocos pasos de la avenida Ricardo Soriano, en el centro de Marbella.', mapLink: 'Abrir en Google Maps',
  mapAlt: 'Mapa del centro de Marbella con el estudio en la calle Estébanez Calderón, junto a la avenida Ricardo Soriano y cerca del paseo marítimo',
  mapCredit: 'Datos del mapa © colaboradores de OpenStreetMap',
  pressEyebrow: 'Publicaciones', pressTitle: 'ESPACIO,', pressItalic: 'la revista del estudio.',
  pressText: 'El estudio edita ESPACIO, su propia revista sobre arquitectura y formas de vivir. Su voz editorial también inspira la forma de presentar los proyectos en esta web.',
  pressAlts: ['Portada de ESPACIO, número 1', 'Portada de ESPACIO, número 2'],
  collabEyebrow: 'Colaboraciones', collabText: 'Promotoras de la Costa del Sol confían al estudio la arquitectura de sus villas. Matterhorn Estates acredita a Martínez Galván Arquitectos como arquitecto de Bleu Royal, en La Cerquilla, Nueva Andalucía.',
  whereEyebrow: 'Dónde trabajamos', whereTitle: 'Marbella y la', whereItalic: 'Costa del Sol.',
  projectsEyebrow: 'Proyectos seleccionados', projectsLink: 'Todos los proyectos',
  ctaEyebrow: 'Empecemos a hablar', ctaTitle: '¿Qué espacio', ctaItalic: 'imaginas?', ctaText: 'Una nueva villa o una reforma. Empecemos por lo que tienes en mente.', ctaLink: 'Cuéntanos tu proyecto',
  portraitAlt: 'Francisco Martínez Galván, arquitecto, en su estudio de Marbella', home: 'Inicio'
 }
}

// Pilot service × location copy (EN/ES). Paths and status live in app/data/pages/renovation-marbella.ts.
import type { Locale, ServiceContent } from '../pages/types'
const silverHero = { src: '/photos/web-villa-silver-02.jpg', width: 2560, height: 1709 }
const silverWide = { src: '/photos/web-villa-silver-01.jpg', width: 2500, height: 1500 }
export const renovation: Record<Locale, ServiceContent> = {
 en: {
  label: 'Villa renovation in Marbella', title: 'Luxury villa renovations in Marbella · Galván Arquitectos',
  description: 'Complete villa renovation in Marbella: architecture, interior and landscape design, with personal attention, site supervision and project coordination.',
  eyebrow: 'MARBELLA · COSTA DEL SOL', heading: 'Luxury villa renovations', italic: 'in Marbella.',
  lead: 'A new chapter for your home. Architecture, interiors and landscape, considered together.',
  enquire: 'Discuss your villa', discover: 'Discover the approach', home: 'Home', service: 'Villa renovation',
  navigation: ['Overview', 'The transformation', 'The process', 'Questions'],
  introEyebrow: 'DESIGN. TRANSFORM. LIVE.', introTitle: 'Keep what matters.', introItalic: 'Rethink the rest.',
  introLead: 'The starting point is how you want to live. What you love about your villa, what no longer works, and the possibilities you see for its next chapter.',
  introText: 'Francisco Martínez Galván brings design and personal attention to your project in Marbella. From a new layout to the relationship with the garden, decisions are developed around your home and the agreed scope of the commission.',
  transformationEyebrow: 'A HOME, CONSIDERED AS A WHOLE', transformationTitle: 'Light. Space.', transformationItalic: 'A sense of belonging.',
  scope: [
   { title: 'Architecture & layout', text: 'Explore how rooms connect, where light enters and what should be preserved. The existing villa and your priorities guide the design.' },
   { title: 'Interiors & materials', text: 'Bring proportion, finishes and everyday use into the same conversation. Interior design can form part of the renovation or be commissioned separately.' },
   { title: 'Garden & outdoor living', text: 'Connect the house with its terraces, pool and garden. Landscape design considers planting, shade and the way you use the exterior.' }
  ],
  media: {
   hero: { ...silverHero, alt: 'Villa Silver · Studio archive', caption: 'Villa Silver · Studio archive' },
   feature: { ...silverWide, alt: 'Villa Silver, glazed architecture and a pool at dusk', caption: 'Villa Silver · Studio archive' },
   pause: { ...silverHero, alt: 'Villa Silver · Studio archive', caption: 'Villa Silver · Studio archive' }
  },
  secondaryCaption: 'Villa Carril · Studio archive',
  archiveNote: 'Archive images illustrate the studio’s architectural work; they are not presented as documented renovation projects.',
  visionEyebrow: 'ARCHITECTURE · INTERIORS · LANDSCAPE', visionTitle: 'One vision.', visionItalic: 'Every detail connected.',
  visionText: 'A renovation brings many decisions together. The design gives them direction; personal coordination helps carry that vision through the project.',
  processEyebrow: 'FROM THE IDEA TO THE SITE', processTitle: 'A clear path.', processItalic: 'A personal approach.',
  processText: 'Design, planning permissions, architectural site supervision and contractor coordination can be commissioned according to your project. The responsibilities and deliverables are agreed at the outset.',
  steps: [
   { title: 'Listen & understand', text: 'Discuss your priorities, the property and how you want to use it.' },
   { title: 'Develop the design', text: 'Study the layout, materials and connection with the exterior.' },
   { title: 'Define the scope', text: 'Agree the project documentation, permissions and coordination required.' },
   { title: 'Follow the work', text: 'Site supervision and coordination of the companies involved, within the agreed commission.' }
  ],
  archiveEyebrow: 'THE STUDIO’S ARCHITECTURAL LANGUAGE', archiveTitle: 'Spaces to', archiveItalic: 'take inspiration from.',
  archiveText: 'Two views from the studio archive: the relationship between architecture, light and outdoor living.',
  projects: [{name:'Villa Silver',image:'web-villa-silver-01.jpg',alt:'Villa Silver, glazed architecture and a pool at dusk',text:'Light, glazing and the transition to the terrace.'},{name:'Villa Carril',image:'web-villa-carril-01.jpg',alt:'Villa Carril, white architecture, pergola and swimming pool',text:'Shade, terraces and a connection to the garden.'}],
  localEyebrow: 'LOCAL EXPERIENCE · INTERNATIONAL CLIENTS', localTitle: 'Your villa in Marbella.', localItalic: 'Wherever you are.',
  localText: 'Paco works in Marbella and across the Costa del Sol, including Benahavís and Los Monteros. Your property’s setting, orientation and relationship with its surroundings are part of the design conversation.',
  remoteText: 'If you live abroad, video calls, visits and site follow-up help you stay involved. Communication is available in English and Spanish, with arrangements agreed for your project.',
  localPoints: ['Personal attention from the architect', 'Video calls, visits and site follow-up', 'Design with the surroundings in mind'],
  faqEyebrow: 'BEFORE WE BEGIN', faqTitle: 'A few useful questions.',
  faqs: [
   ['What can a complete villa renovation include?', 'Architecture, a revised layout, interior design and landscape design can be brought together. Planning permissions, architectural site supervision and contractor coordination are defined according to the work and the scope you commission.'],
   ['Can I renovate my villa while living outside Spain?', 'Yes. Video calls, visits and site follow-up provide ways to stay involved from abroad. The frequency and format of communication are agreed for your project.'],
   ['Do I need to change the whole house?', 'No. The first conversations help establish what to preserve and what to transform. A complete renovation is one possibility; the scope follows your priorities and the property.'],
   ['Can interior or landscape design be commissioned separately?', 'Yes. Both can be commissioned independently or incorporated into a villa renovation.'],
   ['How are planning permissions and site supervision handled?', 'These services can be included in the commission. The documentation, responsibilities and permissions needed are assessed for the specific proposal.'],
   ['How do we establish the budget and timescale?', 'The initial conversation covers your priorities and constraints. A defined scope is needed before discussing the project’s fees, budget and programme; each villa is considered individually.']
  ],
  contactEyebrow: 'LET’S START WITH YOUR IDEA', contactTitle: 'What would you', contactItalic: 'like to change?',
  contactText: 'Tell Paco a little about your villa, its location and what you have in mind.',
  fields: {name:'Your name',email:'Email',phone:'Phone (optional)',location:'Project location',message:'Tell us about your project'},
  submit: 'Prepare an email enquiry', formNote: 'This preview prepares the enquiry in your email app. Nothing is sent from the form.', contactAlternative: 'Or contact the studio directly',
  footerLink: 'Back to the top', languageLabel: 'Español', reference: 'Studio archive', illustration: 'Concept illustration · not a project drawing'
 },
 es: {
  label: 'Reformas de villas en Marbella', title: 'Reformas integrales de villas en Marbella · Galván Arquitectos',
  description: 'Reformas integrales de villas en Marbella: arquitectura, interiorismo y paisajismo, con trato directo, dirección de obra y coordinación del proyecto.',
  eyebrow: 'MARBELLA · COSTA DEL SOL', heading: 'Reformas integrales de villas', italic: 'en Marbella.',
  lead: 'Una nueva etapa para tu casa. Arquitectura, interiores y paisaje, pensados en conjunto.',
  enquire: 'Hablemos de tu villa', discover: 'Descubre el enfoque', home: 'Inicio', service: 'Reformas de villas',
  navigation: ['El enfoque', 'La transformación', 'El proceso', 'Preguntas'],
  introEyebrow: 'DISEÑAR. TRANSFORMAR. HABITAR.', introTitle: 'Conservar lo que importa.', introItalic: 'Repensar lo demás.',
  introLead: 'El punto de partida es cómo quieres vivir. Lo que te gusta de tu villa, lo que ya no funciona y las posibilidades que imaginas para su siguiente etapa.',
  introText: 'Francisco Martínez Galván aporta diseño y trato directo a tu proyecto en Marbella. Desde una nueva distribución hasta la relación con el jardín, las decisiones se desarrollan en torno a tu vivienda y al alcance acordado del encargo.',
  transformationEyebrow: 'UNA VIVIENDA PENSADA EN CONJUNTO', transformationTitle: 'Luz. Espacio.', transformationItalic: 'Sentirse en casa.',
  scope: [
   { title: 'Arquitectura y distribución', text: 'Estudiar cómo se conectan las estancias, por dónde entra la luz y qué merece conservarse. La villa existente y tus prioridades orientan el diseño.' },
   { title: 'Interiores y materiales', text: 'Reunir proporción, acabados y uso cotidiano en una misma conversación. El interiorismo puede formar parte de la reforma o contratarse por separado.' },
   { title: 'Jardín y vida exterior', text: 'Conectar la casa con sus terrazas, piscina y jardín. El paisajismo considera la vegetación, la sombra y la forma de disfrutar del exterior.' }
  ],
  media: {
   hero: { ...silverHero, alt: 'Villa Silver · Archivo del estudio', caption: 'Villa Silver · Archivo del estudio' },
   feature: { ...silverWide, alt: 'Villa Silver, arquitectura acristalada y piscina al anochecer', caption: 'Villa Silver · Archivo del estudio' },
   pause: { ...silverHero, alt: 'Villa Silver · Archivo del estudio', caption: 'Villa Silver · Archivo del estudio' }
  },
  secondaryCaption: 'Villa Carril · Archivo del estudio',
  archiveNote: 'Las imágenes del archivo ilustran el trabajo arquitectónico del estudio; no se presentan como proyectos de reforma documentados.',
  visionEyebrow: 'ARQUITECTURA · INTERIORES · PAISAJE', visionTitle: 'Una misma visión.', visionItalic: 'Cada detalle conectado.',
  visionText: 'Una reforma reúne muchas decisiones. El diseño les da una dirección; la coordinación personal ayuda a mantener esa visión durante el proyecto.',
  processEyebrow: 'DE LA IDEA A LA OBRA', processTitle: 'Un camino claro.', processItalic: 'Un trato cercano.',
  processText: 'Diseño, licencias, dirección de obra y coordinación de empresas se pueden contratar según las necesidades del proyecto. Las responsabilidades y los entregables se acuerdan al definir el encargo.',
  steps: [
   { title: 'Escuchar y comprender', text: 'Conversar sobre tus prioridades, la vivienda y cómo quieres utilizarla.' },
   { title: 'Desarrollar el diseño', text: 'Estudiar distribución, materiales y relación con el exterior.' },
   { title: 'Definir el alcance', text: 'Acordar la documentación, las licencias y la coordinación necesarias.' },
   { title: 'Acompañar la obra', text: 'Dirección de obra y coordinación de las empresas participantes, dentro del encargo acordado.' }
  ],
  archiveEyebrow: 'EL LENGUAJE ARQUITECTÓNICO DEL ESTUDIO', archiveTitle: 'Espacios para', archiveItalic: 'imaginar posibilidades.',
  archiveText: 'Dos miradas del archivo del estudio: la relación entre arquitectura, luz y vida exterior.',
  projects: [{name:'Villa Silver',image:'web-villa-silver-01.jpg',alt:'Villa Silver, arquitectura acristalada y piscina al anochecer',text:'Luz, vidrio y transición hacia la terraza.'},{name:'Villa Carril',image:'web-villa-carril-01.jpg',alt:'Villa Carril, arquitectura blanca, pérgola y piscina',text:'Sombra, terrazas y conexión con el jardín.'}],
  localEyebrow: 'EXPERIENCIA LOCAL · CLIENTES INTERNACIONALES', localTitle: 'Tu villa en Marbella.', localItalic: 'Estés donde estés.',
  localText: 'Paco trabaja en Marbella y en la Costa del Sol, incluyendo Benahavís y Los Monteros. El emplazamiento, la orientación y la relación de tu vivienda con el entorno forman parte de la conversación de diseño.',
  remoteText: 'Si vives fuera de España, las videollamadas, las visitas y el seguimiento de obra te ayudan a participar. Atención en inglés y español, con una organización acordada para tu proyecto.',
  localPoints: ['Trato directo con el arquitecto', 'Videollamadas, visitas y seguimiento de obra', 'Diseño que considera el entorno'],
  faqEyebrow: 'ANTES DE EMPEZAR', faqTitle: 'Algunas preguntas útiles.',
  faqs: [
   ['¿Qué puede incluir una reforma integral de villa?', 'Arquitectura, una nueva distribución, interiorismo y paisajismo pueden plantearse en conjunto. Las licencias, la dirección de obra y la coordinación de empresas se definen según la intervención y el alcance contratado.'],
   ['¿Puedo reformar mi villa si vivo fuera de España?', 'Sí. Las videollamadas, las visitas y el seguimiento de obra permiten participar desde fuera. La frecuencia y el formato de comunicación se acuerdan para cada proyecto.'],
   ['¿Es necesario cambiar toda la vivienda?', 'No. Las primeras conversaciones ayudan a decidir qué conservar y qué transformar. La reforma integral es una posibilidad; el alcance depende de tus prioridades y de la vivienda.'],
   ['¿Puedo contratar interiorismo o paisajismo por separado?', 'Sí. Ambos servicios pueden contratarse de forma independiente o incorporarse a una reforma de villa.'],
   ['¿Cómo se gestionan las licencias y la dirección de obra?', 'Estos servicios pueden incluirse en el encargo. La documentación, las responsabilidades y las licencias necesarias se estudian para la propuesta concreta.'],
   ['¿Cómo se establece el presupuesto y el plazo?', 'La conversación inicial recoge tus prioridades y condicionantes. Es necesario definir el alcance antes de hablar de honorarios, presupuesto y planificación; cada villa se estudia individualmente.']
  ],
  contactEyebrow: 'EMPECEMOS POR TU IDEA', contactTitle: '¿Qué te gustaría', contactItalic: 'transformar?',
  contactText: 'Cuéntale a Paco algo sobre tu villa, dónde está y qué tienes en mente.',
  fields: {name:'Tu nombre',email:'Email',phone:'Teléfono (opcional)',location:'Zona del proyecto',message:'Cuéntanos tu proyecto'},
  submit: 'Preparar una consulta por email', formNote: 'Esta vista previa prepara la consulta en tu aplicación de correo. El formulario no envía datos.', contactAlternative: 'O contacta directamente con el estudio',
  footerLink: 'Volver arriba', languageLabel: 'English', reference: 'Archivo del estudio', illustration: 'Ilustración conceptual · no es un plano de proyecto'
 }
}

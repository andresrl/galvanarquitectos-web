// Service-level copy shared by a service hub and its location pages. Based on CLAUDE.md §9 drafts and the approved pilot.
import type { Faq, Locale } from '../pages/types'
import type { ServiceId } from '../taxonomy'
import type { ArchiveKey } from './archive'

type Item = { title: string; text: string }
export type ServiceCopy = {
  heading: string; hubItalic: string; lead: string; hubLead: string
  describe: (place: string) => string; hubDescription: string
  enquire: string; navigation: [string, string, string, string]
  introEyebrow: string; introTitle: string; introItalic: string; introText: string; hubIntroLead: string; hubIntroText: string
  transformationEyebrow: string; transformationTitle: string; transformationItalic: string; scope: Item[]
  visionEyebrow: string; visionTitle: string; visionItalic: string; visionText: string
  processEyebrow: string; processTitle: string; processItalic: string; processText: string; steps: Item[]
  archiveEyebrow: string; archiveTitle: string; archiveItalic: string; archiveText: string; archiveNote: string
  localTitle: (place: string) => string; hubLocalTitle: string; localItalic: string
  faqs: Faq[]
  contactEyebrow: string; contactTitle: string; contactItalic: string; contactText: (place: string) => string; hubContactText: string
  zonesEyebrow: string; zonesTitle: string; zonesItalic: string; zonesText: string
}
export type ServiceMedia = { hero: ArchiveKey; pause: ArchiveKey; pool: ArchiveKey[] }

const steps = {
  en: (second: Item, third: Item): Item[] => [
    { title: 'Listen & understand', text: 'Discuss your priorities, the property and how you want to use it.' }, second, third,
    { title: 'Follow the work', text: 'Site supervision and coordination of the companies involved, within the agreed commission.' }
  ],
  es: (second: Item, third: Item): Item[] => [
    { title: 'Escuchar y comprender', text: 'Conversar sobre tus prioridades, la propiedad y cómo quieres utilizarla.' }, second, third,
    { title: 'Acompañar la obra', text: 'Dirección de obra y coordinación de las empresas participantes, dentro del encargo acordado.' }
  ]
}
const abroad: Record<Locale, Faq> = {
  en: ['Can I follow the project from abroad?', 'Yes. Video calls, visits and site follow-up provide ways to stay involved from abroad. The frequency and format of communication are agreed for each project.'],
  es: ['¿Puedo seguir el proyecto desde otro país?', 'Sí. Las videollamadas, las visitas y el seguimiento de obra permiten participar desde fuera. La frecuencia y el formato de comunicación se acuerdan en cada proyecto.']
}

export const serviceMedia: Record<ServiceId, ServiceMedia> = {
  architecture: { hero: 'villa-silver-wide', pause: 'villa-silver-hero', pool: ['villa-ambar', 'villa-la-resina-six', 'villas-j6a-j6b', 'cortijo-nagueles', 'villa-los-altos-53', 'villa-guadalmina-27', 'villa-bruselas', 'villa-silver-03', 'villa-carril', 'villa-flamingos-58'] },
  renovation: { hero: 'villa-silver-hero', pause: 'villa-silver-wide', pool: ['villa-carril', 'villa-poniente-96', 'villa-bruselas', 'villa-guadalmina-27', 'villa-flamingos-58', 'villa-ambar', 'villa-pareja', 'villa-paris', 'villa-silver-03', 'zagaleta-210'] }
}

export const serviceCopy: Record<ServiceId, Record<Locale, ServiceCopy>> = {
  architecture: {
    en: {
      heading: 'New-build villas', hubItalic: 'on the Costa del Sol.',
      lead: 'Architecture shaped around your way of life, from the first conversation to the site.', hubLead: 'Architecture shaped around your way of life, from the first conversation to the site.',
      describe: place => `New-build villa architecture ${place}: design shaped around the plot and the way you live, with planning permissions, site supervision and coordination.`,
      hubDescription: 'New-build villas on the Costa del Sol: architecture shaped around the plot and the way you live, with planning permissions, site supervision and coordination.',
      enquire: 'Let’s talk about your future home', navigation: ['Overview', 'The design', 'The process', 'Questions'],
      introEyebrow: 'A HOME THAT STARTS WITH YOU', introTitle: 'A home that', introItalic: 'starts with you.',
      introText: 'Francisco Martínez Galván brings the house, its outdoor spaces and its setting into a shared vision. Design, planning permissions, architectural site supervision and contractor coordination are defined according to the scope of your commission.',
      hubIntroLead: 'A new villa begins with a conversation about daily life: the spaces you need, how you welcome guests and how you want to spend time outdoors. The site, its orientation and its surroundings become part of the same design study.',
      hubIntroText: 'Francisco Martínez Galván brings the house, its outdoor spaces and its setting into a shared vision. Design, planning permissions, architectural site supervision and contractor coordination are defined according to the scope of your commission.',
      transformationEyebrow: 'THE PLOT, THE PROGRAMME, THE LIGHT', transformationTitle: 'Space, light', transformationItalic: 'and proportion.',
      scope: [
        { title: 'The site and its possibilities', text: 'Orientation, the relationship with the landscape, privacy and access are studied before the design takes shape. Feasibility is checked, never assumed.' },
        { title: 'Space, light and proportion', text: 'Your brief becomes a sequence of rooms: how they connect, how you move between them and where the light enters through the day.' },
        { title: 'Inside and outside, together', text: 'Terraces, porches and pool are designed with the house, as part of the same architectural project.' }
      ],
      visionEyebrow: 'ARCHITECTURE · LIGHT · SPACE', visionTitle: 'One vision.', visionItalic: 'From plot to home.',
      visionText: 'A new villa brings many decisions together. The design gives them direction; personal coordination helps carry that vision through the project.',
      processEyebrow: 'FROM THE IDEA TO THE SITE', processTitle: 'A clear path.', processItalic: 'A personal approach.',
      processText: 'Design, planning permissions, architectural site supervision and contractor coordination can be commissioned according to your project. Responsibilities and deliverables are agreed at the outset.',
      steps: steps.en({ title: 'Develop the design', text: 'Study the plot, the brief and the relationship between house and exterior.' }, { title: 'Define the project', text: 'Agree the project documentation, permissions and coordination required.' }),
      archiveEyebrow: 'THE STUDIO’S ARCHITECTURAL LANGUAGE', archiveTitle: 'Architecture', archiveItalic: 'from the archive.',
      archiveText: 'Two views from the studio archive: volume, light and the relationship with the exterior.',
      archiveNote: 'Projects labelled with the name of the area are located there; the others illustrate the studio’s work and are not presented as projects in this area.',
      localTitle: place => `Your future home ${place}.`, hubLocalTitle: 'Your future home here.', localItalic: 'Wherever you are.',
      faqs: [
        ['Can we begin with a plot I already own?', 'Yes. The first step is to study the plot: its orientation, access, surroundings and the planning conditions that apply. That study helps define what can be designed.'],
        ['What is included in the architectural commission?', 'Design, planning permissions, architectural site supervision and contractor coordination can be included. The scope, responsibilities and deliverables are agreed for each project.'],
        ['Are the terraces and pool designed with the house?', 'Yes. Terraces, porches and pool are part of the architectural project and are drawn with the house from the start.'],
        abroad.en,
        ['How are fees and the programme established?', 'They depend on the scope and the project. A defined brief and scope are needed before discussing fees and planning; each villa is considered individually.']
      ],
      contactEyebrow: 'LET’S START WITH YOUR IDEA', contactTitle: 'Let’s talk about', contactItalic: 'your future home.',
      contactText: place => `Tell us about your plot ${place}, what you have in mind and how you want to live.`, hubContactText: 'Tell us about your plot, what you have in mind and how you want to live.',
      zonesEyebrow: 'WHERE WE WORK', zonesTitle: 'New-build villas', zonesItalic: 'by area.', zonesText: 'Each area raises its own questions about plot, views and privacy.'
    },
    es: {
      heading: 'Villas de nueva construcción', hubItalic: 'en la Costa del Sol.',
      lead: 'Arquitectura pensada para tu forma de vivir, desde la primera conversación hasta la obra.', hubLead: 'Arquitectura pensada para tu forma de vivir, desde la primera conversación hasta la obra.',
      describe: place => `Arquitectura de villas de nueva construcción ${place}: diseño pensado para la parcela y tu forma de vivir, con licencias, dirección de obra y coordinación.`,
      hubDescription: 'Villas de nueva construcción en la Costa del Sol: arquitectura pensada para la parcela y tu forma de vivir, con licencias, dirección de obra y coordinación.',
      enquire: 'Hablemos de tu futura casa', navigation: ['El enfoque', 'El diseño', 'El proceso', 'Preguntas'],
      introEyebrow: 'UNA CASA QUE EMPIEZA POR TI', introTitle: 'Una casa que', introItalic: 'empieza por ti.',
      introText: 'Francisco Martínez Galván reúne la casa, sus espacios exteriores y su entorno en una visión común. El diseño, las licencias, la dirección de obra y la coordinación de empresas se definen según el alcance del encargo.',
      hubIntroLead: 'Una nueva villa comienza con una conversación sobre la vida cotidiana: los espacios que necesitas, cómo recibes a tus invitados y cómo quieres disfrutar del exterior. La parcela, su orientación y el entorno forman parte de un mismo estudio de diseño.',
      hubIntroText: 'Francisco Martínez Galván reúne la casa, sus espacios exteriores y su entorno en una visión común. El diseño, las licencias, la dirección de obra y la coordinación de empresas se definen según el alcance del encargo.',
      transformationEyebrow: 'LA PARCELA, EL PROGRAMA, LA LUZ', transformationTitle: 'Espacio, luz', transformationItalic: 'y proporción.',
      scope: [
        { title: 'La parcela y sus posibilidades', text: 'La orientación, la relación con el paisaje, la privacidad y los accesos se estudian antes de dar forma al diseño. La viabilidad se comprueba, no se presupone.' },
        { title: 'Espacio, luz y proporción', text: 'Tu programa se convierte en una secuencia de estancias: cómo se conectan, cómo te mueves entre ellas y por dónde entra la luz a lo largo del día.' },
        { title: 'Interior y exterior, en conjunto', text: 'Las terrazas, los porches y la piscina se diseñan con la casa, dentro del mismo proyecto de arquitectura.' }
      ],
      visionEyebrow: 'ARQUITECTURA · LUZ · ESPACIO', visionTitle: 'Una misma visión.', visionItalic: 'De la parcela a la casa.',
      visionText: 'Una villa nueva reúne muchas decisiones. El diseño les da una dirección; la coordinación personal ayuda a mantener esa visión durante el proyecto.',
      processEyebrow: 'DE LA IDEA A LA OBRA', processTitle: 'Un camino claro.', processItalic: 'Un trato cercano.',
      processText: 'Diseño, licencias, dirección de obra y coordinación de empresas se pueden contratar según las necesidades del proyecto. Las responsabilidades y los entregables se acuerdan al definir el encargo.',
      steps: steps.es({ title: 'Desarrollar el diseño', text: 'Estudiar la parcela, el programa y la relación entre la casa y el exterior.' }, { title: 'Definir el proyecto', text: 'Acordar la documentación, las licencias y la coordinación necesarias.' }),
      archiveEyebrow: 'EL LENGUAJE ARQUITECTÓNICO DEL ESTUDIO', archiveTitle: 'Arquitectura', archiveItalic: 'del archivo.',
      archiveText: 'Dos miradas del archivo del estudio: volumen, luz y relación con el exterior.',
      archiveNote: 'Los proyectos rotulados con el nombre de la zona están situados en ella; los demás ilustran el trabajo del estudio y no se presentan como proyectos de esta zona.',
      localTitle: place => `Tu futura casa ${place}.`, hubLocalTitle: 'Tu futura casa aquí.', localItalic: 'Estés donde estés.',
      faqs: [
        ['¿Podemos empezar con una parcela que ya tengo?', 'Sí. El primer paso es estudiar la parcela: su orientación, sus accesos, su entorno y las condiciones urbanísticas que le afectan. Ese estudio ayuda a definir lo que se puede diseñar.'],
        ['¿Qué incluye el encargo de arquitectura?', 'Puede incluir el diseño, las licencias, la dirección de obra y la coordinación de empresas. El alcance, las responsabilidades y los entregables se acuerdan en cada proyecto.'],
        ['¿Las terrazas y la piscina se diseñan con la casa?', 'Sí. Las terrazas, los porches y la piscina forman parte del proyecto de arquitectura y se dibujan con la casa desde el principio.'],
        abroad.es,
        ['¿Cómo se definen honorarios y planificación?', 'Dependen del alcance y del proyecto. Es necesario definir el programa y el alcance antes de hablar de honorarios y planificación; cada villa se estudia individualmente.']
      ],
      contactEyebrow: 'EMPECEMOS POR TU IDEA', contactTitle: 'Hablemos de', contactItalic: 'tu futura casa.',
      contactText: place => `Cuéntanos cómo es tu parcela ${place}, qué tienes en mente y cómo quieres vivir.`, hubContactText: 'Cuéntanos cómo es tu parcela, qué tienes en mente y cómo quieres vivir.',
      zonesEyebrow: 'DÓNDE TRABAJAMOS', zonesTitle: 'Villas nuevas', zonesItalic: 'por zonas.', zonesText: 'Cada zona plantea sus propias preguntas sobre la parcela, las vistas y la privacidad.'
    }
  },
  renovation: {
    en: {
      heading: 'Luxury villa renovations', hubItalic: 'on the Costa del Sol.',
      lead: 'A new chapter for your home. Architecture, layout and light, considered together.', hubLead: 'Keep what you value. Transform the spaces that no longer fit the way you live.',
      describe: place => `Complete villa renovation ${place}: architecture, a new layout and light, with personal attention, site supervision and project coordination.`,
      hubDescription: 'Complete villa renovations on the Costa del Sol: architecture, layout and light, with planning permissions, site supervision and coordination.',
      enquire: 'Discuss your villa', navigation: ['Overview', 'The transformation', 'The process', 'Questions'],
      introEyebrow: 'DESIGN. TRANSFORM. LIVE.', introTitle: 'Keep what matters.', introItalic: 'Rethink the rest.',
      introText: 'Francisco Martínez Galván brings design and personal attention to your renovation. From a new layout to the relationship with the garden, decisions are developed around your home and the agreed scope of the commission.',
      hubIntroLead: 'A renovation is an opportunity to reconsider a villa as a whole. The existing architecture, your priorities and the relationship with the garden help establish what to keep and what to change.',
      hubIntroText: 'Design, layout and materials form part of one commission, with permissions, site supervision and coordination agreed for the project.',
      transformationEyebrow: 'A HOME, CONSIDERED AS A WHOLE', transformationTitle: 'Light. Space.', transformationItalic: 'A sense of belonging.',
      scope: [
        { title: 'Architecture & layout', text: 'Explore how rooms connect, where light enters and what should be preserved. The existing villa and your priorities guide the design.' },
        { title: 'Finishes & materials', text: 'Bring proportion, finishes and everyday use into the same conversation, as part of the architectural project.' },
        { title: 'Terraces & outdoor living', text: 'Connect the house with its terraces, porches and pool. Openings, shade and the transition between inside and outside are designed with the architecture.' }
      ],
      visionEyebrow: 'ARCHITECTURE · LIGHT · SPACE', visionTitle: 'One vision.', visionItalic: 'Every detail connected.',
      visionText: 'A renovation brings many decisions together. The design gives them direction; personal coordination helps carry that vision through the project.',
      processEyebrow: 'FROM THE IDEA TO THE SITE', processTitle: 'A clear path.', processItalic: 'A personal approach.',
      processText: 'Design, planning permissions, architectural site supervision and contractor coordination can be commissioned according to your project. The responsibilities and deliverables are agreed at the outset.',
      steps: steps.en({ title: 'Develop the design', text: 'Study the layout, materials and connection with the exterior.' }, { title: 'Define the scope', text: 'Agree the project documentation, permissions and coordination required.' }),
      archiveEyebrow: 'THE STUDIO’S ARCHITECTURAL LANGUAGE', archiveTitle: 'Spaces to', archiveItalic: 'take inspiration from.',
      archiveText: 'Two views from the studio archive: the relationship between architecture, light and outdoor living.',
      archiveNote: 'Archive images illustrate the studio’s architectural work; they are not presented as documented renovation projects.',
      localTitle: place => `Your villa ${place}.`, hubLocalTitle: 'Your villa on the Costa del Sol.', localItalic: 'Wherever you are.',
      faqs: [
        ['What can a complete villa renovation include?', 'Architecture, a revised layout, finishes and materials can be brought together. Planning permissions, architectural site supervision and contractor coordination are defined according to the work and the scope you commission.'],
        ['Do I need to change the whole house?', 'No. The first conversations help establish what to preserve and what to transform. A complete renovation is one possibility; the scope follows your priorities and the property.'],
        abroad.en,
        ['How do we establish the budget and timescale?', 'The initial conversation covers your priorities and constraints. A defined scope is needed before discussing the project’s fees, budget and programme; each villa is considered individually.']
      ],
      contactEyebrow: 'LET’S START WITH YOUR IDEA', contactTitle: 'What would you', contactItalic: 'like to change?',
      contactText: place => `Tell us a little about your villa ${place} and what you have in mind.`, hubContactText: 'Tell us a little about your villa, its location and what you have in mind.',
      zonesEyebrow: 'WHERE WE WORK', zonesTitle: 'Villa renovations', zonesItalic: 'by area.', zonesText: 'Each area brings different houses, plots and questions to the renovation.'
    },
    es: {
      heading: 'Reformas integrales de villas', hubItalic: 'en la Costa del Sol.',
      lead: 'Una nueva etapa para tu casa. Arquitectura, distribución y luz, pensadas en conjunto.', hubLead: 'Conservar lo que valoras. Transformar los espacios que ya no acompañan tu forma de vivir.',
      describe: place => `Reformas integrales de villas ${place}: arquitectura, nueva distribución y luz, con trato directo, dirección de obra y coordinación del proyecto.`,
      hubDescription: 'Reformas integrales de villas en la Costa del Sol: arquitectura, distribución y luz, con licencias, dirección de obra y coordinación.',
      enquire: 'Hablemos de tu villa', navigation: ['El enfoque', 'La transformación', 'El proceso', 'Preguntas'],
      introEyebrow: 'DISEÑAR. TRANSFORMAR. HABITAR.', introTitle: 'Conservar lo que importa.', introItalic: 'Repensar lo demás.',
      introText: 'Francisco Martínez Galván aporta diseño y trato directo a tu reforma. Desde una nueva distribución hasta la relación con el jardín, las decisiones se desarrollan en torno a tu vivienda y al alcance acordado del encargo.',
      hubIntroLead: 'Una reforma permite volver a mirar la villa en conjunto. La arquitectura existente, tus prioridades y la relación con el jardín ayudan a definir qué conservar y qué cambiar.',
      hubIntroText: 'Diseño, distribución y materiales forman parte de un mismo encargo, con licencias, dirección de obra y coordinación acordadas para el proyecto.',
      transformationEyebrow: 'UNA VIVIENDA PENSADA EN CONJUNTO', transformationTitle: 'Luz. Espacio.', transformationItalic: 'Sentirse en casa.',
      scope: [
        { title: 'Arquitectura y distribución', text: 'Estudiar cómo se conectan las estancias, por dónde entra la luz y qué merece conservarse. La villa existente y tus prioridades orientan el diseño.' },
        { title: 'Acabados y materiales', text: 'Reunir proporción, acabados y uso cotidiano en una misma conversación, como parte del proyecto de arquitectura.' },
        { title: 'Terrazas y vida exterior', text: 'Conectar la casa con sus terrazas, porches y piscina. Los huecos, la sombra y la transición entre interior y exterior se diseñan con la arquitectura.' }
      ],
      visionEyebrow: 'ARQUITECTURA · LUZ · ESPACIO', visionTitle: 'Una misma visión.', visionItalic: 'Cada detalle conectado.',
      visionText: 'Una reforma reúne muchas decisiones. El diseño les da una dirección; la coordinación personal ayuda a mantener esa visión durante el proyecto.',
      processEyebrow: 'DE LA IDEA A LA OBRA', processTitle: 'Un camino claro.', processItalic: 'Un trato cercano.',
      processText: 'Diseño, licencias, dirección de obra y coordinación de empresas se pueden contratar según las necesidades del proyecto. Las responsabilidades y los entregables se acuerdan al definir el encargo.',
      steps: steps.es({ title: 'Desarrollar el diseño', text: 'Estudiar distribución, materiales y relación con el exterior.' }, { title: 'Definir el alcance', text: 'Acordar la documentación, las licencias y la coordinación necesarias.' }),
      archiveEyebrow: 'EL LENGUAJE ARQUITECTÓNICO DEL ESTUDIO', archiveTitle: 'Espacios para', archiveItalic: 'imaginar posibilidades.',
      archiveText: 'Dos miradas del archivo del estudio: la relación entre arquitectura, luz y vida exterior.',
      archiveNote: 'Las imágenes del archivo ilustran el trabajo arquitectónico del estudio; no se presentan como proyectos de reforma documentados.',
      localTitle: place => `Tu villa ${place}.`, hubLocalTitle: 'Tu villa en la Costa del Sol.', localItalic: 'Estés donde estés.',
      faqs: [
        ['¿Qué puede incluir una reforma integral de villa?', 'Arquitectura, una nueva distribución, acabados y materiales pueden plantearse en conjunto. Las licencias, la dirección de obra y la coordinación de empresas se definen según la intervención y el alcance contratado.'],
        ['¿Es necesario cambiar toda la vivienda?', 'No. Las primeras conversaciones ayudan a decidir qué conservar y qué transformar. La reforma integral es una posibilidad; el alcance depende de tus prioridades y de la vivienda.'],
        abroad.es,
        ['¿Cómo se establece el presupuesto y el plazo?', 'La conversación inicial recoge tus prioridades y condicionantes. Es necesario definir el alcance antes de hablar de honorarios, presupuesto y planificación; cada villa se estudia individualmente.']
      ],
      contactEyebrow: 'EMPECEMOS POR TU IDEA', contactTitle: '¿Qué te gustaría', contactItalic: 'transformar?',
      contactText: place => `Cuéntanos algo sobre tu villa ${place} y qué tienes en mente.`, hubContactText: 'Cuéntanos algo sobre tu villa, dónde está y qué tienes en mente.',
      zonesEyebrow: 'DÓNDE TRABAJAMOS', zonesTitle: 'Reformas de villas', zonesItalic: 'por zonas.', zonesText: 'Cada zona aporta casas, parcelas y preguntas distintas a la reforma.'
    }
  }
}

// Copy shared by every service page in one language.
export const commonCopy = {
  en: {
    discover: 'Discover the approach', home: 'Home', localEyebrow: 'LOCAL EXPERIENCE · INTERNATIONAL CLIENTS',
    remoteText: 'If you live abroad, video calls, visits and site follow-up help you stay involved. Communication is available in English and Spanish, with arrangements agreed for your project.',
    hubLocalText: 'Francisco Martínez Galván works from Marbella across the Costa del Sol, including Benahavís, Estepona and the residential areas of Marbella. The setting, orientation and surroundings of each property are part of the design conversation.',
    localPoints: ['Personal attention from the architect', 'Video calls, visits and site follow-up', 'Design with the surroundings in mind'],
    faqEyebrow: 'BEFORE WE BEGIN', faqTitle: 'A few useful questions.',
    fields: { name: 'Your name', email: 'Email', phone: 'Phone (optional)', location: 'Project location', message: 'Tell us about your project' },
    submit: 'Prepare an email enquiry', formNote: 'This preview prepares the enquiry in your email app. Nothing is sent from the form.', contactAlternative: 'Or contact the studio directly',
    footerLink: 'Back to the top', languageLabel: 'Español', reference: 'Studio archive', illustration: 'Concept illustration · not a project drawing',
    archiveCaption: 'Studio archive', hubEyebrow: 'MARBELLA · COSTA DEL SOL'
  },
  es: {
    discover: 'Descubre el enfoque', home: 'Inicio', localEyebrow: 'EXPERIENCIA LOCAL · CLIENTES INTERNACIONALES',
    remoteText: 'Si vives fuera de España, las videollamadas, las visitas y el seguimiento de obra te ayudan a participar. Atención en inglés y español, con una organización acordada para tu proyecto.',
    hubLocalText: 'Francisco Martínez Galván trabaja desde Marbella en toda la Costa del Sol, incluidos Benahavís, Estepona y las zonas residenciales de Marbella. El emplazamiento, la orientación y el entorno de cada propiedad forman parte de la conversación de diseño.',
    localPoints: ['Trato directo con el arquitecto', 'Videollamadas, visitas y seguimiento de obra', 'Diseño que considera el entorno'],
    faqEyebrow: 'ANTES DE EMPEZAR', faqTitle: 'Algunas preguntas útiles.',
    fields: { name: 'Tu nombre', email: 'Email', phone: 'Teléfono (opcional)', location: 'Zona del proyecto', message: 'Cuéntanos tu proyecto' },
    submit: 'Preparar una consulta por email', formNote: 'Esta vista previa prepara la consulta en tu aplicación de correo. El formulario no envía datos.', contactAlternative: 'O contacta directamente con el estudio',
    footerLink: 'Volver arriba', languageLabel: 'English', reference: 'Archivo del estudio', illustration: 'Ilustración conceptual · no es un plano de proyecto',
    archiveCaption: 'Archivo del estudio', hubEyebrow: 'MARBELLA · COSTA DEL SOL'
  }
} satisfies Record<Locale, Record<string, unknown>>

// Labels for the linking modules (hub zones list and related pages).
export const linkCopy = {
  en: { relatedEyebrow: 'CONTINUE EXPLORING', samePlace: (place: string) => `More ${place}`, sameService: (service: string) => `${service} nearby`, allAreas: 'All areas' },
  es: { relatedEyebrow: 'SIGUE EXPLORANDO', samePlace: (place: string) => `Más ${place}`, sameService: (service: string) => `${service} cerca`, allAreas: 'Todas las zonas' }
}

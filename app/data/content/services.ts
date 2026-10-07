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
  renovation: { hero: 'villa-silver-hero', pause: 'villa-silver-wide', pool: ['villa-carril', 'villa-poniente-96', 'villa-bruselas', 'villa-guadalmina-27', 'villa-flamingos-58', 'villa-ambar', 'villa-pareja', 'villa-paris', 'villa-silver-03', 'zagaleta-210'] },
  interiors: { hero: 'villa-silver-hero', pause: 'villa-silver-wide', pool: ['hotel-boutique', 'villa-pareja', 'villa-guadalmina-27', 'villa-silver-03', 'villa-poniente-96', 'cortijo-nagueles', 'villa-la-resina-six', 'villa-carril'] },
  landscape: { hero: 'villa-silver-wide', pause: 'villa-silver-hero', pool: ['villa-paris', 'zagaleta-210', 'paraiba-residencial', 'villa-los-altos-53', 'villa-flamingos-58', 'hotel-boutique', 'villa-guadalmina-27', 'villas-j6a-j6b', 'villa-carril', 'cortijo-nagueles'] }
}

export const serviceCopy: Record<ServiceId, Record<Locale, ServiceCopy>> = {
  architecture: {
    en: {
      heading: 'New-build villas', hubItalic: 'on the Costa del Sol.',
      lead: 'Architecture shaped around your way of life, from the first conversation to the site.', hubLead: 'Architecture shaped around your way of life, from the first conversation to the site.',
      describe: place => `New-build villa architecture ${place}: design shaped around the plot and the way you live, with planning permissions, site supervision and coordination.`,
      hubDescription: 'New-build villas on the Costa del Sol: architecture, interiors and landscape considered together, with planning permissions, site supervision and coordination.',
      enquire: 'Let’s talk about your future home', navigation: ['Overview', 'The design', 'The process', 'Questions'],
      introEyebrow: 'A HOME THAT STARTS WITH YOU', introTitle: 'A home that', introItalic: 'starts with you.',
      introText: 'Paco brings architecture, interiors and landscape into a shared vision. Design, planning permissions, architectural site supervision and contractor coordination are defined according to the scope of your commission.',
      hubIntroLead: 'A new villa begins with a conversation about daily life: the spaces you need, how you welcome guests and how you want to spend time outdoors. The site, its orientation and its surroundings become part of the same design study.',
      hubIntroText: 'Paco brings architecture, interiors and landscape into a shared vision. Design, planning permissions, architectural site supervision and contractor coordination are defined according to the scope of your commission.',
      transformationEyebrow: 'THE PLOT, THE PROGRAMME, THE LIGHT', transformationTitle: 'Space, light', transformationItalic: 'and proportion.',
      scope: [
        { title: 'The site and its possibilities', text: 'Orientation, the relationship with the landscape, privacy and access are studied before the design takes shape. Feasibility is checked, never assumed.' },
        { title: 'Space, light and proportion', text: 'Your brief becomes a sequence of rooms: how they connect, how you move between them and where the light enters through the day.' },
        { title: 'Inside and outside, together', text: 'Terraces, garden and pool are designed with the house, and interiors and landscape can be coordinated within the same commission.' }
      ],
      visionEyebrow: 'ARCHITECTURE · INTERIORS · LANDSCAPE', visionTitle: 'One vision.', visionItalic: 'From plot to home.',
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
        ['Can interiors and landscape be designed together?', 'Yes. Architecture, interior design and landscape design can be developed as one commission, or the interiors and garden can be commissioned separately.'],
        abroad.en,
        ['How are fees and the programme established?', 'They depend on the scope and the project. A defined brief and scope are needed before discussing fees and planning; each villa is considered individually.']
      ],
      contactEyebrow: 'LET’S START WITH YOUR IDEA', contactTitle: 'Let’s talk about', contactItalic: 'your future home.',
      contactText: place => `Tell Paco about your plot ${place}, what you have in mind and how you want to live.`, hubContactText: 'Tell Paco about your plot, what you have in mind and how you want to live.',
      zonesEyebrow: 'WHERE WE WORK', zonesTitle: 'New-build villas', zonesItalic: 'by area.', zonesText: 'Each area raises its own questions about plot, views and privacy.'
    },
    es: {
      heading: 'Villas de nueva construcción', hubItalic: 'en la Costa del Sol.',
      lead: 'Arquitectura pensada para tu forma de vivir, desde la primera conversación hasta la obra.', hubLead: 'Arquitectura pensada para tu forma de vivir, desde la primera conversación hasta la obra.',
      describe: place => `Arquitectura de villas de nueva construcción ${place}: diseño pensado para la parcela y tu forma de vivir, con licencias, dirección de obra y coordinación.`,
      hubDescription: 'Villas de nueva construcción en la Costa del Sol: arquitectura, interiorismo y paisajismo en conjunto, con licencias, dirección de obra y coordinación.',
      enquire: 'Hablemos de tu futura casa', navigation: ['El enfoque', 'El diseño', 'El proceso', 'Preguntas'],
      introEyebrow: 'UNA CASA QUE EMPIEZA POR TI', introTitle: 'Una casa que', introItalic: 'empieza por ti.',
      introText: 'Paco reúne arquitectura, interiores y paisaje en una visión común. El diseño, las licencias, la dirección de obra y la coordinación de empresas se definen según el alcance del encargo.',
      hubIntroLead: 'Una nueva villa comienza con una conversación sobre la vida cotidiana: los espacios que necesitas, cómo recibes a tus invitados y cómo quieres disfrutar del exterior. La parcela, su orientación y el entorno forman parte de un mismo estudio de diseño.',
      hubIntroText: 'Paco reúne arquitectura, interiores y paisaje en una visión común. El diseño, las licencias, la dirección de obra y la coordinación de empresas se definen según el alcance del encargo.',
      transformationEyebrow: 'LA PARCELA, EL PROGRAMA, LA LUZ', transformationTitle: 'Espacio, luz', transformationItalic: 'y proporción.',
      scope: [
        { title: 'La parcela y sus posibilidades', text: 'La orientación, la relación con el paisaje, la privacidad y los accesos se estudian antes de dar forma al diseño. La viabilidad se comprueba, no se presupone.' },
        { title: 'Espacio, luz y proporción', text: 'Tu programa se convierte en una secuencia de estancias: cómo se conectan, cómo te mueves entre ellas y por dónde entra la luz a lo largo del día.' },
        { title: 'Interior y exterior, en conjunto', text: 'Las terrazas, el jardín y la piscina se diseñan con la casa, y el interiorismo y el paisajismo pueden coordinarse dentro del mismo encargo.' }
      ],
      visionEyebrow: 'ARQUITECTURA · INTERIORES · PAISAJE', visionTitle: 'Una misma visión.', visionItalic: 'De la parcela a la casa.',
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
        ['¿Podemos diseñar interiores y paisaje en conjunto?', 'Sí. Arquitectura, interiorismo y paisajismo pueden desarrollarse en un mismo encargo, o contratar los interiores y el jardín por separado.'],
        abroad.es,
        ['¿Cómo se definen honorarios y planificación?', 'Dependen del alcance y del proyecto. Es necesario definir el programa y el alcance antes de hablar de honorarios y planificación; cada villa se estudia individualmente.']
      ],
      contactEyebrow: 'EMPECEMOS POR TU IDEA', contactTitle: 'Hablemos de', contactItalic: 'tu futura casa.',
      contactText: place => `Cuéntale a Paco cómo es tu parcela ${place}, qué tienes en mente y cómo quieres vivir.`, hubContactText: 'Cuéntale a Paco cómo es tu parcela, qué tienes en mente y cómo quieres vivir.',
      zonesEyebrow: 'DÓNDE TRABAJAMOS', zonesTitle: 'Villas nuevas', zonesItalic: 'por zonas.', zonesText: 'Cada zona plantea sus propias preguntas sobre la parcela, las vistas y la privacidad.'
    }
  },
  renovation: {
    en: {
      heading: 'Luxury villa renovations', hubItalic: 'on the Costa del Sol.',
      lead: 'A new chapter for your home. Architecture, interiors and landscape, considered together.', hubLead: 'Keep what you value. Transform the spaces that no longer fit the way you live.',
      describe: place => `Complete villa renovation ${place}: architecture, interior and landscape design, with personal attention, site supervision and project coordination.`,
      hubDescription: 'Complete villa renovations on the Costa del Sol: architecture, interiors and landscape, with planning permissions, site supervision and coordination.',
      enquire: 'Discuss your villa', navigation: ['Overview', 'The transformation', 'The process', 'Questions'],
      introEyebrow: 'DESIGN. TRANSFORM. LIVE.', introTitle: 'Keep what matters.', introItalic: 'Rethink the rest.',
      introText: 'Francisco Martínez Galván brings design and personal attention to your renovation. From a new layout to the relationship with the garden, decisions are developed around your home and the agreed scope of the commission.',
      hubIntroLead: 'A renovation is an opportunity to reconsider a villa as a whole. The existing architecture, your priorities and the relationship with the garden help establish what to keep and what to change.',
      hubIntroText: 'Architecture, interior design and landscape can form part of one commission, with permissions, site supervision and coordination agreed for the project.',
      transformationEyebrow: 'A HOME, CONSIDERED AS A WHOLE', transformationTitle: 'Light. Space.', transformationItalic: 'A sense of belonging.',
      scope: [
        { title: 'Architecture & layout', text: 'Explore how rooms connect, where light enters and what should be preserved. The existing villa and your priorities guide the design.' },
        { title: 'Interiors & materials', text: 'Bring proportion, finishes and everyday use into the same conversation. Interior design can form part of the renovation or be commissioned separately.' },
        { title: 'Garden & outdoor living', text: 'Connect the house with its terraces, pool and garden. Landscape design considers planting, shade and the way you use the exterior.' }
      ],
      visionEyebrow: 'ARCHITECTURE · INTERIORS · LANDSCAPE', visionTitle: 'One vision.', visionItalic: 'Every detail connected.',
      visionText: 'A renovation brings many decisions together. The design gives them direction; personal coordination helps carry that vision through the project.',
      processEyebrow: 'FROM THE IDEA TO THE SITE', processTitle: 'A clear path.', processItalic: 'A personal approach.',
      processText: 'Design, planning permissions, architectural site supervision and contractor coordination can be commissioned according to your project. The responsibilities and deliverables are agreed at the outset.',
      steps: steps.en({ title: 'Develop the design', text: 'Study the layout, materials and connection with the exterior.' }, { title: 'Define the scope', text: 'Agree the project documentation, permissions and coordination required.' }),
      archiveEyebrow: 'THE STUDIO’S ARCHITECTURAL LANGUAGE', archiveTitle: 'Spaces to', archiveItalic: 'take inspiration from.',
      archiveText: 'Two views from the studio archive: the relationship between architecture, light and outdoor living.',
      archiveNote: 'Archive images illustrate the studio’s architectural work; they are not presented as documented renovation projects.',
      localTitle: place => `Your villa ${place}.`, hubLocalTitle: 'Your villa on the Costa del Sol.', localItalic: 'Wherever you are.',
      faqs: [
        ['What can a complete villa renovation include?', 'Architecture, a revised layout, interior design and landscape design can be brought together. Planning permissions, architectural site supervision and contractor coordination are defined according to the work and the scope you commission.'],
        ['Do I need to change the whole house?', 'No. The first conversations help establish what to preserve and what to transform. A complete renovation is one possibility; the scope follows your priorities and the property.'],
        abroad.en,
        ['How do we establish the budget and timescale?', 'The initial conversation covers your priorities and constraints. A defined scope is needed before discussing the project’s fees, budget and programme; each villa is considered individually.']
      ],
      contactEyebrow: 'LET’S START WITH YOUR IDEA', contactTitle: 'What would you', contactItalic: 'like to change?',
      contactText: place => `Tell Paco a little about your villa ${place} and what you have in mind.`, hubContactText: 'Tell Paco a little about your villa, its location and what you have in mind.',
      zonesEyebrow: 'WHERE WE WORK', zonesTitle: 'Villa renovations', zonesItalic: 'by area.', zonesText: 'Each area brings different houses, plots and questions to the renovation.'
    },
    es: {
      heading: 'Reformas integrales de villas', hubItalic: 'en la Costa del Sol.',
      lead: 'Una nueva etapa para tu casa. Arquitectura, interiores y paisaje, pensados en conjunto.', hubLead: 'Conservar lo que valoras. Transformar los espacios que ya no acompañan tu forma de vivir.',
      describe: place => `Reformas integrales de villas ${place}: arquitectura, interiorismo y paisajismo, con trato directo, dirección de obra y coordinación del proyecto.`,
      hubDescription: 'Reformas integrales de villas en la Costa del Sol: arquitectura, interiorismo y paisajismo, con licencias, dirección de obra y coordinación.',
      enquire: 'Hablemos de tu villa', navigation: ['El enfoque', 'La transformación', 'El proceso', 'Preguntas'],
      introEyebrow: 'DISEÑAR. TRANSFORMAR. HABITAR.', introTitle: 'Conservar lo que importa.', introItalic: 'Repensar lo demás.',
      introText: 'Francisco Martínez Galván aporta diseño y trato directo a tu reforma. Desde una nueva distribución hasta la relación con el jardín, las decisiones se desarrollan en torno a tu vivienda y al alcance acordado del encargo.',
      hubIntroLead: 'Una reforma permite volver a mirar la villa en conjunto. La arquitectura existente, tus prioridades y la relación con el jardín ayudan a definir qué conservar y qué cambiar.',
      hubIntroText: 'Arquitectura, interiorismo y paisajismo pueden formar parte de un mismo encargo, con licencias, dirección de obra y coordinación acordadas para el proyecto.',
      transformationEyebrow: 'UNA VIVIENDA PENSADA EN CONJUNTO', transformationTitle: 'Luz. Espacio.', transformationItalic: 'Sentirse en casa.',
      scope: [
        { title: 'Arquitectura y distribución', text: 'Estudiar cómo se conectan las estancias, por dónde entra la luz y qué merece conservarse. La villa existente y tus prioridades orientan el diseño.' },
        { title: 'Interiores y materiales', text: 'Reunir proporción, acabados y uso cotidiano en una misma conversación. El interiorismo puede formar parte de la reforma o contratarse por separado.' },
        { title: 'Jardín y vida exterior', text: 'Conectar la casa con sus terrazas, piscina y jardín. El paisajismo considera la vegetación, la sombra y la forma de disfrutar del exterior.' }
      ],
      visionEyebrow: 'ARQUITECTURA · INTERIORES · PAISAJE', visionTitle: 'Una misma visión.', visionItalic: 'Cada detalle conectado.',
      visionText: 'Una reforma reúne muchas decisiones. El diseño les da una dirección; la coordinación personal ayuda a mantener esa visión durante el proyecto.',
      processEyebrow: 'DE LA IDEA A LA OBRA', processTitle: 'Un camino claro.', processItalic: 'Un trato cercano.',
      processText: 'Diseño, licencias, dirección de obra y coordinación de empresas se pueden contratar según las necesidades del proyecto. Las responsabilidades y los entregables se acuerdan al definir el encargo.',
      steps: steps.es({ title: 'Desarrollar el diseño', text: 'Estudiar distribución, materiales y relación con el exterior.' }, { title: 'Definir el alcance', text: 'Acordar la documentación, las licencias y la coordinación necesarias.' }),
      archiveEyebrow: 'EL LENGUAJE ARQUITECTÓNICO DEL ESTUDIO', archiveTitle: 'Espacios para', archiveItalic: 'imaginar posibilidades.',
      archiveText: 'Dos miradas del archivo del estudio: la relación entre arquitectura, luz y vida exterior.',
      archiveNote: 'Las imágenes del archivo ilustran el trabajo arquitectónico del estudio; no se presentan como proyectos de reforma documentados.',
      localTitle: place => `Tu villa ${place}.`, hubLocalTitle: 'Tu villa en la Costa del Sol.', localItalic: 'Estés donde estés.',
      faqs: [
        ['¿Qué puede incluir una reforma integral de villa?', 'Arquitectura, una nueva distribución, interiorismo y paisajismo pueden plantearse en conjunto. Las licencias, la dirección de obra y la coordinación de empresas se definen según la intervención y el alcance contratado.'],
        ['¿Es necesario cambiar toda la vivienda?', 'No. Las primeras conversaciones ayudan a decidir qué conservar y qué transformar. La reforma integral es una posibilidad; el alcance depende de tus prioridades y de la vivienda.'],
        abroad.es,
        ['¿Cómo se establece el presupuesto y el plazo?', 'La conversación inicial recoge tus prioridades y condicionantes. Es necesario definir el alcance antes de hablar de honorarios, presupuesto y planificación; cada villa se estudia individualmente.']
      ],
      contactEyebrow: 'EMPECEMOS POR TU IDEA', contactTitle: '¿Qué te gustaría', contactItalic: 'transformar?',
      contactText: place => `Cuéntale a Paco algo sobre tu villa ${place} y qué tienes en mente.`, hubContactText: 'Cuéntale a Paco algo sobre tu villa, dónde está y qué tienes en mente.',
      zonesEyebrow: 'DÓNDE TRABAJAMOS', zonesTitle: 'Reformas de villas', zonesItalic: 'por zonas.', zonesText: 'Cada zona aporta casas, parcelas y preguntas distintas a la reforma.'
    }
  },
  interiors: {
    en: {
      heading: 'Interior design for villas', hubItalic: 'on the Costa del Sol.',
      lead: 'Rooms that feel connected, considered and personal.', hubLead: 'Rooms that feel connected, considered and personal.',
      describe: place => `Interior design for villas ${place}: rooms, light and materials shaped around everyday life, commissioned on its own or with a renovation or new build.`,
      hubDescription: 'Interior design for villas on the Costa del Sol: rooms, light and materials shaped around everyday life, on its own or with a renovation or new build.',
      enquire: 'Tell us how you want to live', navigation: ['Overview', 'The rooms', 'The process', 'Questions'],
      introEyebrow: 'INTERIORS SHAPED AROUND EVERYDAY LIFE', introTitle: 'Interiors shaped', introItalic: 'around everyday life.',
      introText: 'Paco develops the design around the needs of your commission. Interior design can be commissioned independently or considered alongside a villa renovation or new-build project.',
      hubIntroLead: 'Interior design starts with the way you use your home. The relationship between rooms, natural light and the choice of materials helps define an atmosphere that feels coherent and personal.',
      hubIntroText: 'Paco develops the design around the needs of your commission. Interior design can be commissioned independently or considered alongside a villa renovation or new-build project.',
      transformationEyebrow: 'ROOMS, LIGHT, MATERIALS', transformationTitle: 'Each room', transformationItalic: 'with a purpose.',
      scope: [
        { title: 'The relationship between rooms', text: 'Use, circulation, proportion and privacy: how the rooms work together, and how each one supports the way you live.' },
        { title: 'Light, materials and atmosphere', text: 'Natural light, finishes and colour are studied together, with samples reviewed when the project calls for them.' },
        { title: 'A service in its own right', text: 'Interior design can be commissioned on its own or as part of a renovation or new build. The deliverables are defined for each commission.' }
      ],
      visionEyebrow: 'ARCHITECTURE · INTERIORS · LANDSCAPE', visionTitle: 'Inside and out.', visionItalic: 'One atmosphere.',
      visionText: 'Interiors are part of the whole house. When they are designed with the architecture and the garden in mind, each room feels connected to the rest.',
      processEyebrow: 'DESIGN WITH PERSONAL ATTENTION', processTitle: 'A clear path.', processItalic: 'A personal approach.',
      processText: 'Design conversations, reviews and coordination take place within the agreed scope. The drawings and material studies included are defined at the start of the commission.',
      steps: steps.en({ title: 'Define the rooms', text: 'Agree which spaces are included and what each one needs.' }, { title: 'Develop the design', text: 'Study layout, light, materials and atmosphere, with reviews along the way.' }),
      archiveEyebrow: 'THE STUDIO’S ARCHIVE', archiveTitle: 'Living spaces,', archiveItalic: 'inside and out.',
      archiveText: 'Two views from the studio archive: rooms and terraces where interior and exterior meet.',
      archiveNote: 'Archive images show the studio’s architecture and outdoor living spaces; they are not presented as documented interior design projects.',
      localTitle: place => `Your interiors ${place}.`, hubLocalTitle: 'Your interiors on the Costa del Sol.', localItalic: 'Wherever you are.',
      faqs: [
        ['Can I commission interior design on its own?', 'Yes. Interior design can be commissioned independently, without a renovation or new-build project.'],
        ['Can it form part of a villa renovation?', 'Yes. When it is part of a renovation, the interiors are developed together with the layout and the architecture from the start.'],
        ['How do we define the rooms and scope?', 'The first conversations establish which spaces are included and what each one needs. The scope and deliverables are then agreed for the commission.'],
        ['How can we review the design if I live abroad?', 'Video calls and visits make it possible to review the design from abroad. The format and frequency of reviews are agreed for each project.']
      ],
      contactEyebrow: 'LET’S START WITH YOUR IDEA', contactTitle: 'Tell us how', contactItalic: 'you want to live.',
      contactText: place => `Tell Paco about your home ${place}, the rooms you have in mind and how you use them.`, hubContactText: 'Tell Paco about your home, the rooms you have in mind and how you use them.',
      zonesEyebrow: 'WHERE WE WORK', zonesTitle: 'Interior design', zonesItalic: 'by area.', zonesText: 'Each setting brings its own light, views and way of living to the interiors.'
    },
    es: {
      heading: 'Interiorismo para villas', hubItalic: 'en la Costa del Sol.',
      lead: 'Estancias conectadas, cuidadas y personales.', hubLead: 'Estancias conectadas, cuidadas y personales.',
      describe: place => `Interiorismo para villas ${place}: estancias, luz y materiales pensados para el día a día, de forma independiente o junto a una reforma u obra nueva.`,
      hubDescription: 'Interiorismo para villas en la Costa del Sol: estancias, luz y materiales pensados para el día a día, de forma independiente o junto a una reforma u obra nueva.',
      enquire: 'Cuéntanos cómo quieres vivir', navigation: ['El enfoque', 'Las estancias', 'El proceso', 'Preguntas'],
      introEyebrow: 'INTERIORES PENSADOS PARA EL DÍA A DÍA', introTitle: 'Interiores pensados', introItalic: 'para el día a día.',
      introText: 'Paco desarrolla el diseño según las necesidades del encargo. El interiorismo puede contratarse de forma independiente o plantearse junto con una reforma de villa o un proyecto de nueva construcción.',
      hubIntroLead: 'El interiorismo empieza por la forma de utilizar tu casa. La relación entre las estancias, la luz natural y la elección de materiales ayudan a definir una atmósfera coherente y personal.',
      hubIntroText: 'Paco desarrolla el diseño según las necesidades del encargo. El interiorismo puede contratarse de forma independiente o plantearse junto con una reforma de villa o un proyecto de nueva construcción.',
      transformationEyebrow: 'ESTANCIAS, LUZ, MATERIALES', transformationTitle: 'Dar sentido', transformationItalic: 'a cada estancia.',
      scope: [
        { title: 'La relación entre estancias', text: 'Uso, recorridos, proporción y privacidad: cómo funcionan las estancias en conjunto y cómo cada una acompaña tu forma de vivir.' },
        { title: 'Luz, materiales y atmósfera', text: 'La luz natural, los acabados y el color se estudian juntos, revisando muestras cuando el proyecto lo requiere.' },
        { title: 'Un servicio con entidad propia', text: 'El interiorismo puede contratarse solo o como parte de una reforma u obra nueva. Los entregables se definen en cada encargo.' }
      ],
      visionEyebrow: 'ARQUITECTURA · INTERIORES · PAISAJE', visionTitle: 'Dentro y fuera.', visionItalic: 'Una misma atmósfera.',
      visionText: 'Los interiores forman parte de toda la casa. Cuando se diseñan pensando en la arquitectura y en el jardín, cada estancia se siente conectada con el resto.',
      processEyebrow: 'DISEÑO CON TRATO DIRECTO', processTitle: 'Un camino claro.', processItalic: 'Un trato cercano.',
      processText: 'Las conversaciones de diseño, las revisiones y la coordinación se desarrollan dentro del alcance acordado. Los planos y estudios de materiales incluidos se definen al inicio del encargo.',
      steps: steps.es({ title: 'Definir las estancias', text: 'Acordar qué espacios se incluyen y qué necesita cada uno.' }, { title: 'Desarrollar el diseño', text: 'Estudiar distribución, luz, materiales y atmósfera, con revisiones durante el proceso.' }),
      archiveEyebrow: 'EL ARCHIVO DEL ESTUDIO', archiveTitle: 'Espacios para vivir,', archiveItalic: 'dentro y fuera.',
      archiveText: 'Dos miradas del archivo del estudio: estancias y terrazas donde se encuentran interior y exterior.',
      archiveNote: 'Las imágenes del archivo muestran la arquitectura y los espacios exteriores del estudio; no se presentan como proyectos de interiorismo documentados.',
      localTitle: place => `Tus interiores ${place}.`, hubLocalTitle: 'Tus interiores en la Costa del Sol.', localItalic: 'Estés donde estés.',
      faqs: [
        ['¿Puedo contratar solo interiorismo?', 'Sí. El interiorismo puede contratarse de forma independiente, sin una reforma ni un proyecto de nueva construcción.'],
        ['¿Puede integrarse en una reforma de villa?', 'Sí. Cuando forma parte de una reforma, los interiores se desarrollan junto con la distribución y la arquitectura desde el principio.'],
        ['¿Cómo definimos las estancias y el alcance?', 'Las primeras conversaciones establecen qué espacios se incluyen y qué necesita cada uno. Después se acuerdan el alcance y los entregables del encargo.'],
        ['¿Cómo revisamos el diseño si vivo fuera?', 'Las videollamadas y las visitas permiten revisar el diseño desde fuera. El formato y la frecuencia de las revisiones se acuerdan en cada proyecto.']
      ],
      contactEyebrow: 'EMPECEMOS POR TU IDEA', contactTitle: 'Cuéntanos cómo', contactItalic: 'quieres vivir.',
      contactText: place => `Cuéntale a Paco cómo es tu casa ${place}, qué estancias tienes en mente y cómo las utilizas.`, hubContactText: 'Cuéntale a Paco cómo es tu casa, qué estancias tienes en mente y cómo las utilizas.',
      zonesEyebrow: 'DÓNDE TRABAJAMOS', zonesTitle: 'Interiorismo', zonesItalic: 'por zonas.', zonesText: 'Cada entorno aporta su propia luz, sus vistas y su forma de vivir a los interiores.'
    }
  },
  landscape: {
    en: {
      heading: 'Landscape design for villas', hubItalic: 'on the Costa del Sol.',
      lead: 'Gardens, terraces and outdoor spaces connected to your home.', hubLead: 'Gardens, terraces and outdoor spaces connected to your home.',
      describe: place => `Landscape design for villas ${place}: gardens, terraces and outdoor spaces designed with the house, on their own or with architecture and interiors.`,
      hubDescription: 'Landscape design for villas on the Costa del Sol: gardens, terraces and outdoor spaces designed with the house, on their own or with architecture and interiors.',
      enquire: 'Let’s imagine your outdoor spaces', navigation: ['Overview', 'The garden', 'The process', 'Questions'],
      introEyebrow: 'LIVING BEYOND THE INTERIOR', introTitle: 'Living beyond', introItalic: 'the interior.',
      introText: 'Landscape design can be commissioned separately or developed alongside architecture and interiors. Planting, shade and water needs are studied according to the setting and the requirements of the project.',
      hubIntroLead: 'The exterior is part of the experience of a villa. Places to rest, gather and move through the garden can be considered together with the architecture, creating a relationship between the home and its surroundings.',
      hubIntroText: 'Landscape design can be commissioned separately or developed alongside architecture and interiors. Planting, shade and water needs are studied according to the setting and the requirements of the project.',
      transformationEyebrow: 'TERRACES, PATHS, PLANTING', transformationTitle: 'A garden', transformationItalic: 'in its setting.',
      scope: [
        { title: 'Spaces to spend time outdoors', text: 'Terraces, places to sit and eat, and the paths between them are organised around the way you use the exterior.' },
        { title: 'Planting, shade and water', text: 'Planting, shade and water needs are studied for each project and its conditions, rather than applied from a standard list.' },
        { title: 'Connected to the architecture', text: 'The garden can be designed on its own or together with the house and its interiors, with coordination agreed for the commission.' }
      ],
      visionEyebrow: 'ARCHITECTURE · INTERIORS · LANDSCAPE', visionTitle: 'House and garden.', visionItalic: 'One composition.',
      visionText: 'Outdoor spaces work best when they are drawn with the house: thresholds, views and shade considered as part of the same design.',
      processEyebrow: 'FROM THE IDEA TO THE GARDEN', processTitle: 'A clear path.', processItalic: 'A personal approach.',
      processText: 'The scope of the landscape commission, the drawings included and the coordination with other trades are agreed at the start of the project.',
      steps: steps.en({ title: 'Read the setting', text: 'Study orientation, privacy, existing planting and the conditions of the site.' }, { title: 'Develop the design', text: 'Define terraces, paths, planting and shade in relation to the house.' }),
      archiveEyebrow: 'THE STUDIO’S ARCHIVE', archiveTitle: 'Outdoor living', archiveItalic: 'from the archive.',
      archiveText: 'Two views from the studio archive: terraces, water and planting around the house.',
      archiveNote: 'Archive images illustrate the studio’s work and outdoor spaces; they are not presented as documented landscape projects in this area.',
      localTitle: place => `Your garden ${place}.`, hubLocalTitle: 'Your garden on the Costa del Sol.', localItalic: 'Wherever you are.',
      faqs: [
        ['Can landscape design be commissioned independently?', 'Yes. Landscape design can be commissioned on its own or as part of a project that includes the architecture and interiors.'],
        ['Can we rethink an existing garden?', 'Yes. The existing garden, its planting and the way it is used are reviewed to decide what to keep and what to redesign.'],
        ['How are planting and water needs considered?', 'They are studied for each project according to the setting, orientation and the use of the garden. No species or consumption figures are assumed in advance.'],
        abroad.en
      ],
      contactEyebrow: 'LET’S START WITH YOUR IDEA', contactTitle: 'Let’s imagine', contactItalic: 'your outdoor spaces.',
      contactText: place => `Tell Paco about your garden ${place} and how you would like to use it.`, hubContactText: 'Tell Paco about your garden and how you would like to use it.',
      zonesEyebrow: 'WHERE WE WORK', zonesTitle: 'Landscape design', zonesItalic: 'by area.', zonesText: 'Each setting brings its own terrain, exposure and outdoor life to the garden.'
    },
    es: {
      heading: 'Paisajismo para villas', hubItalic: 'en la Costa del Sol.',
      lead: 'Jardines, terrazas y espacios exteriores conectados con tu casa.', hubLead: 'Jardines, terrazas y espacios exteriores conectados con tu casa.',
      describe: place => `Paisajismo para villas ${place}: jardines, terrazas y espacios exteriores diseñados con la casa, de forma independiente o con arquitectura e interiorismo.`,
      hubDescription: 'Paisajismo para villas en la Costa del Sol: jardines, terrazas y espacios exteriores diseñados con la casa, de forma independiente o con arquitectura e interiorismo.',
      enquire: 'Imaginemos tus espacios exteriores', navigation: ['El enfoque', 'El jardín', 'El proceso', 'Preguntas'],
      introEyebrow: 'HABITAR TAMBIÉN EL EXTERIOR', introTitle: 'Habitar también', introItalic: 'el exterior.',
      introText: 'El paisajismo puede contratarse por separado o desarrollarse junto con arquitectura e interiorismo. La vegetación, la sombra y las necesidades de agua se estudian según el lugar y las condiciones del proyecto.',
      hubIntroLead: 'El exterior forma parte de la experiencia de una villa. Los lugares para descansar, reunirse y recorrer el jardín pueden pensarse junto con la arquitectura, creando una relación entre la vivienda y su entorno.',
      hubIntroText: 'El paisajismo puede contratarse por separado o desarrollarse junto con arquitectura e interiorismo. La vegetación, la sombra y las necesidades de agua se estudian según el lugar y las condiciones del proyecto.',
      transformationEyebrow: 'TERRAZAS, RECORRIDOS, VEGETACIÓN', transformationTitle: 'Un jardín', transformationItalic: 'en su entorno.',
      scope: [
        { title: 'Espacios para disfrutar del exterior', text: 'Las terrazas, los lugares para sentarse y comer, y los recorridos entre ellos se organizan según cómo utilizas el exterior.' },
        { title: 'Vegetación, sombra y agua', text: 'La vegetación, la sombra y las necesidades de agua se estudian para cada proyecto y sus condiciones, no a partir de una lista estándar.' },
        { title: 'Conectado con la arquitectura', text: 'El jardín puede diseñarse de forma autónoma o junto con la casa y sus interiores, con la coordinación acordada en el encargo.' }
      ],
      visionEyebrow: 'ARQUITECTURA · INTERIORES · PAISAJE', visionTitle: 'Casa y jardín.', visionItalic: 'Una sola composición.',
      visionText: 'Los espacios exteriores funcionan mejor cuando se dibujan con la casa: los umbrales, las vistas y la sombra forman parte del mismo diseño.',
      processEyebrow: 'DE LA IDEA AL JARDÍN', processTitle: 'Un camino claro.', processItalic: 'Un trato cercano.',
      processText: 'El alcance del encargo de paisajismo, los planos incluidos y la coordinación con otros oficios se acuerdan al inicio del proyecto.',
      steps: steps.es({ title: 'Leer el lugar', text: 'Estudiar la orientación, la privacidad, la vegetación existente y las condiciones del terreno.' }, { title: 'Desarrollar el diseño', text: 'Definir terrazas, recorridos, vegetación y sombra en relación con la casa.' }),
      archiveEyebrow: 'EL ARCHIVO DEL ESTUDIO', archiveTitle: 'Vida exterior', archiveItalic: 'del archivo.',
      archiveText: 'Dos miradas del archivo del estudio: terrazas, agua y vegetación en torno a la casa.',
      archiveNote: 'Las imágenes del archivo ilustran el trabajo del estudio y sus espacios exteriores; no se presentan como proyectos de paisajismo documentados en esta zona.',
      localTitle: place => `Tu jardín ${place}.`, hubLocalTitle: 'Tu jardín en la Costa del Sol.', localItalic: 'Estés donde estés.',
      faqs: [
        ['¿Se puede contratar paisajismo de forma independiente?', 'Sí. El paisajismo puede contratarse por separado o como parte de un proyecto que incluya la arquitectura y los interiores.'],
        ['¿Podemos repensar un jardín existente?', 'Sí. Se revisan el jardín existente, su vegetación y la forma en que se usa para decidir qué conservar y qué rediseñar.'],
        ['¿Cómo se estudian la vegetación y el agua?', 'Se estudian en cada proyecto según el lugar, la orientación y el uso del jardín. No se presuponen especies ni consumos de antemano.'],
        abroad.es
      ],
      contactEyebrow: 'EMPECEMOS POR TU IDEA', contactTitle: 'Imaginemos', contactItalic: 'tus espacios exteriores.',
      contactText: place => `Cuéntale a Paco cómo es tu jardín ${place} y cómo te gustaría utilizarlo.`, hubContactText: 'Cuéntale a Paco cómo es tu jardín y cómo te gustaría utilizarlo.',
      zonesEyebrow: 'DÓNDE TRABAJAMOS', zonesTitle: 'Paisajismo', zonesItalic: 'por zonas.', zonesText: 'Cada entorno aporta su propio terreno, su exposición y su vida exterior al jardín.'
    }
  }
}

// Copy shared by every service page in one language.
export const commonCopy = {
  en: {
    discover: 'Discover the approach', home: 'Home', localEyebrow: 'LOCAL EXPERIENCE · INTERNATIONAL CLIENTS',
    remoteText: 'If you live abroad, video calls, visits and site follow-up help you stay involved. Communication is available in English and Spanish, with arrangements agreed for your project.',
    hubLocalText: 'Paco works from Marbella across the Costa del Sol, including Benahavís, Estepona and the residential areas of Marbella. The setting, orientation and surroundings of each property are part of the design conversation.',
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
    hubLocalText: 'Paco trabaja desde Marbella en toda la Costa del Sol, incluidos Benahavís, Estepona y las zonas residenciales de Marbella. El emplazamiento, la orientación y el entorno de cada propiedad forman parte de la conversación de diseño.',
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

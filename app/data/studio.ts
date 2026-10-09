// Studio page copy (/studio · /es/estudio). Facts: confirmed services and history (CLAUDE.md §5, §9.6).
// Team and collaborators as supplied on 9 Oct 2026. No awards or figures. Pending Francisco Martínez Galván's review before publishing.
import type { Locale } from './pages/types'

export const studioPaths: Record<Locale, string> = { en: '/studio', es: '/es/estudio' }

// Names are the same in both languages; only the roles are translated.
const people = {
    principal: ['Francisco Martínez Galván'],
    architects: ['José Manuel Blanco González', 'Eva María Cruz Muñoz', 'Carmen Fernández Muñoz', 'María Chahed El Ouazzani'],
    technical: ['Joaquín García Amado'],
    admin: ['Elena Moreno Gómez'],
    visualisation: ['Viseni Design'],
    engineering: ['Abdalajis', 'Tecnoclima', 'Proinsermant'],
    lighting: ['Hidalgo Monci']
}

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
        methodPhotoAlt: 'Francisco Martínez Galván on site, going over notes with the trades at a worktable',
        teamEyebrow: 'The team', teamTitle: 'The people', teamItalic: 'behind every project.',
        teamText: 'Francisco Martínez Galván leads every commission personally, with a team of architects, a technical architect and administration at the studio in Marbella.',
        team: [['Principal architect', people.principal], ['Architects', people.architects], ['Technical architect', people.technical], ['Administration', people.admin]],
        partnersEyebrow: 'Collaborators', partnersTitle: 'Trusted specialists,', partnersItalic: 'discipline by discipline.',
        partnersText: 'Specialist firms that work with the studio on engineering, lighting and 3D visualisation, as each commission requires.',
        partners: [['Engineering', people.engineering], ['Lighting design', people.lighting], ['3D visualisation', people.visualisation]],
        modelsEyebrow: 'Physical models', modelsTitle: 'We care for every detail,', modelsItalic: 'before it is built.',
        modelsText: 'The studio makes physical models of its projects. At scale, a house can be read at a glance: how it sits on the plot, how its volumes step and how it meets the street and the garden. They accompany the drawings and visualisations, so every decision is made with confidence.',
        modelLabel: 'Model', modelView: 'View project', modelShow: (i: number, n: number) => `Show view ${i} of ${n}`,
        // Per project id (scripts/media/models.json): a short reading of the model and one alt per photograph, in the same order as its files.
        models: {
            'altos-de-los-monteros': { note: 'Three villas stepping down the hillside, wrapped by the road.', alts: [
                'Altos de los Monteros model: a villa’s pool and terraces above the planted hillside, with the curving road below',
                'Overall view of the model: three villas on the hillside, wrapped by the curving road',
                'Front of one of the villas: horizontal terraces and the pool above the street wall',
                'Side view: the three villas stepping with the slope',
                'The villas seen from the road, among the hillside planting',
                'View from above: the road curving around the plots, the pools and the roofs'] },
            'la-montua': { note: 'Pitched roofs, a pergola and cantilevered terraces over the slope.', alts: [
                'La Montua model: the villa on the hillside, with pitched roofs, terraces and the pool',
                'Timber-toned pergola over the terrace and the pool, between stone panels',
                'Overhead view: the two gabled roofs, the pool and the access from the street',
                'Side view: cantilevered terraces over the garden and the hillside planting',
                'The pool and its cantilevered terrace beside the stone façade',
                'Arrival: the turning circle, the entrance walls and the roofs behind'] },
            'villa-pareja': { note: 'Tender proposal: low pavilions arranged around the garden.', alts: [
                'Villa Pareja model: low pavilions around the garden and the pool, among palm trees',
                'The central garden: the pool between the lawn and the pavilions',
                'Entrance façade: the portico between white volumes',
                'Rear façade: low volumes and flat roofs behind the boundary wall',
                'Pool, sun terrace and pergola in the garden',
                'Overhead view: the L-shaped plan wrapping the garden and the pool'] },
            'la-resina': { note: 'The Resina 6ix: villas on elevated plots, open to the landscape.', alts: [
                'La Resina model: the villas on stepped plots, with their pools and the hillside planting',
                'Two villas behind palm trees, with pools on their terraces',
                'A villa above its retaining wall, with an infinity pool',
                'Stacked terraces and the pool of one of the villas',
                'Infinity pool and cantilevered terraces over the hillside',
                'Access to the development: the roundabout and the first villas'] }
        },
        // The studio itself (photographs supplied on 9 Oct 2026).
        placeEyebrow: 'The studio', placeTitle: 'Where every project', placeItalic: 'begins.',
        placeText: 'In the centre of Marbella, the studio brings together the team, the drawings and the models of every project. It is also where we welcome clients to review the proposals.',
        facadeAlt: 'The studio’s street front in Marbella at dusk: lit window, timber-slatted door and the Martínez Galván Arquitecto sign',
        officeAlt: 'Inside the studio in Marbella: a worktable with a model in a glass case, timber panelling and shelves of project files',
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
        methodPhotoAlt: 'Francisco Martínez Galván en obra, revisando anotaciones con los oficios sobre una mesa de trabajo',
        teamEyebrow: 'El equipo', teamTitle: 'Las personas', teamItalic: 'detrás de cada proyecto.',
        teamText: 'Francisco Martínez Galván dirige personalmente cada encargo, de la mano de un equipo de arquitectos, aparejadores, técnicos y profesionales independientes en el estudio de Marbella.',
        team: [['Arquitecto director', people.principal], ['Arquitectos', people.architects], ['Arquitecto técnico', people.technical], ['Administración', people.admin]],
        partnersEyebrow: 'Colaboradores', partnersTitle: 'Especialistas de confianza,', partnersItalic: 'disciplina a disciplina.',
        partnersText: 'Empresas especializadas que colaboran con el estudio en ingenierías, iluminación e imágenes 3D, según lo que necesite cada encargo.',
        partners: [['Ingenierías', people.engineering], ['Iluminación', people.lighting], ['Imágenes 3D', people.visualisation]],
        modelsEyebrow: 'Maquetas físicas', modelsTitle: 'Cuidamos cada detalle,', modelsItalic: 'antes de construirlo.',
        modelsText: 'El estudio realiza maquetas físicas de sus proyectos. A escala, la casa se entiende de un vistazo: cómo se asienta en la parcela, cómo se escalonan sus volúmenes y cómo se relaciona con la calle y el jardín. Acompañan a los planos y las visualizaciones para decidir con seguridad.',
        modelLabel: 'Maqueta', modelView: 'Ver proyecto', modelShow: (i: number, n: number) => `Ver vista ${i} de ${n}`,
        models: {
            'altos-de-los-monteros': { note: 'Tres villas escalonadas en la ladera, rodeadas por la calle.', alts: [
                'Maqueta de Altos de los Monteros: piscina y terrazas de una villa sobre la ladera ajardinada, con la calle curva al pie',
                'Vista general de la maqueta: tres villas en la ladera, rodeadas por la calle en curva',
                'Frente de una de las villas: terrazas horizontales y piscina sobre el muro de la calle',
                'Vista lateral: las tres villas escalonadas siguiendo la pendiente',
                'Las villas desde la calle, entre la vegetación de la ladera',
                'Vista superior: la calle en curva alrededor de las parcelas, las piscinas y las cubiertas'] },
            'la-montua': { note: 'Cubiertas inclinadas, pérgola y terrazas voladas sobre la pendiente.', alts: [
                'Maqueta de La Montua: la villa en la ladera, con cubiertas inclinadas, terrazas y piscina',
                'Pérgola de tono madera sobre la terraza y la piscina, entre paños de piedra',
                'Vista cenital: las dos cubiertas a dos aguas, la piscina y el acceso desde la calle',
                'Vista lateral: terrazas voladas sobre el jardín y la vegetación de la ladera',
                'La piscina y su terraza volada junto a la fachada de piedra',
                'Llegada a la casa: la glorieta, los muros de acceso y las cubiertas detrás'] },
            'villa-pareja': { note: 'Propuesta de licitación: pabellones bajos en torno al jardín.', alts: [
                'Maqueta de Villa Pareja: pabellones bajos alrededor del jardín y la piscina, entre palmeras',
                'El jardín central: la piscina entre el césped y los pabellones',
                'Fachada de acceso: el pórtico entre volúmenes blancos',
                'Fachada trasera: volúmenes bajos y cubiertas planas tras el muro de la parcela',
                'Piscina, solárium y pérgola en el jardín',
                'Vista cenital: la planta en L que abraza el jardín y la piscina'] },
            'la-resina': { note: 'The Resina 6ix: villas sobre parcelas elevadas, abiertas al paisaje.', alts: [
                'Maqueta de La Resina: las villas sobre parcelas escalonadas, con sus piscinas y la vegetación de la ladera',
                'Dos villas tras las palmeras, con piscinas en sus terrazas',
                'Una villa sobre su muro de contención, con piscina desbordante',
                'Terrazas superpuestas y piscina de una de las villas',
                'Piscina desbordante y terrazas voladas sobre la ladera',
                'Acceso al conjunto: la glorieta y las primeras villas'] }
        },
        placeEyebrow: 'El estudio', placeTitle: 'Donde empieza', placeItalic: 'cada proyecto.',
        placeText: 'En el centro de Marbella, el estudio reúne al equipo, los planos y las maquetas de cada proyecto. Es también donde recibimos a los clientes para revisar las propuestas.',
        facadeAlt: 'Fachada del estudio en Marbella al anochecer: escaparate iluminado, puerta de lamas de madera y el rótulo Martínez Galván Arquitecto',
        officeAlt: 'Interior del estudio en Marbella: mesa de trabajo con una maqueta en vitrina, paneles de madera y estanterías con archivos de proyectos',
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

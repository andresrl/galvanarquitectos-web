// Project copy. ES is the text of each Graphics/VISENI/proyectos/<folder>/proyecto.md (internal notes are never copied here);
// EN is a natural translation in the same register. Editorial readings to be validated by Paco (see `pending` in projects.ts).
import type { Locale } from '../pages/types'
import type { ProjectCopy } from './types'

type Entry = { name: string; nameEn?: string } & Record<Locale, ProjectCopy>

export const projectCopy: Record<string, Entry> = {
  'villa-paris': {
    name: 'Villa París',
    es: {
      heading: 'La claridad de una casa mediterránea',
      lead: 'Un proyecto de diseño contemporáneo. Una villa recreada en un emplazamiento privilegiado: una urbanización cerrada en primera línea de Las Brisas, uno de los campos de golf más prestigiosos de Marbella.',
      body: [
        'Villa París reúne distintas escalas bajo una misma idea de equilibrio. Las cubiertas inclinadas dibujan una silueta doméstica, mientras los porches y las pérgolas prolongan la casa hacia el jardín. El blanco ordena el conjunto y permite que la vegetación y los reflejos del agua aporten color y profundidad.',
        'La piscina establece una línea clara entre las terrazas y el césped. A su alrededor, los recorridos alternan superficies pavimentadas y verdes, enlazando las distintas piezas de la vivienda. La arquitectura se descubre así desde el movimiento y desde la pausa: una sombra junto a la fachada, una mesa al aire libre, una perspectiva entre árboles.',
        'Al caer la tarde, la iluminación cálida subraya los huecos y los espacios cubiertos. La casa conserva su carácter mediterráneo y adquiere una presencia íntima, cercana a la vida que sucede en torno a ella.'],
      heroAlt: 'Villa París al anochecer: porches iluminados, piscina y jardín frente a la fachada blanca'
    },
    en: {
      heading: 'The clarity of a Mediterranean home',
      lead: 'A project infused with contemporary design. A villa recreated in a prime location: a gated community frontline to Las Brisas, one of Marbella’s most prestigious golf courses.',
      body: [
        'Villa París brings different scales together under one idea of balance. The pitched roofs draw a domestic silhouette, while porches and pergolas extend the house into the garden. White gives order to the whole and lets the planting and the reflections of the water bring colour and depth.',
        'The pool draws a clear line between the terraces and the lawn. Around it, paths alternate between paving and green, linking the different parts of the house. The architecture reveals itself both in movement and at rest: a patch of shade by the façade, a table outdoors, a view between the trees.',
        'As evening falls, warm lighting picks out the openings and the covered spaces. The house keeps its Mediterranean character and takes on an intimate presence, close to the life that happens around it.'],
      heroAlt: 'Villa París at dusk: lit porches, pool and garden in front of the white façade'
    }
  },

  'la-resina': {
    name: 'La Resina',
    es: {
      heading: 'Horizontales abiertas al paisaje',
      lead: 'The Resina 6ix, un conjunto residencial en La Resina Golf, en la Nueva Milla de Oro. Seis villas contemporáneas, cada una sobre una parcela elevada para aprovechar al máximo las vistas al Mediterráneo y la privacidad de quienes las habitan.',
      body: [
        'En La Resina, las líneas horizontales dan unidad a la composición. Los planos de cubierta y los frentes de las terrazas se proyectan sobre los huecos acristalados, dibujando una fachada que combina apertura y sombra. Su geometría es precisa, pero la vegetación y los tonos cálidos de los espacios cubiertos introducen una escala acogedora.',
        'La terraza junto a la piscina prolonga visualmente la vivienda. Pavimento, agua y fachada forman una secuencia continua, con lugares para sentarse, reunirse y contemplar el entorno. Las barandillas transparentes mantienen la ligereza de los bordes y permiten que el paisaje acompañe la lectura del edificio.',
        'La luz cambia su expresión a lo largo del día. Bajo el sol, los volúmenes blancos muestran sus retranqueos y salientes; al anochecer, el resplandor de los interiores hace visibles las zonas de encuentro. Una arquitectura contemporánea cuya fuerza reside en la proporción y en el cuidado de sus transiciones.'],
      heroAlt: 'La Resina al atardecer: planos blancos superpuestos sobre la terraza y la piscina'
    },
    en: {
      heading: 'Horizontals open to the landscape',
      lead: 'The Resina 6ix, a development in La Resina Golf on the New Golden Mile. Six contemporary villas, each set on an elevated plot to make the most of the views over the Mediterranean and the privacy of their residents.',
      body: [
        'At La Resina, horizontal lines give the composition its unity. Roof planes and terrace edges project over the glazing, drawing a façade that combines openness and shade. The geometry is precise, yet the planting and the warm tones of the covered spaces bring a welcoming scale.',
        'The terrace beside the pool extends the house visually. Paving, water and façade form a continuous sequence, with places to sit, gather and take in the surroundings. Glass balustrades keep the edges light and let the landscape accompany the reading of the building.',
        'The light changes its expression through the day. In the sun, the white volumes show their setbacks and projections; at dusk, the glow of the interiors reveals the places where people meet. Contemporary architecture whose strength lies in proportion and in the care given to its transitions.'],
      heroAlt: 'La Resina at sunset: layered white planes over the terrace and pool'
    }
  },

  'villa-alcala': {
    name: 'Villa Alcalá',
    es: {
      heading: 'Una composición de planos y niveles',
      lead: 'Volúmenes horizontales y terrazas escalonadas dan forma a una propuesta donde la arquitectura, el agua y el jardín se leen como una misma composición.',
      body: [
        'Villa Alcalá se articula mediante planos que avanzan y retroceden, creando distintos grados de apertura. Los cuerpos superiores enmarcan las terrazas, mientras los grandes huecos acristalados establecen una continuidad visual con el exterior. Los tonos claros se combinan con superficies de apariencia pétrea y acentos cálidos para dar profundidad a las fachadas.',
        'El jardín se plantea como una sucesión de niveles conectados por escaleras amplias. La piscina, las plataformas de descanso y los ámbitos de reunión al aire libre forman parte de ese orden. Cada cambio de cota introduce una perspectiva distinta y permite leer el conjunto desde posiciones más recogidas o más abiertas.',
        'La iluminación lineal acompaña los bordes de cubierta y destaca la horizontalidad del diseño. Al atardecer, el contraste entre esos trazos y la textura de los muros refuerza una propuesta de presencia firme, con una escala cercana en sus espacios de estancia.'],
      heroAlt: 'Villa Alcalá al atardecer: terrazas escalonadas, zona de estar exterior y piscina'
    },
    en: {
      heading: 'A composition of planes and levels',
      lead: 'Horizontal volumes and stepped terraces shape a proposal in which architecture, water and garden read as a single composition.',
      body: [
        'Villa Alcalá is articulated through planes that advance and recede, creating different degrees of openness. The upper volumes frame the terraces, while large areas of glazing establish visual continuity with the outdoors. Light tones are combined with stone-like surfaces and warm accents to give the façades depth.',
        'The garden is conceived as a succession of levels linked by generous steps. The pool, the sun platforms and the outdoor gathering places are all part of that order. Each change of level opens a different view and lets the whole be read from more sheltered or more open positions.',
        'Linear lighting follows the roof edges and emphasises the horizontality of the design. At dusk, the contrast between those lines and the texture of the walls reinforces a proposal with a firm presence and an intimate scale in its living spaces.'],
      heroAlt: 'Villa Alcalá at dusk: stepped terraces, outdoor lounge and pool'
    }
  },

  'villa-pino': {
    name: 'Villa Pino',
    es: {
      heading: 'Arquitectura entre árboles y sombras',
      lead: 'Una villa de lenguaje mediterráneo donde las cubiertas inclinadas, las pérgolas y la vegetación construyen una relación pausada con el jardín.',
      body: [
        'Villa Pino encuentra su carácter en el diálogo entre la casa y los árboles. Los volúmenes claros se combinan con cubiertas de teja y huecos de trazo regular, mientras las pérgolas añaden profundidad a los frentes abiertos al exterior. La arquitectura presenta una escala doméstica reconocible y una composición de líneas limpias.',
        'El jardín acompaña esa lectura. Los caminos, las masas vegetales y la lámina de agua alternan ámbitos abiertos con otros más recogidos. Frente a la vivienda, la piscina refleja las fachadas y el arbolado; junto a ella, las terrazas ofrecen una transición amplia entre los espacios cubiertos y el verde.',
        'Los tonos cálidos de los cerramientos y los pavimentos claros matizan la luminosidad del conjunto. El resultado es una imagen de serenidad con carácter, en la que las sombras de las pérgolas y la presencia de la vegetación tienen tanto peso como la propia forma de la casa.'],
      heroAlt: 'Villa Pino entre pinos, con la piscina y el jardín frente a la fachada'
    },
    en: {
      heading: 'Architecture among trees and shade',
      lead: 'A villa in a Mediterranean idiom where pitched roofs, pergolas and planting build an unhurried relationship with the garden.',
      body: [
        'Villa Pino finds its character in the dialogue between the house and the trees. Light volumes are combined with tiled roofs and regular openings, while pergolas add depth to the elevations facing outdoors. The architecture has a recognisable domestic scale and a composition of clean lines.',
        'The garden follows the same reading. Paths, planting and a sheet of water alternate open areas with more sheltered ones. In front of the house, the pool reflects the façades and the trees; beside it, the terraces offer a generous transition between the covered spaces and the green.',
        'The warm tones of the joinery and the light paving soften the brightness of the whole. The result is an image of serenity with character, in which the shadows of the pergolas and the presence of the planting carry as much weight as the form of the house itself.'],
      heroAlt: 'Villa Pino among pine trees, with the pool and garden in front of the façade'
    }
  },

  atalaya: {
    name: 'Atalaya',
    es: {
      heading: 'Una nueva expresión para la villa existente',
      lead: 'La renovación integral de una villa antigua plantea una imagen contemporánea, marcada por volúmenes blancos, sombras profundas y texturas que acercan la arquitectura al jardín.',
      body: [
        'Atalaya aborda la transformación de una vivienda existente desde una composición clara. La propuesta combina cuerpos blancos de geometría nítida con paños de apariencia pétrea y pérgolas de ritmo regular. Estos contrastes aportan relieve a la fachada y definen una nueva relación entre los espacios cubiertos y el exterior.',
        'La apertura visual hacia el jardín es uno de los rasgos principales del diseño. Los huecos acristalados y las terrazas conectan la imagen de la casa con el césped y la piscina. Las pérgolas introducen una sombra más ligera, mientras los volúmenes superiores dibujan zonas de estancia de mayor profundidad.',
        'La renovación se expresa en una arquitectura luminosa y de materiales visualmente cálidos. Su identidad nace del equilibrio entre superficies continuas y texturas, entre la contundencia del volumen y la escala de los lugares para descansar. Una manera de dar una nueva lectura a la villa desde su relación con la vida al aire libre.'],
      heroAlt: 'Atalaya: volúmenes blancos, pérgolas y piscina en la villa renovada'
    },
    en: {
      heading: 'A new expression for an existing villa',
      lead: 'The complete renovation of an older villa proposes a contemporary image, defined by white volumes, deep shadows and textures that bring the architecture closer to the garden.',
      body: [
        'Atalaya approaches the transformation of an existing house through a clear composition. The proposal combines crisp white volumes with stone-like panels and evenly spaced pergolas. These contrasts give the façade relief and define a new relationship between the covered spaces and the outdoors.',
        'Opening the house visually to the garden is one of the main features of the design. Glazing and terraces connect the image of the house with the lawn and the pool. The pergolas bring a lighter shade, while the upper volumes create deeper places to sit and stay.',
        'The renovation is expressed in luminous architecture with visually warm materials. Its identity comes from the balance between continuous surfaces and texture, between the strength of the volume and the scale of the places to rest. A way of giving the villa a new reading through its relationship with outdoor life.'],
      heroAlt: 'Atalaya: white volumes, pergolas and pool in the renovated villa'
    }
  },

  'villa-pareja': {
    name: 'Villa Pareja',
    es: {
      heading: 'El jardín como centro de la propuesta',
      lead: 'Una propuesta residencial de marcada horizontalidad que organiza su imagen alrededor del agua, las terrazas y una amplia relación visual con el jardín.',
      body: [
        'Villa Pareja plantea una arquitectura extendida, de cubiertas ligeras en su expresión y frentes ampliamente acristalados. Los volúmenes delimitan un ámbito exterior en el que la piscina actúa como eje de la composición. Desde los espacios cubiertos, la mirada atraviesa el jardín y encuentra una secuencia ordenada de agua, césped y vegetación.',
        'Las pérgolas y los vuelos de cubierta articulan la transición entre la casa y las terrazas. Sus sombras dan ritmo a las superficies claras y permiten diferenciar zonas de reunión sin perder la unidad del conjunto. Los acentos cálidos de las fachadas aportan cercanía a una geometría abierta y precisa.',
        'El trabajo se desarrolló para una fase inicial de licitación e incluyó diseño arquitectónico, maquetas físicas y presentaciones. Esa exploración permitió comunicar una idea residencial completa: una casa cuya identidad se entiende desde la relación entre sus piezas y el espacio exterior que comparten.'],
      heroAlt: 'Villa Pareja al anochecer: pabellones bajos iluminados alrededor del jardín y la piscina'
    },
    en: {
      heading: 'The garden at the heart of the proposal',
      lead: 'A strongly horizontal residential proposal that organises its image around the water, the terraces and a broad visual relationship with the garden.',
      body: [
        'Villa Pareja proposes an extended architecture, with roofs that read as light and widely glazed elevations. The volumes enclose an outdoor space in which the pool acts as the axis of the composition. From the covered spaces, the eye crosses the garden and finds an ordered sequence of water, lawn and planting.',
        'Pergolas and roof overhangs articulate the transition between the house and the terraces. Their shadows give rhythm to the light surfaces and distinguish places to gather without losing the unity of the whole. Warm accents on the façades bring closeness to an open, precise geometry.',
        'The work was developed for an initial tender stage and included architectural design, physical models and presentations. That exploration conveyed a complete residential idea: a house whose identity is understood through the relationship between its parts and the outdoor space they share.'],
      heroAlt: 'Villa Pareja at dusk: low lit pavilions around the garden and pool'
    }
  },

  'cortijo-nagueles': {
    name: 'Cortijo Nagüeles',
    es: {
      heading: 'Geometría con presencia',
      lead: 'Una propuesta en la que los volúmenes blancos, los planos de tonos oscuros y las líneas de sombra construyen una expresión arquitectónica de fuerte carácter.',
      body: [
        'Cortijo Nagüeles explora el contraste entre masas y planos. Una pieza vertical de ritmo estriado marca la composición, mientras las terrazas y los frentes de cubierta trazan líneas horizontales de mayor longitud. La alternancia entre superficies claras y oscuras hace legibles los distintos cuerpos y refuerza la profundidad de las fachadas.',
        'Hacia el jardín, la propuesta adquiere una expresión más abierta. Los huecos acristalados, las zonas cubiertas y la piscina establecen una relación visual continua. El agua refleja la arquitectura y acentúa la longitud de sus líneas, mientras la vegetación matiza los encuentros con el terreno.',
        'La iluminación destaca los huecos y los cambios de plano. El diseño busca una presencia reconocible tanto desde el acceso como desde el exterior de estancia: una composición firme, equilibrada por espacios de escala cercana y por la calidez de la luz.'],
      heroAlt: 'Cortijo Nagüeles de día: terraza con tumbonas junto a la piscina, bajo los vuelos de la cubierta'
    },
    en: {
      heading: 'Geometry with presence',
      lead: 'A proposal in which white volumes, dark-toned planes and lines of shadow build an architectural expression of strong character.',
      body: [
        'Cortijo Nagüeles explores the contrast between masses and planes. A vertical, ribbed element marks the composition, while the terraces and roof edges trace longer horizontal lines. The alternation of light and dark surfaces makes the different volumes legible and deepens the façades.',
        'Towards the garden, the proposal becomes more open. Glazing, covered areas and the pool establish a continuous visual relationship. The water reflects the architecture and stretches its lines, while the planting softens the meeting with the ground.',
        'Lighting picks out the openings and the changes of plane. The design seeks a recognisable presence both from the entrance and from the outdoor living areas: a firm composition, balanced by spaces of intimate scale and by the warmth of the light.'],
      heroAlt: 'Cortijo Nagüeles by day: terrace with loungers beside the pool, beneath the cantilevered roofs'
    }
  },

  'hotel-boutique': {
    name: 'Hotel Boutique',
    es: {
      heading: 'Hospitalidad desde la calma',
      lead: 'Una propuesta de hotel boutique en Marbella concebida alrededor del descanso, con una visión de bienestar y spa de alta gama que se expresa en la escala, la luz y las texturas.',
      body: [
        'La propuesta para Hotel Boutique parte de una idea de hospitalidad cercana. La composición se organiza mediante cuerpos de proporciones regulares, terrazas y planos de apariencia pétrea que dan ritmo a las fachadas. Las superficies claras se combinan con elementos de tono cálido y vegetación para crear una imagen acogedora.',
        'El exterior tiene un papel central en esa experiencia. La piscina y los lugares de descanso se relacionan con los espacios cubiertos, mientras las pérgolas introducen una secuencia de sombras. La arquitectura ofrece distintos grados de exposición y recogimiento, acompañando una estancia orientada a la pausa.',
        'El enfoque de bienestar y spa guía el carácter del proyecto. La iluminación suave, la repetición ordenada de los huecos y la presencia del jardín construyen un ambiente de serenidad. Una propuesta en la que la calidad de la experiencia se plantea desde el espacio y sus transiciones, con una identidad propia y discreta.'],
      heroAlt: 'Hotel Boutique a la hora azul: dos cuerpos simétricos de terrazas sobre la piscina y el jardín'
    },
    en: {
      heading: 'Hospitality, from a place of calm',
      lead: 'A boutique hotel proposal in Marbella conceived around rest, with a high-end wellness and spa vision expressed through scale, light and texture.',
      body: [
        'The proposal for Hotel Boutique starts from an idea of personal hospitality. The composition is organised in regularly proportioned volumes, terraces and stone-like planes that give the façades rhythm. Light surfaces are combined with warm-toned elements and planting to create a welcoming image.',
        'The outdoors plays a central role in that experience. The pool and the places to rest relate to the covered spaces, while pergolas introduce a sequence of shade. The architecture offers different degrees of exposure and retreat, accompanying a stay devoted to slowing down.',
        'The wellness and spa approach guides the character of the project. Soft lighting, the ordered repetition of openings and the presence of the garden create an atmosphere of serenity. A proposal in which the quality of the experience comes from the space and its transitions, with a discreet identity of its own.'],
      heroAlt: 'Hotel Boutique at blue hour: two symmetrical terraced wings above the pool and garden'
    }
  },

  'huerta-belon': {
    name: 'Huerta Belón',
    es: {
      heading: 'Planos que dibujan el exterior',
      lead: 'Una propuesta de volúmenes superpuestos y terrazas abiertas, donde los vuelos de cubierta y los cambios de nivel aportan ritmo a la composición.',
      body: [
        'Huerta Belón se plantea desde una geometría de líneas horizontales. Los frentes blancos se alternan con planos de tonos más cálidos y superficies acristaladas, generando una imagen de profundidad y ligereza. Los bordes de cubierta avanzan sobre las terrazas y dibujan sombras que hacen visible la articulación de los volúmenes.',
        'El diseño incorpora el exterior a su orden arquitectónico. Las láminas de agua, las plataformas y la vegetación se relacionan con las fachadas, dando continuidad al conjunto. Los cambios de nivel permiten que cada plano tenga su propia presencia sin perder el vínculo visual con los demás.',
        'Como propuesta presentada, el proyecto explora una manera de combinar una expresión contemporánea con ámbitos de estancia más recogidos. Su carácter reside en esa alternancia: líneas precisas en la visión general y una secuencia de sombras, texturas y reflejos en la experiencia próxima.'],
      heroAlt: 'Huerta Belón: volúmenes blancos superpuestos y piscinas frente a las montañas'
    },
    en: {
      heading: 'Planes that draw the outdoors',
      lead: 'A proposal of stacked volumes and open terraces, where roof overhangs and changes of level give the composition its rhythm.',
      body: [
        'Huerta Belón is conceived from a geometry of horizontal lines. White elevations alternate with warmer-toned planes and glazing, creating an image of depth and lightness. The roof edges reach out over the terraces and cast shadows that reveal how the volumes are put together.',
        'The design brings the outdoors into its architectural order. Sheets of water, platforms and planting relate to the façades and give the whole continuity. The changes of level let each plane have its own presence without losing its visual link with the others.',
        'As a submitted proposal, the project explores a way of combining a contemporary expression with more sheltered places to stay. Its character lies in that alternation: precise lines in the overall view, and a sequence of shadows, textures and reflections up close.'],
      heroAlt: 'Huerta Belón: stacked white volumes and pools against the mountains'
    }
  },

  'altos-de-los-monteros': {
    name: 'Altos de los Monteros',
    es: {
      heading: 'Una arquitectura que sigue la ladera',
      lead: 'Volúmenes de perfil horizontal, texturas pétreas y terrazas abiertas definen un diseño que establece un diálogo visual con la pendiente y la vegetación.',
      body: [
        'El diseño de Altos de los Monteros trabaja con la lectura del terreno. Las piezas de geometría horizontal aparecen escalonadas en la ladera, con plataformas que enlazan arquitectura y espacios exteriores. Desde la distancia, el conjunto mantiene un perfil contenido frente a la presencia del paisaje.',
        'En las vistas próximas, la composición combina superficies claras con paños de apariencia pétrea. Los grandes huecos y los vuelos de cubierta forman frentes abiertos al jardín, mientras los elementos verticales aportan peso y contraste. La piscina prolonga las líneas de la casa y añade una superficie de reflejo a la escena.',
        'La propuesta encuentra su identidad en la relación entre una geometría precisa y un entorno de formas irregulares. Las terrazas, las sombras y la vegetación matizan esa relación, ofreciendo una imagen residencial ligada al paisaje y a la contemplación.'],
      heroAlt: 'Altos de los Monteros: pabellón de piedra y vidrio abierto a la piscina y la ladera'
    },
    en: {
      heading: 'Architecture that follows the hillside',
      lead: 'Horizontal profiles, stone textures and open terraces define a design in visual dialogue with the slope and the vegetation.',
      body: [
        'The design for Altos de los Monteros works from a reading of the land. Horizontal volumes step down the hillside, with platforms that link the architecture and the outdoor spaces. From a distance, the whole keeps a restrained profile against the presence of the landscape.',
        'In the closer views, the composition combines light surfaces with stone-like panels. Large openings and roof overhangs form elevations open to the garden, while vertical elements add weight and contrast. The pool extends the lines of the house and adds a reflective surface to the scene.',
        'The proposal finds its identity in the relationship between a precise geometry and an irregular setting. Terraces, shade and planting soften that relationship, offering a residential image tied to the landscape and to contemplation.'],
      heroAlt: 'Altos de los Monteros: stone-and-glass pavilion opening onto the pool and hillside'
    }
  },

  'the-house': {
    name: 'The House',
    es: {
      heading: 'La fuerza de una línea serena',
      lead: 'Planos blancos, frentes de tono madera y una marcada horizontalidad construyen una casa cuya presencia se entiende desde su relación con el paisaje.',
      body: [
        'The House desarrolla una composición de líneas largas y volúmenes contenidos. Los planos blancos enmarcan los huecos y los paños cálidos de fachada, trazando un orden claro alrededor del exterior. La arquitectura mantiene una presencia firme sin restar protagonismo a la amplitud del entorno.',
        'El agua introduce otro plano horizontal en esa composición. La piscina, el césped y las terrazas forman una secuencia de superficies que prolonga visualmente la casa. Los espacios cubiertos ofrecen una perspectiva más recogida, desde la que se perciben el jardín, los reflejos y el horizonte.',
        'La calidez de los frentes de tono madera equilibra la claridad geométrica. Junto a ellos, las sombras bajo los vuelos y la vegetación dan escala a los lugares de estancia. The House expresa una idea de vivienda en la que la calidad aparece en las proporciones, en los encuentros entre superficies y en la continuidad de la mirada.'],
      heroAlt: 'The House: piscina alargada y frentes de tono madera con el mar al fondo'
    },
    en: {
      heading: 'The strength of a serene line',
      lead: 'White planes, timber-toned elevations and a strong horizontality create a house whose presence is understood through its relationship with the landscape.',
      body: [
        'The House develops a composition of long lines and restrained volumes. White planes frame the openings and the warm panels of the façade, tracing a clear order around the outdoor spaces. The architecture holds a firm presence without taking attention away from the breadth of its setting.',
        'Water adds another horizontal plane to the composition. Pool, lawn and terraces form a sequence of surfaces that extends the house visually. The covered spaces offer a more sheltered view, from which the garden, the reflections and the horizon are seen.',
        'The warmth of the timber-toned elevations balances the geometric clarity. Alongside them, the shade beneath the overhangs and the planting give scale to the places to sit and stay. The House expresses an idea of home in which quality appears in the proportions, in the meeting of surfaces and in the continuity of the view.'],
      heroAlt: 'The House: long pool and timber-toned elevations with the sea beyond'
    }
  },

  'villa-soal': {
    name: 'Villa Soal',
    es: {
      heading: 'Luz que revela la geometría',
      lead: 'Terrazas superpuestas, superficies claras y planos de tono madera dan forma a un diseño cuya identidad se transforma con la luz.',
      body: [
        'Villa Soal plantea una composición de volúmenes que se desplazan y enmarcan el exterior. Las líneas horizontales de las terrazas se combinan con huecos amplios y elementos verticales de ritmo fino. La alternancia entre superficies claras, tonos cálidos y texturas pétreas aporta profundidad al conjunto.',
        'La piscina y los espacios de estancia se disponen visualmente como una prolongación de la arquitectura. Los cambios de nivel, los muros y la vegetación forman una secuencia que acompaña la lectura del terreno. El jardín matiza los bordes del edificio y relaciona sus planos con un entorno de mayor suavidad.',
        'La iluminación lineal tiene un papel destacado en las imágenes del proyecto. Al recorrer los vuelos y los techos exteriores, hace visibles sus proporciones y crea ámbitos de luz cálida. Una propuesta que encuentra carácter en el detalle de sus límites y en la relación entre volumen, sombra y reflejo.'],
      heroAlt: 'Villa Soal al atardecer: terrazas superpuestas iluminadas sobre la piscina'
    },
    en: {
      heading: 'Light that reveals the geometry',
      lead: 'Layered terraces, light surfaces and timber-toned planes shape a design whose identity changes with the light.',
      body: [
        'Villa Soal proposes a composition of shifting volumes that frame the outdoors. The horizontal lines of the terraces are combined with large openings and finely spaced vertical elements. The alternation of light surfaces, warm tones and stone textures gives the whole depth.',
        'The pool and the living areas are arranged visually as an extension of the architecture. Changes of level, walls and planting form a sequence that follows the reading of the land. The garden softens the edges of the building and relates its planes to a gentler setting.',
        'Linear lighting plays a leading role in the images of the project. Running along the overhangs and the outdoor ceilings, it reveals their proportions and creates pools of warm light. A proposal that finds its character in the detail of its edges and in the relationship between volume, shadow and reflection.'],
      heroAlt: 'Villa Soal at sunset: lit, layered terraces above the pool'
    }
  },

  'the-villas': {
    name: 'The Villas',
    es: {
      heading: 'Una identidad compartida, distintas perspectivas',
      lead: 'Un conjunto residencial que explora la relación entre viviendas, terrazas y vegetación mediante una composición escalonada de tonos claros y cálidos.',
      body: [
        'The Villas plantea una familia de volúmenes con rasgos comunes y distintas relaciones con el terreno. Las fachadas alternan superficies claras, paños de tono madera y huecos amplios. Los vuelos de cubierta y las terrazas dan continuidad al lenguaje del conjunto, sin reducir su imagen a una repetición uniforme.',
        'El escalonamiento hace que el jardín participe en la composición. Muros, plataformas y masas vegetales articulan los encuentros entre las piezas y aportan profundidad a las vistas. En los ámbitos próximos a cada vivienda, el agua y los espacios cubiertos introducen una escala más íntima.',
        'El diseño busca una identidad reconocible desde la visión general y una experiencia cercana desde cada terraza. La luz sobre los planos, las sombras de los vuelos y la presencia de la vegetación permiten que esa identidad se perciba con matices. Una propuesta de conjunto en la que la relación con el exterior da unidad a la arquitectura.'],
      heroAlt: 'The Villas: vivienda escalonada entre buganvillas, con piscina y terrazas'
    },
    en: {
      heading: 'A shared identity, different perspectives',
      lead: 'A residential ensemble that explores the relationship between homes, terraces and planting through a stepped composition of light and warm tones.',
      body: [
        'The Villas proposes a family of volumes with common features and different relationships with the land. The façades alternate light surfaces, timber-toned panels and large openings. Roof overhangs and terraces give continuity to the language of the ensemble without reducing its image to uniform repetition.',
        'The stepping brings the garden into the composition. Walls, platforms and planting articulate the meeting points between the buildings and add depth to the views. Close to each home, the water and the covered spaces bring a more intimate scale.',
        'The design seeks an identity that is recognisable from afar and a close experience from every terrace. Light on the planes, the shadows of the overhangs and the presence of the planting let that identity be read with nuance. An ensemble in which the relationship with the outdoors gives the architecture its unity.'],
      heroAlt: 'The Villas: stepped home among bougainvillea, with pool and terraces'
    }
  },

  'villas-in-the-landscape': {
    name: 'Villas P8',
    es: {
      heading: 'Una familia de casas, distintas formas de habitar',
      lead: 'El material del proyecto reúne una visión de conjunto y distintas expresiones residenciales, vinculadas por las terrazas, el jardín y la presencia del horizonte.',
      body: [
        'Villas P8 explora la relación entre una lectura territorial y la escala de la casa. Las vistas generales muestran una secuencia de piezas entre la vegetación, mientras las imágenes próximas presentan distintas soluciones de fachada, cubiertas y espacios exteriores. Esa diversidad permite reconocer un interés común por el vínculo entre arquitectura y entorno.',
        'Los tonos claros, las superficies de apariencia pétrea y los elementos cálidos se combinan con amplios huecos acristalados. Pérgolas, vuelos y terrazas construyen transiciones entre el interior y el jardín. El agua acompaña esas transiciones y refuerza las líneas principales de cada composición.',
        'La propuesta permite leer el paisaje desde diferentes posiciones: bajo una pérgola, junto a la piscina o en una terraza elevada. Su interés reside en dar una escala doméstica a una visión más amplia, cuidando la relación entre las piezas construidas y los espacios que las rodean.'],
      heroAlt: 'Villas P8: villa escalonada sobre una piscina desbordante entre vegetación'
    },
    en: {
      heading: 'A family of houses, different ways of living',
      lead: 'The project brings together an overall vision and different residential expressions, linked by terraces, gardens and the presence of the horizon.',
      body: [
        'Villas P8 explores the relationship between a territorial reading and the scale of the house. The wide views show a sequence of buildings among the vegetation, while the closer images present different solutions for façades, roofs and outdoor spaces. That diversity reveals a shared interest in the bond between architecture and setting.',
        'Light tones, stone-like surfaces and warm elements are combined with generous glazing. Pergolas, overhangs and terraces build transitions between inside and garden. Water accompanies those transitions and reinforces the main lines of each composition.',
        'The proposal lets the landscape be read from different positions: beneath a pergola, beside the pool or from a raised terrace. Its interest lies in giving a domestic scale to a wider vision, caring for the relationship between the buildings and the spaces around them.'],
      heroAlt: 'Villas P8: stepped villa above an infinity pool among planting'
    }
  },

  'bleu-royal': {
    name: 'Bleu Royal',
    es: {
      heading: 'El ritmo del arco',
      lead: 'Arcos, cubiertas de teja y proporciones de inspiración clásica definen una propuesta residencial donde la luz aporta una lectura contemporánea.',
      body: [
        'Bleu Royal construye su identidad a través de una secuencia de arcos. En el frente hacia el jardín, estos huecos dan ritmo a la fachada y enmarcan la relación visual con el exterior. Las cubiertas inclinadas, las barandillas de trazo fino y los volúmenes blancos completan una composición de carácter clásico.',
        'Los espacios cubiertos desarrollan ese mismo lenguaje. Las curvas de los arcos y las superficies abovedadas representadas en el diseño introducen una escala envolvente, acompañada por tonos suaves y elementos vegetales. Frente a ellos, la piscina y el césped ofrecen un plano abierto que equilibra la riqueza de la fachada.',
        'El acceso tiene una presencia más vertical, marcada por un gran hueco y una iluminación que destaca sus proporciones. La propuesta combina así dos experiencias: la solemnidad de la llegada y la serenidad del jardín. Una arquitectura que encuentra su expresión en el ritmo, en la luz y en el cuidado de los detalles.'],
      heroAlt: 'Bleu Royal: fachada de arcos al jardín, con la piscina y el césped en primer plano'
    },
    en: {
      heading: 'The rhythm of the arch',
      lead: 'Arches, tiled roofs and classically inspired proportions define a residential proposal in which light brings a contemporary reading.',
      body: [
        'Bleu Royal builds its identity through a sequence of arches. On the garden front, these openings give the façade rhythm and frame the visual relationship with the outdoors. Pitched roofs, fine balustrades and white volumes complete a composition of classical character.',
        'The covered spaces develop the same language. The curves of the arches and the vaulted surfaces shown in the design create an enveloping scale, accompanied by soft tones and planting. In front of them, the pool and the lawn offer an open plane that balances the richness of the façade.',
        'The entrance has a more vertical presence, marked by a tall opening and lighting that emphasises its proportions. The proposal thus combines two experiences: the ceremony of arrival and the calm of the garden. Architecture that finds its expression in rhythm, in light and in care for detail.'],
      heroAlt: 'Bleu Royal: arched garden front, with the pool and lawn in the foreground'
    }
  },

  'villa-feliz': {
    name: 'Villa Feliz',
    es: {
      heading: 'Proporción y vida al aire libre',
      lead: 'Cubiertas inclinadas, volúmenes blancos y terrazas amplias dan identidad a una villa que combina una composición ordenada con la apertura hacia el jardín.',
      body: [
        'Villa Feliz reúne piezas de distintas alturas bajo un lenguaje mediterráneo de líneas claras. La fachada de acceso muestra un orden equilibrado de huecos y volúmenes; hacia el jardín, esa composición se abre a las terrazas y al agua. Las cubiertas de teja aportan una silueta reconocible y una escala doméstica.',
        'Las escaleras amplias relacionan los niveles exteriores y prolongan las líneas de la casa. La piscina y los espacios cubiertos completan una secuencia de lugares para la estancia, enmarcada por la vegetación. Los huecos acristalados mantienen una relación visual directa con ese ámbito abierto.',
        'La iluminación cálida hace visibles los porches y las terrazas al caer la tarde. El contraste con las superficies blancas y los reflejos del agua matiza la presencia del conjunto. Una villa cuyo carácter nace del equilibrio entre una imagen arquitectónica ordenada y la amplitud de sus relaciones con el exterior.'],
      heroAlt: 'Villa Feliz al anochecer: fachada al jardín con terrazas, escalinata y piscinas iluminadas',
      cardAlt: 'Villa Feliz de día: terrazas escalonadas, piscina y pabellón del jardín con la montaña al fondo'
    },
    en: {
      heading: 'Proportion and outdoor living',
      lead: 'Pitched roofs, white volumes and generous terraces give identity to a villa that combines an ordered composition with openness to the garden.',
      body: [
        'Villa Feliz brings together volumes of different heights in a Mediterranean idiom of clear lines. The entrance façade shows a balanced order of openings and volumes; towards the garden, that composition opens onto the terraces and the water. The tiled roofs give a recognisable silhouette and a domestic scale.',
        'Wide steps connect the outdoor levels and extend the lines of the house. The pool and the covered spaces complete a sequence of places to stay, framed by the planting. The glazing keeps a direct visual relationship with that open space.',
        'Warm lighting brings out the porches and terraces as evening falls. The contrast with the white surfaces and the reflections of the water softens the presence of the whole. A villa whose character comes from the balance between an ordered architectural image and the breadth of its relationship with the outdoors.'],
      heroAlt: 'Villa Feliz at dusk: garden front with terraces, wide steps and lit pools',
      cardAlt: 'Villa Feliz by day: stepped terraces, pool and garden pavilion with the mountain beyond'
    }
  },

  'villa-ambar': {
    name: 'Villa Ámbar',
    es: {
      heading: 'El volumen bajo una luz cálida',
      lead: 'Una villa de superficies blancas y cubiertas de geometría marcada, donde el arbolado y la iluminación aportan profundidad a la composición.',
      body: [
        'Villa Ámbar combina cuerpos de líneas rectas con la presencia de cubiertas inclinadas. El blanco da unidad a las fachadas y hace visibles los cambios de plano, mientras los huecos oscuros y las barandillas transparentes introducen contraste. Desde el jardín, la arquitectura se percibe entre los árboles y las superficies verdes.',
        'El diseño alterna zonas de apertura con ámbitos protegidos por los vuelos. Las terrazas y los pavimentos claros relacionan la casa con el exterior, conservando una lectura sencilla de sus volúmenes. La vegetación añade escala y sombra a esa geometría.',
        'Al anochecer, la luz cálida destaca la profundidad de los huecos y la forma de las cubiertas. La fachada adquiere una expresión distinta, más íntima, sin perder su claridad. Villa Ámbar encuentra su carácter en esa variación entre la presencia luminosa del día y el relieve que introduce la iluminación al caer la tarde.'],
      heroAlt: 'Villa Ámbar al anochecer: fachada blanca iluminada bajo cubiertas de geometría marcada'
    },
    en: {
      heading: 'The volume in a warm light',
      lead: 'A villa of white surfaces and strongly shaped roofs, where the trees and the lighting give depth to the composition.',
      body: [
        'Villa Ámbar combines straight-lined volumes with the presence of pitched roofs. White unifies the façades and reveals the changes of plane, while dark openings and glass balustrades add contrast. From the garden, the architecture is seen between the trees and the lawns.',
        'The design alternates open areas with spaces sheltered by the overhangs. Terraces and light paving connect the house with the outdoors while keeping a simple reading of its volumes. The planting adds scale and shade to that geometry.',
        'At dusk, warm light brings out the depth of the openings and the shape of the roofs. The façade takes on a different, more intimate expression without losing its clarity. Villa Ámbar finds its character in that shift between the luminous presence of the day and the relief that lighting brings as evening falls.'],
      heroAlt: 'Villa Ámbar at dusk: lit white façade beneath strongly shaped roofs'
    }
  },

  castilla: {
    name: 'Castilla',
    es: {
      heading: 'Textura y sombra a escala doméstica',
      lead: 'Una propuesta residencial donde las superficies de apariencia pétrea y las pérgolas de tono madera aportan una calidez tangible a la geometría de la casa.',
      body: [
        'Castilla plantea una composición compacta de volúmenes y terrazas. Las fachadas muestran una textura de juntas regulares que contrasta con los huecos acristalados y con los elementos oscuros de los cerramientos. Las pérgolas añaden un ritmo distinto, marcado por la repetición de piezas y por las sombras que proyectan.',
        'El exterior se relaciona de manera próxima con la vivienda. La piscina discurre junto a sus frentes, mientras el jardín y las plataformas de estancia acompañan los espacios cubiertos. La vegetación envuelve las perspectivas y matiza la presencia de las superficies construidas.',
        'El carácter del diseño reside en los encuentros: entre una textura mineral y un plano transparente, entre la sombra de una pérgola y la luz del agua, entre la casa y el borde verde del jardín. Una propuesta de escala contenida cuya riqueza aparece al acercarse.'],
      heroAlt: 'Castilla: porche abierto al césped bajo una pérgola de tono madera'
    },
    en: {
      heading: 'Texture and shade at a domestic scale',
      lead: 'A residential proposal in which stone-like surfaces and timber-toned pergolas bring a tangible warmth to the geometry of the house.',
      body: [
        'Castilla proposes a compact composition of volumes and terraces. The façades show a texture of regular joints that contrasts with the glazing and the dark joinery. The pergolas add a different rhythm, marked by the repetition of their members and the shadows they cast.',
        'The outdoors relates closely to the house. The pool runs alongside its elevations, while the garden and the sitting platforms accompany the covered spaces. The planting wraps the views and softens the presence of the built surfaces.',
        'The character of the design lies in its meetings: between a mineral texture and a transparent plane, between the shade of a pergola and the light of the water, between the house and the green edge of the garden. A proposal of restrained scale whose richness appears as you come closer.'],
      heroAlt: 'Castilla: porch opening onto the lawn beneath a timber-toned pergola'
    }
  },

  'alcala-solvilla': {
    name: 'Alcalá',
    es: {
      heading: 'El agua como línea de horizonte',
      lead: 'Una propuesta de planos horizontales, terrazas profundas y texturas contrastadas que sitúa el agua en el centro de la relación con el exterior.',
      body: [
        'Alcalá desarrolla una composición de líneas largas y cuerpos de alturas distintas. Las cubiertas avanzan sobre los huecos acristalados y dan profundidad a las terrazas, mientras los paños de apariencia pétrea aportan peso a los niveles exteriores. Los tonos cálidos y los elementos de ritmo vertical matizan la geometría.',
        'La piscina acompaña el frente de la casa como una línea continua. Desde los espacios cubiertos, el agua enlaza visualmente las terrazas con el paisaje. Las escaleras y los muros articulan los cambios de nivel, introduciendo distintas perspectivas sobre el conjunto.',
        'La iluminación lineal recorre los vuelos y subraya la proporción de las cubiertas. Frente a esa precisión, la vegetación y las texturas aportan una lectura más cercana. El diseño propone una experiencia exterior de amplitud y recogimiento, con el agua como referencia constante.'],
      heroAlt: 'Alcalá a la hora azul: cubiertas voladas y piscina sobre un basamento de piedra'
    },
    en: {
      heading: 'Water as a horizon line',
      lead: 'A proposal of horizontal planes, deep terraces and contrasting textures that places the water at the centre of the relationship with the outdoors.',
      body: [
        'Alcalá develops a composition of long lines and volumes of different heights. The roofs reach out over the glazing and give the terraces depth, while stone-like panels add weight to the outdoor levels. Warm tones and vertical elements soften the geometry.',
        'The pool runs along the front of the house as a continuous line. From the covered spaces, the water visually links the terraces with the landscape. Steps and walls articulate the changes of level and open different views over the whole.',
        'Linear lighting runs along the overhangs and underlines the proportion of the roofs. Against that precision, the planting and the textures bring a closer reading. The design proposes an outdoor experience of both openness and retreat, with the water as a constant reference.'],
      heroAlt: 'Alcalá at blue hour: cantilevered roofs and pool above a stone base'
    }
  },

  cutar: {
    name: 'Villa Las Fuentes',
    es: {
      heading: 'Una casa que se descubre desde el jardín',
      lead: 'Villa Las Fuentes encarna la elegancia mediterránea contemporánea: una villa moderna rodeada de 5.620 m² de jardín en Nagüeles, con vistas al mar y a la montaña, cerca del centro de Marbella, la Milla de Oro y Puerto Banús.',
      body: [
        'Situada en Nagüeles, ofrece un entorno sereno con vistas al mar y a la montaña, cerca del centro de Marbella, la Milla de Oro y Puerto Banús. Desde la entrada, junto a la fuente de la villa, hasta los amplios interiores, cada detalle está cuidado.',
        'La vivienda se desarrolla en dos plantas, con una circulación continua entre las zonas de estar, una cocina Danespan y una terraza panorámica con piscina y espacios exteriores.',
        'Desde la entrada, junto a la fuente de la villa, hasta los amplios interiores, cada detalle está cuidado. La vivienda se desarrolla en dos plantas, con una circulación continua entre las zonas de estar, una cocina Danespan pensada para recibir y una terraza panorámica con piscina y espacios exteriores. Acabados de calidad y ventanales de suelo a techo completan la casa.'],
      heroAlt: 'Villa Las Fuentes al atardecer: fachada blanca con pérgola y escalinata, con la montaña al fondo'
    },
    en: {
      heading: 'A house discovered from the garden',
      lead: 'Villa Las Fuentes embodies contemporary Mediterranean elegance: a modern villa set in 5,620 m² of landscaped grounds in Nagüeles, with views of the sea and the mountains, close to Marbella town, the Golden Mile and Puerto Banús.',
      body: [
        'Set in Nagüeles, it offers calm surroundings with views of the sea and the mountains, yet remains close to Marbella town, the Golden Mile and Puerto Banús. From the entrance, past the villa’s fountain, to the spacious interiors, every detail has been carefully considered.',
        'The house is arranged over two levels, with a seamless flow between the living spaces, a Danespan kitchen and a panoramic terrace with a pool and outdoor amenities.',
        'From the entrance, past the villa’s fountain, to the spacious interiors, every detail has been carefully considered. The house is arranged over two levels, with a seamless flow between the living spaces, a Danespan kitchen designed for entertaining and a panoramic terrace with a pool and outdoor amenities. High-quality finishes and floor-to-ceiling windows complete the house.'],
      heroAlt: 'Villa Las Fuentes at sunset: white façade with pergola and wide steps, the mountain beyond'
    }
  },

  orion: {
    name: 'Orion',
    es: {
      heading: 'La geometría de la sombra',
      lead: 'Volúmenes blancos y pérgolas de trazo preciso dan forma a un proyecto que equilibra la presencia de la casa con la amplitud del espacio exterior.',
      body: [
        'Orion combina una silueta de inspiración mediterránea con elementos de geometría depurada. Los cuerpos blancos y los huecos acristalados se relacionan con marcos y pérgolas que extienden la composición hacia el jardín. Estos elementos definen límites ligeros y dan ritmo a las terrazas.',
        'La piscina ocupa una posición central en la imagen del proyecto. A su alrededor, las plataformas de estancia y las zonas cubiertas forman una secuencia abierta, matizada por árboles y vegetación. Las líneas del agua y del pavimento refuerzan el orden de la casa y amplían su lectura horizontal.',
        'El diseño utiliza la sombra como parte de su expresión. Las pérgolas dibujan trazos sobre las superficies claras, mientras la iluminación cálida introduce otra escala al anochecer. Orion propone una arquitectura de presencia nítida, cuya cercanía se construye en los lugares intermedios entre la vivienda y el jardín.'],
      heroAlt: 'Orion al atardecer: piscina, tumbonas y pérgolas blancas frente a la casa',
      cardAlt: 'Orion de día: piscina, tumbonas y pérgola blanca frente a la casa entre palmeras'
    },
    en: {
      heading: 'The geometry of shade',
      lead: 'White volumes and precisely drawn pergolas shape a project that balances the presence of the house with the breadth of the outdoor space.',
      body: [
        'Orion combines a Mediterranean-inspired silhouette with elements of refined geometry. White volumes and glazing relate to frames and pergolas that extend the composition into the garden. These elements define light boundaries and give the terraces rhythm.',
        'The pool holds a central place in the image of the project. Around it, sun platforms and covered areas form an open sequence, softened by trees and planting. The lines of the water and the paving reinforce the order of the house and stretch its horizontal reading.',
        'The design uses shade as part of its expression. The pergolas draw lines across the light surfaces, while warm lighting brings another scale at dusk. Orion proposes architecture with a crisp presence, whose closeness is built in the in-between places of house and garden.'],
      heroAlt: 'Orion at sunset: pool, sun loungers and white pergolas in front of the house',
      cardAlt: 'Orion by day: pool, sun loungers and white pergola in front of the house among palm trees'
    }
  },

  sirio: {
    name: 'Sirio',
    es: {
      heading: 'Claridad de día, profundidad de noche',
      lead: 'Una villa de volúmenes blancos y cubiertas de teja cuya expresión se apoya en la proporción de los huecos, las terrazas y una iluminación que acompaña los recorridos.',
      body: [
        'Sirio desarrolla una composición de cuerpos superpuestos y líneas claras. La cubierta inclinada corona el volumen superior, mientras los planos de las terrazas y los huecos acristalados dan continuidad a los frentes hacia el exterior. El blanco unifica el conjunto y hace visibles sus cambios de profundidad.',
        'La piscina y el jardín prolongan la imagen de la casa. Los porches ofrecen ámbitos más recogidos junto a las superficies abiertas, y la vegetación introduce escala en los bordes. La arquitectura mantiene una relación visual directa con ese espacio exterior, sin perder la definición de sus volúmenes.',
        'Por la noche, la iluminación aporta una lectura complementaria. Los peldaños se convierten en líneas de orientación y los puntos de luz destacan los planos de fachada. El proyecto muestra así dos expresiones vinculadas: la claridad de su geometría bajo el sol y la profundidad de sus sombras al anochecer.'],
      heroAlt: 'Sirio a pleno sol: volúmenes blancos junto a la piscina y las palmeras'
    },
    en: {
      heading: 'Clarity by day, depth by night',
      lead: 'A villa of white volumes and tiled roofs whose expression rests on the proportion of its openings, its terraces and lighting that guides the way.',
      body: [
        'Sirio develops a composition of stacked volumes and clear lines. The pitched roof crowns the upper volume, while the terrace planes and the glazing give continuity to the elevations facing outdoors. White unifies the whole and reveals its changes of depth.',
        'The pool and the garden extend the image of the house. The porches offer more sheltered places beside the open surfaces, and the planting brings scale to the edges. The architecture keeps a direct visual relationship with that outdoor space without losing the definition of its volumes.',
        'At night, the lighting offers a complementary reading. The steps become lines that guide the way and points of light pick out the planes of the façade. The project shows two linked expressions: the clarity of its geometry in the sun and the depth of its shadows after dark.'],
      heroAlt: 'Sirio in full sun: white volumes beside the pool and palm trees'
    }
  },

  'villa-relojero': {
    name: 'Carril del Relojero',
    es: {
      heading: 'La intimidad del jardín mediterráneo',
      lead: 'Una villa de volúmenes claros y cubiertas de teja que relaciona la escala de la casa con el agua, la vegetación y los lugares de encuentro al aire libre.',
      body: [
        'Carril del Relojero presenta una composición doméstica de líneas sencillas. Las fachadas blancas y los huecos amplios se combinan con cubiertas de teja y una pérgola que aporta sombra al frente del jardín. La casa mantiene una presencia contenida, acompañada por el arbolado y las superficies claras de las terrazas.',
        'La piscina establece una relación visual directa con la vivienda. El pavimento, el césped y la vegetación articulan sus bordes y permiten que el exterior se perciba como una sucesión de lugares próximos. Un pabellón cubierto completa esa imagen de vida compartida al aire libre.',
        'La luz cálida de los interiores y los puntos de iluminación del jardín prolongan la experiencia al anochecer. La arquitectura adquiere entonces una expresión más recogida, ligada a la escala de una conversación o una mesa. El carácter de la villa reside en esa cercanía entre casa, sombra y jardín.'],
      heroAlt: 'Carril del Relojero al anochecer: la casa iluminada sobre la piscina'
    },
    en: {
      heading: 'The intimacy of a Mediterranean garden',
      lead: 'A villa of light volumes and tiled roofs that relates the scale of the house to the water, the planting and the places to gather outdoors.',
      body: [
        'Carril del Relojero presents a domestic composition of simple lines. White façades and large openings are combined with tiled roofs and a pergola that shades the garden front. The house keeps a restrained presence, accompanied by the trees and the light surfaces of the terraces.',
        'The pool establishes a direct visual relationship with the house. Paving, lawn and planting shape its edges and let the outdoors be experienced as a succession of close, intimate places. A covered pavilion completes that image of shared outdoor life.',
        'The warm light of the interiors and the points of light in the garden extend the experience into the evening. The architecture then takes on a more sheltered expression, tied to the scale of a conversation or a table. The character of the villa lies in that closeness between house, shade and garden.'],
      heroAlt: 'Carril del Relojero at dusk: the lit house above the pool'
    }
  },

  elviria: {
    name: 'Elviria',
    es: {
      heading: 'El exterior como gesto arquitectónico',
      lead: 'Una propuesta de líneas horizontales y terrazas abiertas donde el agua, los planos blancos y los acentos cálidos construyen una imagen de marcada presencia.',
      body: [
        'El diseño de Elviria articula sus volúmenes mediante terrazas, retranqueos y vuelos de cubierta. La fachada combina superficies claras con huecos amplios y elementos verticales de tono cálido. Estos contrastes dan relieve a la composición y matizan su horizontalidad.',
        'La piscina tiene un papel destacado en las vistas del proyecto. Su borde y la lámina de agua representada en el frente exterior prolongan las líneas de las plataformas y aportan una expresión cambiante al conjunto. La vegetación suaviza los encuentros entre los niveles y enmarca las zonas de estancia.',
        'En las terrazas cubiertas, la arquitectura se percibe a una escala más próxima. Los planos de sombra, el reflejo del agua y la iluminación cálida dan profundidad a los espacios exteriores. La propuesta encuentra su carácter en la relación entre un gesto formal claro y una experiencia de estancia ligada al jardín.'],
      heroAlt: 'Elviria al anochecer: frente de agua desbordante bajo la fachada iluminada',
      cardAlt: 'Elviria de día: piscina, terraza de madera y zona de estar bajo los vuelos blancos de la casa'
    },
    en: {
      heading: 'The outdoors as an architectural gesture',
      lead: 'A proposal of horizontal lines and open terraces where water, white planes and warm accents create an image of strong presence.',
      body: [
        'The design for Elviria articulates its volumes through terraces, setbacks and roof overhangs. The façade combines light surfaces with large openings and warm-toned vertical elements. These contrasts give the composition relief and soften its horizontality.',
        'The pool plays a leading role in the views of the project. Its edge and the sheet of water shown on the outer front extend the lines of the platforms and give the whole a changing expression. The planting softens the meeting of the levels and frames the places to sit.',
        'On the covered terraces, the architecture is experienced at a closer scale. Planes of shade, reflections in the water and warm lighting give depth to the outdoor spaces. The proposal finds its character in the relationship between a clear formal gesture and an experience of living tied to the garden.'],
      heroAlt: 'Elviria at dusk: cascading water front beneath the lit façade',
      cardAlt: 'Elviria by day: pool, timber deck and outdoor lounge beneath the white cantilevers of the house'
    }
  },

  'la-montua': {
    name: 'La Montua',
    es: {
      heading: 'Texturas frente al paisaje',
      lead: 'Cubiertas inclinadas, paños de apariencia pétrea y pérgolas de tono madera componen un diseño residencial de presencia serena y carácter mediterráneo.',
      body: [
        'La Montua plantea una arquitectura que se extiende en horizontal y se abre hacia el exterior. Las cubiertas inclinadas dan identidad a la silueta, mientras los paños pétreos y los huecos acristalados alternan peso y transparencia. Las terrazas prolongan esa composición y ofrecen distintas perspectivas sobre el entorno.',
        'La pérgola tiene una presencia decisiva en el frente junto al agua. Su ritmo introduce una sombra cambiante sobre la fachada y relaciona los espacios cubiertos con la piscina. La combinación de texturas minerales, tonos cálidos y superficies claras construye una imagen acogedora sin perder precisión.',
        'La vegetación acompaña los bordes del diseño y matiza los cambios de nivel. Desde las vistas generales hasta los ámbitos de estancia, el proyecto mantiene una misma idea de equilibrio: una casa con una silueta reconocible, abierta a la amplitud del paisaje y atenta a la escala de sus lugares de sombra.'],
      heroAlt: 'La Montua al atardecer: cubiertas inclinadas y terrazas voladas sobre la ladera'
    },
    en: {
      heading: 'Textures facing the landscape',
      lead: 'Pitched roofs, stone-like panels and timber-toned pergolas compose a residential design of serene presence and Mediterranean character.',
      body: [
        'La Montua proposes architecture that stretches out horizontally and opens to the outdoors. The pitched roofs give the silhouette its identity, while the stone panels and the glazing alternate weight and transparency. The terraces extend that composition and offer different views over the setting.',
        'The pergola has a decisive presence on the front beside the water. Its rhythm casts a changing shade on the façade and links the covered spaces with the pool. The combination of mineral textures, warm tones and light surfaces creates a welcoming image without losing precision.',
        'The planting accompanies the edges of the design and softens the changes of level. From the wide views to the places to sit, the project keeps a single idea of balance: a house with a recognisable silhouette, open to the breadth of the landscape and attentive to the scale of its shaded places.'],
      heroAlt: 'La Montua at sunset: pitched roofs and cantilevered terraces above the hillside'
    }
  },

  'villa-del-golf': {
    name: 'Parcelas del Golf',
    es: {
      heading: 'Una composición abierta al verde',
      lead: 'Una propuesta de lenguaje mediterráneo que reúne cubiertas inclinadas, pérgolas blancas y grandes huecos alrededor de una relación clara con el jardín.',
      body: [
        'Parcelas del Golf combina volúmenes de distintas alturas bajo una silueta de cubiertas de teja. Los frentes blancos y las carpinterías oscuras aportan contraste, mientras las pérgolas prolongan la arquitectura hacia las terrazas. La composición mantiene un orden sencillo, legible desde las vistas abiertas del jardín.',
        'La piscina introduce una línea larga junto al césped y relaciona las distintas piezas de la escena exterior. Las zonas pavimentadas y la vegetación completan una secuencia que alterna ámbitos de estancia y perspectivas más amplias. Los huecos acristalados hacen que esa relación con el exterior forme parte de la imagen de la vivienda.',
        'El diseño encuentra su carácter en la proporción de sus elementos y en el ritmo de sus sombras. Las cubiertas, los marcos de las pérgolas y el agua construyen una expresión mediterránea de líneas depuradas, con una presencia cercana y luminosa.'],
      heroAlt: 'Parcelas del Golf al anochecer: la casa al fondo de un amplio césped con piscina',
      cardAlt: 'Parcelas del Golf con luz cálida: cubiertas de teja, porche y césped bordeado de flores'
    },
    en: {
      heading: 'A composition open to the green',
      lead: 'A proposal in a Mediterranean idiom that brings together pitched roofs, white pergolas and large openings around a clear relationship with the garden.',
      body: [
        'Parcelas del Golf combines volumes of different heights beneath a silhouette of tiled roofs. White elevations and dark joinery provide contrast, while the pergolas extend the architecture onto the terraces. The composition keeps a simple order, legible from the open views of the garden.',
        'The pool draws a long line beside the lawn and links the different parts of the outdoor scene. Paved areas and planting complete a sequence that alternates places to sit with wider views. The glazing makes that relationship with the outdoors part of the image of the house.',
        'The design finds its character in the proportion of its elements and the rhythm of its shadows. Roofs, pergola frames and water create a Mediterranean expression of refined lines, with a close and luminous presence.'],
      heroAlt: 'Parcelas del Golf at dusk: the house beyond a wide lawn with pool',
      cardAlt: 'Parcelas del Golf in warm light: tiled roofs, porch and a lawn edged with flowers'
    }
  },

  // No project text yet (pending material): a short visual reading only, marked pending in projects.ts.
  'villa-silver': {
    name: 'Villa Silver',
    es: {
      heading: 'Planos de luz frente al horizonte',
      lead: 'Un diseño único y moderno con volúmenes claros y una terraza abierta al horizonte. Una casa que se entiende desde la luz: nítida al mediodía, cálida al anochecer.',
      body: [],
      heroAlt: 'Villa Silver al anochecer: vuelos iluminados sobre la piscina, con La Concha al fondo'
    },
    en: {
      heading: 'Planes of light facing the horizon',
      lead: 'A unique modern design with clear volumes and a terrace open to the horizon. A house best understood through light: crisp at midday, warm at dusk.',
      body: [],
      heroAlt: 'Villa Silver at dusk: lit overhangs above the pool, with La Concha beyond'
    }
  }
}

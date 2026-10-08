// Local copy per area. General geography only; plot conditions are framed as topics to study, never as facts about every property.
import type { Faq, Locale } from '../pages/types'
import type { LocationId, ServiceId } from '../taxonomy'

type L<T> = Record<Locale, T>
export type LocationCopy = {
  context: L<string>                        // intro lead: what characterises the area
  setting: L<string>                        // local module: what is studied on site
  faq: L<Faq>
  focus: Partial<Record<ServiceId, L<string>>> // one specific angle per service
}

export const locationCopy: Record<LocationId, LocationCopy> = {
  marbella: {
    context: {
      en: 'Marbella brings together established neighbourhoods and newer residential areas between Sierra Blanca and the sea. Each plot and each existing villa has its own conditions, from orientation to its relationship with its surroundings.',
      es: 'Marbella reúne barrios consolidados y zonas residenciales más recientes entre Sierra Blanca y el mar. Cada parcela y cada villa existente tienen sus propias condiciones, desde la orientación hasta la relación con su entorno.'
    },
    setting: {
      en: 'Francisco Martínez Galván works from Marbella, so visits to the property and to the site are a natural part of the work. The light, views and setting of each plot are studied on the ground.',
      es: 'Francisco Martínez Galván trabaja desde Marbella, por lo que las visitas a la vivienda y a la obra forman parte natural del trabajo. La luz, las vistas y el entorno de cada parcela se estudian sobre el terreno.'
    },
    faq: {
      en: ['Is the studio based in Marbella?', 'Yes. Martínez Galván is based in Marbella, which makes visits to the property and follow-up during the works easier to organise.'],
      es: ['¿El estudio está en Marbella?', 'Sí. Martínez Galván tiene su sede en Marbella, lo que facilita organizar las visitas a la vivienda y el seguimiento durante la obra.']
    },
    focus: {
      architecture: {
        en: 'A new villa in Marbella can start from a plot in an established neighbourhood or in a newer residential area; in both cases the design responds to orientation, privacy and the relationship with the street.',
        es: 'Una villa nueva en Marbella puede partir de una parcela en un barrio consolidado o en una zona residencial más reciente; en ambos casos el diseño responde a la orientación, la privacidad y la relación con la calle.'
      }
    }
  },
  benahavis: {
    context: {
      en: 'Benahavís lies inland, in the hills behind the coast between Marbella and Estepona. Topography, access and views often shape a project here, and each plot needs to be studied on its own terms.',
      es: 'Benahavís se extiende hacia el interior, en las colinas que hay detrás de la costa entre Marbella y Estepona. La topografía, los accesos y las vistas suelen condicionar el proyecto, y cada parcela debe estudiarse en sus propios términos.'
    },
    setting: {
      en: 'The slope, orientation and privacy of the property are reviewed during site visits. Nothing is assumed in advance: views, gradients and any restrictions are checked for each plot.',
      es: 'La pendiente, la orientación y la privacidad de la propiedad se revisan en las visitas. No se da nada por hecho: las vistas, los desniveles y las posibles restricciones se comprueban en cada parcela.'
    },
    faq: {
      en: ['Does a sloping plot in Benahavís affect the design?', 'It can. The topography influences access, levels, terraces and the relationship with the views. It is studied for each plot before the proposal is defined.'],
      es: ['¿Influye la pendiente de una parcela en Benahavís en el diseño?', 'Puede influir. La topografía condiciona los accesos, los niveles, las terrazas y la relación con las vistas. Se estudia en cada parcela antes de definir la propuesta.']
    },
    focus: {
      architecture: {
        en: 'A new villa in Benahavís often works with levels: how you arrive, where the main rooms sit and how the terraces step with the land.',
        es: 'Una villa nueva en Benahavís suele trabajar con niveles: cómo se llega, dónde se sitúan las estancias principales y cómo se escalonan las terrazas con el terreno.'
      },
      renovation: {
        en: 'Renovating a villa in Benahavís can mean reconsidering how the house meets the slope, opening rooms towards the views or reorganising terraces and access.',
        es: 'Reformar una villa en Benahavís puede suponer repensar cómo se apoya la casa en la pendiente, abrir estancias hacia las vistas o reorganizar terrazas y accesos.'
      }
    }
  },
  'los-monteros': {
    context: {
      en: 'Los Monteros is a residential area in the east of Marbella, close to the coast. It is distinct from Los Altos de los Monteros, a neighbouring area with its own character.',
      es: 'Los Monteros es una zona residencial del este de Marbella, cerca de la costa. Es distinta de Los Altos de los Monteros, una zona vecina con carácter propio.'
    },
    setting: {
      en: 'The position, privacy and relationship with the garden are studied for each property; proximity to the beach is not assumed for every plot.',
      es: 'La posición, la privacidad y la relación con el jardín se estudian en cada propiedad; no se presupone la cercanía a la playa en todas las parcelas.'
    },
    faq: {
      en: ['Do you also work in Los Altos de los Monteros?', 'Yes, the studio works across the east of Marbella. Los Monteros and Los Altos de los Monteros are distinct areas, and each property is studied in its own setting.'],
      es: ['¿Trabajáis también en Los Altos de los Monteros?', 'Sí, el estudio trabaja en todo el este de Marbella. Los Monteros y Los Altos de los Monteros son zonas distintas, y cada propiedad se estudia en su propio entorno.']
    },
    focus: {
      architecture: {
        en: 'A new home in Los Monteros starts from the relationship between house and garden: privacy, outdoor rooms and the way the villa opens to the exterior.',
        es: 'Una casa nueva en Los Monteros parte de la relación entre vivienda y jardín: la privacidad, las estancias exteriores y la forma en que la villa se abre al exterior.'
      },
      renovation: {
        en: 'When a villa already has a garden and terraces worth keeping, a renovation can reorganise the house while strengthening that connection with the outside.',
        es: 'Cuando una villa ya tiene un jardín y unas terrazas que merece la pena conservar, la reforma puede reorganizar la casa reforzando esa relación con el exterior.'
      }
    }
  },
  'nueva-andalucia': {
    context: {
      en: 'Nueva Andalucía is a residential area of Marbella set back from Puerto Banús, around several golf courses and with views towards La Concha.',
      es: 'Nueva Andalucía es una zona residencial de Marbella situada detrás de Puerto Banús, en torno a varios campos de golf y con vistas hacia La Concha.'
    },
    setting: {
      en: 'The orientation of each plot, its views and its relationship with neighbouring properties and, where relevant, the golf course are studied on site.',
      es: 'La orientación de cada parcela, sus vistas y su relación con las propiedades vecinas y, cuando corresponde, con el campo de golf se estudian sobre el terreno.'
    },
    faq: {
      en: ['Can a villa next to a golf course be renovated or rebuilt?', 'The possibilities depend on the plot, the existing building and the applicable planning rules. They are studied for each property before any proposal is made.'],
      es: ['¿Se puede reformar o reconstruir una villa junto a un campo de golf?', 'Las posibilidades dependen de la parcela, de la edificación existente y de la normativa aplicable. Se estudian en cada propiedad antes de plantear una propuesta.']
    },
    focus: {
      architecture: {
        en: 'A new villa in Nueva Andalucía can frame views towards the golf courses or the mountains; the design balances those views with privacy and orientation.',
        es: 'Una villa nueva en Nueva Andalucía puede enmarcar vistas hacia los campos de golf o la montaña; el diseño equilibra esas vistas con la privacidad y la orientación.'
      },
      renovation: {
        en: 'Nueva Andalucía has villas from different periods; a renovation can update the layout, light and terraces while respecting what still works.',
        es: 'Nueva Andalucía tiene villas de distintas épocas; una reforma puede actualizar la distribución, la luz y las terrazas respetando lo que sigue funcionando.'
      }
    }
  },
  estepona: {
    context: {
      en: 'Estepona lies west of Marbella, with villas both along the coast and in the hills behind it. Each setting raises different questions about views, slope and access.',
      es: 'Estepona está al oeste de Marbella, con villas tanto junto a la costa como en las colinas que la rodean. Cada emplazamiento plantea preguntas distintas sobre vistas, pendiente y accesos.'
    },
    setting: {
      en: 'Site visits help to understand how each plot relates to the coast or the hills, its orientation and its access.',
      es: 'Las visitas ayudan a entender cómo se relaciona cada parcela con la costa o con las colinas, su orientación y sus accesos.'
    },
    faq: {
      en: ['Do you take on projects in Estepona?', 'Yes. The studio works across the Costa del Sol, including Estepona. Visits and coordination are organised according to the needs of each project.'],
      es: ['¿Hacéis proyectos en Estepona?', 'Sí. El estudio trabaja en toda la Costa del Sol, incluida Estepona. Las visitas y la coordinación se organizan según las necesidades de cada proyecto.']
    },
    focus: {
      architecture: {
        en: 'Whether the plot is near the coast or in the hills, a new villa in Estepona starts by studying orientation, views and how the house sits on the land.',
        es: 'Tanto si la parcela está cerca de la costa como en las colinas, una villa nueva en Estepona empieza por estudiar la orientación, las vistas y cómo se asienta la casa en el terreno.'
      },
      renovation: {
        en: 'A renovation in Estepona can open a villa to the outdoors, rethink its layout or update the way it responds to sun and views.',
        es: 'Una reforma en Estepona puede abrir una villa al exterior, repensar su distribución o actualizar su respuesta al sol y a las vistas.'
      }
    }
  },
  guadalmina: {
    context: {
      en: 'Guadalmina is a residential area in San Pedro de Alcántara, within the municipality of Marbella, known for its golf club and its closeness to the sea.',
      es: 'Guadalmina es una zona residencial de San Pedro de Alcántara, en el término municipal de Marbella, conocida por su club de golf y su cercanía al mar.'
    },
    setting: {
      en: 'Plots, gardens and their relationship with the golf course or the coast vary from one property to another, and are studied individually.',
      es: 'Las parcelas, los jardines y su relación con el campo de golf o con la costa varían de una propiedad a otra, y se estudian de forma individual.'
    },
    faq: {
      en: ['Is Guadalmina part of Marbella?', 'Yes. Guadalmina is in San Pedro de Alcántara, within the municipality of Marbella. Each project is studied according to its own plot and the applicable planning rules.'],
      es: ['¿Guadalmina pertenece a Marbella?', 'Sí. Guadalmina está en San Pedro de Alcántara, dentro del término municipal de Marbella. Cada proyecto se estudia según su parcela y la normativa aplicable.']
    },
    focus: {
      architecture: {
        en: 'A new villa in Guadalmina can be designed around the garden and outdoor living, with privacy and orientation studied from the start.',
        es: 'Una villa nueva en Guadalmina puede diseñarse en torno al jardín y a la vida exterior, estudiando la privacidad y la orientación desde el principio.'
      },
      renovation: {
        en: 'Renovating a villa in Guadalmina can mean opening it to the garden, reorganising its rooms or bringing light into spaces that feel closed.',
        es: 'Reformar una villa en Guadalmina puede suponer abrirla al jardín, reorganizar sus estancias o llevar luz a espacios que se sienten cerrados.'
      }
    }
  },
  'la-zagaleta': {
    context: {
      en: 'La Zagaleta is a private gated estate in the hills of Benahavís, with large plots and a strong relationship with the landscape.',
      es: 'La Zagaleta es una urbanización privada y cerrada en las colinas de Benahavís, con parcelas amplias y una fuerte relación con el paisaje.'
    },
    setting: {
      en: 'In a private estate, any community requirements are reviewed together with the planning rules. Topography, views and privacy are studied for each plot.',
      es: 'En una urbanización privada, los posibles requisitos de la comunidad se revisan junto con la normativa urbanística. La topografía, las vistas y la privacidad se estudian en cada parcela.'
    },
    faq: {
      en: ['Does a private estate such as La Zagaleta have its own requirements?', 'Private estates may have their own community rules in addition to municipal planning regulations. They are reviewed for each project before the design is defined.'],
      es: ['¿Tiene una urbanización privada como La Zagaleta sus propios requisitos?', 'Las urbanizaciones privadas pueden tener normas de comunidad propias además de la normativa municipal. Se revisan en cada proyecto antes de definir el diseño.']
    },
    focus: {
      architecture: {
        en: 'A new villa in La Zagaleta is designed with the scale of the plot and the landscape in mind: arrival, levels, views and privacy considered together.',
        es: 'Una villa nueva en La Zagaleta se diseña pensando en la escala de la parcela y en el paisaje: la llegada, los niveles, las vistas y la privacidad, considerados en conjunto.'
      },
      renovation: {
        en: 'Renovating a villa in La Zagaleta can involve rethinking large spaces, reorganising levels or refining the relationship with the landscape.',
        es: 'Reformar una villa en La Zagaleta puede implicar repensar espacios amplios, reorganizar niveles o afinar la relación con el paisaje.'
      }
    }
  },
  'golden-mile': {
    context: {
      en: 'The Golden Mile runs between Marbella town and Puerto Banús, from the coast up to the foot of Sierra Blanca, and includes areas such as Nagüeles.',
      es: 'La Milla de Oro se extiende entre el centro de Marbella y Puerto Banús, desde la costa hasta el pie de Sierra Blanca, e incluye zonas como Nagüeles.'
    },
    setting: {
      en: 'From plots near the sea to others at the foot of the mountains, conditions vary widely; the orientation, views and privacy of each property are studied on site.',
      es: 'Desde parcelas cerca del mar hasta otras al pie de la montaña, las condiciones varían mucho; la orientación, las vistas y la privacidad de cada propiedad se estudian sobre el terreno.'
    },
    faq: {
      en: ['Do you work in Nagüeles and Sierra Blanca?', 'Yes. The studio works in Marbella and across the Costa del Sol, including the areas of the Golden Mile. Each property is studied in its own setting.'],
      es: ['¿Trabajáis en Nagüeles y Sierra Blanca?', 'Sí. El estudio trabaja en Marbella y en toda la Costa del Sol, incluidas las zonas de la Milla de Oro. Cada propiedad se estudia en su propio entorno.']
    },
    focus: {
      architecture: {
        en: 'On the Golden Mile, a new villa responds to its exact position: near the sea or higher up, with views towards the coast or towards Sierra Blanca.',
        es: 'En la Milla de Oro, una villa nueva responde a su posición exacta: cerca del mar o más arriba, con vistas hacia la costa o hacia Sierra Blanca.'
      },
      renovation: {
        en: 'Renovating a villa on the Golden Mile can mean updating an established home, reorganising its layout and connecting it more closely with its garden.',
        es: 'Reformar una villa en la Milla de Oro puede suponer actualizar una vivienda consolidada, reorganizar su distribución y conectarla mejor con su jardín.'
      }
    }
  },
  'rio-real': {
    context: {
      en: 'Río Real is a residential area east of Marbella town, around the Río Real golf course and close to the coast.',
      es: 'Río Real es una zona residencial al este del centro de Marbella, en torno al campo de golf de Río Real y cerca de la costa.'
    },
    setting: {
      en: 'Each plot’s relationship with the golf course, the street and its garden is studied, together with orientation and privacy.',
      es: 'Se estudia la relación de cada parcela con el campo de golf, con la calle y con su jardín, junto con la orientación y la privacidad.'
    },
    faq: {
      en: ['Do you work in the east of Marbella?', 'Yes. The studio works across Marbella, including Río Real, Los Monteros and Elviria. Visits and site follow-up are organised for each project.'],
      es: ['¿Trabajáis en el este de Marbella?', 'Sí. El estudio trabaja en todo Marbella, incluidos Río Real, Los Monteros y Elviria. Las visitas y el seguimiento de obra se organizan para cada proyecto.']
    },
    focus: {
      architecture: {
        en: 'A new villa in Río Real can be oriented to make the most of the garden and, where the plot allows, the views over the golf course.',
        es: 'Una villa nueva en Río Real puede orientarse para aprovechar el jardín y, cuando la parcela lo permite, las vistas al campo de golf.'
      },
      renovation: {
        en: 'In Río Real, a renovation can bring an existing villa up to date, opening it to light and outdoor living while keeping what you value.',
        es: 'En Río Real, una reforma puede poner al día una villa existente, abriéndola a la luz y a la vida exterior sin perder lo que valoras.'
      }
    }
  },
  elviria: {
    context: {
      en: 'Elviria is a residential area in the east of Marbella, among pine trees and close to the dunes and beaches of this stretch of coast.',
      es: 'Elviria es una zona residencial del este de Marbella, entre pinos y cerca de las dunas y playas de este tramo de costa.'
    },
    setting: {
      en: 'Existing trees, orientation and privacy are part of the study of each plot, as is the way the house can open to its garden.',
      es: 'Los árboles existentes, la orientación y la privacidad forman parte del estudio de cada parcela, igual que la forma en que la casa puede abrirse a su jardín.'
    },
    faq: {
      en: ['Can existing trees be kept in a project in Elviria?', 'Existing trees and vegetation are surveyed as part of the study of the plot. Whether they can be kept depends on the project and the applicable rules.'],
      es: ['¿Se pueden conservar los árboles existentes en un proyecto en Elviria?', 'Los árboles y la vegetación existentes se analizan como parte del estudio de la parcela. Su conservación depende del proyecto y de la normativa aplicable.']
    },
    focus: {
      architecture: {
        en: 'A new villa in Elviria can be designed among existing trees, with shade, light and privacy shaping where the rooms and terraces are placed.',
        es: 'Una villa nueva en Elviria puede diseñarse entre los árboles existentes, dejando que la sombra, la luz y la privacidad definan dónde se sitúan estancias y terrazas.'
      },
      renovation: {
        en: 'Renovating a villa in Elviria can reorganise its rooms around light and shade, and strengthen the connection with the garden.',
        es: 'Reformar una villa en Elviria puede reorganizar sus estancias en torno a la luz y la sombra, y reforzar la relación con el jardín.'
      }
    }
  }
}

// Local study topics and service questions per area (11 Oct 2026, SEO review): what makes a plot or a villa in each
// area different, so service × area pages and area pages do not repeat the service copy with only the place name changed.
// General geography only, framed as questions to study on each plot; never facts about every property or planning promises.
// Pending Francisco's review, like the rest of locations.ts.
import type { Faq, Locale } from '../pages/types'
import type { LocationId, ServiceId } from '../taxonomy'

type L<T> = Record<Locale, T>
type Item = { title: string; text: string }
export type LocationStudy = {
  study: L<Item[]>                              // three topics studied on site in this area
  questions: Partial<Record<ServiceId, L<Faq>>>  // one question per service, specific to the area
}

export const locationStudy: Record<LocationId, LocationStudy> = {
  marbella: {
    study: {
      en: [
        { title: 'The neighbourhood and the street', text: 'Established neighbourhoods and newer residential areas differ in plot size, street pattern and neighbours. How the house addresses the street and protects its privacy is part of the first study.' },
        { title: 'Between Sierra Blanca and the sea', text: 'Depending on where the plot sits, the views may open towards the coast or towards the mountains. Orientation and views are checked on the plot itself, not assumed from a map.' },
        { title: 'The planning conditions of the plot', text: 'The municipal conditions that apply to each plot are reviewed with its documentation before the design is defined, so the proposal starts from what can actually be built.' }
      ],
      es: [
        { title: 'El barrio y la calle', text: 'Los barrios consolidados y las zonas residenciales más recientes difieren en tamaño de parcela, trazado de calles y vecinos. Cómo se relaciona la casa con la calle y cómo protege su privacidad forma parte del primer estudio.' },
        { title: 'Entre Sierra Blanca y el mar', text: 'Según dónde esté la parcela, las vistas pueden abrirse hacia la costa o hacia la montaña. La orientación y las vistas se comprueban en la propia parcela, no se suponen desde un plano.' },
        { title: 'Las condiciones urbanísticas de la parcela', text: 'Las condiciones municipales que afectan a cada parcela se revisan con su documentación antes de definir el diseño, para que la propuesta parta de lo que realmente se puede construir.' }
      ]
    },
    questions: {
      architecture: {
        en: ['Can you visit the plot before the design starts?', 'Yes. Working from Marbella, the studio can visit the plot early on to study its orientation, access and surroundings before proposing a design.'],
        es: ['¿Podéis visitar la parcela antes de empezar el diseño?', 'Sí. Al trabajar desde Marbella, el estudio puede visitar la parcela desde el principio para estudiar su orientación, sus accesos y su entorno antes de proponer un diseño.']
      }
    }
  },
  benahavis: {
    study: {
      en: [
        { title: 'Access and arrival', text: 'On hillside plots, how you reach the house by car and on foot shapes the whole layout. Access is studied together with the topography, before deciding where the house sits.' },
        { title: 'Levels and terraces', text: 'Changes of level can organise a villa into a sequence of platforms. Retaining walls, terraces and the position of the pool are studied with the land rather than imposed on it.' },
        { title: 'Views and exposure', text: 'Views towards the coast or the valleys are checked from the plot itself, together with the sun through the day and how exposed each terrace will be.' }
      ],
      es: [
        { title: 'Accesos y llegada', text: 'En las parcelas en ladera, cómo se llega a la casa en coche y a pie condiciona toda la distribución. Los accesos se estudian junto con la topografía, antes de decidir dónde se sitúa la casa.' },
        { title: 'Niveles y terrazas', text: 'Los cambios de nivel pueden organizar la villa en una secuencia de plataformas. Los muros, las terrazas y la posición de la piscina se estudian con el terreno, en lugar de imponerse sobre él.' },
        { title: 'Vistas y exposición', text: 'Las vistas hacia la costa o hacia los valles se comprueban desde la propia parcela, junto con el soleamiento a lo largo del día y la exposición de cada terraza.' }
      ]
    },
    questions: {
      architecture: {
        en: ['Is a survey of the plot needed before designing in Benahavís?', 'On uneven ground, a survey of the plot is usually one of the first documents the design needs. Its scope is agreed at the start of the commission.'],
        es: ['¿Hace falta un levantamiento de la parcela antes de diseñar en Benahavís?', 'En un terreno con desniveles, el levantamiento de la parcela suele ser uno de los primeros documentos que necesita el diseño. Su alcance se acuerda al inicio del encargo.']
      },
      renovation: {
        en: ['Can terraces be added to a villa on a slope?', 'It depends on the structure of the existing house, the land and the applicable planning rules. They are studied before any change is proposed.'],
        es: ['¿Se pueden añadir terrazas a una villa en pendiente?', 'Depende de la estructura de la casa existente, del terreno y de la normativa aplicable. Se estudian antes de proponer cualquier cambio.']
      }
    }
  },
  'los-monteros': {
    study: {
      en: [
        { title: 'House and garden', text: 'In an area of detached villas, the garden is often as important as the house. Where the outdoor rooms sit and how the villa opens to them are studied together.' },
        { title: 'Privacy from neighbours and the street', text: 'Boundaries, planting and the position of windows and terraces decide how private the house feels. They are reviewed on site, plot by plot.' },
        { title: 'Sun and shade through the day', text: 'The orientation of each plot sets where morning and evening light falls. Terraces, porches and shade are placed with that in mind.' }
      ],
      es: [
        { title: 'Casa y jardín', text: 'En una zona de villas aisladas, el jardín suele importar tanto como la casa. Dónde se sitúan las estancias exteriores y cómo se abre la villa hacia ellas se estudian en conjunto.' },
        { title: 'Privacidad respecto a vecinos y calle', text: 'Los linderos, la vegetación y la posición de ventanas y terrazas deciden lo resguardada que se siente la casa. Se revisan sobre el terreno, parcela a parcela.' },
        { title: 'Sol y sombra a lo largo del día', text: 'La orientación de cada parcela marca dónde cae la luz de la mañana y de la tarde. Las terrazas, los porches y la sombra se sitúan teniéndolo en cuenta.' }
      ]
    },
    questions: {
      architecture: {
        en: ['Can a new villa replace an older house in Los Monteros?', 'Replacing an existing house depends on the plot, the existing building and the planning rules that apply. It is one of the first questions studied before the design.'],
        es: ['¿Se puede sustituir una casa antigua por una villa nueva en Los Monteros?', 'Sustituir una vivienda existente depende de la parcela, de la edificación actual y de la normativa aplicable. Es una de las primeras cuestiones que se estudian antes del diseño.']
      },
      renovation: {
        en: ['Can the garden be kept during a renovation?', 'Mature planting and garden areas worth keeping are identified at the start, so the works can be planned around them wherever possible.'],
        es: ['¿Se puede conservar el jardín durante la reforma?', 'La vegetación consolidada y las zonas del jardín que merece la pena conservar se identifican al principio, para organizar la obra respetándolas siempre que sea posible.']
      }
    }
  },
  'nueva-andalucia': {
    study: {
      en: [
        { title: 'Next to the golf course', text: 'Plots facing a course have a particular relationship with it: open views, a shared boundary and the question of privacy from the fairway. Each case is studied on site.' },
        { title: 'Views towards La Concha', text: 'Where the plot allows it, the mountain can become part of the house. The layout weighs those views against orientation and the position of neighbouring villas.' },
        { title: 'Villas from different periods', text: 'Nueva Andalucía has houses built over several decades. How a new or renovated villa sits among them, and what the existing house still offers, are part of the study.' }
      ],
      es: [
        { title: 'Junto al campo de golf', text: 'Las parcelas que dan a un campo tienen una relación particular con él: vistas abiertas, un lindero compartido y la cuestión de la privacidad respecto a la calle de juego. Cada caso se estudia sobre el terreno.' },
        { title: 'Vistas hacia La Concha', text: 'Cuando la parcela lo permite, la montaña puede formar parte de la casa. La distribución equilibra esas vistas con la orientación y la posición de las villas vecinas.' },
        { title: 'Villas de distintas épocas', text: 'Nueva Andalucía tiene casas construidas a lo largo de varias décadas. Cómo se sitúa una villa nueva o reformada entre ellas, y lo que aún ofrece la casa existente, forman parte del estudio.' }
      ]
    },
    questions: {
      architecture: {
        en: ['Can a new villa frame the views of La Concha?', 'Where the plot allows it, the layout and openings can be arranged towards the mountain. The views are checked from the plot itself before the design is fixed.'],
        es: ['¿Puede una villa nueva enmarcar las vistas de La Concha?', 'Cuando la parcela lo permite, la distribución y los huecos pueden orientarse hacia la montaña. Las vistas se comprueban desde la propia parcela antes de cerrar el diseño.']
      },
      renovation: {
        en: ['Can an older villa in Nueva Andalucía be opened up to more light?', 'A new layout, larger openings or reorganised terraces can often bring in more light. What is possible depends on the structure of the existing house, which is studied first.'],
        es: ['¿Se puede dar más luz a una villa antigua en Nueva Andalucía?', 'Una nueva distribución, huecos más amplios o terrazas reorganizadas suelen aportar más luz. Lo que es posible depende de la estructura de la casa existente, que se estudia primero.']
      }
    }
  },
  estepona: {
    study: {
      en: [
        { title: 'Near the coast or in the hills', text: 'A plot close to the beach and a plot in the hills behind the town raise different questions about views, privacy and exposure. The setting is studied before anything else.' },
        { title: 'Gradient and access', text: 'On rising ground, the slope decides how you arrive, where the main rooms go and how the terraces step down. It is surveyed and studied before the layout.' },
        { title: 'A different municipality', text: 'Estepona has its own municipal planning and licence procedures. The conditions that apply to each plot are reviewed for that plot, not carried over from Marbella.' }
      ],
      es: [
        { title: 'Cerca de la costa o en las colinas', text: 'Una parcela cerca de la playa y otra en las colinas detrás del pueblo plantean preguntas distintas sobre vistas, privacidad y exposición. El emplazamiento se estudia antes que nada.' },
        { title: 'Pendiente y accesos', text: 'En un terreno en subida, la pendiente decide cómo se llega, dónde van las estancias principales y cómo se escalonan las terrazas. Se levanta y se estudia antes de la distribución.' },
        { title: 'Otro municipio', text: 'Estepona tiene su propio planeamiento municipal y sus propios procedimientos de licencia. Las condiciones de cada parcela se revisan para esa parcela, sin trasladarlas desde Marbella.' }
      ]
    },
    questions: {
      architecture: {
        en: ['Does it matter that Estepona is a different municipality from Marbella?', 'Yes. Each municipality has its own planning documents and licence procedures. They are reviewed for the specific plot before the design is defined.'],
        es: ['¿Influye que Estepona sea un municipio distinto de Marbella?', 'Sí. Cada municipio tiene sus propios documentos de planeamiento y procedimientos de licencia. Se revisan para la parcela concreta antes de definir el diseño.']
      },
      renovation: {
        en: ['Can a renovation in Estepona change the layout of a villa?', 'A new layout is often at the heart of a renovation. The structure of the house and the permissions required are reviewed before the changes are defined.'],
        es: ['¿Puede una reforma en Estepona cambiar la distribución de una villa?', 'Una nueva distribución suele ser el centro de una reforma. La estructura de la casa y los permisos necesarios se revisan antes de definir los cambios.']
      }
    }
  },
  guadalmina: {
    study: {
      en: [
        { title: 'Established gardens', text: 'Many properties have mature gardens and trees. They are surveyed at the start, because they shape where the house, the terraces and the pool can go.' },
        { title: 'The golf course or the sea', text: 'Depending on the plot, the main relationship may be with the golf course, with the coast or simply with the garden. Each setting leads to a different layout.' },
        { title: 'San Pedro, within Marbella', text: 'Guadalmina belongs to the municipality of Marbella, so its planning conditions are Marbella’s. They are checked for each plot before the design is defined.' }
      ],
      es: [
        { title: 'Jardines consolidados', text: 'Muchas propiedades tienen jardines y árboles maduros. Se analizan al principio, porque condicionan dónde pueden ir la casa, las terrazas y la piscina.' },
        { title: 'El campo de golf o el mar', text: 'Según la parcela, la relación principal puede ser con el campo de golf, con la costa o simplemente con el jardín. Cada emplazamiento lleva a una distribución distinta.' },
        { title: 'San Pedro, dentro de Marbella', text: 'Guadalmina pertenece al término municipal de Marbella, por lo que sus condiciones urbanísticas son las de Marbella. Se comprueban en cada parcela antes de definir el diseño.' }
      ]
    },
    questions: {
      architecture: {
        en: ['What is studied first on a plot in Guadalmina?', 'Orientation, the existing garden, privacy from neighbours and the relationship with the golf course or the street, together with the planning conditions of the plot.'],
        es: ['¿Qué se estudia primero en una parcela de Guadalmina?', 'La orientación, el jardín existente, la privacidad respecto a los vecinos y la relación con el campo de golf o con la calle, junto con las condiciones urbanísticas de la parcela.']
      },
      renovation: {
        en: ['Can an older villa in Guadalmina be updated without losing its character?', 'A renovation can keep the elements that give the house its character while reorganising rooms, light and the connection with the garden. What to keep is agreed early.'],
        es: ['¿Se puede actualizar una villa antigua en Guadalmina sin perder su carácter?', 'Una reforma puede conservar los elementos que dan carácter a la casa mientras reorganiza las estancias, la luz y la relación con el jardín. Qué conservar se acuerda al principio.']
      }
    }
  },
  'la-zagaleta': {
    study: {
      en: [
        { title: 'The estate and its rules', text: 'A private estate may have its own requirements for design and works. They are reviewed with the estate’s documentation, alongside the municipal rules of Benahavís.' },
        { title: 'The scale of the plot', text: 'Large plots leave many options open: where the house sits, how you arrive and where the outdoor areas go. Choosing among them is the first design decision.' },
        { title: 'Topography and landscape', text: 'Hills, valleys and native vegetation surround most plots. Levels, views and the way the house meets the land are studied together.' }
      ],
      es: [
        { title: 'La urbanización y sus normas', text: 'Una urbanización privada puede tener sus propios requisitos de diseño y de obra. Se revisan con la documentación de la urbanización, junto con la normativa municipal de Benahavís.' },
        { title: 'La escala de la parcela', text: 'Las parcelas amplias dejan muchas opciones abiertas: dónde se sitúa la casa, cómo se llega y dónde van los espacios exteriores. Elegir entre ellas es la primera decisión de diseño.' },
        { title: 'Topografía y paisaje', text: 'Colinas, valles y vegetación autóctona rodean la mayoría de las parcelas. Los niveles, las vistas y la forma en que la casa se apoya en el terreno se estudian en conjunto.' }
      ]
    },
    questions: {
      architecture: {
        en: ['Which municipality is La Zagaleta in?', 'La Zagaleta is in the municipality of Benahavís. Its planning rules apply together with any requirements of the estate itself.'],
        es: ['¿En qué municipio está La Zagaleta?', 'La Zagaleta está en el término municipal de Benahavís. Su normativa urbanística se aplica junto con los posibles requisitos de la propia urbanización.']
      },
      renovation: {
        en: ['Do works in a private estate need the community’s approval?', 'Some estates have their own procedures for works. Whether they apply, and how, is reviewed for each project with the estate’s documentation.'],
        es: ['¿Necesitan las obras en una urbanización privada la aprobación de la comunidad?', 'Algunas urbanizaciones tienen procedimientos propios para las obras. Si se aplican, y cómo, se revisa en cada proyecto con la documentación de la urbanización.']
      }
    }
  },
  'golden-mile': {
    study: {
      en: [
        { title: 'Near the sea or higher up', text: 'Between the coast and the foot of Sierra Blanca, the same strip holds very different plots. Height, views and exposure change with the exact position of each one.' },
        { title: 'Established neighbourhoods', text: 'Areas such as Nagüeles have mature properties and gardens. How a new or renovated villa relates to its neighbours is part of the study.' },
        { title: 'Privacy and arrival', text: 'Boundaries, entrances and the first view of the house are designed with privacy in mind, from the street to the front door.' }
      ],
      es: [
        { title: 'Cerca del mar o más arriba', text: 'Entre la costa y el pie de Sierra Blanca, la misma franja reúne parcelas muy distintas. La altura, las vistas y la exposición cambian con la posición exacta de cada una.' },
        { title: 'Barrios consolidados', text: 'Zonas como Nagüeles tienen propiedades y jardines maduros. Cómo se relaciona una villa nueva o reformada con sus vecinas forma parte del estudio.' },
        { title: 'Privacidad y llegada', text: 'Los linderos, las entradas y la primera vista de la casa se diseñan pensando en la privacidad, desde la calle hasta la puerta.' }
      ]
    },
    questions: {
      architecture: {
        en: ['Can a plot higher up the Golden Mile have sea views?', 'It depends on the position of the plot, the height of the house and the surrounding buildings and trees. The views are checked on the plot before the design is defined.'],
        es: ['¿Puede tener vistas al mar una parcela situada más arriba en la Milla de Oro?', 'Depende de la posición de la parcela, de la altura de la casa y de los edificios y árboles del entorno. Las vistas se comprueban en la parcela antes de definir el diseño.']
      },
      renovation: {
        en: ['Is it worth renovating an established villa on the Golden Mile?', 'It depends on the condition of the house, what you value in it and what you need. The first visit helps establish whether a renovation makes sense or another approach would serve you better.'],
        es: ['¿Merece la pena reformar una villa consolidada en la Milla de Oro?', 'Depende del estado de la casa, de lo que valoras de ella y de lo que necesitas. La primera visita ayuda a ver si tiene sentido reformar o si te conviene otro planteamiento.']
      }
    }
  },
  'rio-real': {
    study: {
      en: [
        { title: 'The edge of the golf course', text: 'Some plots border or overlook the Río Real course. Where they do, the boundary, the views and privacy from the course are studied together.' },
        { title: 'Close to the coast', text: 'East of Marbella town and near the sea, plots differ in how much they see of the coast. Orientation and views are checked on site.' },
        { title: 'Garden and street', text: 'How the villa turns its back to the street and opens to its garden sets the layout of the main rooms and terraces.' }
      ],
      es: [
        { title: 'El borde del campo de golf', text: 'Algunas parcelas lindan con el campo de Río Real o lo dominan. En esos casos, el lindero, las vistas y la privacidad respecto al campo se estudian en conjunto.' },
        { title: 'Cerca de la costa', text: 'Al este del centro de Marbella y cerca del mar, las parcelas difieren en cuánto ven de la costa. La orientación y las vistas se comprueban sobre el terreno.' },
        { title: 'Jardín y calle', text: 'Cómo la villa se protege de la calle y se abre a su jardín define la distribución de las estancias principales y de las terrazas.' }
      ]
    },
    questions: {
      architecture: {
        en: ['Can a villa in Río Real look onto the golf course?', 'Where the plot borders or overlooks the course, the layout can be oriented towards it. Boundaries, privacy and views are studied for each plot.'],
        es: ['¿Puede una villa en Río Real mirar al campo de golf?', 'Cuando la parcela linda con el campo o lo domina, la distribución puede orientarse hacia él. Los linderos, la privacidad y las vistas se estudian en cada parcela.']
      },
      renovation: {
        en: ['Can a renovation improve the connection with the garden?', 'Openings, terraces and the transition between inside and outside are often the focus of a renovation. They are designed with the existing structure in mind.'],
        es: ['¿Puede una reforma mejorar la relación con el jardín?', 'Los huecos, las terrazas y la transición entre interior y exterior suelen ser el centro de una reforma. Se diseñan teniendo en cuenta la estructura existente.']
      }
    }
  },
  elviria: {
    study: {
      en: [
        { title: 'Among the pine trees', text: 'Existing trees give shade and privacy, and they also decide where the house, the terraces and the pool can be placed. They are surveyed before the design.' },
        { title: 'Near the dunes and the beach', text: 'On plots close to the sea, exposure to the coastal environment is one of the criteria for choosing materials and detailing the outside of the house.' },
        { title: 'Light between the trees', text: 'Among tall trees, the light that reaches each room changes through the day and the year. Openings and the position of the main rooms respond to it.' }
      ],
      es: [
        { title: 'Entre pinos', text: 'Los árboles existentes dan sombra y privacidad, y además deciden dónde pueden situarse la casa, las terrazas y la piscina. Se analizan antes del diseño.' },
        { title: 'Cerca de las dunas y de la playa', text: 'En parcelas próximas al mar, la exposición al ambiente costero es uno de los criterios para elegir materiales y resolver el exterior de la casa.' },
        { title: 'La luz entre los árboles', text: 'Entre árboles altos, la luz que llega a cada estancia cambia a lo largo del día y del año. Los huecos y la posición de las estancias principales responden a ella.' }
      ]
    },
    questions: {
      architecture: {
        en: ['Are materials chosen with the coastal setting in mind?', 'Yes. On plots close to the sea, exposure to the coastal environment is one of the criteria when choosing materials and details.'],
        es: ['¿Se eligen los materiales teniendo en cuenta el entorno costero?', 'Sí. En parcelas cercanas al mar, la exposición al ambiente costero es uno de los criterios para elegir materiales y detalles.']
      },
      renovation: {
        en: ['Can a renovation bring more light into a villa among trees?', 'New openings, roof lights or a different layout can help, depending on the existing structure and the trees around the house.'],
        es: ['¿Puede una reforma dar más luz a una villa rodeada de árboles?', 'Nuevos huecos, lucernarios o una distribución distinta pueden ayudar, según la estructura existente y los árboles que rodean la casa.']
      }
    }
  }
}

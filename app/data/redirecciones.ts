// The former static demo no longer runs as a parallel website. The old /blog lived in Spanish only: it now lives in /es/guias.
export const redirecciones=[
 // Public project name: Alcalá (8 Oct 2026). Keep former links working.
 {origen:'/projects/alcala-solvilla',destino:'/projects/alcala'},{origen:'/es/proyectos/alcala-solvilla',destino:'/es/proyectos/alcala'},
 // Public names confirmed by Andrés (8 Oct 2026): Cútar → Villa Las Fuentes, Villas en el paisaje → Villas P8, Villa del Golf → Parcelas del Golf.
 {origen:'/projects/cutar',destino:'/projects/villa-las-fuentes'},{origen:'/es/proyectos/cutar',destino:'/es/proyectos/villa-las-fuentes'},
 {origen:'/projects/villas-in-the-landscape',destino:'/projects/villas-p8'},{origen:'/es/proyectos/villas-en-el-paisaje',destino:'/es/proyectos/villas-p8'},
 {origen:'/projects/villa-del-golf',destino:'/projects/parcelas-del-golf'},{origen:'/es/proyectos/villa-del-golf',destino:'/es/proyectos/parcelas-del-golf'},
 // Villa Relojero → Carril del Relojero (Andrés, 8 Oct 2026).
 {origen:'/projects/villa-relojero',destino:'/projects/carril-del-relojero'},{origen:'/es/proyectos/villa-relojero',destino:'/es/proyectos/carril-del-relojero'},
 {origen:'/app/demo',destino:'/'},{origen:'/demo',destino:'/'},
 {origen:'/blog',destino:'/es/guias'},
 // Illustrative examples withdrawn (7 Oct 2026): each one goes to its real service hub. Copy kept in data/demo.ts.
 {origen:'/examples/villa-renovation',destino:'/villa-renovation'},{origen:'/examples/interior-design',destino:'/'},{origen:'/examples/landscape-design',destino:'/'},
 // Landscape design withdrawn (8 Oct 2026): the studio does not offer it. Former draft URLs go to the home page and the guide to the journal.
 {origen:'/landscape-design',destino:'/'},{origen:'/es/paisajismo',destino:'/es'},
 ...['marbella','benahavis','los-monteros','nueva-andalucia','estepona','guadalmina','la-zagaleta','golden-mile','rio-real','elviria'].map(z=>({origen:`/landscape-design/${z}`,destino:'/'})),
 ...['marbella','benahavis','los-monteros','nueva-andalucia','estepona','guadalmina','la-zagaleta','milla-de-oro','rio-real','elviria'].map(z=>({origen:`/es/paisajismo/${z}`,destino:'/es'})),
 {origen:'/journal/designing-the-garden-from-the-start',destino:'/journal'},{origen:'/es/guias/disenar-el-jardin-desde-el-principio',destino:'/es/guias'},
 // Interior design withdrawn (8 Oct 2026): the studio does not offer it.
 {origen:'/interior-design',destino:'/'},{origen:'/es/interiorismo',destino:'/es'},
 ...['marbella','benahavis','los-monteros','nueva-andalucia','estepona','guadalmina','la-zagaleta','golden-mile','rio-real','elviria'].map(z=>({origen:`/interior-design/${z}`,destino:'/'})),
 ...['marbella','benahavis','los-monteros','nueva-andalucia','estepona','guadalmina','la-zagaleta','milla-de-oro','rio-real','elviria'].map(z=>({origen:`/es/interiorismo/${z}`,destino:'/es'})),
 {origen:'/journal/architecture-and-interior-design-how-they-work-together',destino:'/journal'},{origen:'/es/guias/arquitectura-interiorismo-como-se-relacionan',destino:'/es/guias'},
 {origen:'/blog/arquitectura-interiorismo-como-se-relacionan',destino:'/es/guias'},
 {origen:'/blog/planos-arquitectura-como-leerlos-preparar-dudas',destino:'/es/guias/planos-arquitectura-como-leerlos-preparar-dudas'}
]

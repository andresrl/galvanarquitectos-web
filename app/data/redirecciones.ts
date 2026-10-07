// The former static demo no longer runs as a parallel website. The old /blog lived in Spanish only: it now lives in /es/guias.
export const redirecciones=[
 {origen:'/app/demo',destino:'/'},{origen:'/demo',destino:'/'},
 {origen:'/blog',destino:'/es/guias'},
 // Illustrative examples withdrawn (7 Oct 2026): each one goes to its real service hub. Copy kept in data/demo.ts.
 {origen:'/examples/villa-renovation',destino:'/villa-renovation'},{origen:'/examples/interior-design',destino:'/interior-design'},{origen:'/examples/landscape-design',destino:'/landscape-design'},
 {origen:'/blog/arquitectura-interiorismo-como-se-relacionan',destino:'/es/guias/arquitectura-interiorismo-como-se-relacionan'},
 {origen:'/blog/planos-arquitectura-como-leerlos-preparar-dudas',destino:'/es/guias/planos-arquitectura-como-leerlos-preparar-dudas'}
]

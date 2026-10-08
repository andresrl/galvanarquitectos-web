// The studio as an entity (JSON-LD, llms.txt, contact). Only confirmed facts (CLAUDE.md §5): no opening hours, prices,
// awards, ratings, legal name, tax ID or registration number until they are confirmed.
export const negocio={
 nombre:'Martínez Galván Arquitecto',marca:'Martínez Galván',
 alternateNames:['Martínez Galván Arquitectos','Galván Arquitectos','Francisco Martínez Galván Arquitecto'],
 actividad:'architecture',ciudad:'Marbella',zonaServicio:'Costa del Sol',
 contacto:{telefono:'+34 679 97 94 87',email:'info@galvanarquitectos.com',
  // Address confirmed in the briefing (CLAUDE.md §5).
  direccion:{'@type':'PostalAddress',streetAddress:'Calle Estébanez Calderón, 1',postalCode:'29602',addressLocality:'Marbella',addressRegion:'Málaga',addressCountry:'ES'}},
 // Street-level coordinates (OpenStreetMap, Calle Estébanez Calderón, 29602), three decimals: about 100 m.
 geo:{latitude:36.508,longitude:-4.899},
 mapa:'https://www.openstreetmap.org/?mlat=36.508&mlon=-4.899#map=17/36.508/-4.899',
 sameAs:['https://www.instagram.com/martinezgalvanarquitecto/'],
 logo:{src:'/brand/logo.png',width:1400,height:537},
 imagen:{src:'/media/studio/studio-og.jpg',width:1200,height:630},
 idiomas:['en','es'],
 knowsAbout:{
  en:['Villa architecture','New-build luxury villas','Complete villa renovation','Architectural site supervision','Planning permissions','Mediterranean architecture','Costa del Sol','Marbella'],
  es:['Arquitectura de villas','Villas de lujo de nueva construcción','Reforma integral de villas','Dirección de obra','Licencias de obra','Arquitectura mediterránea','Costa del Sol','Marbella']
 },
 // The architect (biography reviewed in LanzaderaWeb: trained in Madrid, Marbella since 1998, studio consolidated in 2003).
 arquitecto:{
  nombre:'Francisco Martínez Galván',
  cargo:{en:'Architect and founder',es:'Arquitecto y fundador'},
  formacion:'Escuela Politécnica de Madrid',
  retrato:{src:'/media/studio/francisco-martinez-galvan.jpg',width:740,height:980},
  descripcion:{
   en:'Architect based in Marbella since 1998, trained in Madrid. He leads every commission personally: new-build villas and complete renovations on the Costa del Sol.',
   es:'Arquitecto en Marbella desde 1998, formado en Madrid. Dirige personalmente cada encargo: villas de nueva construcción y reformas integrales en la Costa del Sol.'
  }
 },
 cta:{url:'/contact',label:'Let’s talk about your project'},pruebaSocial:{resenas:[]}
}

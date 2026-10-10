// Publication switch: the only place to mark pages as published once Paco has reviewed them.
// List registry page ids (app/data/pages: 'renovation-hub', 'renovation-marbella', 'project-the-house', 'studio', 'contact', 'projects'…)
// and 'home' for / and /es. Everything else stays a noindex draft. Guides are published with `draft: false` in their front matter.
// Nothing is indexed until runtimeConfig.public.indexable is also true (nuxt.config.ts / NUXT_PUBLIC_INDEXABLE).
export const publishedIds = new Set<string>([
 // Published 10 Oct 2026 (Andrés): everything except the legal pages, which wait for NIF/colegiación.
 'home',
 // Services: hubs and service × area
 'architecture-hub', 'renovation-hub', 'renovation-marbella', 'architecture-marbella', 'architecture-benahavis',
 'architecture-los-monteros', 'architecture-nueva-andalucia', 'architecture-estepona', 'architecture-guadalmina',
 'architecture-la-zagaleta', 'architecture-golden-mile', 'architecture-rio-real', 'architecture-elviria',
 'renovation-benahavis', 'renovation-los-monteros', 'renovation-nueva-andalucia', 'renovation-estepona',
 'renovation-guadalmina', 'renovation-la-zagaleta', 'renovation-golden-mile', 'renovation-rio-real',
 'renovation-elviria',
 // Project archive
 'projects', 'project-the-house', 'project-villa-silver', 'project-la-resina', 'project-cutar', 'project-villa-paris',
 'project-villa-soal', 'project-orion', 'project-la-montua', 'project-villa-alcala',
 'project-villas-in-the-landscape', 'project-the-villas', 'project-altos-de-los-monteros', 'project-villa-feliz',
 'project-bleu-royal', 'project-cortijo-nagueles', 'project-elviria', 'project-alcala-solvilla',
 'project-villa-pareja', 'project-sirio', 'project-villa-relojero', 'project-villa-ambar', 'project-villa-pino',
 'project-atalaya', 'project-hotel-boutique', 'project-huerta-belon', 'project-castilla', 'project-villa-del-golf',
 'project-flamingos', 'project-paraiba', 'project-guadalmina',
 // Studio, films, contact, international clients
 'studio', 'films', 'contact', 'international',
 // Area pages
 'area-benahavis', 'area-los-monteros', 'area-nueva-andalucia', 'area-estepona', 'area-guadalmina',
 'area-la-zagaleta', 'area-golden-mile', 'area-rio-real', 'area-elviria',
])

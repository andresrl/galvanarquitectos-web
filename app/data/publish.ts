// Publication switch: the only place to mark pages as published once Paco has reviewed them.
// List registry page ids (app/data/pages: 'renovation-hub', 'renovation-marbella', 'project-the-house', 'studio', 'contact', 'projects'…)
// and 'home' for / and /es. Everything else stays a noindex draft. Guides are published with `draft: false` in their front matter.
// Nothing is indexed until runtimeConfig.public.indexable is also true (nuxt.config.ts / NUXT_PUBLIC_INDEXABLE).
export const publishedIds = new Set<string>([
 // 'home',
])

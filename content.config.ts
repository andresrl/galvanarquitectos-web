import { defineCollection, defineContentConfig, z } from "@nuxt/content";

// Blog: content/blog/*.md → /blog/<archivo>. Cada post nace con `draft: true`:
// en producción solo existen los que tengan `draft: false` (y entonces entran en el sitemap).
export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        date: z.string(),
        updated: z.string().optional(),
        draft: z.boolean().default(true),
        /** Keyword principal (informe-keywords-claude.md). */
        keyword: z.string(),
        /** Página de servicio a la que enlaza el post (una sola, con anchor descriptivo). */
        service: z.string(),
        serviceAnchor: z.string(),
        /** Revisor responsable antes de publicar. */
        reviewedBy: z.string().optional(),
      }),
    }),
  },
});

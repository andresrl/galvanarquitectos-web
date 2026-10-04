import { defineCollection, defineContentConfig, z } from "@nuxt/content";

// Guides: content/blog/{en,es}/*.md → /journal/<slug> (EN) and /es/guias/<slug> (ES); see app/data/guides.ts.
// Each guide is born with `draft: true`: in production only `draft: false` exists (and enters the sitemap).
export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/**/*.md",
      schema: z.object({
        date: z.string(),
        updated: z.string().optional(),
        draft: z.boolean().default(true),
        lang: z.enum(["en", "es"]),
        /** Slug of the same guide in the other language (hreflang and language switch). */
        translation: z.string(),
        /** Order in the guide index. */
        order: z.number(),
        author: z.string(),
        /** Key of app/data/content/archive.ts. */
        image: z.string(),
        /** Main topic. Spanish keywords come from the 3 Oct 2026 research; English ones are not researched. */
        keyword: z.string(),
        /** Service page the guide links to (one, with a descriptive anchor). */
        service: z.string(),
        serviceAnchor: z.string(),
        /** Reviewer responsible before publishing. */
        reviewedBy: z.string().optional(),
      }),
    }),
  },
});

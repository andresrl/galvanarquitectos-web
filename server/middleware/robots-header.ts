// X-Robots-Tag noindex: on the whole site while it is not indexable and, always, on every page that is not published
// (registry pages not in app/data/publish.ts, the Home until 'home' is published, draft guides, legal and internal pages).
// They are never named in robots.txt or the sitemap, so drafts are not advertised.
import { routes } from "../../app/data/routes";
import { allPages, homePaths, homePublished, normalisePath } from "../../app/data/pages";

const published = new Set([
  ...allPages.filter((p) => p.status === "published").flatMap((p) => Object.values(p.paths)),
  ...(homePublished ? Object.values(homePaths) : []),
]);
// /ignorar-analytics: private tool to exclude your own browser from the stats; never listed or indexed.
const blocked = new Set([...routes.filter((r) => ["legal", "interna"].includes(r.kind)).map((r) => r.path), "/ignorar-analytics"]);
const registered = new Set([...allPages.flatMap((p) => Object.values(p.paths)), ...Object.values(homePaths)]);

export default defineEventHandler((event) => {
  const path = normalisePath((event.path.split("?")[0] ?? "/"));
  const { indexable, publishedPosts } = useRuntimeConfig(event).public;
  const isDraft = registered.has(path) ? !published.has(path) : false;
  const guideDraft = /^\/(journal|es\/guias)\/[^/]+$/.test(path) && !publishedPosts.includes(path);
  if (!indexable || isDraft || guideDraft || blocked.has(path)) setResponseHeader(event, "X-Robots-Tag", "noindex, nofollow, noarchive");
});

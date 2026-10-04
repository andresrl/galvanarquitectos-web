// robots.txt dinámico: bloquea todo hasta que NUXT_PUBLIC_INDEXABLE=true.
export default defineEventHandler((event) => {
  const { indexable, siteUrl } = useRuntimeConfig(event).public;
  setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");

  if (!indexable) return "User-agent: *\nDisallow: /\n";

  // Las páginas internas (/ignore-analytics) no se nombran: llevan noindex propio.
  return ["User-agent: *", "Allow: /", "", `Sitemap: ${siteUrl}/sitemap.xml`, ""].join("\n");
});

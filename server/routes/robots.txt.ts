// robots.txt dinámico: bloquea todo hasta que NUXT_PUBLIC_INDEXABLE=true.
// En vista previa se deja pasar solo a los bots que generan vistas previas al compartir un enlace
// (LinkedIn, X, Facebook, WhatsApp…): respetan robots.txt y sin ellos no hay imagen Open Graph.
// No indexan; la cabecera X-Robots-Tag noindex sigue en toda la web.
const previewBots = ["facebookexternalhit", "Facebot", "LinkedInBot", "Twitterbot", "WhatsApp", "Slackbot", "TelegramBot", "Discordbot"];

export default defineEventHandler((event) => {
  const { indexable, siteUrl } = useRuntimeConfig(event).public;
  setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");

  if (!indexable) return [...previewBots.map((bot) => `User-agent: ${bot}`), "Allow: /", "", "User-agent: *", "Disallow: /", ""].join("\n");

  // Las páginas internas (/ignore-analytics) no se nombran: llevan noindex propio.
  return ["User-agent: *", "Allow: /", "", `Sitemap: ${siteUrl}/sitemap.xml`, ""].join("\n");
});

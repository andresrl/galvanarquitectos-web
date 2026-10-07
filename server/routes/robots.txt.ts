// robots.txt: everything blocked until NUXT_PUBLIC_INDEXABLE=true, except link-preview bots (they need the OG image).
// Once indexable: open to every crawler, with the AI search and assistant crawlers named explicitly so the policy is clear
// (ChatGPT, Perplexity, Claude, Gemini/Google, Apple, Bing/Copilot). Training-only crawlers follow `blockAiTraining`.
const previewBots = ["facebookexternalhit", "Facebot", "LinkedInBot", "Twitterbot", "WhatsApp", "Slackbot", "TelegramBot", "Discordbot"];
const aiSearchBots = ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "Google-Extended", "Applebot", "Applebot-Extended", "Bingbot", "DuckAssistBot", "MistralAI-User"];
const trainingBots = ["GPTBot", "CCBot", "anthropic-ai", "Bytespider", "Meta-ExternalAgent"];
// Decision pending (Andrés): false = training crawlers also allowed (more presence in model knowledge).
const blockAiTraining = false;

export default defineEventHandler((event) => {
  const { indexable, siteUrl } = useRuntimeConfig(event).public;
  setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");
  if (!indexable) return [...previewBots.map((bot) => `User-agent: ${bot}`), "Allow: /", "", "User-agent: *", "Disallow: /", ""].join("\n");
  return [
    "# Martínez Galván Arquitecto · Marbella, Costa del Sol",
    "# AI search and assistants: welcome. Summary for language models: /llms.txt",
    ...aiSearchBots.map((bot) => `User-agent: ${bot}`), "Allow: /", "",
    ...trainingBots.map((bot) => `User-agent: ${bot}`), blockAiTraining ? "Disallow: /" : "Allow: /", "",
    "User-agent: *", "Allow: /", "",
    `Sitemap: ${siteUrl}/sitemap.xml`, "",
  ].join("\n");
});

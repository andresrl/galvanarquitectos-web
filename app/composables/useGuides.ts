// Data and SEO for the guide pages. The look lives in components/diseno/BlogLista.vue and BlogArticulo.vue.
// Pages await the data first and then call the synchronous helpers: Nuxt composables lose their context after an
// await inside a nested function, so no helper here awaits before calling usePageSeo.
import type { Ref } from 'vue'
import type { Locale } from '~/data/pages/types'
import { guideContentPath, guideCopy, guideIndex, guidePath, guideSlug } from '~/data/guides'

const isVisible = (cfg: any, p: any) => !cfg.indexable || cfg.showDrafts || !p.draft

export const guideListData = (locale: Locale) =>
  useAsyncData('guides-' + locale, () => queryCollection('blog').where('lang', '=', locale).order('order', 'ASC').all())
export const guideData = (locale: Locale, slug: string) =>
  useAsyncData(`guide-${locale}-${slug}`, () => queryCollection('blog').path(guideContentPath(locale, slug)).first())

export function useGuideIndex(locale: Locale, list: Ref<any[] | null | undefined>) {
  const cfg = useRuntimeConfig().public, t = guideCopy[locale]
  // The index is indexable once at least 3 guides are published (before that it would be a near-empty page).
  usePageSeo({ title: t.seoTitle ?? t.title, description: t.description, path: guideIndex[locale],
    draft: (list.value ?? []).filter(p => !p.draft).length < 3, alternates: { en: guideIndex.en, es: guideIndex.es } })
  return computed(() => (list.value ?? []).filter(p => isVisible(cfg, p)).map(p => ({ ...p, href: guidePath(locale, guideSlug(p.path)) })))
}

export function useGuidePage(locale: Locale, slug: string, post: Ref<any>, list: Ref<any[] | null | undefined>) {
  const cfg = useRuntimeConfig().public
  if (!post.value || !isVisible(cfg, post.value)) throw createError({ statusCode: 404, statusMessage: locale === 'en' ? 'Guide not found' : 'Guía no encontrada' })
  const other: Locale = locale === 'en' ? 'es' : 'en'
  const path = guidePath(locale, slug)
  const alternates = { [locale]: path, [other]: guidePath(other, post.value.translation) } as Record<Locale, string>
  usePageSeo({ title: post.value.seoTitle ?? post.value.title, description: post.value.description ?? '', path, draft: post.value.draft, alternates,
    article: { datePublished: post.value.date, dateModified: post.value.updated ?? post.value.date, author: post.value.author },
    // The guide is about the service page it links to (its Service node lives on that page).
    about: post.value.service ? (site: string) => ({ '@id': new URL(post.value.service, site).href + '#servicio' }) : undefined })
  // The next three guides after this one, wrapping round, so every guide gets suggested somewhere.
  const more = computed(() => {
    const all = (list.value ?? []).filter(p => isVisible(cfg, p)), at = all.findIndex(p => p.path === post.value.path)
    return [1, 2, 3].map(n => all[(at + n) % all.length]).filter(p => p && p.path !== post.value.path).map(p => ({ title: p.title, href: guidePath(locale, guideSlug(p.path)) }))
  })
  return { more, alternates }
}

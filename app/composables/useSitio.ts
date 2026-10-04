// Infraestructura: todo lo que el diseño necesita, ya resuelto desde los datos del
// briefing. El diseño solo pinta esto; no inventa ni escribe hechos del negocio.
import { negocio } from '~/data/negocio'
import { servicios } from '~/data/servicios'
import { images } from '~/data/images'
import { routes } from '~/data/routes'
import { contenidos } from '~/data/contenidos'
import { migasDe } from './usePageSeo'

export type Trozo = { texto: string; href?: string }

/** Texto redactado → párrafos con sus enlaces ([texto](/ruta)), sin HTML. */
export function parrafos(texto: string): Trozo[][] {
  return String(texto ?? '').split(/\n{1,}/).map((p) => p.trim()).filter(Boolean).map((p) => {
    const trozos: Trozo[] = []
    let ultimo = 0
    for (const m of p.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)) {
      if (m.index! > ultimo) trozos.push({ texto: p.slice(ultimo, m.index) })
      trozos.push({ texto: m[1]!, href: m[2]! })
      ultimo = m.index! + m[0].length
    }
    if (ultimo < p.length) trozos.push({ texto: p.slice(ultimo) })
    return trozos
  })
}

export function useSitio() {
  const cfg = useRuntimeConfig().public
  const { openPreferences } = useCookieConsent()
  const ruta = (path: string) => routes.find((r: any) => r.path === path)
  return {
    negocio,
    servicios,
    routes,
    contenidos,
    /** Logo real del cliente (null si su logo es solo texto). */
    logo: images.find((i: any) => i.tipo === 'logo') ?? null,
    /** Fotos reales del negocio, con su tipo (foto_local, foto_equipo, foto_trabajo, foto_producto). */
    fotos: images.filter((i: any) => i.tipo !== 'logo'),
    menu: routes.filter((r: any) => r.path !== '/' && !['legal', 'interna'].includes(r.kind) && !r.parent),
    hijas: (path: string) => routes.filter((r: any) => r.parent === path),
    /** Migas de pan (Inicio › hub › ficha), las mismas que el BreadcrumbList del schema. */
    migas: migasDe,
    /** Hermanas de una ficha (mismo hub), para «relacionadas». */
    hermanas: (path: string) => { const r: any = routes.find((x: any) => x.path === path); return r?.parent ? routes.filter((x: any) => x.parent === r.parent && x.path !== path) : [] },
    legales: routes.filter((r: any) => r.kind === 'legal'),
    etiqueta: (path: string) => ruta(path)?.label ?? path,
    cta: negocio.cta as { url: string; label: string },
    resenas: (negocio.pruebaSocial?.resenas ?? []) as { autor: string; texto: string; nota?: number; fecha?: string; url?: string }[],
    vistaPrevia: !cfg.indexable,
    abrirCookies: openPreferences,
    /** Úsalo para pintar intro y bloques: respeta párrafos y enlaces internos. */
    parrafos
  }
}

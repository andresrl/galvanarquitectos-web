<script setup lang="ts">
// Private tool: excludes this browser from the stats (localStorage, see app/utils/analytics.ts).
// Not linked anywhere, not in the registry, robots.txt or sitemap; noindex by meta and X-Robots-Tag (server/middleware/robots-header.ts).
const { analytics } = useRuntimeConfig().public
const ignored = ref<boolean | null>(null)

useHead({ title: 'Ignorar analítica · Martínez Galván', meta: [{ name: 'robots', content: 'noindex, nofollow, noarchive' }] })

onMounted(() => { ignored.value = isAnalyticsIgnored() })
function toggle() {
 const next = !ignored.value
 setAnalyticsIgnored(next, analytics.gaId)
 ignored.value = isAnalyticsIgnored()
}
</script>

<template>
 <main class="ignore-analytics">
  <p class="ignore-eyebrow">Analítica · uso interno</p>
  <h1>Tus visitas, <em>fuera de las estadísticas.</em></h1>
  <p class="ignore-lead">Guarda una marca en este navegador para que Umami no cuente tus visitas. Hay que activarla en cada navegador y dispositivo; si borras los datos del sitio, se pierde.</p>
  <p class="ignore-state" aria-live="polite">
   <template v-if="ignored === null">Comprobando este navegador…</template>
   <template v-else-if="ignored">Este navegador está <strong>excluido</strong>: tus visitas no se cuentan.</template>
   <template v-else>Este navegador <strong>se cuenta</strong> en las estadísticas.</template>
  </p>
  <button type="button" class="ignore-button" :disabled="ignored === null" @click="toggle">{{ ignored ? 'Volver a contar mis visitas' : 'No contar mis visitas' }}</button>
 </main>
</template>

<style>
.ignore-analytics{min-height:100svh;padding:clamp(140px,22vh,220px) var(--gutter) 120px;background:var(--paper);color:var(--ink)}
.ignore-eyebrow{display:flex;align-items:center;gap:16px;margin:0 0 30px;font-size:10px;letter-spacing:.24em;text-transform:uppercase}
.ignore-eyebrow::before{content:'';width:46px;height:1px;background:var(--brass)}
.ignore-analytics h1{max-width:900px;margin:0 0 30px;font-family:Manrope,Arial,sans-serif;font-size:clamp(44px,6vw,96px);font-weight:300;line-height:1.06;letter-spacing:-.045em}
.ignore-analytics h1 em{display:block;font-family:var(--serif);font-weight:400;line-height:1.2;letter-spacing:-.03em}
.ignore-lead{max-width:460px;margin:0;font-size:14px;line-height:1.8}
.ignore-state{max-width:460px;margin:44px 0 26px;padding-top:22px;border-top:1px solid #1c211e26;font-size:14px;line-height:1.8}
.ignore-button{display:inline-flex;align-items:center;min-height:48px;padding:0 26px;border:1px solid var(--ink);background:transparent;color:inherit;font:inherit;font-size:11px;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;transition:background .35s,color .35s}
.ignore-button:hover,.ignore-button:focus-visible{background:var(--ink);color:var(--paper)}
.ignore-button:disabled{opacity:.4;cursor:default}
</style>

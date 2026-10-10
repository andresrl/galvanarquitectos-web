<script setup lang="ts">
// Banner de cookies de analítica: una línea, «Rechazar» como enlace subrayado y «Aceptar» como botón (Andrés, 10 oct 2026).
// Lo abre el plugin de analítica si no hay decisión, y "Configurar cookies" en el pie.
// Infraestructura: el diseño solo cambia su aspecto con las variables --cookies-* en diseno.css.
import { legalPaths } from '~/data/legal'
const { consent, bannerOpen, decide } = useCookieConsent();
const {locale}=useGalvan()
</script>

<template>
  <Transition name="cookies">
    <section v-if="bannerOpen" class="cookies" role="dialog" aria-label="Cookies" aria-live="polite">
      <p class="cookies__text">{{locale==='en'?'We use analytics cookies to improve the website.':'Usamos cookies de analítica para mejorar la web.'}} <NuxtLink :to="legalPaths.cookies[locale]" class="cookies__link">{{locale==='en'?'More information':'Más información'}}</NuxtLink><span v-if="consent" class="note"> · {{locale==='en'?'Current:':'Actual:'}} {{consent==='accepted'?(locale==='en'?'accepted':'aceptadas'):(locale==='en'?'rejected':'rechazadas')}}</span></p>
      <div class="cookies__actions">
        <a href="#" class="cookies__link cookies__reject" @click.prevent="decide('rejected')">{{locale==='en'?'Reject':'Rechazar'}}</a>
        <button type="button" class="btn btn--light" @click="decide('accepted')">{{locale==='en'?'Accept':'Aceptar'}}</button>
      </div>
    </section>
  </Transition>
</template>

<style scoped>
.cookies {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: calc(12px + env(safe-area-inset-bottom));
  z-index: 60;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
  max-width: 980px;
  margin-inline: auto;
  padding: 1.3rem 1.5rem;
  border-radius: var(--cookies-radio, 16px);
  background: var(--cookies-fondo, #1f1f1f);
  color: var(--cookies-texto, #fff);
  font-family: var(--cookies-fuente, inherit);
  box-shadow: 0 24px 60px -24px rgb(0 0 0 / 0.6);
  font-size: 0.875rem;
}
.cookies__text { flex: 1 1 260px; margin: 0; }
.cookies__link { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
.cookies__actions { display: flex; align-items: center; gap: 1.4rem; }
.cookies__reject { font-weight: 600; }
.cookies__actions .btn {
  min-height: 48px;
  padding: 0 1.2rem;
  border: 0;
  border-radius: var(--cookies-radio, 16px);
  background: var(--cookies-boton-fondo, #fff);
  color: var(--cookies-boton-texto, #1f1f1f);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}
.link { color: inherit; text-decoration: underline; }
.note { font-size: 0.8rem; }
.cookies-enter-active,
.cookies-leave-active { transition: transform 0.5s cubic-bezier(.22,1,.36,1), opacity 0.5s cubic-bezier(.22,1,.36,1); }
.cookies-enter-from,
.cookies-leave-to { transform: translateY(30px); opacity: 0; }
</style>

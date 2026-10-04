<script setup lang="ts">
// Banner de cookies de analítica. Aceptar y rechazar tienen el mismo peso visual (AEPD).
// Lo abre el plugin de analítica si no hay decisión, y "Configurar cookies" en el pie.
// Infraestructura: el diseño solo cambia su aspecto con las variables --cookies-* en diseno.css.
import { routes } from '~/data/routes'
const cookiePath=routes.find(r=>r.kind==='legal'&&/cookies/.test(r.path))?.path??'/'
const { consent, bannerOpen, decide } = useCookieConsent();
const {locale}=useGalvan()
</script>

<template>
  <Transition name="cookies">
    <section v-if="bannerOpen" class="cookies" role="dialog" aria-labelledby="cookies-title" aria-live="polite">
      <div class="cookies__text">
        <h2 id="cookies-title" class="cookies__title">{{locale==='en'?'Analytics preferences':'Preferencias de analítica'}}</h2>
        <p>{{locale==='en'?'Analytics is disabled in this preview. Your preference can be updated from the footer.':'La analítica está desactivada en esta vista previa. Puedes cambiar tu preferencia desde el pie de la web.'}}</p>
        <p v-if="consent" class="note">{{locale==='en'?'Current preference:':'Preferencia actual:'}} {{consent==='accepted'?(locale==='en'?'accepted':'aceptadas'):(locale==='en'?'rejected':'rechazadas')}}.</p>
      </div>
      <div class="cookies__actions">
        <button type="button" class="btn btn--light" @click="decide('rejected')">{{locale==='en'?'Reject':'Rechazar'}}</button>
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
.cookies__text { display: grid; gap: 0.4rem; flex: 1 1 380px; }
.cookies__title { font-size: 1rem; font-weight: 600; margin: 0; }
.cookies__text p { margin: 0; }
.cookies__actions { display: flex; gap: 0.6rem; }
/* Aceptar y rechazar, mismo peso visual (AEPD) */
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

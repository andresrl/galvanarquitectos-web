// Carga Umami y Google Analytics (GA4) en el navegador, salvo que este navegador
// se haya excluido desde /ignorar-analytics. Solo actúa con NUXT_PUBLIC_ANALYTICS_ENABLED=true.
// - Umami no usa cookies: se carga siempre.
// - GA4 instala cookies: con `gaConsent` solo se carga después de aceptar en el banner
//   (useCookieConsent); sin él (pruebas, temporal) se carga salvo rechazo expreso.
//   Si se retira el consentimiento, se desactiva y se borran sus cookies.
// Los cambios de ruta los registran solos: Umami escucha el history y GA4 lo hace con la
// medición mejorada ("Cambios de página según el historial del navegador").

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function addScript(src: string, attrs: Record<string, string> = {}) {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  for (const [name, value] of Object.entries(attrs)) script.setAttribute(name, value);
  document.head.appendChild(script);
}

let gaLoaded = false;

function loadGoogleAnalytics(gaId: string) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] = false;
  if (gaLoaded) return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag necesita el objeto `arguments`, no un array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", gaId);
  addScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`);
}

function disableGoogleAnalytics(gaId: string) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] = true;
  // Borra las cookies _ga y _ga_<ID> en el dominio actual y en el dominio padre.
  const domain = location.hostname.replace(/^www\./, "");
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim() ?? "";
    if (!name.startsWith("_ga")) continue;
    for (const d of ["", `; domain=.${domain}`]) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`;
    }
  }
}

export default defineNuxtPlugin(() => {
  const { analytics } = useRuntimeConfig().public;
  const { consent, bannerOpen } = useCookieConsent();
  consent.value = readConsent();

  if (!analytics.enabled) return;

  if (isAnalyticsIgnored()) {
    setAnalyticsIgnored(true, analytics.gaId);
    return;
  }

  if (analytics.umamiSrc && analytics.umamiWebsiteId) {
    addScript(analytics.umamiSrc, { defer: "", "data-website-id": analytics.umamiWebsiteId });
  }

  if (!analytics.gaId) return;

  // gaConsent false (pruebas en producción, temporal): GA se carga sin banner en todas las
  // páginas; solo un rechazo expreso desde «Configurar cookies» lo desactiva.
  // gaConsent true: sin decisión previa se muestra el banner y GA espera a que se acepte.
  if (analytics.gaConsent && consent.value === null) bannerOpen.value = true;
  watch(
    consent,
    (value) => {
      if (value === "accepted" || (!analytics.gaConsent && value !== "rejected")) loadGoogleAnalytics(analytics.gaId);
      else if (value === "rejected") disableGoogleAnalytics(analytics.gaId);
    },
    { immediate: true },
  );
});

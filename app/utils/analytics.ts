// Exclusión de analítica en este navegador (página /ignorar-analytics).
// - Umami: su mecanismo oficial, localStorage "umami.disabled" = "1" (lo comprueba en cada envío).
// - Google Analytics: no se carga gtag.js y, si ya estaba cargado, `window["ga-disable-<ID>"] = true`.

const OPT_OUT_KEY = "webix:ignore-analytics";
const UMAMI_KEY = "umami.disabled";

export function isAnalyticsIgnored() {
  try {
    return localStorage.getItem(OPT_OUT_KEY) === "1";
  } catch {
    return false;
  }
}

export function setAnalyticsIgnored(ignored: boolean, gaId: string) {
  try {
    if (ignored) {
      localStorage.setItem(OPT_OUT_KEY, "1");
      localStorage.setItem(UMAMI_KEY, "1");
    } else {
      localStorage.removeItem(OPT_OUT_KEY);
      localStorage.removeItem(UMAMI_KEY);
    }
  } catch {
    // Navegación privada o almacenamiento bloqueado: no hay forma de recordar la decisión.
  }
  (window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] = ignored;
}

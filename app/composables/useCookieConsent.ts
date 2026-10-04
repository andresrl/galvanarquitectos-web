// Consentimiento de cookies de analítica (Google Analytics). Umami no usa cookies y
// no depende de esto. La decisión se guarda en este navegador; sin decisión, GA no se carga.

export type ConsentValue = "accepted" | "rejected";

const STORAGE_KEY = "webix:cookies";

export function readConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function useCookieConsent() {
  // undefined = aún no leído (SSR); null = sin decisión.
  const consent = useState<ConsentValue | null | undefined>("cookie-consent", () => undefined);
  const bannerOpen = useState("cookie-banner-open", () => false);

  function decide(value: ConsentValue) {
    consent.value = value;
    bannerOpen.value = false;
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Almacenamiento bloqueado: la decisión vale para esta visita.
    }
  }

  function openPreferences() {
    bannerOpen.value = true;
  }

  return { consent, bannerOpen, decide, openPreferences };
}

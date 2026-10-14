// Eventos de contacto para Umami y GA4. Nombres exactos que espera el resumen de analítica:
// - contact_form_success: el servidor confirmó el envío del formulario (useEnquiry).
// - contact_whatsapp_click / contact_phone_click / contact_email_click: clic en un enlace
//   wa.me, tel: o mailto: (escucha global en plugins/analytics.client.ts). Son intención, no contacto.
// Si la analítica no está cargada (desactivada, excluida o GA rechazado), no envía nada.

declare global {
  interface Window {
    umami?: { track: (name: string, data?: Record<string, string>) => void };
  }
}

export type ContactEvent = "contact_form_success" | "contact_whatsapp_click" | "contact_phone_click" | "contact_email_click";

export function trackEvent(name: ContactEvent, params: Record<string, string> = {}, pagePath = location.pathname) {
  const data = { ...params, page_path: pagePath.split(/[?#]/)[0] || "/" };
  try {
    window.umami?.track(name, data);
  } catch {
    // Umami aún sin cargar o bloqueado por el navegador.
  }
  if (typeof window.gtag === "function") window.gtag("event", name, data);
}

export function contactEventForHref(href: string): ContactEvent | null {
  if (/^tel:/i.test(href)) return "contact_phone_click";
  if (/^mailto:/i.test(href)) return "contact_email_click";
  if (/^(https?:\/\/)?(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\b|^whatsapp:/i.test(href)) return "contact_whatsapp_click";
  return null;
}

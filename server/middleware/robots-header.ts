// noindex por cabecera: en toda la web mientras no sea indexable y, siempre, en las
// páginas que el registro de rutas marca como no indexables (borradores, legales e
// internas). No se nombran en robots.txt ni en el sitemap para no delatarlas.
import { routes } from "../../app/data/routes";

const paths = routes.filter(r=>r.status!=='publicada'||['legal','interna'].includes(r.kind)).map(r=>r.path);

export default defineEventHandler((event) => {
  const path = (event.path.split("?")[0] ?? "").replace(/\/+$/, "") || "/";
  if (paths.includes(path) || !useRuntimeConfig(event).public.indexable) {
    setResponseHeader(event, "X-Robots-Tag", "noindex, nofollow, noarchive");
  }
});

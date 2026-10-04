// /precios/ → /precios con 301: una sola URL por página.
export default defineEventHandler((event) => {
  const [ruta, consulta] = (event.path ?? '/').split('?')
  if (ruta && ruta.length > 1 && ruta.endsWith('/')) return sendRedirect(event, ruta.replace(/\/+$/, '') + (consulta ? '?' + consulta : ''), 301)
})

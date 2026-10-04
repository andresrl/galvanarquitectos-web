import { redirecciones } from '../../app/data/redirecciones'
export default defineEventHandler(event=>{const u=getRequestURL(event),r=redirecciones.find(r=>r.origen===u.pathname+u.search);if(r&&r.destino!==r.origen)return sendRedirect(event,r.destino,301)})

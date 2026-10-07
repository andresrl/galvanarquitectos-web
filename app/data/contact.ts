// Contact panel (ContactPanel.vue): side drawer on every page and the /contact · /es/contacto page.
// Form fields agreed with Andrés: name, email, optional phone, project area, message. No backend: it prepares an email.
import type { Locale } from './pages/types'

export const contactPaths: Record<Locale, string> = { en: '/contact', es: '/es/contacto' }

export const contactCopy = {
 en: {
  label: 'Contact', title: 'Contact an architect in Marbella',
  description: 'A new villa, a renovation, interiors or a garden on the Costa del Sol. Write to Francisco Martínez Galván, architect in Marbella, in English or Spanish.',
  heading: 'Contact', tagline: 'In Marbella since 1998.', taglineItalic: 'Designing ways of living.',
  lead: 'A new villa, a renovation, interiors or a garden. Let’s start with what you have in mind.',
  fields: { name: 'Name', email: 'Email', phone: 'Phone (optional)', area: 'Project area', message: 'Message' },
  areaHint: 'Marbella, Benahavís, abroad…', send: 'Send', call: 'Call us', close: 'Close', write: 'Write to us',
  note: 'Send opens your email app with the message ready; nothing is sent until you confirm it there. We reply in English or Spanish.',
  regarding: 'Regarding', subject: 'Project enquiry', videoAlt: 'A design conversation in the studio'
 },
 es: {
  label: 'Contacto', title: 'Contacto con un arquitecto en Marbella',
  description: 'Una nueva villa, una reforma, los interiores o un jardín en la Costa del Sol. Escribe a Francisco Martínez Galván, arquitecto en Marbella, en español o inglés.',
  heading: 'Contacto', tagline: 'En Marbella desde 1998.', taglineItalic: 'Diseñando formas de vivir.',
  lead: 'Una nueva villa, una reforma, los interiores o un jardín. Empecemos por lo que tienes en mente.',
  fields: { name: 'Nombre', email: 'Email', phone: 'Teléfono (opcional)', area: 'Zona del proyecto', message: 'Mensaje' },
  areaHint: 'Marbella, Benahavís, el extranjero…', send: 'Enviar', call: 'Llámanos', close: 'Cerrar', write: 'Escríbenos',
  note: 'Enviar abre tu aplicación de correo con el mensaje preparado; no se envía nada hasta que lo confirmes allí. Respondemos en español o inglés.',
  regarding: 'Sobre', subject: 'Consulta de proyecto', videoAlt: 'Una conversación de diseño en el estudio'
 }
}

// Contact panel (ContactPanel.vue): side drawer on every page and the /contact · /es/contacto page.
// Form fields: name, email, optional phone, message. Sent to the studio inbox by /api/contact (server/api/contact.post.ts).
import type { Locale } from './pages/types'

export const contactPaths: Record<Locale, string> = { en: '/contact', es: '/es/contacto' }

export const contactCopy = {
 en: {
  label: 'Contact', title: 'Contact an architect in Marbella',
  description: 'A new villa or a renovation on the Costa del Sol. Write to Francisco Martínez Galván, architect in Marbella, in English or Spanish.',
  heading: 'Contact', tagline: 'In Marbella since 1998.', taglineItalic: 'Designing ways of living.',
  lead: 'A new villa or a renovation. Let’s start with what you have in mind.',
  fields: { name: 'Name', email: 'Email', phone: 'Phone (optional)', message: 'Message' },
  send: 'Send', call: 'Call us', close: 'Close', write: 'Write to us',
  note: 'Your message goes straight to the studio and your details are used only to answer it. We reply in English or Spanish.',
  sending: 'Sending…', sent: 'Thank you. Your message has reached the studio; we will reply to the email address you gave us.',
  error: 'The message could not be sent.', fallback: 'Send it from your email app',
  regarding: 'Regarding', subject: 'Project enquiry', videoAlt: 'A design conversation in the studio'
 },
 es: {
  label: 'Contacto', title: 'Contacto con un arquitecto en Marbella',
  description: 'Una nueva villa o una reforma en la Costa del Sol. Escribe a Francisco Martínez Galván, arquitecto en Marbella, en español o inglés.',
  heading: 'Contacto', tagline: 'En Marbella desde 1998.', taglineItalic: 'Diseñando formas de vivir.',
  lead: 'Una nueva villa o una reforma. Empecemos por lo que tienes en mente.',
  fields: { name: 'Nombre', email: 'Email', phone: 'Teléfono (opcional)', message: 'Mensaje' },
  send: 'Enviar', call: 'Llámanos', close: 'Cerrar', write: 'Escríbenos',
  note: 'Tu mensaje llega directamente al estudio y tus datos solo se usan para responderte. Respondemos en español o inglés.',
  sending: 'Enviando…', sent: 'Gracias. Tu mensaje ha llegado al estudio; te responderemos al email que nos has indicado.',
  error: 'No se ha podido enviar el mensaje.', fallback: 'Envíalo desde tu aplicación de correo',
  regarding: 'Sobre', subject: 'Consulta de proyecto', videoAlt: 'Una conversación de diseño en el estudio'
 }
}

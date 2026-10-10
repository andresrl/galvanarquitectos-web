// Legal pages (LegalPage.vue): legal notice (LSSI), privacy (GDPR / LOPDGDD) and cookies, EN and ES.
// Written for how the site actually works: the contact form sends the enquiry by email to the architect's inbox
// through Gmail (server/api/contact.post.ts; nothing is stored on the server), Umami (cookieless) and Google Analytics 4 analytics, one language cookie and the cookie preference in local storage, self-hosted
// fonts and video. Unconfirmed identification data (tax ID, professional registration) is NOT published: the pages
// stay drafts until it is completed (`pending` in app/data/pages/projects.ts → legalPages).
import type { Locale } from './pages/types'
import { negocio } from './negocio'

export type LegalId = 'legal-notice' | 'privacy' | 'cookies'
type Section = { heading: string; paragraphs: string[]; list?: string[] }
type Doc = { label: string; title: string; description: string; heading: string; updated: string; sections: Section[] }

const d = negocio.contacto.direccion, address = `${d.streetAddress}, ${d.postalCode} ${d.addressLocality} (${d.addressRegion})`
const email = negocio.contacto.email, mobile = negocio.contacto.telefono, studioPhone = negocio.contacto.telefonoEstudio, holder = negocio.arquitecto.nombre

export const legalPaths: Record<LegalId, Record<Locale, string>> = {
 'legal-notice': { en: '/legal-notice', es: '/es/aviso-legal' },
 privacy: { en: '/privacy-policy', es: '/es/politica-privacidad' },
 cookies: { en: '/cookie-policy', es: '/es/politica-cookies' }
}

export const legalCopy: Record<LegalId, Record<Locale, Doc>> = {
 'legal-notice': {
  en: { label: 'Legal notice', title: 'Legal notice', heading: 'Legal notice', updated: 'Last updated: 7 October 2026',
   description: 'Legal notice of the Martínez Galván Arquitecto website: website owner, contact details, conditions of use, intellectual property and applicable law.',
   sections: [
    { heading: 'Website owner', paragraphs: [`In compliance with Spanish Law 34/2002 on information society services (LSSI-CE), the owner of this website is ${holder}, architect, trading as ${negocio.nombre}.`], list: [`Address: ${address}, Spain`, `Email: ${email}`, `Telephone: ${mobile} (mobile) · ${studioPhone} (studio)`] },
    { heading: 'Purpose of the website', paragraphs: ['This website presents the architecture services of the studio and a selection of its projects, and provides ways to contact the architect.'] },
    { heading: 'Conditions of use', paragraphs: ['Access to the website is free and implies acceptance of these conditions. Users undertake to use the website and its contents lawfully and not to damage it or prevent its normal use.'] },
    { heading: 'Intellectual and industrial property', paragraphs: ['The texts, photographs, architectural visualisations, drawings, logos and design of this website belong to the studio or to their respective owners and are protected by intellectual and industrial property law. Their reproduction, distribution or transformation without written permission is not allowed, except for personal, non-commercial use.', 'Some projects are shown with architectural visualisations (renders); they illustrate a proposal and are identified as such on each project page.'] },
    { heading: 'Liability', paragraphs: ['The contents are for information only and do not constitute a professional proposal for any particular case: every commission is studied individually. The studio is not responsible for the contents of external websites linked from this site.'] },
    { heading: 'Applicable law', paragraphs: ['These conditions are governed by Spanish law. Any dispute will be submitted to the courts that are competent under the applicable regulations.'] }
   ] },
  es: { label: 'Aviso legal', title: 'Aviso legal', heading: 'Aviso legal', updated: 'Última actualización: 7 de octubre de 2026',
   description: 'Aviso legal de la web de Martínez Galván Arquitecto: titular, datos de contacto, condiciones de uso, propiedad intelectual y legislación aplicable.',
   sections: [
    { heading: 'Titular del sitio web', paragraphs: [`En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), el titular de este sitio web es ${holder}, arquitecto, que desarrolla su actividad como ${negocio.nombre}.`], list: [`Domicilio: ${address}, España`, `Email: ${email}`, `Teléfono: ${mobile} (móvil) · ${studioPhone} (estudio)`] },
    { heading: 'Objeto', paragraphs: ['Esta web presenta los servicios de arquitectura del estudio y una selección de sus proyectos, y ofrece medios para contactar con el arquitecto.'] },
    { heading: 'Condiciones de uso', paragraphs: ['El acceso a la web es libre e implica la aceptación de estas condiciones. Quien la utiliza se compromete a hacer un uso lícito de la web y de sus contenidos y a no dañarla ni impedir su funcionamiento normal.'] },
    { heading: 'Propiedad intelectual e industrial', paragraphs: ['Los textos, fotografías, visualizaciones arquitectónicas, planos, logotipos y diseño de esta web pertenecen al estudio o a sus respectivos titulares y están protegidos por la normativa de propiedad intelectual e industrial. No se permite su reproducción, distribución o transformación sin autorización escrita, salvo para uso personal y no comercial.', 'Algunos proyectos se muestran con visualizaciones arquitectónicas (renders); ilustran una propuesta y se identifican como tales en cada ficha.'] },
    { heading: 'Responsabilidad', paragraphs: ['Los contenidos tienen carácter informativo y no constituyen una propuesta profesional para un caso concreto: cada encargo se estudia de forma individual. El estudio no se responsabiliza de los contenidos de webs externas enlazadas desde este sitio.'] },
    { heading: 'Legislación aplicable', paragraphs: ['Estas condiciones se rigen por la legislación española. Cualquier controversia se someterá a los juzgados y tribunales que resulten competentes conforme a la normativa aplicable.'] }
   ] }
 },
 privacy: {
  en: { label: 'Privacy policy', title: 'Privacy policy', heading: 'Privacy policy', updated: 'Last updated: 10 October 2026',
   description: 'How Martínez Galván Arquitecto handles the personal data you send when you contact the studio: purpose, legal basis, retention and your rights under the GDPR.',
   sections: [
    { heading: 'Data controller', paragraphs: [`${holder}, architect (${negocio.nombre}).`], list: [`Address: ${address}, Spain`, `Email: ${email}`, `Telephone: ${mobile} (mobile) · ${studioPhone} (studio)`] },
    { heading: 'What data we receive', paragraphs: ['When you use the contact form, the data you enter are sent to us by email: your name, email address, telephone number if you give it, the area of your project where asked, the page you were viewing and the content of your message. The website does not keep them in a database. We also receive the data you choose to send us directly by email or telephone.'] },
    { heading: 'Purpose and legal basis', paragraphs: ['We use these data to answer your enquiry and, if you wish, to prepare and carry out a professional commission. The legal basis is your consent when you contact us and, where applicable, the steps taken at your request before entering into a contract and the performance of that contract (Article 6.1(a) and (b) of the GDPR).'] },
    { heading: 'Retention', paragraphs: ['Data are kept for as long as needed to answer your enquiry or manage the professional relationship and, afterwards, for the periods required by law.'] },
    { heading: 'Recipients', paragraphs: ['Data are not sold or passed on to third parties, except where required by law. Technical service providers (such as email or hosting) may process them on our behalf, under the corresponding agreements. Messages sent through the contact form are delivered through Google’s email service (Gmail). Website usage statistics are measured with Google Analytics 4 (Google Ireland Ltd.), which may involve transfers to Google LLC in the United States under the EU–US Data Privacy Framework, and with Umami, which does not use cookies or store personal data.'] },
    { heading: 'Your rights', paragraphs: [`You can request access to your data, their rectification or erasure, the restriction of processing, object to it or ask for portability, and withdraw your consent at any time, by writing to ${email}. You also have the right to lodge a complaint with the Spanish Data Protection Agency (www.aepd.es).`] }
   ] },
  es: { label: 'Política de privacidad', title: 'Política de privacidad', heading: 'Política de privacidad', updated: 'Última actualización: 10 de octubre de 2026',
   description: 'Cómo trata Martínez Galván Arquitecto los datos personales que envías al contactar con el estudio: finalidad, base legal, conservación y tus derechos según el RGPD.',
   sections: [
    { heading: 'Responsable del tratamiento', paragraphs: [`${holder}, arquitecto (${negocio.nombre}).`], list: [`Domicilio: ${address}, España`, `Email: ${email}`, `Teléfono: ${mobile} (móvil) · ${studioPhone} (estudio)`] },
    { heading: 'Qué datos recibimos', paragraphs: ['Cuando usas el formulario de contacto, los datos que escribes nos llegan por email: tu nombre, tu email, tu teléfono si lo indicas, la zona del proyecto cuando se pide, la página que estabas viendo y el contenido de tu mensaje. La web no los guarda en ninguna base de datos. También recibimos los datos que decides enviarnos directamente por email o por teléfono.'] },
    { heading: 'Finalidad y base legal', paragraphs: ['Usamos estos datos para responder a tu consulta y, si lo deseas, para preparar y desarrollar un encargo profesional. La base legal es tu consentimiento al contactarnos y, en su caso, la aplicación de medidas precontractuales a petición tuya y la ejecución del contrato (artículo 6.1.a y b del RGPD).'] },
    { heading: 'Conservación', paragraphs: ['Los datos se conservan mientras sean necesarios para responder a tu consulta o gestionar la relación profesional y, después, durante los plazos que exija la ley.'] },
    { heading: 'Destinatarios', paragraphs: ['Los datos no se venden ni se ceden a terceros, salvo obligación legal. Proveedores de servicios técnicos (como el correo electrónico o el alojamiento) pueden tratarlos por cuenta nuestra, con los contratos correspondientes. Los mensajes del formulario de contacto se entregan mediante el servicio de correo de Google (Gmail). Las estadísticas de uso de la web se miden con Google Analytics 4 (Google Ireland Ltd.), que puede implicar transferencias a Google LLC en Estados Unidos al amparo del Marco de Privacidad de Datos UE-EE. UU., y con Umami, que no usa cookies ni guarda datos personales.'] },
    { heading: 'Tus derechos', paragraphs: [`Puedes solicitar el acceso a tus datos, su rectificación o supresión, la limitación del tratamiento, oponerte a él o pedir la portabilidad, y retirar tu consentimiento en cualquier momento, escribiendo a ${email}. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).`] }
   ] }
 },
 cookies: {
  en: { label: 'Cookie policy', title: 'Cookie policy', heading: 'Cookie policy', updated: 'Last updated: 10 October 2026',
   description: 'Cookies and local storage used by the Martínez Galván Arquitecto website: technical and preference items, Google Analytics 4 statistics cookies and cookieless Umami analytics. No advertising.',
   sections: [
    { heading: 'What we use', paragraphs: ['This website uses technical and preference elements, which do not require consent, and Google Analytics 4 statistics cookies. It does not use advertising cookies. Fonts and videos are served from our own website, without third-party services.'],
     list: ['galvan-lang (own cookie, 1 year): remembers the language you chose, English or Spanish, so the site does not change it again.', 'webix:cookies (local storage in your browser, until you delete it): remembers your choice about analytics cookies.'] },
    { heading: 'Analytics', paragraphs: ['We measure how the website is used (pages visited, approximate origin, device) to improve it. Umami counts visits without cookies and without storing personal data. Google Analytics 4, provided by Google Ireland Ltd., uses the cookies below; Google may process the data in the United States under the EU–US Data Privacy Framework. You can reject or accept these cookies at any time from “Cookie settings” in the footer.'],
     list: ['_ga (Google Analytics, 2 years): distinguishes visitors anonymously.', '_ga_66D6QH2ZMH (Google Analytics, 2 years): keeps the state of the session.'] },
    { heading: 'How to manage them', paragraphs: ['You can delete or block cookies and local storage from your browser settings. If you block the language cookie, the site will work normally but may not remember your language choice.'] }
   ] },
  es: { label: 'Política de cookies', title: 'Política de cookies', heading: 'Política de cookies', updated: 'Última actualización: 10 de octubre de 2026',
   description: 'Cookies y almacenamiento local que usa la web de Martínez Galván Arquitecto: elementos técnicos y de preferencias, cookies estadísticas de Google Analytics 4 y analítica Umami sin cookies. Sin publicidad.',
   sections: [
    { heading: 'Qué utilizamos', paragraphs: ['Esta web utiliza elementos técnicos y de preferencias, que no requieren consentimiento, y cookies estadísticas de Google Analytics 4. No usa cookies publicitarias. Las fuentes y los vídeos se sirven desde nuestra propia web, sin servicios de terceros.'],
     list: ['galvan-lang (cookie propia, 1 año): recuerda el idioma que elegiste, español o inglés, para que la web no lo vuelva a cambiar.', 'webix:cookies (almacenamiento local de tu navegador, hasta que lo borres): recuerda tu decisión sobre las cookies de analítica.'] },
    { heading: 'Analítica', paragraphs: ['Medimos cómo se usa la web (páginas visitadas, procedencia aproximada, dispositivo) para mejorarla. Umami cuenta las visitas sin cookies y sin guardar datos personales. Google Analytics 4, de Google Ireland Ltd., usa las cookies que se indican abajo; Google puede tratar los datos en Estados Unidos al amparo del Marco de Privacidad de Datos UE-EE. UU. Puedes rechazar o aceptar estas cookies en cualquier momento desde «Configurar cookies», en el pie de la web.'],
     list: ['_ga (Google Analytics, 2 años): distingue a los visitantes de forma anónima.', '_ga_66D6QH2ZMH (Google Analytics, 2 años): mantiene el estado de la sesión.'] },
    { heading: 'Cómo gestionarlas', paragraphs: ['Puedes borrar o bloquear las cookies y el almacenamiento local desde la configuración de tu navegador. Si bloqueas la cookie de idioma, la web funcionará con normalidad, pero puede que no recuerde el idioma que elegiste.'] }
   ] }
 }
}

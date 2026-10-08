// Legal pages (LegalPage.vue): legal notice (LSSI), privacy (GDPR / LOPDGDD) and cookies, EN and ES.
// Written for how the site actually works: the contact form only opens the visitor's email app (nothing is stored on
// the server), analytics is disabled, one language cookie and the cookie preference in local storage, self-hosted
// fonts and video. Unconfirmed identification data (tax ID, professional registration) is NOT published: the pages
// stay drafts until it is completed (`pending` in app/data/pages/projects.ts → legalPages).
import type { Locale } from './pages/types'
import { negocio } from './negocio'

export type LegalId = 'legal-notice' | 'privacy' | 'cookies'
type Section = { heading: string; paragraphs: string[]; list?: string[] }
type Doc = { label: string; title: string; description: string; heading: string; updated: string; sections: Section[] }

const d = negocio.contacto.direccion, address = `${d.streetAddress}, ${d.postalCode} ${d.addressLocality} (${d.addressRegion})`
const email = negocio.contacto.email, phone = negocio.contacto.telefono, holder = negocio.arquitecto.nombre

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
    { heading: 'Website owner', paragraphs: [`In compliance with Spanish Law 34/2002 on information society services (LSSI-CE), the owner of this website is ${holder}, architect, trading as ${negocio.nombre}.`], list: [`Address: ${address}, Spain`, `Email: ${email}`, `Telephone: ${phone}`] },
    { heading: 'Purpose of the website', paragraphs: ['This website presents the architecture services of the studio and a selection of its projects, and provides ways to contact the architect.'] },
    { heading: 'Conditions of use', paragraphs: ['Access to the website is free and implies acceptance of these conditions. Users undertake to use the website and its contents lawfully and not to damage it or prevent its normal use.'] },
    { heading: 'Intellectual and industrial property', paragraphs: ['The texts, photographs, architectural visualisations, drawings, logos and design of this website belong to the studio or to their respective owners and are protected by intellectual and industrial property law. Their reproduction, distribution or transformation without written permission is not allowed, except for personal, non-commercial use.', 'Some projects are shown with architectural visualisations (renders); they illustrate a proposal and are identified as such on each project page.'] },
    { heading: 'Liability', paragraphs: ['The contents are for information only and do not constitute a professional proposal for any particular case: every commission is studied individually. The studio is not responsible for the contents of external websites linked from this site.'] },
    { heading: 'Applicable law', paragraphs: ['These conditions are governed by Spanish law. Any dispute will be submitted to the courts that are competent under the applicable regulations.'] }
   ] },
  es: { label: 'Aviso legal', title: 'Aviso legal', heading: 'Aviso legal', updated: 'Última actualización: 7 de octubre de 2026',
   description: 'Aviso legal de la web de Martínez Galván Arquitecto: titular, datos de contacto, condiciones de uso, propiedad intelectual y legislación aplicable.',
   sections: [
    { heading: 'Titular del sitio web', paragraphs: [`En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), el titular de este sitio web es ${holder}, arquitecto, que desarrolla su actividad como ${negocio.nombre}.`], list: [`Domicilio: ${address}, España`, `Email: ${email}`, `Teléfono: ${phone}`] },
    { heading: 'Objeto', paragraphs: ['Esta web presenta los servicios de arquitectura del estudio y una selección de sus proyectos, y ofrece medios para contactar con el arquitecto.'] },
    { heading: 'Condiciones de uso', paragraphs: ['El acceso a la web es libre e implica la aceptación de estas condiciones. Quien la utiliza se compromete a hacer un uso lícito de la web y de sus contenidos y a no dañarla ni impedir su funcionamiento normal.'] },
    { heading: 'Propiedad intelectual e industrial', paragraphs: ['Los textos, fotografías, visualizaciones arquitectónicas, planos, logotipos y diseño de esta web pertenecen al estudio o a sus respectivos titulares y están protegidos por la normativa de propiedad intelectual e industrial. No se permite su reproducción, distribución o transformación sin autorización escrita, salvo para uso personal y no comercial.', 'Algunos proyectos se muestran con visualizaciones arquitectónicas (renders); ilustran una propuesta y se identifican como tales en cada ficha.'] },
    { heading: 'Responsabilidad', paragraphs: ['Los contenidos tienen carácter informativo y no constituyen una propuesta profesional para un caso concreto: cada encargo se estudia de forma individual. El estudio no se responsabiliza de los contenidos de webs externas enlazadas desde este sitio.'] },
    { heading: 'Legislación aplicable', paragraphs: ['Estas condiciones se rigen por la legislación española. Cualquier controversia se someterá a los juzgados y tribunales que resulten competentes conforme a la normativa aplicable.'] }
   ] }
 },
 privacy: {
  en: { label: 'Privacy policy', title: 'Privacy policy', heading: 'Privacy policy', updated: 'Last updated: 7 October 2026',
   description: 'How Martínez Galván Arquitecto handles the personal data you send when you contact the studio: purpose, legal basis, retention and your rights under the GDPR.',
   sections: [
    { heading: 'Data controller', paragraphs: [`${holder}, architect (${negocio.nombre}).`], list: [`Address: ${address}, Spain`, `Email: ${email}`, `Telephone: ${phone}`] },
    { heading: 'What data we receive', paragraphs: ['The contact form on this website does not send or store anything on our servers: it prepares a message in your own email application, and you decide whether to send it. We therefore only receive the data you choose to send us by email or telephone: usually your name, email address, telephone number, the area of your project and the content of your message.'] },
    { heading: 'Purpose and legal basis', paragraphs: ['We use these data to answer your enquiry and, if you wish, to prepare and carry out a professional commission. The legal basis is your consent when you contact us and, where applicable, the steps taken at your request before entering into a contract and the performance of that contract (Article 6.1(a) and (b) of the GDPR).'] },
    { heading: 'Retention', paragraphs: ['Data are kept for as long as needed to answer your enquiry or manage the professional relationship and, afterwards, for the periods required by law.'] },
    { heading: 'Recipients', paragraphs: ['Data are not sold or passed on to third parties, except where required by law. Technical service providers (such as email or hosting) may process them on our behalf, under the corresponding agreements.'] },
    { heading: 'Your rights', paragraphs: [`You can request access to your data, their rectification or erasure, the restriction of processing, object to it or ask for portability, and withdraw your consent at any time, by writing to ${email}. You also have the right to lodge a complaint with the Spanish Data Protection Agency (www.aepd.es).`] }
   ] },
  es: { label: 'Política de privacidad', title: 'Política de privacidad', heading: 'Política de privacidad', updated: 'Última actualización: 7 de octubre de 2026',
   description: 'Cómo trata Martínez Galván Arquitecto los datos personales que envías al contactar con el estudio: finalidad, base legal, conservación y tus derechos según el RGPD.',
   sections: [
    { heading: 'Responsable del tratamiento', paragraphs: [`${holder}, arquitecto (${negocio.nombre}).`], list: [`Domicilio: ${address}, España`, `Email: ${email}`, `Teléfono: ${phone}`] },
    { heading: 'Qué datos recibimos', paragraphs: ['El formulario de contacto de esta web no envía ni guarda nada en nuestros servidores: prepara un mensaje en tu propia aplicación de correo y tú decides si enviarlo. Por eso solo recibimos los datos que decides enviarnos por email o por teléfono: normalmente tu nombre, email, teléfono, la zona de tu proyecto y el contenido de tu mensaje.'] },
    { heading: 'Finalidad y base legal', paragraphs: ['Usamos estos datos para responder a tu consulta y, si lo deseas, para preparar y desarrollar un encargo profesional. La base legal es tu consentimiento al contactarnos y, en su caso, la aplicación de medidas precontractuales a petición tuya y la ejecución del contrato (artículo 6.1.a y b del RGPD).'] },
    { heading: 'Conservación', paragraphs: ['Los datos se conservan mientras sean necesarios para responder a tu consulta o gestionar la relación profesional y, después, durante los plazos que exija la ley.'] },
    { heading: 'Destinatarios', paragraphs: ['Los datos no se venden ni se ceden a terceros, salvo obligación legal. Proveedores de servicios técnicos (como el correo electrónico o el alojamiento) pueden tratarlos por cuenta nuestra, con los contratos correspondientes.'] },
    { heading: 'Tus derechos', paragraphs: [`Puedes solicitar el acceso a tus datos, su rectificación o supresión, la limitación del tratamiento, oponerte a él o pedir la portabilidad, y retirar tu consentimiento en cualquier momento, escribiendo a ${email}. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).`] }
   ] }
 },
 cookies: {
  en: { label: 'Cookie policy', title: 'Cookie policy', heading: 'Cookie policy', updated: 'Last updated: 7 October 2026',
   description: 'Cookies and local storage used by the Martínez Galván Arquitecto website: only technical and preference items, no advertising, and analytics currently disabled.',
   sections: [
    { heading: 'What we use', paragraphs: ['This website only uses technical and preference elements, which do not require consent. It does not use advertising cookies, and analytics is currently disabled. Fonts and videos are served from our own website, without third-party services.'],
     list: ['galvan-lang (own cookie, 1 year): remembers the language you chose, English or Spanish, so the site does not change it again.', 'webix:cookies (local storage in your browser, until you delete it): remembers your choice about analytics cookies.'] },
    { heading: 'Analytics', paragraphs: ['If analytics is enabled in the future, it will only be loaded after you accept it, and this policy will list the cookies involved. You can change your choice at any time from “Cookie settings” in the footer.'] },
    { heading: 'How to manage them', paragraphs: ['You can delete or block cookies and local storage from your browser settings. If you block the language cookie, the site will work normally but may not remember your language choice.'] }
   ] },
  es: { label: 'Política de cookies', title: 'Política de cookies', heading: 'Política de cookies', updated: 'Última actualización: 7 de octubre de 2026',
   description: 'Cookies y almacenamiento local que usa la web de Martínez Galván Arquitecto: solo elementos técnicos y de preferencias, sin publicidad y con la analítica desactivada.',
   sections: [
    { heading: 'Qué utilizamos', paragraphs: ['Esta web solo utiliza elementos técnicos y de preferencias, que no requieren consentimiento. No usa cookies publicitarias y la analítica está actualmente desactivada. Las fuentes y los vídeos se sirven desde nuestra propia web, sin servicios de terceros.'],
     list: ['galvan-lang (cookie propia, 1 año): recuerda el idioma que elegiste, español o inglés, para que la web no lo vuelva a cambiar.', 'webix:cookies (almacenamiento local de tu navegador, hasta que lo borres): recuerda tu decisión sobre las cookies de analítica.'] },
    { heading: 'Analítica', paragraphs: ['Si en el futuro se activa la analítica, solo se cargará después de que la aceptes, y esta política indicará las cookies que utiliza. Puedes cambiar tu decisión en cualquier momento desde «Configurar cookies», en el pie de la web.'] },
    { heading: 'Cómo gestionarlas', paragraphs: ['Puedes borrar o bloquear las cookies y el almacenamiento local desde la configuración de tu navegador. Si bloqueas la cookie de idioma, la web funcionará con normalidad, pero puede que no recuerde el idioma que elegiste.'] }
   ] }
 }
}

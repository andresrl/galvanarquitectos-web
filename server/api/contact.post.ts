// POST /api/contact: the contact forms (ContactPanel.vue, ServicePage.vue) send the enquiry here and it reaches
// Francisco's inbox through Gmail SMTP, with the visitor's address as Reply-To. Nothing is stored on the server.
// Addresses and credentials come only from the environment at runtime (never built into the bundle or the repo):
//   GMAIL_USER          Gmail account that owns the app password (also the sender)
//   GMAIL_APP_PASSWORD  its 16-character app password (spaces allowed)
//   CONTACT_TO          optional; inbox that receives the enquiries (default: GMAIL_USER)
//   CONTACT_FROM_NAME   optional; sender name shown in the inbox (default: Web <negocio.nombre>)
import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'
import { negocio } from '../../app/data/negocio'

const limits = { name: 150, email: 254, phone: 50, location: 200, regarding: 200, page: 300, message: 5000 } as const
type Field = keyof typeof limits
const emailPattern = /^[^\s@<>()",;]+@[^\s@<>()",;]+\.[^\s@<>()",;]+$/

// Basic flood control per IP: 5 enquiries every 10 minutes (memory only; enough for a single Node process).
const windowMs = 10 * 60 * 1000, maxPerWindow = 5
const recent = new Map<string, number[]>()
function limited(ip: string) {
  const now = Date.now(), hits = (recent.get(ip) ?? []).filter(t => now - t < windowMs)
  if (recent.size > 5000) recent.clear()
  if (hits.length >= maxPerWindow) { recent.set(ip, hits); return true }
  recent.set(ip, [...hits, now]); return false
}

let transport: Transporter | null = null
function mailer() {
  const user = process.env.GMAIL_USER?.trim(), pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '')
  if (!user || !pass) return null
  transport ??= nodemailer.createTransport({ host: 'smtp.gmail.com', port: 465, secure: true, auth: { user, pass } })
  return { transport, user }
}

// Single-line fields lose line breaks (header safety); the message keeps them.
function read(body: Record<string, unknown>, field: Field) {
  const value = typeof body[field] === 'string' ? (body[field] as string).trim() : ''
  if (value.length > limits[field]) throw createError({ statusCode: 400, statusMessage: 'Invalid enquiry' })
  return field === 'message' ? value.replace(/\r\n?/g, '\n') : value.replace(/[\r\n\t]+/g, ' ')
}

export default defineEventHandler(async event => {
  const body = await readBody<Record<string, unknown>>(event).catch(() => null)
  if (!body || typeof body !== 'object') throw createError({ statusCode: 400, statusMessage: 'Invalid enquiry' })
  // Honeypot: a hidden field only bots fill in. Answer as if sent, send nothing.
  if (typeof body.website === 'string' && body.website.trim()) return { ok: true }

  const f = Object.fromEntries((Object.keys(limits) as Field[]).map(k => [k, read(body, k)])) as Record<Field, string>
  if (!f.name || !f.message || !emailPattern.test(f.email)) throw createError({ statusCode: 400, statusMessage: 'Invalid enquiry' })

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  if (limited(ip)) throw createError({ statusCode: 429, statusMessage: 'Too many enquiries' })

  const mail = mailer()
  if (!mail) { console.error('[contact] GMAIL_USER / GMAIL_APP_PASSWORD not set'); throw createError({ statusCode: 503, statusMessage: 'Email not configured' }) }

  const english = body.locale === 'en'
  const page = f.page.startsWith('/') ? getRequestURL(event).origin + f.page : ''
  const lines = [
    `Nueva consulta desde la web${english ? ' (en inglés)' : ''}`, '',
    `Nombre: ${f.name}`, `Email: ${f.email}`,
    f.phone ? `Teléfono: ${f.phone}` : null, f.location ? `Zona del proyecto: ${f.location}` : null,
    f.regarding ? `Sobre: ${f.regarding}` : null, page ? `Página: ${page}` : null,
    '', 'Mensaje:', f.message
  ].filter(line => line !== null)

  try {
    await mail.transport.sendMail({
      from: { name: process.env.CONTACT_FROM_NAME?.trim() || `Web ${negocio.nombre}`, address: mail.user },
      to: process.env.CONTACT_TO?.trim() || mail.user,
      replyTo: { name: f.name, address: f.email },
      subject: ['Consulta web', f.name, f.regarding || f.location].filter(Boolean).join(' · '),
      text: lines.join('\n')
    })
  } catch (error) {
    console.error('[contact] send failed:', (error as Error).message)
    throw createError({ statusCode: 502, statusMessage: 'Email not sent' })
  }
  return { ok: true }
})

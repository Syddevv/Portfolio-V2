export const CONTACT_LIMITS = {
  firstName: 80,
  lastName: 80,
  email: 254,
  message: 5_000,
  website: 200,
} as const

export type ContactPayload = {
  firstName: string
  lastName: string
  email: string
  message: string
  website: string
}

export type ContactField = 'firstName' | 'lastName' | 'email' | 'message'

type ValidationResult =
  | { ok: true; value: ContactPayload }
  | { ok: false; error: string; fields: Partial<Record<ContactField, string>> }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readText(payload: Record<string, unknown>, field: keyof ContactPayload) {
  const value = payload[field]
  return typeof value === 'string' ? value.trim() : ''
}

export function validateContactPayload(payload: unknown): ValidationResult {
  if (!isRecord(payload)) {
    return { ok: false, error: 'Please check the form and try again.', fields: {} }
  }

  const value: ContactPayload = {
    firstName: readText(payload, 'firstName'),
    lastName: readText(payload, 'lastName'),
    email: readText(payload, 'email'),
    message: readText(payload, 'message'),
    website: readText(payload, 'website'),
  }
  const fields: Partial<Record<ContactField, string>> = {}

  if (!value.firstName) fields.firstName = 'First name is required.'
  else if (value.firstName.length > CONTACT_LIMITS.firstName) fields.firstName = `First name must be ${CONTACT_LIMITS.firstName} characters or fewer.`

  if (value.lastName.length > CONTACT_LIMITS.lastName) fields.lastName = `Last name must be ${CONTACT_LIMITS.lastName} characters or fewer.`

  if (!value.email) fields.email = 'Email is required.'
  else if (value.email.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(value.email)) fields.email = 'Enter a valid email address.'

  if (!value.message) fields.message = 'Message is required.'
  else if (value.message.length > CONTACT_LIMITS.message) fields.message = `Message must be ${CONTACT_LIMITS.message.toLocaleString()} characters or fewer.`

  if (value.website.length > CONTACT_LIMITS.website) {
    return { ok: false, error: 'Please check the form and try again.', fields: {} }
  }

  return Object.keys(fields).length > 0
    ? { ok: false, error: 'Please correct the marked fields.', fields }
    : { ok: true, value }
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] ?? character)
}

export function buildContactEmail(payload: ContactPayload) {
  const fullName = [payload.firstName, payload.lastName].filter(Boolean).join(' ')
  const safeName = escapeHtml(fullName)
  const safeEmail = escapeHtml(payload.email)
  const safeMessage = escapeHtml(payload.message).replace(/\r?\n/g, '<br>')
  const subjectName = fullName.replace(/[\r\n]+/g, ' ')

  return {
    subject: `Portfolio contact from ${subjectName}`,
    html: `
      <div style="margin:0;background:#f3f0e9;padding:32px;font-family:Arial,Helvetica,sans-serif;color:#111;">
        <div style="max-width:640px;margin:0 auto;border:3px solid #000;background:#fff;box-shadow:8px 8px 0 #000;">
          <div style="border-bottom:3px solid #000;background:#ffe600;padding:20px 24px;">
            <p style="margin:0 0 6px;font:700 11px/1.2 monospace;letter-spacing:.08em;">PORTFOLIO CONTACT</p>
            <h1 style="margin:0;font-size:26px;line-height:1.1;">New message from ${safeName}</h1>
          </div>
          <div style="padding:24px;">
            <p style="margin:0 0 8px;font:700 11px/1.2 monospace;letter-spacing:.06em;">REPLY TO</p>
            <p style="margin:0 0 24px;font-size:16px;"><a href="mailto:${safeEmail}" style="color:#111;">${safeEmail}</a></p>
            <p style="margin:0 0 8px;font:700 11px/1.2 monospace;letter-spacing:.06em;">MESSAGE</p>
            <div style="border:2px solid #000;background:#f3f0e9;padding:16px;font-size:16px;line-height:1.55;overflow-wrap:anywhere;">${safeMessage}</div>
          </div>
        </div>
      </div>
    `.trim(),
  }
}

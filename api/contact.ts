import type { IncomingMessage, ServerResponse } from 'node:http'
import { Resend } from 'resend'
import { buildContactEmail, validateContactPayload } from './_lib/contact-core.js'

type ApiRequest = IncomingMessage & { body?: unknown }

const BODY_LIMIT_BYTES = 16_000
const RATE_LIMIT_WINDOW_MS = 10 * 60_000
const RATE_LIMIT_REQUESTS = 3
const rateLimits = new Map<string, { count: number; resetAt: number }>()

function sendJson(response: ServerResponse, status: number, body: unknown) {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')
  response.end(JSON.stringify(body))
}

function parseBody(body: unknown) {
  if (typeof body === 'string') return JSON.parse(body) as unknown
  return body
}

function getClientIp(request: IncomingMessage) {
  const forwarded = request.headers['x-forwarded-for']
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded
  return value?.split(',')[0]?.trim() || request.socket.remoteAddress || 'unknown'
}

function consumeRateLimit(key: string) {
  const now = Date.now()
  const current = rateLimits.get(key)

  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true, retryAfter: 0 }
  }
  if (current.count >= RATE_LIMIT_REQUESTS) {
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)) }
  }

  current.count += 1
  return { allowed: true, retryAfter: 0 }
}

export default async function handler(request: ApiRequest, response: ServerResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return sendJson(response, 405, { error: 'Method not allowed.' })
  }

  const contentLength = Number(request.headers['content-length'] ?? 0)
  if (Number.isFinite(contentLength) && contentLength > BODY_LIMIT_BYTES) {
    return sendJson(response, 413, { error: 'The submitted message is too large.' })
  }

  let rawPayload: unknown
  try {
    rawPayload = parseBody(request.body)
  } catch {
    return sendJson(response, 400, { error: 'Please check the form and try again.' })
  }

  const validation = validateContactPayload(rawPayload)
  if (!validation.ok) return sendJson(response, 400, { error: validation.error, fields: validation.fields })

  // Silently accept honeypot submissions so automated senders receive no useful signal.
  if (validation.value.website) return sendJson(response, 200, { success: true })

  const rateLimit = consumeRateLimit(getClientIp(request))
  if (!rateLimit.allowed) {
    response.setHeader('Retry-After', String(rateLimit.retryAfter))
    return sendJson(response, 429, { error: 'Too many messages. Please wait a few minutes and try again.' })
  }

  const apiKey = process.env.RESEND_API_KEY?.trim()
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim()
  const contactEmail = process.env.CONTACT_EMAIL?.trim()
  if (!apiKey || !fromEmail || !contactEmail) {
    return sendJson(response, 503, { error: 'The contact form is temporarily unavailable. Please try again later.' })
  }

  const email = buildContactEmail(validation.value)

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: fromEmail,
      to: contactEmail,
      replyTo: validation.value.email,
      subject: email.subject,
      html: email.html,
    })

    if (error) {
      console.error('Resend contact delivery failed:', error.name)
      return sendJson(response, 502, { error: 'Something went wrong. Please try again.' })
    }
  } catch (error) {
    console.error('Contact email request failed:', error instanceof Error ? error.name : 'UnknownError')
    return sendJson(response, 502, { error: 'Something went wrong. Please try again.' })
  }

  return sendJson(response, 200, { success: true })
}

import type { IncomingMessage, ServerResponse } from 'node:http'
import {
  GroqProviderError,
  UNRELATED_REPLY,
  buildGroqMessages,
  isClearlyUnrelated,
  requestGroqReply,
  validateChatPayload,
} from './_lib/chat-core.js'
import { logChatIfConfigured } from './_lib/chat-log.js'
import { buildPortfolioContext } from './_lib/portfolio-context.js'

type ApiRequest = IncomingMessage & { body?: unknown }

const BODY_LIMIT_BYTES = 20_000
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_REQUESTS = 10
const DEFAULT_MODEL = 'openai/gpt-oss-20b'
const rateLimits = new Map<string, { count: number; resetAt: number }>()

function sendJson(response: ServerResponse, status: number, body: unknown) {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')
  response.end(JSON.stringify(body))
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

function parseBody(body: unknown) {
  if (typeof body === 'string') return JSON.parse(body) as unknown
  return body
}

export default async function handler(request: ApiRequest, response: ServerResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return sendJson(response, 405, { error: 'Method not allowed.' })
  }

  const contentLength = Number(request.headers['content-length'] ?? 0)
  if (Number.isFinite(contentLength) && contentLength > BODY_LIMIT_BYTES) {
    return sendJson(response, 413, { error: 'Request body is too large.' })
  }

  const rateLimit = consumeRateLimit(getClientIp(request))
  if (!rateLimit.allowed) {
    response.setHeader('Retry-After', String(rateLimit.retryAfter))
    return sendJson(response, 429, { error: 'Too many requests. Please wait a moment and try again.' })
  }

  let rawPayload: unknown
  try {
    rawPayload = parseBody(request.body)
  } catch {
    return sendJson(response, 400, { error: 'Request body must be valid JSON.' })
  }

  const validation = validateChatPayload(rawPayload)
  if (!validation.ok) return sendJson(response, 400, { error: validation.error })

  const { message, history } = validation.value
  const model = process.env.GROQ_MODEL?.trim() || DEFAULT_MODEL
  let reply: string

  if (isClearlyUnrelated(message)) {
    reply = UNRELATED_REPLY
  } else {
    const apiKey = process.env.GROQ_API_KEY?.trim()
    if (!apiKey) {
      return sendJson(response, 503, { error: 'The assistant is not configured yet.' })
    }

    try {
      reply = await requestGroqReply({
        apiKey,
        model,
        messages: buildGroqMessages(validation.value, buildPortfolioContext()),
      })
    } catch (error) {
      if (error instanceof GroqProviderError) {
        return sendJson(response, error.status, { error: error.message })
      }
      return sendJson(response, 502, { error: 'The assistant service is temporarily unavailable. Please try again.' })
    }
  }

  await logChatIfConfigured({ message, reply, historyLength: history.length, model })
  return sendJson(response, 200, { reply })
}

import assert from 'node:assert/strict'
import test from 'node:test'
import {
  GroqProviderError,
  MAX_HISTORY_LENGTH,
  buildGroqMessages,
  isClearlyUnrelated,
  requestGroqReply,
  validateChatPayload,
} from './chat-core.js'

test('validates, trims, and caps chat input', () => {
  assert.deepEqual(validateChatPayload({ message: '   ' }), {
    ok: false,
    error: 'Message cannot be empty.',
  })

  const oversized = validateChatPayload({ message: 'x'.repeat(501) })
  assert.equal(oversized.ok, false)

  const history = Array.from({ length: MAX_HISTORY_LENGTH + 3 }, (_, index) => ({
    role: index % 2 === 0 ? 'user' as const : 'assistant' as const,
    content: `message ${index}`,
  }))
  const result = validateChatPayload({ message: '  Tell me about Eyrie  ', history })

  assert.equal(result.ok, true)
  if (!result.ok) return
  assert.equal(result.value.message, 'Tell me about Eyrie')
  assert.equal(result.value.history.length, MAX_HISTORY_LENGTH)
  assert.equal(result.value.history[0].content, 'message 3')
})

test('keeps follow-up history and includes the current message exactly once', () => {
  const messages = buildGroqMessages({
    message: 'Tell me more about it',
    history: [
      { role: 'user', content: 'What is Eyrie?' },
      { role: 'assistant', content: 'Eyrie is a personal finance app.' },
    ],
  }, 'Verified Eyrie facts')

  assert.equal(messages.at(-1)?.role, 'user')
  assert.equal(messages.at(-1)?.content, 'Tell me more about it')
  assert.equal(messages.filter((message) => message.content === 'Tell me more about it').length, 1)
  assert.match(messages[2].content, /context only/)
})

test('detects clearly unrelated questions without blocking portfolio questions', () => {
  assert.equal(isClearlyUnrelated('What is the weather forecast tomorrow?'), true)
  assert.equal(isClearlyUnrelated('What React projects has Sydney built?'), false)
  assert.equal(isClearlyUnrelated('Tell me more about it'), false)
})

test('returns a safe provider error when Groq fails', async () => {
  const mockFetch: typeof fetch = async () => new Response(JSON.stringify({
    error: { message: 'internal provider detail' },
  }), { status: 500, headers: { 'Content-Type': 'application/json' } })

  await assert.rejects(
    requestGroqReply({
      apiKey: 'test-key',
      model: 'test-model',
      messages: [{ role: 'user', content: 'Hello' }],
      fetchImpl: mockFetch,
    }),
    (error: unknown) => {
      assert.ok(error instanceof GroqProviderError)
      assert.equal(error.status, 502)
      assert.doesNotMatch(error.message, /internal provider detail/)
      return true
    },
  )
})

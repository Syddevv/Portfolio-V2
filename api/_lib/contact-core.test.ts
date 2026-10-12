import assert from 'node:assert/strict'
import test from 'node:test'
import { buildContactEmail, escapeHtml, validateContactPayload } from './contact-core.js'

test('validates and trims a valid contact payload', () => {
  const result = validateContactPayload({
    firstName: ' Sydney ',
    lastName: '',
    email: ' sydney@example.com ',
    message: ' Hello ',
    website: '',
  })

  assert.equal(result.ok, true)
  if (result.ok) assert.deepEqual(result.value, {
    firstName: 'Sydney',
    lastName: '',
    email: 'sydney@example.com',
    message: 'Hello',
    website: '',
  })
})

test('returns field errors for invalid required values', () => {
  const result = validateContactPayload({ firstName: '', email: 'invalid', message: '', website: '' })

  assert.equal(result.ok, false)
  if (!result.ok) {
    assert.equal(result.fields.firstName, 'First name is required.')
    assert.equal(result.fields.email, 'Enter a valid email address.')
    assert.equal(result.fields.message, 'Message is required.')
  }
})

test('escapes visitor content in the generated email', () => {
  assert.equal(escapeHtml('<script>"x" & y</script>'), '&lt;script&gt;&quot;x&quot; &amp; y&lt;/script&gt;')
  const email = buildContactEmail({
    firstName: '<Sydney>',
    lastName: '',
    email: 'sydney@example.com',
    message: '<img src=x onerror=alert(1)>',
    website: '',
  })
  assert.doesNotMatch(email.html, /<img src=x/)
  assert.match(email.html, /&lt;img src=x onerror=alert\(1\)&gt;/)
})

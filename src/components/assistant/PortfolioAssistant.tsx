import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent, type RefObject } from 'react'
import { Icon } from '../Icons'
import './PortfolioAssistant.css'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const welcomeMessage: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi, I'm Sydney's portfolio assistant. Ask me about projects, development experience, tech stack, or availability.",
}

type AssistantHeaderProps = {
  closeButtonRef: RefObject<HTMLButtonElement | null>
  onReset: () => void
  onClose: () => void
}

function AssistantHeader({ closeButtonRef, onReset, onClose }: AssistantHeaderProps) {
  return (
    <header className="assistant-header">
      <span className="assistant-brand-icon"><Icon name="robot" /></span>
      <div className="assistant-brand-copy">
        <strong id="assistant-title">SYDNEY&apos;S AI</strong>
        <span><i />ONLINE / ASK ME ANYTHING</span>
      </div>
      <div className="assistant-header-actions">
        <button type="button" onClick={onReset} aria-label="Reset chat" title="Reset chat"><Icon name="reset" /></button>
        <button type="button" onClick={onClose} aria-label="Close chat" title="Close chat" ref={closeButtonRef}><Icon name="close" /></button>
      </div>
    </header>
  )
}

function AssistantMessage({ message }: { message: ChatMessage }) {
  return (
    <article className={`assistant-message assistant-message--${message.role}`}>
      <span>{message.content}</span>
    </article>
  )
}

type AssistantComposerProps = {
  value: string
  isSending: boolean
  onChange: (value: string) => void
  onSubmit: () => void
}

function AssistantComposer({ value, isSending, onChange, onSubmit }: AssistantComposerProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey) return
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="assistant-composer" onSubmit={handleSubmit}>
      <div className="assistant-input-row">
        <textarea
          aria-label="Ask Sydney's portfolio assistant a question"
          placeholder="Ask a question..."
          value={value}
          maxLength={500}
          rows={1}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" disabled={isSending || !value.trim()} aria-label="Send message" title="Send message"><Icon name="send" /></button>
      </div>
      <div className="assistant-composer-meta">
        <span>AI-GENERATED / MAY CONTAIN INACCURACIES</span>
        <strong>{value.length} / 500</strong>
      </div>
    </form>
  )
}

export function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [messageInput, setMessageInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])
  const [isSending, setIsSending] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const closeTimerRef = useRef<number | null>(null)
  const requestControllerRef = useRef<AbortController | null>(null)
  const conversationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    closeButtonRef.current?.focus()

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return
      closeButtonRef.current?.click()
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  useEffect(() => () => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current)
    requestControllerRef.current?.abort()
  }, [])

  useEffect(() => {
    const conversation = conversationRef.current
    if (!conversation) return
    conversation.scrollTop = conversation.scrollHeight
  }, [messages, isSending])

  const closeAssistant = () => {
    if (isClosing) return
    setIsClosing(true)
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 170
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
      requestAnimationFrame(() => triggerRef.current?.focus())
    }, delay)
  }

  const resetAssistant = () => {
    requestControllerRef.current?.abort()
    requestControllerRef.current = null
    setIsSending(false)
    setMessages([welcomeMessage])
    setMessageInput('')
  }

  const sendMessage = async () => {
    const content = messageInput.trim()
    if (!content || isSending) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
    }
    const history = messages
      .filter((message) => message.id !== welcomeMessage.id)
      .slice(-10)
      .map(({ role, content: historyContent }) => ({ role, content: historyContent }))

    setMessages((current) => [...current, userMessage])
    setMessageInput('')
    setIsSending(true)

    const controller = new AbortController()
    requestControllerRef.current = controller

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, history }),
        signal: controller.signal,
      })
      const responseText = await response.text()
      let data: { reply?: unknown; error?: unknown } = {}
      if (responseText) {
        try {
          data = JSON.parse(responseText) as { reply?: unknown; error?: unknown }
        } catch {
          throw new Error('The assistant server returned an unreadable response. Please try again.')
        }
      }

      if (!response.ok) {
        throw new Error(typeof data.error === 'string' ? data.error : 'The assistant is temporarily unavailable. Please try again.')
      }
      if (typeof data.reply !== 'string' || !data.reply.trim()) {
        throw new Error('The assistant returned an invalid response. Please try again.')
      }
      const reply = data.reply.trim()

      setMessages((current) => [...current, {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: reply,
      }])
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return
      setMessages((current) => [...current, {
        id: `assistant-error-${Date.now()}`,
        role: 'assistant',
        content: error instanceof Error ? error.message : 'The assistant could not respond. Please try again.',
      }])
    } finally {
      if (requestControllerRef.current === controller) requestControllerRef.current = null
      setIsSending(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        className={`assistant-trigger${hasOpened ? ' assistant-trigger--returning' : ''}`}
        type="button"
        onClick={() => { setHasOpened(true); setIsClosing(false); setIsOpen(true) }}
        ref={triggerRef}
        aria-haspopup="dialog"
      >
        <span><Icon name="robot" /></span>SYD&apos;S ASSISTANT
      </button>
    )
  }

  return (
    <aside className={`assistant-panel${isClosing ? ' assistant-panel--closing' : ''}`} role="dialog" aria-modal="false" aria-labelledby="assistant-title">
      <AssistantHeader closeButtonRef={closeButtonRef} onReset={resetAssistant} onClose={closeAssistant} />
      <div className="assistant-conversation" aria-live="polite" aria-busy={isSending} ref={conversationRef}>
        {messages.map((message) => <AssistantMessage message={message} key={message.id} />)}
        {isSending && <AssistantMessage message={{ id: 'pending', role: 'assistant', content: 'Thinking…' }} />}
      </div>
      <AssistantComposer value={messageInput} isSending={isSending} onChange={setMessageInput} onSubmit={sendMessage} />
    </aside>
  )
}

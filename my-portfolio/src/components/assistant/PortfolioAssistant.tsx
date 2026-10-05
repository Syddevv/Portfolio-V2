import { useEffect, useRef, useState, type RefObject } from 'react'
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
  onChange: (value: string) => void
}

function AssistantComposer({ value, onChange }: AssistantComposerProps) {
  return (
    <form className="assistant-composer" onSubmit={(event) => event.preventDefault()}>
      <div className="assistant-input-row">
        <textarea
          aria-label="Ask Sydney's portfolio assistant a question"
          placeholder="Ask a question..."
          value={value}
          maxLength={500}
          rows={1}
          onChange={(event) => onChange(event.target.value)}
        />
        <button type="submit" disabled aria-label="Send message — AI integration coming soon" title="AI integration coming soon"><Icon name="send" /></button>
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
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const closeTimerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isOpen) return
    closeButtonRef.current?.focus()

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      closeButtonRef.current?.click()
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  useEffect(() => () => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current)
  }, [])

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
    setMessageInput('')
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
      <div className="assistant-conversation" aria-live="polite">
        <AssistantMessage message={welcomeMessage} />
      </div>
      <AssistantComposer value={messageInput} onChange={setMessageInput} />
    </aside>
  )
}

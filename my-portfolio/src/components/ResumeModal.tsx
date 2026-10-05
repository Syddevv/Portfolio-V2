import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from 'react'
import resumePdf from '../assets/Santos_Sydney_JR_Software_Developer.pdf?url'
import { Icon } from './Icons'
import './ResumeModal.css'

type ResumeModalProps = {
  open: boolean
  onClose: () => void
  triggerRef: RefObject<HTMLButtonElement | null>
}

export function ResumeModal({ open, onClose, triggerRef }: ResumeModalProps) {
  const [mounted, setMounted] = useState(open)
  const [active, setActive] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const downloadButtonRef = useRef<HTMLAnchorElement>(null)
  const hasOpenedRef = useRef(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
      const frame = window.requestAnimationFrame(() => setActive(true))
      return () => window.cancelAnimationFrame(frame)
    }

    setActive(false)
    const timeout = window.setTimeout(() => setMounted(false), 220)
    return () => window.clearTimeout(timeout)
  }, [open])

  useEffect(() => {
    if (!mounted) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mounted])

  useEffect(() => {
    if (mounted) {
      hasOpenedRef.current = true
      return
    }
    if (!hasOpenedRef.current) return
    if (document.activeElement !== triggerRef.current) triggerRef.current?.focus()
  }, [mounted, triggerRef])

  if (!mounted) return null

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose()
      return
    }

    if (event.key !== 'Tab') return
    const focusable = [closeButtonRef.current, downloadButtonRef.current].filter(
      (element): element is HTMLElement => element !== null,
    )
    if (focusable.length === 0) return

    const currentIndex = focusable.indexOf(document.activeElement as HTMLElement)
    const nextIndex = event.shiftKey
      ? (currentIndex - 1 + focusable.length) % focusable.length
      : (currentIndex + 1) % focusable.length

    event.preventDefault()
    focusable[nextIndex].focus()
  }

  return (
    <div className={`resume-modal-layer${active ? ' resume-modal-layer--active' : ''}`}>
      <div className="resume-modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="resume-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
        onKeyDown={handleKeyDown}
      >
        <header className="resume-modal-header">
          <div>
            <h2 id="resume-modal-title"><span aria-hidden="true">■</span> RESUME // SYDNEY SANTOS</h2>
            <span className="resume-modal-status">PDF DOCUMENT</span>
          </div>
          <button ref={closeButtonRef} className="resume-modal-close" type="button" onClick={onClose}>
            CLOSE <Icon name="close" />
          </button>
        </header>

        <div className="resume-modal-preview">
          <iframe
            src={resumePdf}
            title="Sydney Santos resume preview"
            className="resume-pdf"
          />
        </div>

        <footer className="resume-modal-footer">
          <span>SYDNEY_SANTOS_RESUME.PDF</span>
          <a
            ref={downloadButtonRef}
            className="resume-modal-download"
            href={resumePdf}
            download="Sydney-Santos-Software-Developer-Resume.pdf"
          >
            DOWNLOAD RESUME <Icon name="download" />
          </a>
        </footer>
      </div>
    </div>
  )
}

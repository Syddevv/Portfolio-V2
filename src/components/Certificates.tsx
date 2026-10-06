import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Icons'
import webDevelopmentCertificate from '../assets/web-development-rank-6.png'
import miniHackathonCertificate from '../assets/mini-hackathon-third-place.png'
import oopCertificate from '../assets/oop-class-top-1.jpg'
import './Certificates.css'

type Certificate = {
  id: string
  title: string
  issuer: string
  achievement: string
  issued: string
  subject?: string
  image: string
  alt: string
  accent: 'cyan' | 'pink' | 'yellow'
}

const certificates: Certificate[] = [
  {
    id: '01',
    title: 'Web Development — Rank 6',
    issuer: 'Bulacan Polytechnic College',
    achievement: 'Rank 6 • Grade 93.73',
    issued: 'October 24, 2025',
    image: webDevelopmentCertificate,
    alt: 'Web Development Rank 6 Certificate — Bulacan Polytechnic College',
    accent: 'cyan',
  },
  {
    id: '02',
    title: 'Mini Hackathon — 3rd Place',
    issuer: 'Bulacan Polytechnic College',
    achievement: 'Third Place Winner',
    issued: 'October 28, 2025',
    image: miniHackathonCertificate,
    alt: 'Mini Hackathon Third Place Certificate — Bulacan Polytechnic College',
    accent: 'pink',
  },
  {
    id: '03',
    title: 'Object-Oriented Programming — Class Top 1',
    issuer: 'Bulacan Polytechnic College',
    achievement: 'Class Top 1 • Grade 97.06',
    subject: 'IS-OOP 223 — Object-Oriented Programming (JavaScript)',
    issued: 'June 3, 2025',
    image: oopCertificate,
    alt: 'Object-Oriented Programming Class Top 1 Certificate — Bulacan Polytechnic College',
    accent: 'yellow',
  },
]

type CertificateCardProps = {
  certificate: Certificate
  index: number
  onOpen: (certificate: Certificate) => void
}

function CertificateCard({ certificate, index, onOpen }: CertificateCardProps) {
  return (
    <article
      className={`certificate-card certificate-card--${certificate.accent}`}
      data-reveal-item
      style={{ '--reveal-index': index + 1 } as CSSProperties}
    >
      <div className="certificate-card-rail">
        <span>CERTIFICATE // {certificate.id}</span>
        <strong>{certificate.id}</strong>
      </div>

      <button className="certificate-preview" type="button" onClick={() => onOpen(certificate)} aria-label={`View ${certificate.title}`}>
        <img src={certificate.image} alt={certificate.alt} />
      </button>

      <div className="certificate-card-body">
        <h3>{certificate.title}</h3>
        <dl className="certificate-meta">
          <div><dt>ISSUER</dt><dd>{certificate.issuer}</dd></div>
          <div><dt>ACHIEVEMENT</dt><dd>{certificate.achievement}</dd></div>
          {certificate.subject && <div><dt>SUBJECT</dt><dd>{certificate.subject}</dd></div>}
          <div><dt>ISSUED</dt><dd>{certificate.issued}</dd></div>
        </dl>
        <button className="certificate-view" type="button" onClick={() => onOpen(certificate)}>
          VIEW CERTIFICATE <Icon name="arrow-up-right" />
        </button>
      </div>
    </article>
  )
}

export function Certificates() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastTriggerRef = useRef<HTMLElement | null>(null)

  const openCertificate = (certificate: Certificate) => {
    lastTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setSelectedCertificate(certificate)
  }

  const closeCertificate = () => {
    setSelectedCertificate(null)
    requestAnimationFrame(() => lastTriggerRef.current?.focus())
  }

  useEffect(() => {
    if (!selectedCertificate) return

    const previousOverflow = document.body.style.overflow
    const previousScrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeButtonRef.current?.focus())

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCertificate()
      if (event.key === 'Tab') {
        event.preventDefault()
        closeButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.scrollTo(0, previousScrollY)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedCertificate])

  const certificateModal = selectedCertificate && createPortal(
    <div className="certificate-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeCertificate() }}>
      <div className="certificate-modal" role="dialog" aria-modal="true" aria-labelledby={`certificate-modal-title-${selectedCertificate.id}`}>
        <header className="certificate-modal-header">
          <div>
            <span>CERTIFICATE // {selectedCertificate.id}</span>
            <h2 id={`certificate-modal-title-${selectedCertificate.id}`}>{selectedCertificate.title}</h2>
            <p>{selectedCertificate.issuer}</p>
          </div>
          <button ref={closeButtonRef} type="button" onClick={closeCertificate} aria-label="Close certificate viewer">
            <span>CLOSE</span><Icon name="close" />
          </button>
        </header>
        <div className="certificate-modal-image" onMouseDown={(event) => { if (event.target === event.currentTarget) closeCertificate() }}>
          <img src={selectedCertificate.image} alt={selectedCertificate.alt} />
        </div>
      </div>
    </div>,
    document.body,
  )

  return (
    <section className="certificates-section page-container" aria-labelledby="certificates-title" data-reveal>
      <div className="certificates-shell">
        <header className="certificates-header" data-reveal-item style={{ '--reveal-index': 0 } as CSSProperties}>
          <div>
            <h2 id="certificates-title">CERTIFICATES &amp; CREDENTIALS</h2>
            <p>Proof of learning, building, and growing.</p>
          </div>
          <span>{String(certificates.length).padStart(2, '0')} / {String(certificates.length).padStart(2, '0')}</span>
        </header>

        <div className="certificates-grid">
          {certificates.map((certificate, index) => (
            <CertificateCard certificate={certificate} index={index} onOpen={openCertificate} key={certificate.id} />
          ))}
        </div>
      </div>
      {certificateModal}
    </section>
  )
}

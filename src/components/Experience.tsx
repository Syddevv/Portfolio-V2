import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Icons'
import certicodeCompletionCertificate from '../assets/Cetificate of Completion.png'
import './Experience.css'

type ExperienceEntry = {
  company: string
  role: string
  date: string
  responsibilities: string[]
  technologies: string[]
  color: 'pink' | 'cyan'
  certificateUrl?: string
  certificateLabel: string
}

const experienceEntries: ExperienceEntry[] = [
  {
    company: 'Sarappy',
    role: 'Software Developer Intern',
    date: 'July 2026 — Oct 2026',
    responsibilities: [
      'Shipped cross-platform features across 3 production web and mobile apps using React Native, React, and TypeScript, standardizing reusable UI components across codebases.',
      'Architected backend REST APIs and database queries using PHP/Laravel and MySQL, eliminating data sync bottlenecks between mobile clients and admin portals.',
    ],
    technologies: ['React Native', 'React', 'TypeScript', 'PHP', 'Laravel', 'MySQL'],
    color: 'pink',
    certificateUrl: undefined,
    certificateLabel: 'View Certificate',
  },
  {
    company: 'Certicode',
    role: 'Full Stack Developer Intern',
    date: 'Feb 2026 — May 2026',
    responsibilities: [
      'Built responsive web applications and reusable UI components using React, TypeScript, Node.js, and Express.',
      'Maintained backend RESTful API endpoints and resolved database queries across PHP and MySQL.',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PHP', 'MySQL'],
    color: 'cyan',
    certificateUrl: certicodeCompletionCertificate,
    certificateLabel: 'View OJT Certificate',
  },
]

export function Experience() {
  const [selectedCertificate, setSelectedCertificate] = useState<ExperienceEntry | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastTriggerRef = useRef<HTMLElement | null>(null)

  const openCertificate = (entry: ExperienceEntry) => {
    lastTriggerRef.current = document.activeElement as HTMLElement | null
    setSelectedCertificate(entry)
  }

  const closeCertificate = () => {
    setSelectedCertificate(null)
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus())
  }

  useEffect(() => {
    if (!selectedCertificate) return

    const previousOverflow = document.body.style.overflow
    const scrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCertificate()
      if (event.key === 'Tab') {
        event.preventDefault()
        closeButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      window.scrollTo(0, scrollY)
    }
  }, [selectedCertificate])

  return (
    <>
      <section className="experience-section page-container" id="experience" aria-labelledby="experience-title" data-reveal>
        <header className="experience-header">
          <p>// EXPERIENCE.LOG</p>
          <h1 id="experience-title"><span>Experience,</span><span>in progress.</span></h1>
        </header>

        <div className="experience-timeline">
          {experienceEntries.map((entry, index) => (
            <article className="experience-row" key={entry.company}>
              <span className="experience-marker">{String(index + 1).padStart(2, '0')}</span>
              <time className="experience-date">{entry.date}</time>
              <div className={`experience-card experience-card--${entry.color}`}>
                <p className="experience-company">{entry.company}</p>
                <h2>{entry.role}</h2>
                <ul className="experience-responsibilities">
                  {entry.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}
                </ul>
                <ul className="experience-technologies" aria-label={`${entry.company} technologies`}>
                  {entry.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
                {entry.certificateUrl ? (
                  <button
                    className="experience-certificate"
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => openCertificate(entry)}
                  >
                    <Icon name="file" />{entry.certificateLabel}<Icon name="arrow-up-right" />
                  </button>
                ) : (
                  <button className="experience-certificate experience-certificate--pending" type="button" disabled title="Certificate link coming soon">
                    <Icon name="file" />{entry.certificateLabel}<Icon name="arrow-up-right" />
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedCertificate?.certificateUrl && createPortal(
        <div
          className="experience-certificate-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeCertificate()
          }}
        >
          <div
            className="experience-certificate-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-certificate-modal-title"
          >
            <header className="experience-certificate-modal-header">
              <div>
                <span>CERTIFICATE // OJT</span>
                <h2 id="experience-certificate-modal-title">{selectedCertificate.company} — Certificate of Completion</h2>
                <p>{selectedCertificate.role}</p>
              </div>
              <button ref={closeButtonRef} type="button" onClick={closeCertificate} aria-label="Close certificate viewer">
                <span>CLOSE</span>
                <Icon name="close" />
              </button>
            </header>
            <div className="experience-certificate-modal-image">
              <img
                src={selectedCertificate.certificateUrl}
                alt={`${selectedCertificate.company} certificate of completion for Sydney Santos`}
              />
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

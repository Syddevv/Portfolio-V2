import { useState, type CSSProperties, type FormEvent } from 'react'
import { Icon } from './Icons'
import { socialLinks } from '../data/socialLinks'
import './Contact.css'

type FormField = 'firstName' | 'lastName' | 'email' | 'message'
type FormErrors = Partial<Record<FormField, string>>

const fieldLimits = { firstName: 80, lastName: 80, email: 254, message: 5_000 } as const

const directSocialLinks = socialLinks.filter(({ label }) => label === 'LinkedIn' || label === 'GitHub')

export function Contact() {
  const [errors, setErrors] = useState<FormErrors>({})
  const [submissionStatus, setSubmissionStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    const formElement = event.currentTarget
    const form = new FormData(event.currentTarget)
    const firstName = String(form.get('firstName') ?? '').trim()
    const lastName = String(form.get('lastName') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()
    const website = String(form.get('website') ?? '').trim()
    const nextErrors: FormErrors = {}

    if (!firstName) nextErrors.firstName = 'FIRST NAME IS REQUIRED.'
    else if (firstName.length > fieldLimits.firstName) nextErrors.firstName = `USE ${fieldLimits.firstName} CHARACTERS OR FEWER.`
    if (lastName.length > fieldLimits.lastName) nextErrors.lastName = `USE ${fieldLimits.lastName} CHARACTERS OR FEWER.`
    if (!email) nextErrors.email = 'EMAIL IS REQUIRED.'
    else if (email.length > fieldLimits.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'ENTER A VALID EMAIL ADDRESS.'
    if (!message) nextErrors.message = 'MESSAGE IS REQUIRED.'
    else if (message.length > fieldLimits.message) nextErrors.message = `USE ${fieldLimits.message.toLocaleString()} CHARACTERS OR FEWER.`

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setSubmissionStatus('CHECK THE MARKED FIELDS.')
      return
    }

    setIsSubmitting(true)
    setSubmissionStatus('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, message, website }),
      })
      const data = await response.json() as {
        success?: boolean
        error?: string
        fields?: FormErrors
      }

      if (!response.ok || !data.success) {
        if (data.fields) setErrors(data.fields)
        setSubmissionStatus(data.error || 'Something went wrong. Please try again.')
        return
      }

      formElement.reset()
      setErrors({})
      setSubmissionStatus("Message sent successfully! I'll get back to you soon.")
    } catch {
      setSubmissionStatus('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact-section page-container" id="contact" aria-labelledby="contact-title" data-reveal>
      <div className="contact-shell">
        <div className="contact-copy" data-reveal-item style={{ '--reveal-index': 0 } as CSSProperties}>
          <p className="contact-kicker">CONTACT</p>
          <h2 id="contact-title">Let’s connect.</h2>
          <p>Have a project, opportunity, or idea you’d like to discuss? Whether you’re looking to collaborate, need help building something, or simply want to connect, feel free to send me a message.</p>
          <p>I’m always open to conversations about web development, software projects, internships, and opportunities to build useful things.</p>

          <div className="contact-direct-links" aria-label="Direct contact links">
            {directSocialLinks.map(({ label, icon: SocialIcon, url }) => (
              <a href={url} target="_blank" rel="noopener noreferrer" key={label}>
                <SocialIcon aria-hidden="true" /><span>{label}</span><Icon name="arrow-up-right" />
              </a>
            ))}
          </div>
          <Icon name="arrow-right" className="contact-decoration" />
        </div>

        <div className="contact-form-side" data-reveal-item style={{ '--reveal-index': 1 } as CSSProperties}>
          <form className="contact-form" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
            <p className="contact-form-label">// CONTACT FORM</p>
            <div className="contact-honeypot" aria-hidden="true">
              <label htmlFor="contact-website">WEBSITE</label>
              <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="contact-fields-row">
              <div className="contact-field">
                <label htmlFor="contact-first-name">FIRST NAME</label>
                <input id="contact-first-name" name="firstName" placeholder="e.g. Alex" maxLength={fieldLimits.firstName} autoComplete="given-name" aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? 'first-name-error' : undefined} />
                {errors.firstName && <span className="contact-error" id="first-name-error">{errors.firstName}</span>}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-last-name">LAST NAME <span>(OPTIONAL)</span></label>
                <input id="contact-last-name" name="lastName" placeholder="e.g. Santos" maxLength={fieldLimits.lastName} autoComplete="family-name" aria-invalid={Boolean(errors.lastName)} aria-describedby={errors.lastName ? 'last-name-error' : undefined} />
                {errors.lastName && <span className="contact-error" id="last-name-error">{errors.lastName}</span>}
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">EMAIL</label>
              <input id="contact-email" name="email" type="email" placeholder="you@example.com" maxLength={fieldLimits.email} autoComplete="email" inputMode="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
              {errors.email && <span className="contact-error" id="email-error">{errors.email}</span>}
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message">MESSAGE</label>
              <textarea id="contact-message" name="message" placeholder="Tell me about your project, opportunity, or idea..." maxLength={fieldLimits.message} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
              {errors.message && <span className="contact-error" id="message-error">{errors.message}</span>}
            </div>
            <button className="contact-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'} <Icon name="arrow-right" /></button>
            <p className="contact-form-status" role="status" aria-live="polite" hidden={!submissionStatus}>{submissionStatus}</p>
          </form>
        </div>
      </div>
    </section>
  )
}

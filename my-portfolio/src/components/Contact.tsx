import { useState, type FormEvent } from 'react'
import { Icon } from './Icons'
import { socialLinks } from '../data/socialLinks'
import './Contact.css'

type FormErrors = Partial<Record<'firstName' | 'email' | 'message', string>>

const directSocialLinks = socialLinks.filter(({ label }) => label === 'LinkedIn' || label === 'GitHub')

export function Contact() {
  const [errors, setErrors] = useState<FormErrors>({})
  const [submissionStatus, setSubmissionStatus] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const firstName = String(form.get('firstName') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()
    const nextErrors: FormErrors = {}

    if (!firstName) nextErrors.firstName = 'FIRST NAME IS REQUIRED.'
    if (!email) nextErrors.email = 'EMAIL IS REQUIRED.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'ENTER A VALID EMAIL ADDRESS.'
    if (!message) nextErrors.message = 'MESSAGE IS REQUIRED.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setSubmissionStatus('CHECK THE MARKED FIELDS.')
      return
    }

    setSubmissionStatus('DELIVERY SERVICE NOT CONFIGURED — YOUR MESSAGE HAS NOT BEEN SENT.')
  }

  return (
    <section className="contact-section page-container" id="contact" aria-labelledby="contact-title">
      <div className="contact-shell">
        <div className="contact-copy">
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

        <div className="contact-form-side">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <p className="contact-form-label">// CONTACT FORM</p>
            <div className="contact-fields-row">
              <div className="contact-field">
                <label htmlFor="contact-first-name">FIRST NAME</label>
                <input id="contact-first-name" name="firstName" placeholder="e.g. Alex" aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? 'first-name-error' : undefined} />
                {errors.firstName && <span className="contact-error" id="first-name-error">{errors.firstName}</span>}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-last-name">LAST NAME <span>(OPTIONAL)</span></label>
                <input id="contact-last-name" name="lastName" placeholder="e.g. Santos" />
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">EMAIL</label>
              <input id="contact-email" name="email" type="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
              {errors.email && <span className="contact-error" id="email-error">{errors.email}</span>}
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message">MESSAGE</label>
              <textarea id="contact-message" name="message" placeholder="Tell me about your project, opportunity, or idea..." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
              {errors.message && <span className="contact-error" id="message-error">{errors.message}</span>}
            </div>
            <button className="contact-submit" type="submit">SEND MESSAGE <Icon name="arrow-right" /></button>
            {submissionStatus && <p className="contact-form-status" role="status">{submissionStatus}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}

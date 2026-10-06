import { socialLinks } from '../data/socialLinks'
import './Footer.css'

const footerNavigation = [
  { id: 'explore', label: 'Explore' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]

type FooterProps = { onNavigate: (section: string) => void }

export function Footer({ onNavigate }: FooterProps) {
  const footerSocials = socialLinks.filter(({ label }) => label !== 'Facebook')

  return (
    <footer className="portfolio-footer">
      <div className="footer-inner page-container">
        <div className="footer-brand">
          <span className="footer-mark">SS</span>
          <div><p>© 2026 Sydney Santos. All rights reserved.</p><span>Built with care, clean code, and curiosity.</span></div>
        </div>
        <nav className="footer-navigation" aria-label="Footer navigation">
          {footerNavigation.map(({ id, label }) => (
            <a href={`/#${id}`} key={id} onClick={(event) => { event.preventDefault(); onNavigate(id) }}>{label}</a>
          ))}
        </nav>
        <div className="footer-socials" aria-label="Social links">
          {footerSocials.map(({ label, icon: SocialIcon, url }) => (
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} key={label}><SocialIcon /></a>
          ))}
        </div>
      </div>
    </footer>
  )
}

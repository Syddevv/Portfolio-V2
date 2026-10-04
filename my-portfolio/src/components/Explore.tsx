import { Icon } from './Icons'
import avatar from '../assets/syd-avatar.jpg'
import './Explore.css'

export function Explore() {
  return (
    <section className="explore-hero page-container" id="explore" aria-labelledby="explore-title">
      <div className="explore-copy">
        <p className="hero-eyebrow"><span className="hero-eyebrow-light" />FULL-STACK WEB DEVELOPER</p>

        <h1 className="hero-headline" id="explore-title" aria-label="Building scalable digital solutions.">
          <span>Building</span>
          <span className="hero-headline-outline">scalable</span>
          <span>digital</span>
          <span>solutions<span className="hero-headline-period" aria-hidden="true" /></span>
        </h1>

        <p className="hero-description">
          I build modern web applications from frontend to backend, turning ideas into responsive, reliable, and practical digital solutions.
        </p>

        <div className="hero-actions">
          <button className="hero-button hero-button-primary" type="button" disabled title="Projects section is coming soon">My projects <Icon name="folder" /></button>
          <button className="hero-button hero-button-secondary" type="button" disabled title="Resume is not available yet">View resume <Icon name="arrow-right" /></button>
        </div>

        <a className="hero-scroll" href="#about" aria-label="Scroll to About section">
          <span className="hero-scroll-mouse"><span /></span>
          <span>SCROLL DOWN</span>
        </a>
      </div>

      <div className="hero-visual" aria-label="Portrait of Sydney Santos">
        <div className="portrait-frame">
          <div className="portrait-inner">
            <img src={avatar} alt="Sydney Santos taking a mirror portrait" />
            <div className="portrait-caption"><span>SYDNEY_PORTRAIT_RAW.JPG</span><span>100% SPEC</span></div>
          </div>
        </div>
        <span className="portrait-sticker portrait-sticker-css">CSS</span>
        <span className="portrait-sticker portrait-sticker-ux">UX</span>
        <span className="portrait-sticker portrait-sticker-rgb">RGB</span>
        <span className="portrait-sticker portrait-sticker-seo">SEO</span>
        <span className="portrait-sticker portrait-sticker-html">HTML</span>
      </div>
    </section>
  )
}

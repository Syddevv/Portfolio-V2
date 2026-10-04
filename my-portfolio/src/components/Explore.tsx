import { Icon } from './Icons'
import avatar from '../assets/syd-avatar.jpg'
import './Explore.css'

export function Explore() {
  return (
    <section className="explore-hero" id="explore" aria-labelledby="explore-title">
      <div className="explore-copy">
        <p className="hero-eyebrow"><span className="hero-eyebrow-light" />UX DESIGNER &amp; ENGINEER CURRENTLY AT HYDRO ONE</p>

        <h1 className="hero-headline" id="explore-title">
          <span>Crafting</span>
          <span className="hero-headline-outline">memorable</span>
          <span>digital</span>
          <span>experiences<span className="hero-headline-period" aria-hidden="true" /></span>
        </h1>

        <p className="hero-description">
          I blend creativity and user-first problem solving to design interfaces that don’t just look great but feel meaningful, connecting users to products in ways that truly matter.
        </p>

        <div className="hero-actions">
          <a className="hero-button hero-button-primary" href="#projects">My projects <Icon name="folder" /></a>
          <a className="hero-button hero-button-secondary" href="#about">About me <Icon name="arrow-right" /></a>
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

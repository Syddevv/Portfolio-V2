import { Icon, type IconName } from './Icons'
import './About.css'

const services: {
  number: string
  label: string
  title: string
  description: string
  action: string
  icon: IconName
  color: string
}[] = [
  {
    number: '01',
    label: 'FULL-STACK DEVELOPMENT',
    title: 'Build from idea to deployment.',
    description: 'I develop responsive, scalable web applications using modern frontend and backend technologies.',
    action: 'EXPLORE PROJECTS',
    icon: 'briefcase',
    color: 'pink',
  },
  {
    number: '02',
    label: 'UI/UX & FRONTEND',
    title: 'Interfaces that feel as good as they look.',
    description: 'I turn ideas and designs into responsive, accessible, and interactive user experiences with React and modern CSS.',
    action: 'VIEW MY WORK',
    icon: 'spark',
    color: 'cyan',
  },
  {
    number: '03',
    label: 'SYSTEMS & SOLUTIONS',
    title: 'Solve real problems with code.',
    description: 'I build practical software solutions designed around real-world needs, workflows, and everyday challenges.',
    action: 'VIEW PROJECTS',
    icon: 'arrow-up-right',
    color: 'yellow',
  },
]

const tickerPhrase = 'BUILD ✳ SHIP ✳ REPEAT ✳ DESIGN ✳'

export function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-ticker" aria-hidden="true">
        <div className="about-ticker-track">
          {[0, 1].map((group) => (
            <div className="about-ticker-segment" key={group}>
              {Array.from({ length: 10 }, (_, index) => <span key={index}>{tickerPhrase}</span>)}
            </div>
          ))}
        </div>
      </div>

      <div className="about-inner page-container">
        <div className="about-intro">
          <div className="about-intro-copy">
            <p className="about-intro-kicker">ABOUT ME</p>
            <h2>It’s nice to meet you</h2>
            <p>Hi, I’m Sydney, a full-stack web developer. I build modern web applications from frontend to backend, turning ideas into responsive, reliable, and practical digital solutions.</p>
            <p>I turn ideas and designs into responsive, accessible, and interactive user experiences with React and modern CSS.</p>
            <p>I build practical software solutions designed around real-world needs, workflows, and everyday challenges.</p>
            <a className="about-intro-action" href="#projects">Explore my projects <Icon name="arrow-right" /></a>
          </div>

          <div className="about-system-panel">
            <div className="about-system-art" role="img" aria-label="Developer workstation illustration with a FULL_STACK.TS code editor and React, TypeScript, Node.js, and Next.js labels">
              <span className="about-system-tag about-system-tag--react">REACT</span>
              <span className="about-system-tag about-system-tag--typescript">TYPESCRIPT</span>
              <div className="about-system-window">
                <div className="about-system-screen">
                  <div className="about-system-title"><span className="about-system-light" /><span>FULL_STACK.TS</span><Icon name="code" /></div>
                  <div className="about-system-code" aria-hidden="true">
                    <span className="about-code-line about-code-line--yellow" />
                    <span className="about-code-line about-code-line--short" />
                    <span className="about-code-line about-code-line--lime" />
                    <span className="about-code-line about-code-line--indent" />
                    <span className="about-code-line about-code-line--cyan" />
                  </div>
                  <div className="about-system-status"><Icon name="terminal" /><span>SYDNEY.DEV</span></div>
                </div>
                <div className="about-system-keyboard" aria-hidden="true">
                  <div>{Array.from({ length: 8 }, (_, index) => <span key={index} />)}</div>
                  <span className="about-system-spacebar" />
                </div>
              </div>
              <span className="about-system-tag about-system-tag--node">NODE.JS</span>
              <span className="about-system-tag about-system-tag--next">NEXT.JS</span>
            </div>
          </div>
        </div>

        <h2 className="about-heading" id="about-title">
          <span>I build things that</span>
          <span>solve real problems.</span>
        </h2>

        <div className="about-grid">
          {services.map((service) => (
            <article className={`about-card about-card--${service.color}`} key={service.number}>
              <span className="about-card-number">{service.number}</span>
              <Icon name={service.icon} className="about-card-icon" />
              <div className="about-card-copy">
                <p className="about-card-label">{service.label}</p>
                <h3>{service.title}</h3>
                <p className="about-card-description">{service.description}</p>
              </div>
              <a className="about-card-link" href="#projects">{service.action}<Icon name="arrow-up-right" /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

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

export function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-ticker" aria-hidden="true">
        <div>BUILD ✳ SHIP ✳ REPEAT ✳ DESIGN ✳ BUILD ✳ SHIP ✳ REPEAT ✳ DESIGN ✳ BUILD ✳ SHIP ✳ REPEAT ✳</div>
      </div>

      <div className="about-inner">
        <p className="about-kicker">01 / WHAT I DO</p>
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

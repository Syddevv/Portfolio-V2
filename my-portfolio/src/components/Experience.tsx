import { Icon } from './Icons'
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
    certificateUrl: undefined,
    certificateLabel: 'View OJT Certificate',
  },
]

export function Experience() {
  return (
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
                <a className="experience-certificate" href={entry.certificateUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="file" />{entry.certificateLabel}<Icon name="arrow-up-right" />
                </a>
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
  )
}

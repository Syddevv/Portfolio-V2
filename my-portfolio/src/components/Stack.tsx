import type { IconType } from 'react-icons'
import { DiCss3 } from 'react-icons/di'
import {
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiReactquery,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import './Stack.css'

type Technology = { name: string; icon: IconType; mobile?: boolean }

const technologies: Technology[] = [
  { name: 'React', icon: SiReact },
  { name: 'React Native', icon: SiReact, mobile: true },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'HTML5', icon: SiHtml5 },
  { name: 'CSS3', icon: DiCss3 },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'TanStack Query', icon: SiReactquery },
  { name: 'Redux Toolkit', icon: SiRedux },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Express', icon: SiExpress },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Git', icon: SiGit },
  { name: 'GitHub', icon: SiGithub },
]

export function Stack() {
  return (
    <section className="skills-section" id="stack" aria-labelledby="skills-title">
      <div className="skills-inner page-container">
        <div className="skills-header">
          <div>
            <p className="skills-kicker">TOOLS &amp; TECHNOLOGIES</p>
            <h2 id="skills-title">Skills</h2>
          </div>
          <span className="skills-count">[ {technologies.length} TECHNOLOGIES ]</span>
        </div>

        <ul className="skills-grid" aria-label="Technologies">
          {technologies.map(({ name, icon: TechnologyIcon, mobile }) => (
            <li className="skill-card" key={name}>
              <span className={`skill-card-icon${mobile ? ' skill-card-icon--mobile' : ''}`} aria-hidden="true">
                <TechnologyIcon />
              </span>
              <span className="skill-card-name">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

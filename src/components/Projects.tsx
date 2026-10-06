import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Icon } from './Icons'
import certicodeImage from '../assets/Certicode.png'
import craftMySiteImage from '../assets/CraftMySite.png'
import eduTrackImage from '../assets/EduTrack.png'
import eyrieImage from '../assets/Eyrie.png'
import floodWatchImage from '../assets/FloodwatchPH.png'
import letemCookImage from '../assets/LetemCook.png'
import loopymImage from '../assets/loopym-mobile-app.png'
import myCocolifeImage from '../assets/mycocolife-admin.png'
import orbitImage from '../assets/Orbit.png'
import spenSydImage from '../assets/SpenSyd.png'
import { projects, type PortfolioProject, type ProjectImageKey } from '../data/portfolioData'
import './Projects.css'

const projectImages: Record<ProjectImageKey, string> = {
  loopym: loopymImage,
  mycocolife: myCocolifeImage,
  floodwatch: floodWatchImage,
  eyrie: eyrieImage,
  edutrack: eduTrackImage,
  certicode: certicodeImage,
  spensyd: spenSydImage,
  letemcook: letemCookImage,
  craftmysite: craftMySiteImage,
  orbit: orbitImage,
}

function ProjectPreview({ project }: { project: PortfolioProject }) {
  const imageSource = project.imageKey ? projectImages[project.imageKey] : undefined

  return (
    <div className={`project-preview${project.imageFit === 'contain' ? ' project-preview--contain' : ''}`}>
      {imageSource ? (
        <img src={imageSource} alt={project.imageAlt ?? `${project.title} project preview`} />
      ) : (
        <div className="project-preview-empty" aria-label="Project image coming soon">
          <span>PROJECT_PREVIEW.JPG</span>
          <strong>IMAGE COMING SOON</strong>
          <span>IMAGE SLOT / 16:9</span>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, index, collapsing = false }: { project: PortfolioProject; index: number; collapsing?: boolean }) {
  const actions = [
    { label: 'View Project', url: project.projectUrl },
    { label: 'Live Demo', url: project.liveUrl },
    { label: 'GitHub', url: project.githubUrl },
  ].filter((action): action is { label: string; url: string } => Boolean(action.url))

  return (
    <article
      className={`project-card project-card--${index % 2 === 0 ? 'yellow' : 'cyan'}${collapsing ? ' project-card--collapsing' : ''}`}
      data-reveal-item
      style={{ '--reveal-index': (index % 4) + 1 } as CSSProperties}
    >
      <div className="project-card-rail">
        <span>{String(index + 1).padStart(2, '0')} <span aria-hidden="true">//</span> {project.category}</span>
        <span className="project-card-rail-mark" aria-hidden="true">PROJECT FILE</span>
      </div>

      <ProjectPreview project={project} />

      <div className="project-card-body">
        {(project.type || project.engagement) && (
          <div className="project-labels">
            {project.type && <span className="project-type">{project.type.toUpperCase()}</span>}
            {project.engagement && <span className="project-engagement">{project.engagement.toUpperCase()}</span>}
          </div>
        )}
        <h3>{project.title}</h3>
        <p className="project-card-summary">{project.shortDescription}</p>
        {project.description && <p className="project-card-description">{project.description}</p>}

        {project.technologies && project.technologies.length > 0 && (
          <ul className="project-tech-list" aria-label="Technologies">
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        )}

        {actions.length > 0 && (
          <div className="project-actions">
            {actions.map((action) => (
              <a key={action.label} href={action.url} target="_blank" rel="noopener noreferrer">
                {action.label}<Icon name="arrow-up-right" />
              </a>
            ))}
          </div>
        )}
        {actions.length === 0 && (
          <div className="project-private"><Icon name="lock" /><span>PRIVATE PROJECT</span></div>
        )}
      </div>
    </article>
  )
}

export function Projects() {
  const [showAll, setShowAll] = useState(false)
  const [isCollapsing, setIsCollapsing] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const collapseTimerRef = useRef<number | null>(null)
  const visibleProjects = showAll ? projects : projects.slice(0, 4)

  useEffect(() => () => {
    if (collapseTimerRef.current !== null) window.clearTimeout(collapseTimerRef.current)
  }, [])

  const toggleProjects = () => {
    if (showAll) {
      if (isCollapsing) return
      setIsCollapsing(true)
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      collapseTimerRef.current = window.setTimeout(() => {
        setShowAll(false)
        setIsCollapsing(false)
        requestAnimationFrame(() => {
          const button = toggleRef.current
          if (!button) return
          const { top, bottom } = button.getBoundingClientRect()
          if (bottom < 90 || top > window.innerHeight - 24) {
            document.getElementById('projects')?.scrollIntoView({
              behavior: reducedMotion ? 'auto' : 'smooth',
              block: 'start',
            })
          }
        })
      }, reducedMotion ? 0 : 170)
    } else {
      setShowAll(true)
    }
  }

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title" data-reveal>
      <div className="projects-inner page-container">
        <div className="projects-layout">
          <div className="projects-header" data-reveal-item style={{ '--reveal-index': 0 } as CSSProperties}>
            <div>
              <p className="projects-kicker">// PROJECT ARCHIVE</p>
              <h2 id="projects-title">Selected Projects</h2>
            </div>
            <span className="projects-header-tag">{String(projects.length).padStart(2, '0')} FEATURED PROJECTS</span>
          </div>

          <div className="projects-grid" id="projects-grid">
            {visibleProjects.map((project, index) => <ProjectCard project={project} index={index} collapsing={isCollapsing && index >= 4} key={project.title} />)}
          </div>

          <div className="projects-more-row">
            <button
              className="projects-more-button"
              type="button"
              ref={toggleRef}
              onClick={toggleProjects}
              aria-expanded={showAll}
              aria-controls="projects-grid"
              disabled={isCollapsing}
            >
              <span>{showAll ? 'SHOW LESS' : 'VIEW MORE PROJECTS'}</span>
              <span className={`projects-more-arrow${showAll ? ' projects-more-arrow--up' : ''}`} aria-hidden="true">{showAll ? '↑' : '↓'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

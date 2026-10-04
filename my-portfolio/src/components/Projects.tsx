import { useRef, useState } from 'react'
import { Icon } from './Icons'
import './Projects.css'

type Project = {
  category: string
  title: string
  shortDescription: string
  description: string
  technologies?: string[]
  image?: { src: string; alt: string }
  projectUrl?: string
  liveUrl?: string
  githubUrl?: string
}

const projects: Project[] = [
  {
    category: 'Web Application / Community Platform',
    title: 'FloodWatch PH',
    shortDescription: 'Community-powered flood monitoring and reporting platform.',
    description: 'FloodWatch PH is a public web platform that helps communities monitor flood conditions across the Philippines. Users can view community-submitted flood reports on an interactive map, report new incidents with photos and location data, verify existing reports, check nearby evacuation centers, monitor weather conditions, and access flood-related information through a mobile-friendly interface designed for fast and reliable public use.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'AI-Assisted'],
    githubUrl: 'https://github.com/Syddevv/Flood-Watch-PH',
    liveUrl: 'https://flood-watch-ph.vercel.app/',
  },
  {
    category: 'Mobile Application / Personal Finance',
    title: 'Eyrie',
    shortDescription: 'AI-assisted, offline-first personal finance mobile app.',
    description: 'Eyrie is an offline-first personal finance mobile application for tracking expenses, budgets, savings, and financial activity. It was developed using an AI-assisted workflow with Codex for development and v0 by Vercel for prototyping, while focusing on local storage, secure syncing, and a smooth mobile experience.',
    technologies: ['React Native', 'TypeScript', 'SQLite', 'Supabase', 'AI-Assisted'],
    liveUrl: 'https://apkpure.com/p/com.sydu.eyrie',
  },
  {
    category: 'Web Application / Academic Management',
    title: 'EduTrack',
    shortDescription: 'Academic management system for attendance, classes, and reports.',
    description: 'EduTrack is a web-based academic management system that helps teachers and administrators record attendance, manage classes, and generate real-time reports. It provides clear dashboards for monitoring student performance and identifying at-risk students.',
    technologies: ['React', 'TypeScript', 'PHP', 'MySQL'],
  },
  {
    category: 'E-commerce / Full-Stack Web Application',
    title: 'Certicode E-commerce',
    shortDescription: 'Full-stack e-commerce web application.',
    description: 'A full-stack e-commerce web application I contributed to during my internship. It features product listings, a shopping cart system, and a responsive interface for online shopping.',
    technologies: ['React', 'Laravel', 'MySQL'],
  },
  {
    category: 'Web Application / Personal Finance',
    title: 'SpenSyd',
    shortDescription: 'Personal finance tracker with AI integration.',
    description: 'SpenSyd is a modern web application built to help users track their spending and income efficiently, powered by a smart AI assistant.',
    technologies: ['MERN Stack', 'Gemini API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Syddevv/SpenSyd',
    liveUrl: 'https://spen-syd.vercel.app/',
  },
  {
    category: 'Web Application / Community Platform',
    title: "Let'em Cook",
    shortDescription: 'Community recipe sharing platform.',
    description: "Let'em Cook is an online community platform designed for passionate home cooks to share their culinary creations and discover recipes from other users.",
    technologies: ['MERN Stack'],
    githubUrl: 'https://github.com/Syddevv/LetemCook',
    liveUrl: 'https://letem-cook.vercel.app/',
  },
  {
    category: 'Web Platform / Marketplace',
    title: 'CraftMySite',
    shortDescription: 'Template marketplace and custom web services platform.',
    description: 'CraftMySite is a web platform that combines a digital template marketplace with custom web development services, allowing users to explore ready-made website solutions and web services.',
    githubUrl: 'https://github.com/Syddevv/CraftMySite',
  },
  {
    category: 'Web Application / Communication',
    title: 'Orbit',
    shortDescription: 'Modern anonymous chat application.',
    description: 'Orbit is a modern anonymous chat application designed for spontaneous and anonymous conversations, allowing users to connect and communicate through a simple, focused interface.',
    githubUrl: 'https://github.com/Syddevv/Orbit',
    liveUrl: 'https://orbit-chat-web.vercel.app/',
  },
]

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="project-preview">
      {project.image ? (
        <img src={project.image.src} alt={project.image.alt} />
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const actions = [
    { label: 'View Project', url: project.projectUrl },
    { label: 'Live Demo', url: project.liveUrl },
    { label: 'GitHub', url: project.githubUrl },
  ].filter((action): action is { label: string; url: string } => Boolean(action.url))

  return (
    <article className={`project-card project-card--${index % 2 === 0 ? 'yellow' : 'cyan'}`}>
      <div className="project-card-rail">
        <span>{String(index + 1).padStart(2, '0')} <span aria-hidden="true">//</span> {project.category}</span>
        <span className="project-card-rail-mark" aria-hidden="true">PROJECT FILE</span>
      </div>

      <ProjectPreview project={project} />

      <div className="project-card-body">
        <h3>{project.title}</h3>
        <p className="project-card-summary">{project.shortDescription}</p>
        <p className="project-card-description">{project.description}</p>

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
  const toggleRef = useRef<HTMLButtonElement>(null)
  const visibleProjects = showAll ? projects : projects.slice(0, 4)

  const toggleProjects = () => {
    if (showAll) {
      setShowAll(false)
      requestAnimationFrame(() => {
        const button = toggleRef.current
        if (!button) return
        const { top, bottom } = button.getBoundingClientRect()
        if (bottom < 90 || top > window.innerHeight - 24) {
          document.getElementById('projects')?.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
            block: 'start',
          })
        }
      })
    } else {
      setShowAll(true)
    }
  }

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title">
      <div className="projects-inner page-container">
        <div className="projects-layout">
          <div className="projects-header">
            <div>
              <p className="projects-kicker">// PROJECT ARCHIVE</p>
              <h2 id="projects-title">Selected Projects</h2>
            </div>
            <span className="projects-header-tag">{String(projects.length).padStart(2, '0')} FEATURED PROJECTS</span>
          </div>

          <div className="projects-grid" id="projects-grid">
            {visibleProjects.map((project, index) => <ProjectCard project={project} index={index} key={project.title} />)}
          </div>

          <div className="projects-more-row">
            <button
              className="projects-more-button"
              type="button"
              ref={toggleRef}
              onClick={toggleProjects}
              aria-expanded={showAll}
              aria-controls="projects-grid"
            >
              {showAll ? 'SHOW LESS ↑' : 'VIEW MORE PROJECTS ↓'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

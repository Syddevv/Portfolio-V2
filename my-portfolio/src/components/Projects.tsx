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
import './Projects.css'

type Project = {
  category: string
  title: string
  shortDescription: string
  description?: string
  technologies?: string[]
  image?: { src: string; alt: string }
  imageFit?: 'cover' | 'contain'
  type?: 'Professional Work'
  engagement?: 'Internship'
  contributions?: string[]
  fullTechnologies?: string[]
  projectUrl?: string
  liveUrl?: string
  githubUrl?: string
}

const projects: Project[] = [
  {
    category: 'Production Mobile Application',
    title: 'Loopym Mobile App',
    image: { src: loopymImage, alt: 'Loopym mobile application pool dashboard' },
    imageFit: 'contain',
    type: 'Professional Work',
    engagement: 'Internship',
    shortDescription: 'A production React Native mobile application where I contributed to modernizing the interface, improving native mobile interactions, and shipping features across core application modules.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'TanStack Query', 'Zustand'],
    contributions: [
      'Rebuilt 20+ screens to modern design specifications.',
      'Integrated native iOS UI and haptic interactions to improve responsiveness and user experience.',
      'Shipped 40+ reviewed pull requests across 4 core application modules.',
      'Helped standardize reusable UI patterns across the mobile application.',
    ],
    fullTechnologies: ['React Native', 'Expo', 'TypeScript', 'Expo Router', 'TanStack Query', 'Zustand', 'React Hook Form', 'Zod', 'Firebase', 'Maestro', 'EAS', 'GitHub Actions'],
  },
  {
    category: 'Enterprise Administration Platform',
    title: 'MyCocolife Admin',
    image: { src: myCocolifeImage, alt: 'MyCocolife Admin payment processing interface' },
    imageFit: 'contain',
    type: 'Professional Work',
    engagement: 'Internship',
    shortDescription: 'An enterprise administration platform where I contributed to payment processing, automated document generation, notification workflows, and administrative tools.',
    technologies: ['React', 'TypeScript', 'Material UI', 'Redux Toolkit', 'React Query'],
    contributions: [
      'Engineered an automated agent payment and client-side PDF export module using MUI X DataGrid.',
      'Reduced manual administrative processing involved in invoice generation.',
      'Implemented recurring notification scheduling.',
      'Developed role-based approval flows for administrative workflows.',
      'Contributed to maintaining structured and reusable frontend functionality across the platform.',
    ],
    fullTechnologies: ['React', 'TypeScript', 'Vite', 'Material UI', 'MUI X DataGrid', 'Redux Toolkit', 'React Query', 'Formik', 'Yup', 'SASS', 'Vitest', 'GitHub Actions', 'AWS EC2'],
  },
  {
    category: 'Web Application / Community Platform',
    title: 'FloodWatch PH',
    image: { src: floodWatchImage, alt: 'FloodWatch PH flood monitoring platform interface' },
    shortDescription: 'Community-powered flood monitoring and reporting platform.',
    description: 'FloodWatch PH is a public web platform that helps communities monitor flood conditions across the Philippines. Users can view community-submitted flood reports on an interactive map, report new incidents with photos and location data, verify existing reports, check nearby evacuation centers, monitor weather conditions, and access flood-related information through a mobile-friendly interface designed for fast and reliable public use.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'AI-Assisted'],
    githubUrl: 'https://github.com/Syddevv/Flood-Watch-PH',
    liveUrl: 'https://flood-watch-ph.vercel.app/',
  },
  {
    category: 'Mobile Application / Personal Finance',
    title: 'Eyrie',
    image: { src: eyrieImage, alt: 'Eyrie personal finance mobile application interface' },
    shortDescription: 'AI-assisted, offline-first personal finance mobile app.',
    description: 'Eyrie is an offline-first personal finance mobile application for tracking expenses, budgets, savings, and financial activity. It was developed using an AI-assisted workflow with Codex for development and v0 by Vercel for prototyping, while focusing on local storage, secure syncing, and a smooth mobile experience.',
    technologies: ['React Native', 'TypeScript', 'SQLite', 'Supabase', 'AI-Assisted'],
    liveUrl: 'https://apkpure.com/p/com.sydu.eyrie',
    githubUrl: 'https://github.com/Syddevv/eyrie',
  },
  {
    category: 'Web Application / Academic Management',
    title: 'EduTrack',
    image: { src: eduTrackImage, alt: 'EduTrack academic management system interface' },
    shortDescription: 'Academic management system for attendance, classes, and reports.',
    description: 'EduTrack is a web-based academic management system that helps teachers and administrators record attendance, manage classes, and generate real-time reports. It provides clear dashboards for monitoring student performance and identifying at-risk students.',
    technologies: ['React', 'TypeScript', 'PHP', 'MySQL'],
  },
  {
    category: 'E-commerce / Full-Stack Web Application',
    title: 'Certicode E-commerce',
    image: { src: certicodeImage, alt: 'Certicode e-commerce web application interface' },
    shortDescription: 'Full-stack e-commerce web application.',
    description: 'A full-stack e-commerce web application I contributed to during my internship. It features product listings, a shopping cart system, and a responsive interface for online shopping.',
    technologies: ['React', 'Laravel', 'MySQL'],
  },
  {
    category: 'Web Application / Personal Finance',
    title: 'SpenSyd',
    image: { src: spenSydImage, alt: 'SpenSyd personal finance tracker interface' },
    shortDescription: 'Personal finance tracker with AI integration.',
    description: 'SpenSyd is a modern web application built to help users track their spending and income efficiently, powered by a smart AI assistant.',
    technologies: ['MERN Stack', 'Gemini API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Syddevv/SpenSyd',
    liveUrl: 'https://spen-syd.vercel.app/',
  },
  {
    category: 'Web Application / Community Platform',
    title: "Let'em Cook",
    image: { src: letemCookImage, alt: "Let'em Cook community recipe platform interface" },
    shortDescription: 'Community recipe sharing platform.',
    description: "Let'em Cook is an online community platform designed for passionate home cooks to share their culinary creations and discover recipes from other users.",
    technologies: ['MERN Stack'],
    githubUrl: 'https://github.com/Syddevv/LetemCook',
    liveUrl: 'https://letem-cook.vercel.app/',
  },
  {
    category: 'Web Platform / Marketplace',
    title: 'CraftMySite',
    image: { src: craftMySiteImage, alt: 'CraftMySite template marketplace interface' },
    shortDescription: 'Template marketplace and custom web services platform.',
    description: 'CraftMySite is a web platform that combines a digital template marketplace with custom web development services, allowing users to explore ready-made website solutions and web services.',
    githubUrl: 'https://github.com/Syddevv/CraftMySite',
  },
  {
    category: 'Web Application / Communication',
    title: 'Orbit',
    image: { src: orbitImage, alt: 'Orbit anonymous chat application interface' },
    shortDescription: 'Modern anonymous chat application.',
    description: 'Orbit is a modern anonymous chat application designed for spontaneous and anonymous conversations, allowing users to connect and communicate through a simple, focused interface.',
    githubUrl: 'https://github.com/Syddevv/Orbit',
    liveUrl: 'https://orbit-chat-web.vercel.app/',
  },
]

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className={`project-preview${project.imageFit === 'contain' ? ' project-preview--contain' : ''}`}>
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

function ProjectCard({ project, index, collapsing = false }: { project: Project; index: number; collapsing?: boolean }) {
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

import { useEffect, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { TopBar } from './components/TopBar'
import { Explore } from './components/Explore'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Stack } from './components/Stack'
import { Experience } from './components/Experience'
import { Certificates } from './components/Certificates'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { PortfolioAssistant } from './components/assistant/PortfolioAssistant'
import { useScrollReveal } from './hooks/useScrollReveal'

function App() {
  const [activePage, setActivePage] = useState(() => window.location.pathname === '/experience'
    ? 'experience'
    : window.location.hash.slice(1) || 'explore')
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useScrollReveal()

  useEffect(() => {
    const sectionIds = ['explore', 'about', 'projects', 'experience', 'stack', 'contact']
    const requestedSection = window.location.pathname === '/experience'
      ? 'experience'
      : window.location.hash.slice(1)
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))
    let animationFrame: number | null = null

    if (window.location.pathname === '/experience') {
      window.history.replaceState({}, '', '/#experience')
    }

    const updateActiveSection = () => {
      if (sections.length === 0) return

      const topbarHeight = document.querySelector<HTMLElement>('.topbar')?.offsetHeight ?? 0
      const usableViewportHeight = Math.max(0, window.innerHeight - topbarHeight)
      const activationLine = topbarHeight + Math.min(usableViewportHeight * 0.3, 230)
      const atPageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3
      let nextSectionId = sections[0].id

      for (const section of sections) {
        if (section.getBoundingClientRect().top > activationLine) break
        nextSectionId = section.id
      }

      if (atPageBottom) nextSectionId = sections[sections.length - 1].id

      setActivePage((currentSection) => {
        if (currentSection === nextSectionId) return currentSection
        window.history.replaceState({}, '', `/#${nextSectionId}`)
        return nextSectionId
      })
    }

    const scheduleActiveSectionUpdate = () => {
      if (animationFrame !== null) return
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null
        updateActiveSection()
      })
    }

    const scrollToCurrentHash = () => {
      const sectionId = window.location.hash.slice(1)
      if (!sectionId || !sectionIds.includes(sectionId)) return
      setActivePage(sectionId)
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView()
        requestAnimationFrame(updateActiveSection)
      })
    }

    window.addEventListener('scroll', scheduleActiveSectionUpdate, { passive: true })
    window.addEventListener('resize', scheduleActiveSectionUpdate)
    window.addEventListener('popstate', scrollToCurrentHash)
    if (requestedSection) scrollToCurrentHash()
    else scheduleActiveSectionUpdate()

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', scheduleActiveSectionUpdate)
      window.removeEventListener('resize', scheduleActiveSectionUpdate)
      window.removeEventListener('popstate', scrollToCurrentHash)
    }
  }, [])

  const navigate = (page: string) => {
    setMobileMenuOpen(false)
    window.history.pushState({}, '', `/#${page}`)
    setActivePage(page)
    requestAnimationFrame(() => document.getElementById(page)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    }))
  }

  return (
    <div className={`app-shell${darkMode ? ' app-shell--dark' : ''}`}>
      <Sidebar
        activePage={activePage}
        onNavigate={navigate}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((current) => !current)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />
      <div className="workspace">
        <TopBar onOpenMenu={() => setMobileMenuOpen(true)} />
        <main className="workspace-canvas" aria-label="Portfolio content">
          <Explore />
          <About />
          <Projects />
          <Experience />
          <Certificates />
          <Stack />
          <Contact />
          <Footer onNavigate={navigate} />
        </main>
      </div>
      <PortfolioAssistant />
    </div>
  )
}

export default App

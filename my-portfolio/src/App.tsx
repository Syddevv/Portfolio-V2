import { useEffect, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { TopBar } from './components/TopBar'
import { Explore } from './components/Explore'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Stack } from './components/Stack'
import { Experience } from './components/Experience'

function App() {
  const [activePage, setActivePage] = useState(() => window.location.pathname === '/experience'
    ? 'experience'
    : window.location.hash.slice(1) || 'explore')
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const sectionIds = ['explore', 'about', 'projects', 'experience', 'stack', 'resume']
    const requestedSection = window.location.pathname === '/experience'
      ? 'experience'
      : window.location.hash.slice(1)

    if (window.location.pathname === '/experience') {
      window.history.replaceState({}, '', '/#experience')
    }

    const scrollToCurrentHash = () => {
      const sectionId = window.location.hash.slice(1)
      if (!sectionId || !sectionIds.includes(sectionId)) return
      setActivePage(sectionId)
      requestAnimationFrame(() => document.getElementById(sectionId)?.scrollIntoView())
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver((entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

      if (!visibleSection) return
      const sectionId = visibleSection.target.id
      setActivePage(sectionId)
      window.history.replaceState({}, '', `/#${sectionId}`)
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.01] })

    sections.forEach((section) => observer.observe(section))
    window.addEventListener('popstate', scrollToCurrentHash)
    if (requestedSection) scrollToCurrentHash()

    return () => {
      observer.disconnect()
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
          <Stack />
        </main>
      </div>
    </div>
  )
}

export default App

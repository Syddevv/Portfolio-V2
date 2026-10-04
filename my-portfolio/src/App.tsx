import { useEffect, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { TopBar } from './components/TopBar'
import { Explore } from './components/Explore'
import { About } from './components/About'

function App() {
  const [activePage, setActivePage] = useState('explore')
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const syncPageWithHash = () => {
      const page = window.location.hash.slice(1)
      if (page === 'explore' || page === 'about') setActivePage(page)
    }
    window.addEventListener('hashchange', syncPageWithHash)
    syncPageWithHash()
    return () => window.removeEventListener('hashchange', syncPageWithHash)
  }, [])

  return (
    <div className={`app-shell${darkMode ? ' app-shell--dark' : ''}`}>
      <Sidebar
        activePage={activePage}
        onNavigate={(page) => { setActivePage(page); setMobileMenuOpen(false) }}
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
        </main>
      </div>
    </div>
  )
}

export default App

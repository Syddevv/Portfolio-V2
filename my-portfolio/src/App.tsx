import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { TopBar } from './components/TopBar'

function App() {
  const [activePage, setActivePage] = useState('explore')
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
        <main className="workspace-canvas" id="explore" aria-label="Portfolio content" />
      </div>
    </div>
  )
}

export default App

import { useEffect, useRef, useState } from 'react'
import { Icon, type IconName } from './Icons'

const navItems: { id: string; label: string; icon: IconName }[] = [
  { id: 'explore', label: 'Explore', icon: 'terminal' },
  { id: 'about', label: 'About', icon: 'user' },
  { id: 'projects', label: 'Projects', icon: 'code' },
  { id: 'stack', label: 'Stack', icon: 'layers' },
  { id: 'resume', label: 'Resume', icon: 'file' },
]

type SidebarProps = {
  activePage: string
  onNavigate: (page: string) => void
  darkMode: boolean
  onToggleTheme: () => void
  mobileOpen: boolean
  onCloseMobile: () => void
}

export function Sidebar({ activePage, onNavigate, darkMode, onToggleTheme, mobileOpen, onCloseMobile }: SidebarProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onSearchShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onSearchShortcut)
    return () => window.removeEventListener('keydown', onSearchShortcut)
  }, [])

  useEffect(() => { if (searchOpen) searchRef.current?.focus() }, [searchOpen])

  const visibleItems = navItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))

  return <>
    {mobileOpen && <button className="sidebar-backdrop" onClick={onCloseMobile} aria-label="Close navigation" />}
    <aside className={`sidebar${mobileOpen ? ' sidebar--open' : ''}`} aria-label="Main navigation">
      <div className="sidebar-main">
        <div className="brand-card">
          <div className="brand-mark" aria-hidden="true"><i /></div>
          <div className="brand-copy"><strong>SYDNEY SANTOS</strong><span>FULL-STACK DEVELOPER</span></div>
          <button className="sidebar-close" onClick={onCloseMobile} aria-label="Close navigation"><Icon name="close" /></button>
        </div>
        <nav className="sidebar-nav" aria-label="Portfolio">
          <p className="sidebar-kicker">// NAVIGATION</p>
          <div className="nav-list">
            {visibleItems.map((item) => <a key={item.id} className={`nav-link${activePage === item.id ? ' nav-link--active' : ''}`} href={`#${item.id}`} aria-current={activePage === item.id ? 'page' : undefined} onClick={() => onNavigate(item.id)}>
              <span className="nav-number">{String(navItems.indexOf(item) + 1).padStart(2, '0')}</span><Icon name={item.icon} className="nav-icon" /><span>{item.label}</span>
            </a>)}
            {visibleItems.length === 0 && <span className="nav-empty">NO MATCHES FOUND</span>}
          </div>
        </nav>
        <div className="sidebar-contact"><a className="contact-link" href="#contact" onClick={() => onNavigate('contact')}><Icon name="mail" /><span>Contact</span><span className="contact-tag">GET IN TOUCH</span></a></div>
      </div>
      <div className="sidebar-footer">
        {searchOpen && <div className="sidebar-search-box"><Icon name="search" /><input ref={searchRef} aria-label="Search navigation" placeholder="Search navigation" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') { setSearchOpen(false); setQuery('') } }} /><button onClick={() => { setSearchOpen(false); setQuery('') }} aria-label="Close search"><Icon name="close" /></button></div>}
        <div className="sidebar-footer-actions"><button className="utility-button" onClick={() => setSearchOpen((open) => !open)}><Icon name="search" /> Search</button><button className="utility-button" onClick={onToggleTheme} aria-pressed={darkMode}><Icon name="theme" /> Theme</button></div>
        <p className="sidebar-version">v2.4.0 <span>// PRODUCTION RAIL</span></p>
      </div>
    </aside>
  </>
}

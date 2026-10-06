import { useEffect, useRef, useState } from 'react'
import { Icon, type IconName } from './Icons'
import { socialLinks } from '../data/socialLinks'

const navItems: { id: string; label: string; icon: IconName }[] = [
  { id: 'explore', label: 'Explore', icon: 'terminal' },
  { id: 'about', label: 'About', icon: 'user' },
  { id: 'projects', label: 'Projects', icon: 'code' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'stack', label: 'Stack', icon: 'layers' },
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
            {visibleItems.map((item) => <a key={item.id} className={`nav-link${activePage === item.id ? ' nav-link--active' : ''}`} href={`/#${item.id}`} aria-current={activePage === item.id ? 'page' : undefined} onClick={(event) => { event.preventDefault(); onNavigate(item.id) }}>
              <span className="nav-number">{String(navItems.indexOf(item) + 1).padStart(2, '0')}</span><Icon name={item.icon} className="nav-icon" /><span>{item.label}</span>
            </a>)}
            {visibleItems.length === 0 && <span className="nav-empty">NO MATCHES FOUND</span>}
          </div>
        </nav>
        <section className="sidebar-connect" aria-labelledby="connect-heading">
          <p className="sidebar-kicker" id="connect-heading">// CONNECT</p>
          <div className="connect-list">
            <a className={`connect-link connect-contact-link${activePage === 'contact' ? ' connect-contact-link--active' : ''}`} href="/#contact" onClick={(event) => { event.preventDefault(); onNavigate('contact') }}>
              <Icon name="mail" className="connect-icon" /><span>Contact</span><span className="connect-contact-tag">GET IN TOUCH</span>
            </a>
            {socialLinks.map(({ label, icon: SocialIcon, url }) => (
              <a className="connect-link" href={url} target="_blank" rel="noopener noreferrer" key={label}>
                <SocialIcon className="connect-icon" aria-hidden="true" /><span>{label}</span><Icon name="arrow-up-right" className="connect-arrow" />
              </a>
            ))}
          </div>
        </section>
      </div>
      <div className="sidebar-footer">
        {searchOpen && <div className="sidebar-search-box"><Icon name="search" /><input ref={searchRef} aria-label="Search navigation" placeholder="Search navigation" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') { setSearchOpen(false); setQuery('') } }} /><button onClick={() => { setSearchOpen(false); setQuery('') }} aria-label="Close search"><Icon name="close" /></button></div>}
        <div className="sidebar-footer-actions"><button className="utility-button" onClick={() => setSearchOpen((open) => !open)}><Icon name="search" /> Search</button><button className="utility-button" onClick={onToggleTheme} aria-pressed={darkMode}><Icon name="theme" /> Theme</button></div>
        <p className="sidebar-version">v2.4.0 <span>// PRODUCTION RAIL</span></p>
      </div>
    </aside>
  </>
}

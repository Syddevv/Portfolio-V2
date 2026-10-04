import { useState } from 'react'
import { Icon } from './Icons'

type TopBarProps = { onOpenMenu: () => void }

export function TopBar({ onOpenMenu }: TopBarProps) {
  const [shareMessage, setShareMessage] = useState('')
  const [terminalOpen, setTerminalOpen] = useState(false)

  async function sharePortfolio() {
    try {
      if (navigator.share) await navigator.share({ title: 'Sydney Santos — Portfolio', url: window.location.href })
      else {
        await navigator.clipboard.writeText(window.location.href)
        setShareMessage('LINK COPIED')
        window.setTimeout(() => setShareMessage(''), 2400)
      }
    } catch {
      setShareMessage('UNABLE TO SHARE')
      window.setTimeout(() => setShareMessage(''), 2400)
    }
  }

  return <header className="topbar">
    <button className="mobile-menu-button" onClick={onOpenMenu} aria-label="Open navigation"><Icon name="menu" /></button>
    <div className="system-identity"><span className="system-light" /><span>SYDNEY.DEV <span className="system-extra">// SYSTEM</span><br />STATUS: ONLINE</span></div>
    <div className="topbar-actions">
      <span className="availability">STATUS: AVAILABLE<br />FOR HIRE</span>
      <span className="telemetry">LATENCY:<br /><strong>12MS</strong></span>
      <span className="telemetry stack-telemetry">STACK:<br /><strong>FULL-STACK</strong></span>
      <a className="book-call" href="#contact"><Icon name="clock" /><span>Book<br />Call</span></a>
      <div className="topbar-popover-anchor"><button className="topbar-icon-button" onClick={() => setTerminalOpen((open) => !open)} aria-label="System information" aria-expanded={terminalOpen}><Icon name="terminal" /></button>{terminalOpen && <div className="system-popover" role="status"><strong>&gt; SYDNEY.DEV</strong><span>STATUS: ONLINE</span><span>STACK: FULL-STACK</span><span>AVAILABLE FOR HIRE</span></div>}</div>
      <button className="topbar-icon-button" onClick={sharePortfolio} aria-label="Share portfolio"><Icon name="share" /></button>
    </div>
    {shareMessage && <span className="share-message" role="status">{shareMessage}</span>}
  </header>
}

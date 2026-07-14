import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'
import LangSwitcher from './LangSwitcher'

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const { lang } = useLang()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/') }
  const tr = (key: string) => t(key, lang)

  return (
    <nav className="navbar-premium">
      <div className="navbar-premium-inner">
        <Link to="/" className="navbar-logo">
          <svg className="navbar-logo-icon" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="1" y="12" width="26" height="4" rx="2" fill="#DC2626" />
            <rect x="3" y="8" width="4" height="12" rx="1.5" fill="#F0EEE8" opacity="0.9" />
            <rect x="21" y="8" width="4" height="12" rx="1.5" fill="#F0EEE8" opacity="0.9" />
            <rect x="5" y="6" width="3" height="16" rx="1.5" fill="#F0EEE8" opacity="0.6" />
            <rect x="20" y="6" width="3" height="16" rx="1.5" fill="#F0EEE8" opacity="0.6" />
          </svg>
          <span className="navbar-logo-text">
            <span className="navbar-logo-iron">IRON</span><span className="navbar-logo-track">TRACK</span>
          </span>
        </Link>
        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="navbar-link">{tr('nav.dashboard')}</Link>
              <Link to="/programs" className="navbar-link">{tr('nav.programs')}</Link>
              <Link to="/workout" className="navbar-link">{tr('nav.workout')}</Link>
              <Link to="/stats" className="navbar-link">{tr('nav.stats')}</Link>
            </>
          ) : (
            <>
              <Link to="/" className="navbar-link">{tr('nav.home')}</Link>
              <a href="#features" className="navbar-link">{tr('nav.features')}</a>
            </>
          )}
        </div>
        <div className="navbar-actions">
          <LangSwitcher />
          {isAuthenticated ? (
            <>
              <div className="nav-user-desktop"
                onClick={() => setOpen(!open)} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; if (!open) setOpen(false) }}>
                <div className="nav-user-avatar">{user?.username?.charAt(0).toUpperCase()}</div>
                <div className="nav-user-info">
                  <div className="nav-user-name">{user?.fullName || user?.username}</div>
                  <div className="nav-user-role">{user?.role}</div>
                </div>
                <span className="nav-user-chevron">▼</span>
                {open && (
                  <div className="nav-dropdown">
                    <Link to="/profile" onClick={() => setOpen(false)}>{tr('nav.profile')}</Link>
                    <div className="nav-dropdown-divider" />
                    <button onClick={handleLogout}>{tr('nav.signOut')}</button>
                  </div>
                )}
              </div>
              <button className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                <span style={{ background: menuOpen ? 'transparent' : '#fff' }} />
                <span style={{ transform: menuOpen ? 'rotate(45deg)' : 'none', top: menuOpen ? '7px' : '0', background: '#fff' }} />
                <span style={{ transform: menuOpen ? 'rotate(-45deg)' : 'none', top: menuOpen ? '-7px' : '0', background: '#fff' }} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-nav-signin">{tr('nav.signIn')}</Link>
              <Link to="/register" className="btn-nav-start">{tr('nav.getStarted')}</Link>
              <button className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                <span style={{ background: menuOpen ? 'transparent' : '#fff' }} />
                <span style={{ transform: menuOpen ? 'rotate(45deg)' : 'none', top: menuOpen ? '7px' : '0', background: '#fff' }} />
                <span style={{ transform: menuOpen ? 'rotate(-45deg)' : 'none', top: menuOpen ? '-7px' : '0', background: '#fff' }} />
              </button>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="navbar-mobile-menu">
          {isAuthenticated ? (
            <>
              <div className="navbar-mobile-user">
                <div className="nav-user-avatar">{user?.username?.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="navbar-mobile-username">{user?.fullName || user?.username}</div>
                  <div className="navbar-mobile-userrole">{user?.role}</div>
                </div>
              </div>
              <Link to="/dashboard" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>{tr('nav.dashboard')}</Link>
              <Link to="/programs" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>{tr('nav.programs')}</Link>
              <Link to="/workout" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>{tr('nav.workout')}</Link>
              <Link to="/stats" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>{tr('nav.stats')}</Link>
              <Link to="/profile" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>{tr('nav.profile')}</Link>
              <div className="navbar-mobile-divider" />
              <button className="navbar-mobile-link navbar-mobile-signout" onClick={() => { handleLogout(); setMenuOpen(false) }}>{tr('nav.signOut')}</button>
            </>
          ) : (
            <>
              <Link to="/" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>{tr('nav.home')}</Link>
              <a href="#features" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>{tr('nav.features')}</a>
              <div className="navbar-mobile-divider" />
              <Link to="/login" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>{tr('nav.signIn')}</Link>
              <Link to="/register" className="navbar-mobile-link navbar-mobile-cta" onClick={() => setMenuOpen(false)}>{tr('nav.getStarted')}</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

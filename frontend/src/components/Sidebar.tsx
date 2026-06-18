import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const links = [
  { to: '/', label: 'Dashboard', icon: '◆' },
  { to: '/programs', label: 'Programs', icon: '⊞' },
  { to: '/workout', label: 'Workout', icon: '▲' },
  { to: '/stats', label: 'Stats', icon: '■' },
  { to: '/profile', label: 'Profile', icon: '●' }
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <div className="sidebar">
      <div className="sidebar-logo">Iron<span>Track</span></div>
      <nav className="sidebar-nav">
        <div className="nav-label">Menu</div>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={`nav-item ${location.pathname === link.to ? 'active' : ''}`}
          >
            <span className="icon">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="avatar">{user?.username?.charAt(0).toUpperCase()}</div>
        <div className="user-info">
          <div className="user-name">{user?.fullName || user?.username}</div>
          <div className="user-role">{user?.role}</div>
        </div>
        <button className="logout-btn" onClick={logout} title="Logout">↩</button>
      </div>
    </div>
  )
}

import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Icon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    dashboard: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
    programs: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
    workout: 'M6.5 6.5h11M6.5 17.5h11M6.5 6.5l-3 3M6.5 17.5l-3-3M17.5 6.5l3 3M17.5 17.5l3-3',
    stats: 'M18 20V10M12 20V4M6 20v6',
    profile: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] || paths.dashboard} />
    </svg>
  )
}

const items = [
  { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { path: '/programs', icon: 'programs', label: 'Coach IA' },
  { path: '/workout', icon: 'workout', label: 'Workout' },
  { path: '/stats', icon: 'stats', label: 'Stats' },
  { path: '/profile', icon: 'profile', label: 'Profile' },
]

export default function WorkoutNavbar() {
  const { pathname } = useLocation()
  const { user } = useAuth()

  return (
    <>
      <aside className="wnav-side">
        <Link to="/" className="wnav-brand">
          <div className="wnav-brand-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6.5 6.5h11M6.5 17.5h11M6.5 6.5l-3 3M6.5 17.5l-3-3M17.5 6.5l3 3M17.5 17.5l3-3" />
            </svg>
          </div>
          <span>Iron<span className="wnav-brand-accent">Track</span></span>
        </Link>
        <nav className="wnav-nav">
          {items.map(item => {
            const active = pathname === item.path
            return (
              <Link key={item.path} to={item.path} className={`wnav-link ${active ? 'active' : ''}`}>
                <span className="wnav-link-icon"><Icon name={item.icon} /></span>
                <span className="wnav-link-label">{item.label}</span>
                {active && <span className="wnav-link-dot" />}
              </Link>
            )
          })}
        </nav>
        <div className="wnav-user">
          <div className="wnav-user-avatar">{user?.username?.charAt(0).toUpperCase() || 'U'}</div>
          <div className="wnav-user-body">
            <div className="wnav-user-name">{user?.username || 'User'}</div>
            <div className="wnav-user-role">{user?.role || 'Athlete'}</div>
          </div>
        </div>
      </aside>

      <nav className="wnav-bottom">
        {items.map(item => {
          const active = pathname === item.path
          return (
            <Link key={item.path} to={item.path} className={`wnav-b-item ${active ? 'active' : ''}`}>
              <span className="wnav-b-icon"><Icon name={item.icon} /></span>
              <span className="wnav-b-label">{item.label}</span>
              {active && <span className="wnav-b-bar" />}
            </Link>
          )
        })}
      </nav>
    </>
  )
}

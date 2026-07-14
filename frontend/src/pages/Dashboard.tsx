import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'
import { programs, type Program } from '../data/programs'
import InviteModal from '../components/InviteModal'

const levelMap: Record<string, string> = {
  'Débutant': 'beginner', 'Intermédiaire': 'intermediate', 'Avancé': 'advanced',
  'Débutant à avancé': 'beginnerToAdvanced', 'Intermédiaire à avancé': 'intermediateToAdvanced',
  'Beginner': 'beginner', 'Intermediate': 'intermediate', 'Advanced': 'advanced',
  'Principiante': 'beginner', 'Intermedio': 'intermediate', 'Avanzado': 'advanced',
  'Anfänger': 'beginner', 'Fortgeschritten': 'intermediate', 'Experte': 'advanced',
  'مبتدئ': 'beginner', 'متوسط': 'intermediate', 'متقدم': 'advanced',
}

const progIdKey: Record<string, string> = {
  'ppl': 'ppl', 'upper-lower': 'upperLower', 'hilv': 'hilv',
  'bro-split': 'broSplit', 'full-body': 'fullBody', 'powerlifting': 'powerlifting',
  'hypertrophy': 'hypertrophy', 'strength-hypertrophy': 'strengthHypertrophy',
}

interface SessionDto {
  id: string; programId?: string; programName?: string; date: string
  durationMinutes: number; exercises: { name: string; sets: { weight: number; reps: number; rpe?: number; isSuccess: boolean }[] }[]
  totalVolume: number
}

const API = import.meta.env.VITE_API_URL || '/api'

function Icon({ path, size = 18 }: { path: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={path} /></svg>
}

const I = {
  volume: <Icon path="M3 3v18h18M7 16l4-8 4 4 4-6" />,
  sessions: <Icon path="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />,
  hours: <Icon path="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22zM12 6v6l4 2" />,
  prs: <Icon path="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7m7-1V4m-7 5h7m-7 0v5l-1 1m1-6h3m1-1v3m0 0v5l2 2" />,
  arrow: <Icon path="M5 12h14M12 5l7 7-7 7" />,
  clock: <Icon path="M12 8v4l3 3" />,
  target: <Icon path="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6v6l4 2" />,
  dumbbell: <Icon path="M6.5 6.5h11M6.5 17.5h11M6.5 6.5l-3 3M6.5 17.5l-3-3M17.5 6.5l3 3M17.5 17.5l3-3" />,
  check: <path d="M20 6L9 17l-5-5" />,
}

const heroBg = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1440&q=80'

function Particles() {
  return (
    <div className="dash-particles">
      {Array.from({ length: 15 }, (_, i) => (
        <div key={i} className="dash-particle"
          style={{
            left: `${Math.random() * 100}%`,
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${8 + Math.random() * 12}s`,
          }} />
      ))}
    </div>
  )
}

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) { setCount(0); return }
    let start = performance.now()
    const duration = 1200
    const raf = () => {
      const p = Math.min((performance.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [active, target])
  return count
}

export default function Dashboard() {
  const { user } = useAuth()
  const { lang } = useLang()
  const tr = (k: string) => t(k, lang)
  const pl = (k: string) => t(`programsList.${k}`, lang)
  const progName = (p: Program) => pl(progIdKey[p.id] || p.id)
  const progDesc = (p: Program) => pl((progIdKey[p.id] || p.id) + 'Desc')
  const progLevel = (lvl: string) => pl(levelMap[lvl] || 'intermediate')
  const [sessions, setSessions] = useState<SessionDto[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState<Program>(programs[0])
  const [tab, setTab] = useState<'programs'|'sessions'>('programs')
  const [showInvite, setShowInvite] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    setLoading(true)
    fetch(`${API}/workout-sessions`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(r => r.ok ? r.json() : { data: [] })
      .then(d => { setSessions(d?.data || d || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    const el = statsRef.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.unobserve(el) } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleMouse = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
  }, [])

  const mx = mousePos.x - 0.5
  const my = mousePos.y - 0.5

  const totalVolume = sessions.reduce((a, s) => a + s.totalVolume, 0)
  const totalWorkouts = sessions.length
  const totalHours = Math.round(sessions.reduce((a, s) => a + s.durationMinutes, 0) / 60)
  const prCount = Math.floor(totalVolume / 500)

  const countedVolume = useCountUp(totalVolume, statsVisible)
  const countedWorkouts = useCountUp(totalWorkouts, statsVisible)
  const countedHours = useCountUp(totalHours, statsVisible)
  const countedPrs = useCountUp(prCount, statsVisible)

  return (
    <div className="dash-root page-enter" onMouseMove={handleMouse}>
      {/* Background particles + orbs */}
      <div className="dash-bg">
        <div className="dash-orb dash-orb-1" style={{ transform: `translate(${mx * 30}px, ${my * 30}px)` }} />
        <div className="dash-orb dash-orb-2" style={{ transform: `translate(${mx * -20}px, ${my * -20}px)` }} />
        <Particles />
      </div>

      <section className="dash-hero anim-fade" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="dash-hero-overlay" />
        <div className="dash-hero-content">
          <div className="dash-hero-top">
            <div className="anim-fade-up">
              <p className="dash-hero-sub">{tr('hero.welcomeBack')}</p>
              <h1 className="dash-hero-title">{user?.username || 'Athlete'}</h1>
            </div>
            <div className="dash-hero-actions anim-fade-up">
              <Link to="/workout" className="dash-hero-btn btn-pulse">
                <span>{tr('hero.startWorkout')}</span>
                {I.arrow}
              </Link>
              <button className="dash-hero-btn btn-pulse invite-btn" onClick={() => setShowInvite(true)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
                <span>Partager</span>
              </button>
            </div>
          </div>
          <div className="dash-hero-stats anim-stagger" ref={statsRef}>
            {[
              { label: tr('hero.totalVolume'), value: countedVolume, unit: ` ${tr('dash.kg')}`, icon: I.volume },
              { label: tr('hero.workouts'), value: countedWorkouts, unit: '', icon: I.sessions },
              { label: tr('hero.hours'), value: countedHours, unit: 'h', icon: I.hours },
              { label: tr('hero.prs'), value: countedPrs, unit: '', icon: I.prs },
            ].map(s => (
              <div key={s.label} className="dash-hero-stat card-hover">
                <span className="dash-hero-stat-icon">{s.icon}</span>
                <span className="dash-hero-stat-val">{s.value}{s.unit}</span>
                <span className="dash-hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="dash-tabs-wrap anim-fade-up">
        <button className={`dash-tab ${tab === 'programs' ? 'active' : ''}`} onClick={() => setTab('programs')}>{tr('dash.programs')}</button>
        <button className={`dash-tab ${tab === 'sessions' ? 'active' : ''}`} onClick={() => setTab('sessions')}>{tr('dash.history')}</button>
      </div>

      <section className="dash-feat anim-fade-up" style={{ backgroundImage: `url(${active.image})` }}>
        <div className="dash-feat-overlay" style={{ background: active.gradient }} />
        <div className="dash-feat-body">
          <div className="dash-feat-top-row">
            <span className="dash-feat-badge" style={{ background: active.color }}>{progLevel(active.level)}</span>
            <span className="dash-feat-badge outline">{active.frequency}</span>
          </div>
          <h2 className="dash-feat-title">{progName(active)}</h2>
          <p className="dash-feat-desc">{progDesc(active)}</p>
          <div className="dash-feat-meta-grid">
            <div className="dash-feat-meta-item">
              <span className="dash-feat-meta-icon">{I.clock}</span>
              <div>
                <span className="dash-feat-meta-val">{active.duration}</span>
                <span className="dash-feat-meta-lbl">{tr('program.duration')}</span>
              </div>
            </div>
            <div className="dash-feat-meta-item">
              <span className="dash-feat-meta-icon">{I.target}</span>
              <div>
                <span className="dash-feat-meta-val">{active.goal.split('·')[0].trim()}</span>
                <span className="dash-feat-meta-lbl">{tr('program.goal')}</span>
              </div>
            </div>
            <div className="dash-feat-meta-item">
              <span className="dash-feat-meta-icon">{I.dumbbell}</span>
              <div>
                <span className="dash-feat-meta-val">{active.weeks[0]?.days.length} {tr('program.exercises')}</span>
                <span className="dash-feat-meta-lbl">{tr('program.frequency')}</span>
              </div>
            </div>
          </div>
          <div className="dash-feat-benefits">
            {active.benefits.map(b => (
              <span key={b} className="dash-feat-benefit"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>{b}</span>
            ))}
          </div>
          <Link to="/workout" className="dash-feat-btn" style={{ background: active.color }}>{tr('dash.startProgram')}</Link>
        </div>
      </section>

      <div className="dash-tab-content" key={tab}>
        {loading && tab === 'sessions' ? (
          <section className="dash-sessions">
            <div className="dash-sessions-inner">
              {[1,2,3].map(i => (
                <div key={i} className="dash-session" style={{ border: 'none', padding: '16px 18px' }}>
                  <div className="dash-session-left">
                    <div className="skeleton" style={{ width: 40, height: 40, borderRadius: 10 }} />
                    <div style={{ flex: 1 }}>
                      <div className="skeleton" style={{ width: '60%', height: 14, marginBottom: 8 }} />
                      <div className="skeleton" style={{ width: '40%', height: 10 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : tab === 'programs' ? (
          <section className="dash-grid-wrap">
            <div className="dash-grid anim-stagger">
              {programs.map((p, i) => (
                <div key={p.id} className={`dash-card ${active.id === p.id ? 'active' : ''}`}
                  onClick={() => setActive(p)}
                  style={{ '--accent': p.color, animationDelay: `${i * 0.05}s` } as React.CSSProperties}>
                  <div className="dash-card-img" style={{ backgroundImage: `url(${p.image})` }}>
                    <div className="dash-card-img-overlay" style={{ background: p.gradient }} />
                    <div className="dash-card-level" style={{ background: p.color }}>
                      {progLevel(p.level)}
                    </div>
                  </div>
                  <div className="dash-card-body">
                    <h3>{progName(p)}</h3>
                    <p className="dash-card-goal">{p.goal.split('·')[0].trim()}</p>
                    <div className="dash-card-metrics">
                      <span>{p.frequency}</span>
                      <span>{p.weeks[0]?.days.length} {tr('program.exercises')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="dash-sessions">
            <div className="dash-sessions-inner">
              {sessions.length === 0 ? (
                <div className="dash-empty">
                  <div className="dash-empty-icon">{I.dumbbell}</div>
                  <h3>{tr('dash.noWorkouts')}</h3>
                  <p>{tr('dash.noWorkoutsDesc')}</p>
                  <Link to="/workout" className="dash-empty-btn">{tr('dash.startFirst')}</Link>
                </div>
              ) : sessions.map((s, i) => (
                <div key={s.id} className="dash-session anim-fade" style={{ animationDelay: `${i * 0.06}s` }}>
                  <div className="dash-session-left">
                    <div className="dash-session-avatar" style={{ background: active.color }}>{I.dumbbell}</div>
                    <div>
                      <div className="dash-session-name">{s.programName || 'Quick Workout'}</div>
                      <div className="dash-session-meta">{new Date(s.date).toLocaleDateString(lang === 'ar' ? 'ar-SA' : lang === 'fr' ? 'fr-FR' : lang === 'es' ? 'es-ES' : lang === 'de' ? 'de-DE' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {s.durationMinutes} min · {s.exercises.length} ex</div>
                    </div>
                  </div>
                  <div className="dash-session-right">
                    <span className="dash-session-vol">{(s.totalVolume / 1000).toFixed(1)}</span>
                    <span className="dash-session-unit">{tr('dash.kg')}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <InviteModal
        show={showInvite}
        onClose={() => setShowInvite(false)}
        programName={active?.name || 'IronTrack'}
        workoutSummary={tr('dash.featured') + ' - ' + progName(active)}
        totalVolume={totalVolume > 0 ? (totalVolume / 1000).toFixed(1) + 'k ' + tr('dash.kg') : '—'}
        duration={totalHours > 0 ? totalHours + 'h' : '—'}
        exercisesCount={String(sessions.reduce((a, s) => a + s.exercises.length, 0) || '—')}
      />
    </div>
  )
}

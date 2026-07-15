import { useEffect, useState } from 'react'
import { workoutService, type SessionDto } from '../services/workoutService'
import { programs, type Program } from '../data/programs'
import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'

interface SetDetail { weight: number; reps: number; rpe?: number; isSuccess: boolean }
interface ExDetail { exerciseName: string; sets: SetDetail[] }

function SessionDetail({ session }: { session: SessionDto }) {
  const [open, setOpen] = useState(false)
  const totalSets = session.exercises.reduce((a, e) => a + e.sets.length, 0)
  return (
    <div style={{ borderBottom: '1px solid rgba(240,238,232,0.04)' }}>
      <div onClick={() => setOpen(!open)} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', cursor:'pointer', transition:'background 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.04)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:'#DC2626' }} />
          <div>
            <div style={{ color:'#F0EEE8', fontSize:'0.85rem', fontWeight:500 }}>{session.programName || 'Quick Workout'}</div>
            <div style={{ color:'rgba(240,238,232,0.3)', fontSize:'0.7rem' }}>
              {new Date(session.date).toLocaleDateString('fr-FR', { day:'numeric', month:'short', year:'numeric' })}
              {' · '}{session.durationMinutes}min
            </div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ color:'#DC2626', fontWeight:700, fontSize:'0.9rem' }}>{(session.totalVolume / 1000).toFixed(1)}k</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(240,238,232,0.3)" strokeWidth="2" strokeLinecap="round"
            style={{ transform: open ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      {open && (
        <div style={{ padding:'0 16px 16px' }}>
          {session.exercises.map((ex, i) => (
            <div key={i} style={{ marginBottom:8 }}>
              <div style={{ color:'#DC2626', fontSize:'0.75rem', fontWeight:600, marginBottom:4 }}>{ex.exerciseName}</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:4, fontSize:'0.7rem', color:'rgba(240,238,232,0.5)', padding:'0 4px', marginBottom:2 }}>
                <span>Set</span><span>Poids</span><span>Reps</span><span>RPE</span>
              </div>
              {ex.sets.map((set, j) => (
                <div key={j} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:4, padding:'3px 4px', borderRadius:4, background: set.isSuccess ? 'rgba(22,163,74,0.06)' : 'rgba(239,68,68,0.06)', fontSize:'0.75rem', color:'#F0EEE8', marginBottom:1 }}>
                  <span>{j + 1}</span>
                  <span>{set.weight} kg</span>
                  <span>{set.reps}</span>
                  <span>{set.rpe ?? '-'}</span>
                </div>
              ))}
            </div>
          ))}
          <div style={{ color:'rgba(240,238,232,0.2)', fontSize:'0.65rem', marginTop:4 }}>{totalSets} sets · {session.exercises.length} exercices</div>
        </div>
      )}
    </div>
  )
}

const bg = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1440&q=80'

interface MuscleStat { name: string; sets: number; volume: number; color: string }
const muscleColors: Record<string, string> = {
  Pectoraux: '#DC2626', Épaules: '#F59E0B', Triceps: '#EF4444',
  Dos: '#2563EB', Trapèzes: '#8B5CF6', Biceps: '#06B6D4',
  Quadriceps: '#16A34A', 'Ischio-jambiers': '#EA580C', Fessiers: '#7C3AED',
  Mollets: '#14B8A6', Core: '#EC4899', 'Chaîne postérieure': '#6366F1',
  'Corps complet': '#DC2626', Bras: '#F43F5E',
}

function Icon({ name }: { name: string }) {
  const p: Record<string, string> = {
    volume: 'M3 3v18h18M7 16l4-8 4 4 4-6',
    sessions: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
    streak: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z',
    avg: 'M18 20V10M12 20V4M6 20v6',
    week: 'M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22zM12 6v6l4 2',
    best: 'M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7m7-1V4m-7 5h7m-7 0v5l-1 1m1-6h3m1-1v3m0 0v5l2 2',
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={p[name] || p.volume} />
    </svg>
  )
}

export default function Stats() {
  const [sessions, setSessions] = useState<SessionDto[]>([])
  const [activeProg] = useState<Program>(programs[0])
  const { lang } = useLang()
  const tr = (k: string) => t(k, lang)

  useEffect(() => {
    workoutService.getSessions(1, 100).then(r => { if (r.data) setSessions(r.data) })
  }, [])

  const totalVolume = sessions.reduce((s, ses) => s + ses.totalVolume, 0)
  const totalSessions = sessions.length
  const avgVolume = totalSessions > 0 ? totalVolume / totalSessions : 0
  const thisWeek = sessions.filter(s => new Date(s.date) > new Date(Date.now() - 7 * 86400000)).length
  const streak = calcStreak(sessions)
  const bestSession = sessions.reduce((b, s) => s.totalVolume > (b?.totalVolume || 0) ? s : b, null as SessionDto | null)
  const recentSessions = [...sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 7)

  const muscleStats: MuscleStat[] = Object.entries(muscleColors).map(([name, color]) => {
    const sets = sessions.reduce((count, s) =>
      count + s.exercises.filter(e => {
        const progDay = activeProg.weeks.flatMap(w => w.days).find(d =>
          d.exercises.some(ex => ex.name === e.exerciseName)
        )
        return progDay?.muscles.includes(name) ?? false
      }).reduce((c, e) => c + e.sets.length, 0), 0)
    return { name, sets, volume: Math.floor(sets * 75), color }
  }).filter(m => m.sets > 0).sort((a, b) => b.sets - a.sets)

  const maxMuscleSets = Math.max(...muscleStats.map(m => m.sets), 1)

  const weekDays = lang === 'fr' ? ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    : lang === 'ar' ? ['إثن', 'ثلاث', 'أرب', 'خمي', 'جمعة', 'سبت', 'أحد']
    : lang === 'es' ? ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
    : lang === 'de' ? ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const weeklyData = weekDays.map((day, i) => {
    const daySessions = sessions.filter(s => new Date(s.date).getDay() === (i + 1) % 7)
    return { day, volume: daySessions.reduce((a, s) => a + s.totalVolume, 0), count: daySessions.length }
  })
  const maxWeeklyVol = Math.max(...weeklyData.map(d => d.volume), 1)

  return (
    <div className="stats-root">
      <section className="stats-hero" style={{ backgroundImage: `url(${bg})` }}>
        <div className="stats-hero-overlay" />
        <div className="stats-hero-content">
          <p className="stats-hero-sub">{tr('stats.yourPerformance')}</p>
          <h1 className="stats-hero-title">{tr('stats.statistics')}</h1>
        </div>
      </section>

      <div className="stats-grid-wrap">
        <div className="stats-grid">
          <div className="stats-card primary">
            <span className="stats-card-icon"><Icon name="volume" /></span>
            <span className="stats-card-val">{(totalVolume / 1000).toFixed(1)}k</span>
            <span className="stats-card-label">{tr('stats.totalVolume')}</span>
          </div>
          <div className="stats-card accent">
            <span className="stats-card-icon"><Icon name="sessions" /></span>
            <span className="stats-card-val">{totalSessions}</span>
            <span className="stats-card-label">{tr('stats.sessions')}</span>
          </div>
          <div className="stats-card success">
            <span className="stats-card-icon"><Icon name="streak" /></span>
            <span className="stats-card-val">{streak}</span>
            <span className="stats-card-label">{tr('stats.dayStreak')}</span>
          </div>
          <div className="stats-card warning">
            <span className="stats-card-icon"><Icon name="avg" /></span>
            <span className="stats-card-val">{avgVolume.toFixed(0)}</span>
            <span className="stats-card-label">{tr('stats.avgVolume')}</span>
          </div>
          <div className="stats-card info">
            <span className="stats-card-icon"><Icon name="week" /></span>
            <span className="stats-card-val">{thisWeek}</span>
            <span className="stats-card-label">{tr('stats.thisWeek')}</span>
          </div>
          <div className="stats-card danger">
            <span className="stats-card-icon"><Icon name="best" /></span>
            <span className="stats-card-val">{bestSession ? (bestSession.totalVolume / 1000).toFixed(1) + 'k' : '-'}</span>
            <span className="stats-card-label">{tr('stats.bestSession')}</span>
          </div>
        </div>
      </div>

      <div className="stats-chart-wrap">
        <div className="stats-chart-header">
          <h3>{tr('stats.weeklyVolume')}</h3>
          <span className="stats-chart-sub">{tr('dash.kg')} lifted per day</span>
        </div>
        <div className="stats-chart">
          {weeklyData.map((d, i) => (
            <div key={d.day} className="stats-chart-col">
              <div className="stats-chart-bar-wrap">
                <div className="stats-chart-bar"
                  style={{ height: `${(d.volume / maxWeeklyVol) * 100}%`, '--col': i === new Date().getDay() ? '#DC2626' : '#DC262680' } as React.CSSProperties}>
                  <span className="stats-chart-val">{d.volume > 0 ? (d.volume / 1000).toFixed(1) : ''}</span>
                </div>
              </div>
              <span className="stats-chart-day">{d.day}</span>
              <span className="stats-chart-count">{d.count} sessions</span>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-bottom">
        <div className="stats-muscle-card">
          <h3>{tr('stats.muscleDistribution')}</h3>
          <p className="stats-muscle-sub">{tr('program.benefits')} {activeProg.name}</p>
          <div className="stats-muscle-list">
            {muscleStats.map(m => (
              <div key={m.name} className="stats-muscle-row">
                <div className="stats-muscle-left">
                  <span className="stats-muscle-dot" style={{ background: m.color }} />
                  <span className="stats-muscle-name">{m.name}</span>
                </div>
                <div className="stats-muscle-right">
                  <div className="stats-muscle-bar">
                    <div className="stats-muscle-fill" style={{ width: `${(m.sets / maxMuscleSets) * 100}%`, background: m.color }} />
                  </div>
                  <span className="stats-muscle-val">{m.sets}s</span>
                </div>
              </div>
            ))}
            {muscleStats.length === 0 && <p className="stats-empty">{tr('stats.noData')}</p>}
          </div>
        </div>
        <div className="stats-recent-card" style={{ padding:0 }}>
          <h3 style={{ padding:'16px 16px 0', margin:'0 0 8px' }}>{tr('stats.recentSessions')}</h3>
          {recentSessions.length === 0 ? (
            <p className="stats-empty" style={{ padding:'16px' }}>{tr('stats.noSessions')}</p>
          ) : (
            <div>
              {recentSessions.map(s => <SessionDetail key={s.id} session={s} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function calcStreak(sessions: SessionDto[]): number {
  if (sessions.length === 0) return 0
  const dates = [...new Set(sessions.map(s => new Date(s.date).toDateString()))].sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  let streak = 0
  for (let i = 0; i < dates.length; i++) {
    const expected = new Date()
    expected.setDate(expected.getDate() - i)
    if (new Date(dates[i]).toDateString() === expected.toDateString()) streak++
    else break
  }
  return streak
}

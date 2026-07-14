import { useEffect, useState } from 'react'
import { workoutService, type SessionDto } from '../services/workoutService'
import { programs, type Program } from '../data/programs'
import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'

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
        <div className="stats-recent-card">
          <h3>{tr('stats.recentSessions')}</h3>
          {recentSessions.length === 0 ? (
            <p className="stats-empty">{tr('stats.noSessions')}</p>
          ) : (
            <div className="stats-recent-list">
              {recentSessions.map(s => (
                <div key={s.id} className="stats-recent-item">
                  <div className="stats-recent-left">
                    <div className="stats-recent-dot" />
                    <div>
                      <div className="stats-recent-name">{s.programName || 'Quick Workout'}</div>
                      <div className="stats-recent-meta">{new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} &middot; {s.durationMinutes}min &middot; {s.exercises.length}ex</div>
                    </div>
                  </div>
                  <span className="stats-recent-vol">{(s.totalVolume / 1000).toFixed(1)}k</span>
                </div>
              ))}
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

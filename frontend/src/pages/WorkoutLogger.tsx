import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { workoutService, type SessionExerciseDto } from '../services/workoutService'
import { programs, type Program, type ProgramDay } from '../data/programs'
import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'
import InviteModal from '../components/InviteModal'

const bg = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1440&q=80'

function Tick({ done }: { done?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={done ? '#fff' : 'currentColor'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export default function WorkoutLogger() {
  const [phase, setPhase] = useState<'select' | 'live' | 'done'>('select')
  const [selectedProg, setSelectedProg] = useState<Program | null>(null)
  const [selectedDay, setSelectedDay] = useState<ProgramDay | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [exercises, setExercises] = useState<SessionExerciseDto[]>([])
  const [elapsed, setElapsed] = useState(0)
  const [notes, setNotes] = useState('')
  const [showInvite, setShowInvite] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const timerRef = useRef<any>(null)
  const { lang } = useLang()
  const tr = (k: string) => t(k, lang)

  useEffect(() => {
    if (phase !== 'live') return
    timerRef.current = setInterval(() => setElapsed(t => t + 1), 1000)
    return () => clearInterval(timerRef.current)
  }, [phase])

  const startSession = async (prog: Program, day: ProgramDay) => {
    setSelectedProg(prog); setSelectedDay(day)
    setError('')
    const exs: SessionExerciseDto[] = day.exercises.map(e => ({
      exerciseId: e.name.toLowerCase().replace(/\s/g, '-'),
      exerciseName: e.name,
      sets: [{ weight: 0, reps: 0, isSuccess: true }],
    }))
    try {
      const res = await workoutService.startSession({ programName: `${prog.name} - ${day.name}` })
      if (res.data) setSessionId(res.data.id)
    } catch { setError('Erreur au démarrage de la session') }
    setExercises(exs); setPhase('live'); setElapsed(0)
  }

  const updateSet = (exIdx: number, setIdx: number, field: string, value: number | boolean) => {
    setExercises(exs => exs.map((ex, i) => i === exIdx ? {
      ...ex, sets: ex.sets.map((s, j) => j === setIdx ? { ...s, [field]: value } : s)
    } : ex))
  }

  const addSet = (exIdx: number) => {
    setExercises(exs => exs.map((ex, i) => i === exIdx ? {
      ...ex, sets: [...ex.sets, { weight: 0, reps: 0, isSuccess: true }]
    } : ex))
  }

  const completeSession = async () => {
    if (!sessionId) return
    setSubmitting(true)
    setError('')
    try {
      await workoutService.completeSession(sessionId, { durationMinutes: Math.floor(elapsed / 60), notes, exercises })
      setPhase('done')
    } catch { setError('Erreur lors de la sauvegarde') }
    setSubmitting(false)
    clearInterval(timerRef.current)
  }

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  const totalSets = exercises.reduce((a, e) => a + e.sets.length, 0)
  const doneSets = exercises.reduce((a, e) => a + e.sets.filter(s => s.isSuccess).length, 0)

  if (phase === 'select') {
    return (
      <div className="wok-root page-enter">
        <div className="wok-hero anim-fade" style={{ backgroundImage: `url(${bg})` }}>
          <div className="wok-hero-overlay" />
          <div className="wok-hero-content">
            <p className="wok-hero-sub">{tr('workout.startSession')}</p>
            <h1 className="wok-hero-title">{tr('workout.chooseProgram')}</h1>
          </div>
        </div>
        <div className="wok-prog-list anim-fade-up">
          {programs.map(p => (
            <div key={p.id} className="wok-prog-group">
              <div className="wok-prog-header">
                <div className="wok-prog-dot" style={{ background: p.color }} />
                <div>
                  <h3>{p.name}</h3>
                  <p>{p.goal}</p>
                </div>
              </div>
              <div className="wok-days anim-stagger">
                {p.weeks[0]?.days.map(d => (
                  <button key={d.name} className="wok-day-btn card-hover"
                    onClick={() => startSession(p, d)}
                    style={{ '--accent': p.color } as React.CSSProperties}>
                    <span className="wok-day-name">{d.name}</span>
                    <span className="wok-day-meta">{d.muscles.join(' · ')} · {d.exercises.length} {tr('program.exercises')}</span>
                    <span className="wok-day-arrow"><Arrow /></span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (phase === 'done') {
    return (
      <div className="wok-done page-enter">
        <div className="wok-done-card anim-scale">
          <div className="wok-done-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 className="anim-fade-up">{tr('workout.complete')}</h2>
          <p className="wok-done-sub">{selectedProg?.name} &middot; {selectedDay?.name}</p>
          <div className="wok-done-stats">
            <div><span>{fmt(elapsed)}</span><label>{tr('workout.duration')}</label></div>
            <div><span>{totalSets}</span><label>{tr('workout.set').toLowerCase()}s</label></div>
            <div><span>{doneSets}/{totalSets}</span><label>{tr('workout.success')}</label></div>
          </div>
          <div className="wok-done-actions">
            <Link to="/dashboard" className="wok-done-btn primary">{tr('workout.backToDash')}</Link>
            <button className="wok-done-btn secondary" onClick={() => setPhase('select')}>{tr('workout.newWorkout')}</button>
            <button className="wok-done-btn secondary invite-btn" onClick={() => setShowInvite(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
              Partager
            </button>
          </div>
        </div>
        <InviteModal
          show={showInvite}
          onClose={() => setShowInvite(false)}
          programName={selectedProg?.name}
          workoutSummary={selectedProg?.name + ' &middot; ' + selectedDay?.name}
          totalVolume={String(totalSets * 10) + ' kg'}
          duration={fmt(elapsed)}
          exercisesCount={String(exercises.length)}
        />
      </div>
    )
  }

  return (
    <div className="wok-live page-enter">
      <div className="wok-live-bar anim-fade">
        <div className="wok-live-bar-left">
          <button className="wok-live-back" onClick={() => setPhase('select')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <div>
            <div className="wok-live-name">{selectedProg?.name} &middot; {selectedDay?.name}</div>
            <div className="wok-live-time">{fmt(elapsed)}</div>
          </div>
        </div>
        <div className="wok-live-bar-right">
          <div className="wok-live-progress-wrap">
            <div className="wok-live-progress-bar">
              <div className="wok-live-progress-fill" style={{ width: `${totalSets > 0 ? (doneSets / totalSets) * 100 : 0}%`, transition: 'width 0.3s ease' }} />
            </div>
            <span className="wok-live-progress-label">{doneSets}/{totalSets} {tr('workout.set').toLowerCase()}s</span>
          </div>
          <button className="wok-live-finish" onClick={completeSession}>{tr('workout.finish')}</button>
        </div>
      </div>

      {error && <div style={{ textAlign:'center', padding:'12px 16px', color:'#FF5F56', fontSize:'0.8rem' }}>{error}</div>}

      <div className="wok-live-exs anim-fade-up">
        {exercises.map((ex, exIdx) => {
          const exDef = selectedDay?.exercises[exIdx]
          return (
            <div key={exIdx} className="wok-live-ex-card">
              <div className="wok-live-ex-header">
                <div>
                  <h3>{ex.exerciseName}</h3>
                  {exDef && <span className="wok-live-ex-target">{exDef.sets} &middot; {exDef.reps} reps &middot; rest {exDef.rest}</span>}
                </div>
                <span className="wok-live-ex-num">{ex.sets.filter(s => s.isSuccess).length}/{ex.sets.length}</span>
              </div>
              <div className="wok-live-sets">
                <div className="wok-live-set-row header">
                  <span className="wok-live-set-label">{tr('workout.set')}</span>
                  <span className="wok-live-set-label">{tr('workout.kg')}</span>
                  <span className="wok-live-set-label">{tr('workout.reps')}</span>
                  <span className="wok-live-set-label">{tr('workout.rpe')}</span>
                  <span className="wok-live-set-label" />
                </div>
                {ex.sets.map((set, setIdx) => (
                  <div key={setIdx} className={`wok-live-set-row ${set.isSuccess ? 'done' : ''}`}>
                    <span className="wok-live-set-num">{setIdx + 1}</span>
                    <input type="number" placeholder="0" value={set.weight || ''}
                      onChange={e => updateSet(exIdx, setIdx, 'weight', +e.target.value)} />
                    <input type="number" placeholder="0" value={set.reps || ''}
                      onChange={e => updateSet(exIdx, setIdx, 'reps', +e.target.value)} />
                    <input type="number" placeholder="-" step="0.5" min="1" max="10" value={set.rpe || ''}
                      onChange={e => updateSet(exIdx, setIdx, 'rpe', +e.target.value)} />
                    <button className={`wok-live-check ${set.isSuccess ? 'checked' : ''}`}
                      onClick={() => updateSet(exIdx, setIdx, 'isSuccess', !set.isSuccess)}>
                      <Tick done={set.isSuccess} />
                    </button>
                  </div>
                ))}
              </div>
              <button className="wok-live-addset" onClick={() => addSet(exIdx)}>+ {tr('workout.addSet')}</button>
            </div>
          )
        })}
      </div>

      <div className="wok-live-notes">
        <textarea placeholder={tr('workout.notes')} value={notes}
          onChange={e => setNotes(e.target.value)} rows={2} />
      </div>
      <div className="wok-live-bottom">
        <button className="wok-live-finish full" onClick={completeSession} disabled={submitting} style={{ opacity: submitting ? 0.6 : 1 }}>
          {submitting ? 'Sauvegarde...' : tr('workout.completeWorkout')}
        </button>
      </div>
    </div>
  )
}

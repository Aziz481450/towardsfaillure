import { useEffect, useState } from 'react'
import { workoutService, type SessionDto } from '../services/workoutService'
import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'

const bg = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1440&q=80'

export default function History() {
  const { lang } = useLang()
  const tr = (k: string) => t(k, lang)
  const [sessions, setSessions] = useState<SessionDto[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    workoutService.getSessions(1, 200).then(r => { if (r.data) setSessions(r.data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const allSessions = [...sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const totalVolume = sessions.reduce((a, s) => a + s.totalVolume, 0)
  const totalSets = sessions.reduce((a, s) => a + s.exercises.reduce((c, e) => c + e.sets.length, 0), 0)

  return (
    <div className="page-enter" style={{ minHeight:'100vh', background:'#0A0A0F' }}>
      {/* Hero */}
      <section style={{ position:'relative', minHeight:160, display:'flex', alignItems:'center', justifyContent:'center', background:`url(${bg}) center/cover`, overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(10,10,15,0.85),rgba(10,10,15,0.95))' }} />
        <div style={{ position:'relative', textAlign:'center', padding:'60px 20px 40px' }}>
          <h1 style={{ color:'#F0EEE8', fontSize:'1.6rem', fontWeight:700, margin:'0 0 4px', letterSpacing:'-0.02em' }}>Historique des séances</h1>
          <p style={{ color:'rgba(240,238,232,0.3)', fontSize:'0.8rem', margin:0 }}>
            {allSessions.length} séances · {(totalVolume / 1000).toFixed(1)}k kg · {totalSets} sets
          </p>
        </div>
      </section>

      {/* List */}
      <div style={{ maxWidth:680, margin:'0 auto', padding:'16px' }}>
        {loading ? (
          <div style={{ textAlign:'center', padding:40, color:'rgba(240,238,232,0.2)' }}>Chargement...</div>
        ) : allSessions.length === 0 ? (
          <div style={{ textAlign:'center', padding:60 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(240,238,232,0.1)" strokeWidth="1" strokeLinecap="round" style={{ marginBottom:12 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <p style={{ color:'rgba(240,238,232,0.2)', fontSize:'0.85rem' }}>Aucune séance pour le moment</p>
          </div>
        ) : allSessions.map(s => {
          const isOpen = expanded === s.id
          const totalExSets = s.exercises.reduce((a, e) => a + e.sets.length, 0)
          return (
            <div key={s.id} style={{ marginBottom:10, borderRadius:10, overflow:'hidden', background:'#0D0D16', border:'1px solid rgba(240,238,232,0.06)' }}>
              {/* Header */}
              <div onClick={() => setExpanded(isOpen ? null : s.id)}
                style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', cursor:'pointer', transition:'background 0.2s' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:'rgba(220,38,38,0.1)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"><path d="M6.5 6.5h11M6.5 17.5h11M6.5 6.5l-3 3M6.5 17.5l-3-3M17.5 6.5l3 3M17.5 17.5l3-3"/></svg>
                  </div>
                  <div>
                    <div style={{ color:'#F0EEE8', fontSize:'0.85rem', fontWeight:500 }}>{s.programName || 'Quick Workout'}</div>
                    <div style={{ color:'rgba(240,238,232,0.3)', fontSize:'0.7rem', marginTop:2 }}>
                      {new Date(s.date).toLocaleDateString('fr-FR', { weekday:'short', day:'numeric', month:'short', year:'numeric' })}
                      {' · '}{s.durationMinutes}min · {s.exercises.length} ex · {totalExSets} sets
                    </div>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ color:'#DC2626', fontWeight:700, fontSize:'0.95rem' }}>{(s.totalVolume / 1000).toFixed(1)}k</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(240,238,232,0.3)" strokeWidth="2.5" strokeLinecap="round"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition:'transform 0.25s' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {/* Detail */}
              {isOpen && (
                <div style={{ padding:'0 16px 16px', animation:'fadeIn 0.2s ease' }}>
                  {s.exercises.map((ex, i) => (
                    <div key={i} style={{ marginBottom:12 }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
                        <span style={{ color:'#DC2626', fontSize:'0.8rem', fontWeight:600 }}>{ex.exerciseName}</span>
                        <span style={{ color:'rgba(240,238,232,0.2)', fontSize:'0.65rem' }}>{ex.sets.length} sets</span>
                      </div>
                      {/* Table header */}
                      <div style={{ display:'grid', gridTemplateColumns:'36px 1fr 1fr 1fr 40px', gap:4, padding:'4px 8px', fontSize:'0.65rem', color:'rgba(240,238,232,0.3)', borderBottom:'1px solid rgba(240,238,232,0.04)', marginBottom:2 }}>
                        <span>#</span><span>Poids</span><span>Reps</span><span>RPE</span><span></span>
                      </div>
                      {ex.sets.map((set, j) => (
                        <div key={j} style={{ display:'grid', gridTemplateColumns:'36px 1fr 1fr 1fr 40px', gap:4, padding:'5px 8px', borderRadius:4, background: set.isSuccess ? 'rgba(22,163,74,0.05)' : 'rgba(239,68,68,0.04)', fontSize:'0.78rem', color:'#F0EEE8', marginBottom:1, alignItems:'center' }}>
                          <span style={{ color:'rgba(240,238,232,0.3)', fontSize:'0.7rem' }}>{j + 1}</span>
                          <span style={{ fontWeight:600 }}>{set.weight} kg</span>
                          <span>{set.reps}</span>
                          <span style={{ color: set.rpe ? 'rgba(240,238,232,0.6)' : 'rgba(240,238,232,0.15)' }}>{set.rpe ?? '-'}</span>
                          <span style={{ justifySelf:'center' }}>
                            {set.isSuccess
                              ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                              : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                  {/* Notes */}
                  {s.notes && (
                    <div style={{ marginTop:8, padding:'8px 10px', background:'rgba(220,38,38,0.04)', borderRadius:6, borderLeft:'2px solid #DC2626' }}>
                      <div style={{ color:'rgba(240,238,232,0.3)', fontSize:'0.65rem', marginBottom:2 }}>Notes</div>
                      <div style={{ color:'rgba(240,238,232,0.6)', fontSize:'0.75rem', lineHeight:1.4, whiteSpace:'pre-wrap' }}>{s.notes}</div>
                    </div>
                  )}

                  {/* Footer stats */}
                  <div style={{ display:'flex', gap:16, marginTop:8, padding:'8px 0 0', borderTop:'1px solid rgba(240,238,232,0.04)' }}>
                    <div><span style={{ color:'rgba(240,238,232,0.3)', fontSize:'0.65rem' }}>Volume </span><span style={{ color:'#DC2626', fontSize:'0.75rem', fontWeight:600 }}>{(s.totalVolume / 1000).toFixed(1)}k kg</span></div>
                    <div><span style={{ color:'rgba(240,238,232,0.3)', fontSize:'0.65rem' }}>Durée </span><span style={{ color:'#F0EEE8', fontSize:'0.75rem' }}>{s.durationMinutes} min</span></div>
                    <div><span style={{ color:'rgba(240,238,232,0.3)', fontSize:'0.65rem' }}>Exercices </span><span style={{ color:'#F0EEE8', fontSize:'0.75rem' }}>{s.exercises.length}</span></div>
                  </div>
                  {/* Progressive overload hint */}
                  <div style={{ marginTop:6, fontSize:'0.65rem', color:'rgba(220,38,38,0.4)' }}>
                    💡 Prochain séance : vise {s.exercises.map(e => e.sets.filter(se => se.isSuccess).length > 0 ? `+2.5kg au ${e.exerciseName}` : null).filter(Boolean).join(', ') || 'à progresser sur chaque exercice'}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>
    </div>
  )
}

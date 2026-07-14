import { useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'
import { useNavigate } from 'react-router-dom'

interface SessionDto {
  id: string; programName?: string; date: string
  durationMinutes: number; totalVolume: number
  exercises: { name: string; sets: { weight: number; reps: number }[] }[]
}

interface PR {
  exerciseName: string; type: string; value: number; achievedAt: string
}

const API = import.meta.env.VITE_API_URL || '/api'

const levels = [
  { min: 0, label: 'Débutant', color: '#6B7280', nextColor: '#CD7F32' },
  { min: 5, label: 'Bronze', color: '#CD7F32', nextColor: '#C0C0C0' },
  { min: 15, label: 'Argent', color: '#C0C0C0', nextColor: '#FFD700' },
  { min: 30, label: 'Or', color: '#FFD700', nextColor: '#00E5C8' },
  { min: 50, label: 'Platine', color: '#00E5C8', nextColor: '#DC2626' },
  { min: 100, label: 'Diamant', color: '#DC2626', nextColor: '#DC2626' },
]

function getLevel(s: number) { let l = levels[0]; for (const x of levels) { if (s >= x.min) l = x } return l }

function formatDate(d: Date) {
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

function formatKg(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(1) + 'M'
  if (v >= 1000) return (v / 1000).toFixed(1) + 'k'
  return Math.round(v).toString()
}

export default function Profile() {
  const { user, logout } = useAuth()
  const { lang } = useLang()
  const tr = (k: string) => t(k, lang)
  const navigate = useNavigate()

  const [sessions, setSessions] = useState<SessionDto[]>([])
  const [prs, setPrs] = useState<PR[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'overview'|'records'|'settings'>('overview')
  const [saving, setSaving] = useState(false)
  const [confirmLogout, setConfirmLogout] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '')
  const [coverUrl, setCoverUrl] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [editName, setEditName] = useState(user?.fullName || '')
  const [editBio, setEditBio] = useState('')
  const [toast, setToast] = useState('')

  const avatarRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  const showToast = useCallback((msg: string) => {
    setToast(msg); setTimeout(() => setToast(''), 2500)
  }, [])

  useEffect(() => {
    const savedCover = localStorage.getItem('profile-cover')
    if (savedCover) setCoverUrl(savedCover)
    else setCoverUrl('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80')

    const savedAvatar = localStorage.getItem('profile-avatar')
    if (savedAvatar) setAvatarUrl(savedAvatar)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    Promise.all([
      fetch(`${API}/workout-sessions`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : { data: [] }),
      fetch(`${API}/personal-records`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : { data: [] }),
    ]).then(([sRes, pRes]) => {
      setSessions(sRes?.data || sRes || [])
      setPrs(pRes?.data || pRes || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const totalSessions = sessions.length
  const totalVolume = sessions.reduce((a, s) => a + ((s as any).TotalVolume || s.totalVolume || 0), 0)
  const totalHours = Math.round(sessions.reduce((a, s) => a + (s.durationMinutes || 0), 0) / 60)
  const totalPRs = prs.length
  const level = getLevel(totalSessions)
  const nextLevel = levels.find(l => l.min > level.min)
  const progressToNext = nextLevel ? Math.min(100, ((totalSessions - level.min) / (nextLevel.min - level.min)) * 100) : 100
  const recentSessions = sessions.slice(-5).reverse()
  const streak = sessions.length > 0
    ? Math.min(30, Math.round((Date.now() - new Date(sessions[sessions.length - 1].date).getTime()) / 86400000))
    : 0
  const initials = user?.fullName
    ? user.fullName.split(' ').map(s => s[0]).join('').toUpperCase().slice(0, 2)
    : user?.username?.charAt(0).toUpperCase() || '?'

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      setAvatarUrl(dataUrl)
      localStorage.setItem('profile-avatar', dataUrl)
      showToast('Photo de profil mise à jour')
    }
    reader.readAsDataURL(file)
  }

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      setCoverUrl(dataUrl)
      localStorage.setItem('profile-cover', dataUrl)
      showToast('Photo de couverture mise à jour')
    }
    reader.readAsDataURL(file)
  }

  const handleSaveSettings = async () => {
    if (!editName.trim()) return
    setSaving(true)
    try {
      const token = localStorage.getItem('token')
      await fetch(`${API}/users/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, 'X-IRONTRACK-CSRF': '1' },
        body: JSON.stringify({ fullName: editName.trim(), avatarUrl }),
      })
      const updated = { ...user!, fullName: editName.trim(), avatarUrl }
      localStorage.setItem('user', JSON.stringify(updated))
      showToast('Profil mis à jour')
      setShowSettings(false)
    } catch { showToast('Erreur lors de la sauvegarde') }
    setSaving(false)
  }

  const handleScroll = useCallback(() => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect()
      const scrolled = Math.max(0, -rect.top * 0.3)
      heroRef.current.style.backgroundPositionY = `${scrolled}px`
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div className="profile-root">
      {toast && <div className="profile-toast"><span>{toast}</span></div>}

      {/* HERO */}
      <section className="profile-hero" ref={heroRef} style={{ backgroundImage: `url(${coverUrl})` }}>
        <div className="profile-hero-gradient" />
        <div className="profile-hero-fade" />
        <button className="profile-cover-btn" onClick={() => coverRef.current?.click()} title="Changer la couverture">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        </button>
        <input ref={coverRef} type="file" accept="image/*" onChange={handleCoverUpload} hidden />
        <div className="profile-hero-content">
          <div className="profile-avatar-section">
            <div className="profile-avatar-ring">
              <div className="profile-avatar" onClick={() => avatarRef.current?.click()}>
                {avatarUrl ? <img src={avatarUrl} alt="" /> : <span>{initials}</span>}
                <div className="profile-avatar-overlay">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 19h7a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-7"/><path d="M9 15l-5-5 5-5"/><line x1="4" y1="10" x2="16" y2="10"/></svg>
                </div>
              </div>
              <div className="profile-lvl-dot" style={{ background: level.color }}>{level.label[0]}</div>
            </div>
            <input ref={avatarRef} type="file" accept="image/*" onChange={handleAvatarUpload} hidden />
            <h1 className="profile-hero-name">{user?.fullName || user?.username}</h1>
            <p className="profile-hero-role">{user?.role || 'Athlète'}</p>
          </div>
        </div>
      </section>

      {/* XP BAR */}
      <section className="profile-card anim-fade">
        <div className="profile-xp-header">
          <div className="profile-xp-level">
            <span className="profile-xp-badge" style={{ color: level.color }}>{level.label}</span>
            {nextLevel && <span className="profile-xp-next">Prochain: {nextLevel.label}</span>}
          </div>
          <span className="profile-xp-count">{totalSessions} séances</span>
        </div>
        <div className="profile-xp-track">
          <div className="profile-xp-fill" style={{ width: `${progressToNext}%`, background: `linear-gradient(90deg, ${level.color}, ${nextLevel?.color || level.color})` }} />
        </div>
      </section>

      {/* QUICK STATS */}
      <div className="profile-quick-stats anim-stagger">
        {[
          { label: 'Séances', value: totalSessions, icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' },
          { label: 'Volume', value: formatKg(totalVolume), icon: 'M3 3v18h18M7 16l4-8 4 4 4-6' },
          { label: 'Heures', value: totalHours + 'h', icon: 'M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22zM12 6v6l4 2' },
          { label: 'Records', value: totalPRs, icon: 'M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7m7-1V4m-7 5h7m-7 0v5l-1 1' },
        ].map(s => (
          <div key={s.label} className="profile-qs-card">
            <div className="profile-qs-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d={s.icon}/></svg></div>
            <div className="profile-qs-body">
              <span className="profile-qs-num">{s.value}</span>
              <span className="profile-qs-label">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div className="profile-tabs">
        {(['overview', 'records', 'settings'] as const).map(t => (
          <button key={t} className={`profile-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t === 'overview' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
            {t === 'records' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="8" y1="20" x2="16" y2="20"/></svg>}
            {t === 'settings' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>}
            {t === 'overview' && ' Aperçu'}{t === 'records' && ' Records'}{t === 'settings' && ' Paramètres'}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="profile-tab-content" key={tab}>
        {tab === 'overview' && (
          <div className="profile-tab-pane">
            {/* Streak + level */}
            <div className="profile-pane-grid">
              <div className="profile-pane-card">
                <div className="profile-pane-card-header">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M23 12a11 11 0 0 1-22 0 11 11 0 0 1 22 0z"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>
                  <span>Série en cours</span>
                </div>
                <div className="profile-streak-value">{streak === 0 ? '🔥' : streak === 1 ? '🔥' : '🔥'}</div>
                <div className="profile-streak-num">{streak === 0 ? 'Aujourd\'hui' : `Jour ${streak}/30`}</div>
              </div>
              <div className="profile-pane-card">
                <div className="profile-pane-card-header">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22z"/><path d="M12 6v6l4 2"/></svg>
                  <span>Temps d'entraînement</span>
                </div>
                <div className="profile-streak-value">{totalHours}h</div>
                <div className="profile-streak-num">{totalSessions > 0 ? `Moy. ${Math.round(totalHours / totalSessions * 60)}min/séance` : '—'}</div>
              </div>
              <div className="profile-pane-card">
                <div className="profile-pane-card-header">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span>Niveau</span>
                </div>
                <div className="profile-streak-value" style={{ color: level.color }}>{level.label}</div>
                <div className="profile-streak-num">{progressToNext < 100 ? `${Math.round(progressToNext)}% vers ${nextLevel?.label}` : 'Niveau max atteint'}</div>
              </div>
            </div>

            {/* Recent sessions */}
            <div className="profile-section-card">
              <div className="profile-section-header">
                <h3>Activité récente</h3>
                {recentSessions.length > 0 && <span className="profile-section-badge">{recentSessions.length} séances</span>}
              </div>
              {recentSessions.length === 0 ? (
                <div className="profile-empty">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.15"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  <p>Aucune séance récente</p>
                  <button className="profile-action-btn" onClick={() => navigate('/workout')}>Commencer une séance</button>
                </div>
              ) : (
                <div className="profile-timeline">
                  {recentSessions.map((s, i) => (
                    <div key={s.id} className="profile-tl-item" style={{ animationDelay: `${i * 0.06}s` }}>
                      <div className="profile-tl-dot" />
                      <div className="profile-tl-body">
                        <span className="profile-tl-name">{s.programName || 'Séance libre'}</span>
                        <span className="profile-tl-meta">{formatDate(new Date(s.date))} · {s.durationMinutes}min · {formatKg(s.totalVolume || 0)} kg</span>
                      </div>
                      <span className="profile-tl-volume">{formatKg(s.totalVolume || 0)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="profile-section-card">
              <div className="profile-section-header"><h3>Actions rapides</h3></div>
              <div className="profile-actions-grid">
                <button className="profile-action-card" onClick={() => navigate('/workout')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  Nouvelle séance
                </button>
                <button className="profile-action-card" onClick={() => navigate('/stats')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
                  Voir les stats
                </button>
                <button className="profile-action-card" onClick={() => navigate('/programs')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                  Programmes
                </button>
                <button className="profile-action-card" onClick={() => { setShowSettings(true); setTab('settings') }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                  Paramètres
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === 'records' && (
          <div className="profile-tab-pane">
            <div className="profile-section-card">
              <div className="profile-section-header">
                <h3>Records personnels</h3>
                {totalPRs > 0 && <span className="profile-section-badge">{totalPRs} PR</span>}
              </div>
              {prs.length === 0 ? (
                <div className="profile-empty">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.15"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="8" y1="20" x2="16" y2="20"/></svg>
                  <p>Tu n'as pas encore de records</p>
                </div>
              ) : (
                <div className="profile-pr-list">
                  {prs.map((pr, i) => (
                    <div key={i} className="profile-pr-item anim-fade" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div className="profile-pr-rank">{['🥇','🥈','🥉'][i] || `#${i + 1}`}</div>
                      <div className="profile-pr-body">
                        <span className="profile-pr-name">{pr.exerciseName}</span>
                        <span className="profile-pr-type">{pr.type.replace('_', ' ')}</span>
                      </div>
                      <div className="profile-pr-value">{pr.value}<small>{pr.type.includes('volume') ? ' kg' : pr.type.includes('1RM') ? ' kg' : ' reps'}</small></div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="profile-section-card">
              <div className="profile-section-header"><h3>Volume total</h3></div>
              <div className="profile-big-stat">
                <span className="profile-big-num">{formatKg(totalVolume)}</span>
                <span className="profile-big-label">kg soulevés au total</span>
              </div>
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div className="profile-tab-pane">
            <div className="profile-section-card">
              <div className="profile-section-header"><h3>Modifier le profil</h3></div>
              <div className="profile-settings-form">
                <div className="profile-settings-field">
                  <label>Nom complet</label>
                  <input value={editName} onChange={e => setEditName(e.target.value)} placeholder="Ton nom" />
                </div>
                <div className="profile-settings-field">
                  <label>Email</label>
                  <input value={user?.email || ''} disabled placeholder="ton@email.com" />
                </div>
                <div className="profile-settings-field">
                  <label>Bio</label>
                  <textarea value={editBio} onChange={e => setEditBio(e.target.value)} placeholder="Parle-nous de toi..." rows={3} />
                </div>
                <div className="profile-settings-field">
                  <label>Photo de profil</label>
                  <div className="profile-settings-avatar-row">
                    <div className="profile-settings-avatar-preview">
                      {avatarUrl ? <img src={avatarUrl} alt="" /> : <span>{initials}</span>}
                    </div>
                    <button className="profile-secondary-btn" onClick={() => avatarRef.current?.click()}>
                      Changer la photo
                    </button>
                  </div>
                </div>
                <div className="profile-settings-actions">
                  <button className="profile-primary-btn" onClick={handleSaveSettings} disabled={saving || !editName.trim()}>
                    {saving ? 'Sauvegarde...' : 'Enregistrer'}
                  </button>
                  <button className="profile-ghost-btn" onClick={handleLogout}>
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logout confirm */}
      {confirmLogout && (
        <div className="profile-overlay" onClick={() => setConfirmLogout(false)}>
          <div className="profile-confirm-card" onClick={e => e.stopPropagation()}>
            <h3>Se déconnecter ?</h3>
            <p>Tu devras te reconnecter pour accéder à ton compte.</p>
            <div className="profile-confirm-actions">
              <button className="profile-ghost-btn" onClick={() => setConfirmLogout(false)}>Annuler</button>
              <button className="profile-danger-btn" onClick={logout}>Se déconnecter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  function handleLogout() {
    if (confirmLogout) { logout() }
    else { setConfirmLogout(true); setTimeout(() => setConfirmLogout(false), 4000) }
  }
}

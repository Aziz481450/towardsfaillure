import { useState, useMemo, useRef, useEffect, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'
import { authService } from '../services/authService'
import GymEquipment from '../components/GymEquipment'

function AuthParticles({ count = 40 }) {
  const p = useMemo(() => Array.from({ length: count }, (_, i) => ({
    s: 1.5 + Math.random() * 4.5,
    d: Math.random() * 14,
    dur: 14 + Math.random() * 20,
    left: Math.random() * 100,
    gl: Math.random() > 0.7,
  })), [count])
  return (
    <div className="auth-particles">
      {p.map((v, i) => (
        <div key={i} className={`auth-particle${v.gl ? ' auth-particle--glow' : ''}`}
          style={{
            left: `${v.left}%`, width: v.s, height: v.s,
            animationDelay: `${v.d}s`, animationDuration: `${v.dur}s`,
          }} />
      ))}
    </div>
  )
}

function AuthMesh() {
  return (
    <div className="auth-mesh">
      <div className="auth-mesh-layer auth-mesh-layer--1" />
      <div className="auth-mesh-layer auth-mesh-layer--2" />
      <div className="auth-mesh-layer auth-mesh-layer--3" />
    </div>
  )
}

function AuthGrid() {
  return <div className="auth-grid" />
}

function MuscleLines() {
  return (
    <svg className="auth-muscle" viewBox="0 0 400 200" preserveAspectRatio="none">
      <path d="M0,100 C100,20 200,180 400,80" className="auth-muscle-path" />
      <path d="M0,120 C120,60 240,160 400,100" className="auth-muscle-path auth-muscle-path--2" />
      <path d="M0,80 C80,40 180,140 400,120" className="auth-muscle-path auth-muscle-path--3" />
    </svg>
  )
}

function FloatingDumbbell() {
  return (
    <div className="auth-dbell">
      <svg viewBox="0 0 100 40" fill="none" className="auth-dbell-svg">
        <rect x="0" y="12" width="16" height="16" rx="4" fill="rgba(220,38,38,0.07)" stroke="rgba(220,38,38,0.1)" strokeWidth="1" />
        <rect x="84" y="12" width="16" height="16" rx="4" fill="rgba(220,38,38,0.07)" stroke="rgba(220,38,38,0.1)" strokeWidth="1" />
        <rect x="16" y="16" width="68" height="8" rx="2" fill="rgba(220,38,38,0.05)" />
        <line x1="20" y1="12" x2="20" y2="28" stroke="rgba(220,38,38,0.08)" strokeWidth="1" />
        <line x1="80" y1="12" x2="80" y2="28" stroke="rgba(220,38,38,0.08)" strokeWidth="1" />
      </svg>
    </div>
  )
}

function AuthInput({ label, type, placeholder, value, onChange, icon, isFocused, onFocus, onBlur, showToggle, showPassword, onToggle }: {
  label: string; type: string; placeholder: string; value: string; onChange: (e: any) => void;
  icon: React.ReactNode; isFocused: boolean; onFocus: () => void; onBlur: () => void;
  showToggle?: boolean; showPassword?: boolean; onToggle?: () => void;
}) {
  return (
    <div className={`auth-input-group${isFocused ? ' auth-input-group--focus' : ''}${value ? ' auth-input-group--has' : ''}`}>
      <div className="auth-input-icon">{icon}</div>
      <input type={showToggle ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder} value={value} onChange={onChange}
        onFocus={onFocus} onBlur={onBlur} required className="auth-input" />
      <label className="auth-input-label">{label}</label>
      {showToggle && (
        <button type="button" className="auth-input-toggle" onClick={onToggle} tabIndex={-1}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {showPassword ? (
              <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>
            ) : (
              <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
            )}
          </svg>
        </button>
      )}
      <div className="auth-input-glow" />
    </div>
  )
}

const MailIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const LockIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

export default function Login() {
  const { lang } = useLang()
  const tr = (k: string) => t(k, lang)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focus, setFocus] = useState<string | null>(null)
  const [showPass, setShowPass] = useState(false)
  const [magicMode, setMagicMode] = useState(false)
  const [magicSent, setMagicSent] = useState(false)
  const [magicLink, setMagicLink] = useState('')
  const [magicLoading, setMagicLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      setMouse({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 })
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    try { await login({ email, password }); navigate('/dashboard') }
    catch { setError(tr('auth.invalidCredentials')) }
    finally { setLoading(false) }
  }

  const handleMagicLink = async () => {
    if (!email) { setError('Enter your email first'); return }
    setMagicLoading(true); setError('')
    try {
      const res = await authService.sendMagicLink(email)
      if (res.data?.magicLink) setMagicLink(res.data.magicLink)
      setMagicSent(true)
    } catch {
      setError('Failed to send magic link')
    } finally {
      setMagicLoading(false)
    }
  }

  const fields = [
    { key: 'email', label: tr('auth.email'), type: 'email', placeholder: 'you@example.com', icon: MailIcon },
    { key: 'pass', label: tr('auth.password'), type: 'password', placeholder: '••••••••', icon: LockIcon, toggle: true },
  ]

  return (
    <div className="auth-page" ref={containerRef}>
      <GymEquipment />
      <AuthMesh />
      <AuthGrid />
      <AuthParticles />
      <MuscleLines />
      <div className="auth-orbs" style={{ transform: `translate(${mouse.x * -20}px, ${mouse.y * -20}px)` }}>
        <div className="auth-orb auth-orb-1" style={{ transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px)` }} />
        <div className="auth-orb auth-orb-2" style={{ transform: `translate(${mouse.x * -25}px, ${mouse.y * -25}px)` }} />
        <div className="auth-orb auth-orb-3" style={{ transform: `translate(${mouse.x * 20}px, ${mouse.y * -20}px)` }} />
      </div>
      <FloatingDumbbell />

      <div className="auth-side-desktop">
        <div className="auth-side-bg" />
        <div className="auth-side-content">
          <div className="auth-side-badge anim-fade">ELITE</div>
          <h1 className="auth-side-title anim-fade-up">IRON<span>TRACK</span></h1>
          <div className="auth-side-line anim-fade" />
          <p className="auth-side-desc anim-fade-up">{tr('landing.heroDesc2')}</p>
          <div className="auth-side-stats">
            <div className="auth-side-stat anim-fade-up" style={{ animationDelay: '0.2s' }}>
              <span className="auth-side-stat-num">15K+</span>
              <span className="auth-side-stat-label">{tr('hero.workouts')}</span>
            </div>
            <div className="auth-side-stat anim-fade-up" style={{ animationDelay: '0.3s' }}>
              <span className="auth-side-stat-num">50K+</span>
              <span className="auth-side-stat-label">{tr('hero.hours')}</span>
            </div>
            <div className="auth-side-stat anim-fade-up" style={{ animationDelay: '0.4s' }}>
              <span className="auth-side-stat-num">1M+</span>
              <span className="auth-side-stat-label">KG</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-full">
        <div className="auth-form-card">
          <div className="auth-form-card-inner">
            <div className="auth-form-corner auth-form-corner--tl" />
            <div className="auth-form-corner auth-form-corner--tr" />
            <div className="auth-form-corner auth-form-corner--bl" />
            <div className="auth-form-corner auth-form-corner--br" />

            <div className="auth-form-logo anim-fade">Iron<span>Track</span></div>
            <h2 className="auth-form-title anim-fade-up">{tr('auth.welcomeBack')}</h2>
            <p className="auth-form-sub anim-fade-up">{tr('auth.signInToContinue')}</p>

            {error && <div className="auth-error anim-fade">{error}</div>}

            {magicSent ? (
              <div className="auth-magic-sent anim-fade-up">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2 11 13"/><path d="M22 2 6 12"/><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"/>
                </svg>
                <h3 style={{color:'#F0EEE8',margin:'12px 0 4px',fontSize:'1rem'}}>Magic link prêt !</h3>
                {magicLink ? (
                  <a href={magicLink} className="auth-magic-link-btn" style={{display:'inline-block',margin:'10px 0',padding:'10px 20px',background:'#DC2626',color:'#fff',borderRadius:'8px',textDecoration:'none',fontWeight:600,fontSize:'0.85rem'}}>
                    Cliquer pour se connecter &rarr;
                  </a>
                ) : (
                  <p style={{color:'rgba(240,238,232,0.4)',fontSize:'0.8rem',margin:0}}>Check your email inbox.</p>
                )}
                <button type="button" className="auth-magic-back" onClick={() => { setMagicMode(false); setMagicSent(false) }}>
                  Retour
                </button>
              </div>
            ) : (
              <form onSubmit={magicMode ? (e) => { e.preventDefault(); handleMagicLink() } : handleSubmit} className="auth-form">
                {!magicMode && fields.map((f, i) => (
                  <div key={f.key} className="auth-field-wrap" style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
                    <AuthInput
                      label={f.label} type={f.type} placeholder={f.placeholder}
                      value={f.key === 'email' ? email : password}
                      onChange={e => f.key === 'email' ? setEmail(e.target.value) : setPassword(e.target.value)}
                      icon={f.icon}
                      isFocused={focus === f.key}
                      onFocus={() => setFocus(f.key)} onBlur={() => setFocus(null)}
                      showToggle={f.toggle} showPassword={showPass}
                      onToggle={() => setShowPass(!showPass)} />
                  </div>
                ))}
                {magicMode && (
                  <div className="auth-field-wrap" style={{ animationDelay: '0.1s' }}>
                    <AuthInput
                      label="Email" type="email" placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      icon={MailIcon}
                      isFocused={focus === 'email'}
                      onFocus={() => setFocus('email')} onBlur={() => setFocus(null)} />
                  </div>
                )}
                <div className="auth-field-wrap" style={{ animationDelay: '0.34s' }}>
                  <button type="submit" disabled={loading || magicLoading} className="auth-submit-btn">
                    {(loading || magicLoading) ? (
                      <span className="auth-btn-loading">
                        <svg className="auth-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.4 31.4" />
                        </svg>
                        {magicMode ? 'Sending...' : tr('auth.signingIn')}
                      </span>
                    ) : magicMode ? 'Send Magic Link' : tr('auth.signIn')}
                  </button>
                </div>
              </form>
            )}

            {!magicSent && (
              <button type="button" className="auth-magic-toggle" onClick={() => { setMagicMode(!magicMode); setError('') }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                {magicMode ? 'Sign in with password' : 'Send magic link instead'}
              </button>
            )}

            <p className="auth-footer anim-fade-up" style={{ animationDelay: '0.5s' }}>
              {tr('auth.noAccount')}{' '}
              <Link to="/register" className="auth-link">
                {tr('auth.createOne')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

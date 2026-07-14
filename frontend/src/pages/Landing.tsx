import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } }, { threshold: 0.1 })
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function useCountUp(target: string, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) { setCount(0); return }
    const raw = parseInt(target.replace(/[^0-9]/g, '')) || 0
    const hasPlus = target.includes('+')
    let start = performance.now()
    const duration = 1500
    const raf = () => {
      const p = Math.min((performance.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const val = Math.round(eased * raw)
      setCount(hasPlus ? val : val)
      if (p < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [active, target])
  return target.includes('+') ? count + '+' : count
}

function useTilt() {
  const ref = useRef<HTMLDivElement>(null)
  const handler = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${y * -8}deg)`
    const shine = el.querySelector('.card-shine') as HTMLElement
    if (shine) shine.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.06), transparent 60%)`
  }, [])
  const reset = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)'
    const shine = el.querySelector('.card-shine') as HTMLElement
    if (shine) shine.style.background = 'transparent'
  }, [])
  return { ref, handler, reset }
}

function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: { children: React.ReactNode; as?: any; className?: string; delay?: number }) {
  const { ref, visible } = useReveal()
  return <Tag ref={ref} className={`${className} ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>
}

function Particles({ count = 30 }: { count?: number }) {
  const particles = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 8,
    duration: 10 + Math.random() * 20,
    opacity: 0.1 + Math.random() * 0.2,
  })), [count])
  return (
    <div className="hero-particles">
      {particles.map(p => (
        <div key={p.id} className="hero-particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }} />
      ))}
    </div>
  )
}

function FloatingPlates() {
  return (
    <div className="floating-plates">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className={`fp-plate fp-plate-${i}`}>
          <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="1" opacity="0.08" />
            <circle cx="30" cy="30" r="22" stroke="currentColor" strokeWidth="0.5" opacity="0.05" />
            <rect x="27" y="0" width="6" height="60" rx="3" fill="currentColor" opacity="0.04" />
          </svg>
        </div>
      ))}
    </div>
  )
}

function BarbellIllustration() {
  return (
    <div className="barbell-illustration">
      <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
        <g className="barbell-bar" opacity="0.06">
          <rect x="20" y="148" width="280" height="24" rx="12" fill="#DC2626" />
        </g>
        <g className="barbell-plate barbell-plate-outer-L">
          <rect x="45" y="110" width="32" height="100" rx="6" fill="white" opacity="0.08" />
        </g>
        <g className="barbell-plate barbell-plate-inner-L">
          <rect x="82" y="96" width="24" height="128" rx="5" fill="white" opacity="0.05" />
        </g>
        <g className="barbell-plate barbell-plate-inner-R">
          <rect x="214" y="96" width="24" height="128" rx="5" fill="white" opacity="0.05" />
        </g>
        <g className="barbell-plate barbell-plate-outer-R">
          <rect x="243" y="110" width="32" height="100" rx="6" fill="white" opacity="0.08" />
        </g>
        <g className="barbell-collar barbell-collar-L">
          <rect x="112" y="140" width="8" height="40" rx="2" fill="#DC2626" opacity="0.12" />
        </g>
        <g className="barbell-collar barbell-collar-R">
          <rect x="200" y="140" width="8" height="40" rx="2" fill="#DC2626" opacity="0.12" />
        </g>
        <g className="barbell-knurling" opacity="0.03">
          {[1,2,3,4,5,6,7,8,9,10].map(i => (
            <rect key={i} x={120 + i * 8} y="156" width="3" height="8" rx="1" fill="white" />
          ))}
        </g>
      </svg>
      <div className="barbell-spotlight" />
    </div>
  )
}

function MuscleLines() {
  return (
    <div className="muscle-lines">
      <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
        <path className="ml-line ml-line-1" d="M50 150 Q100 80 200 120 Q250 140 280 110" stroke="rgba(220,38,38,0.04)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path className="ml-line ml-line-2" d="M30 180 Q80 220 150 170 Q200 130 270 200" stroke="rgba(220,38,38,0.03)" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path className="ml-line ml-line-3" d="M60 120 Q130 60 220 100" stroke="rgba(220,38,38,0.025)" strokeWidth="1" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function AnimatedStat({ num, label, visible }: { num: string; label: string; visible: boolean }) {
  const counted = useCountUp(num, visible)
  return (
    <div className="hero-stat-item">
      <span className="hero-stat-num">{counted}</span>
      <span className="hero-stat-label">{label}</span>
    </div>
  )
}

function FeatureCard({ icon, color, title, desc }: { icon: string; color: string; title: string; desc: string }) {
  const { ref, handler, reset } = useTilt()
  return (
    <div className="feature-card" ref={ref} onMouseMove={handler} onMouseLeave={reset}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = color + '40' }}
      onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)' }}>
      <div className="card-shine" />
      <div className="feature-icon" style={{ background: `${color}12`, color }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: icon }} />
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  )
}

export default function Landing() {
  const { lang } = useLang()
  const tr = (k: string) => t(k, lang)
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  const handleMouse = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
  }, [])

  useEffect(() => {
    const el = statsRef.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.unobserve(el) } }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const mx = mousePos.x - 0.5
  const my = mousePos.y - 0.5

  const features = [
    { key: 'programBuilder', icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>', color: '#DC2626' },
    { key: 'liveLogger', icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>', color: '#16A34A' },
    { key: 'analytics', icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>', color: '#EA580C' },
    { key: 'prDetection', icon: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>', color: '#2563EB' },
  ]

  return (
    <>
      <section className="hero" ref={heroRef} onMouseMove={handleMouse}>
        <div className="hero-mesh" />
        <div className="hero-grid" />

        {/* Particles */}
        <Particles count={40} />

        {/* Muscle lines */}
        <MuscleLines />

        {/* Floating plates */}
        <FloatingPlates />

        {/* Orbs with parallax */}
        <div className="hero-orbs">
          <div className="hero-orb hero-orb-1" style={{ transform: `translate(${mx * 40}px, ${my * 40}px)` }} />
          <div className="hero-orb hero-orb-2" style={{ transform: `translate(${mx * -30}px, ${my * -30}px)` }} />
        </div>

        {/* Floating shapes */}
        <div className="hero-shapes">
          <div className="hero-shape hero-shape-diamond" style={{ transform: `translate(${mx * 15}px, ${my * 10}px) rotate(45deg)` }} />
          <div className="hero-shape hero-shape-circle" style={{ transform: `translate(${mx * -10}px, ${my * 15}px)` }} />
          <div className="hero-shape hero-shape-triangle" />
          <div className="hero-shape hero-shape-plus" style={{ transform: `translate(${mx * 20}px, ${my * -10}px)` }} />
        </div>

        {/* Barbell illustration */}
        <BarbellIllustration />

        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            {tr('landing.nextLevel')}
          </div>
          <h1 className="hero-title">
            {tr('landing.heroTitle')}
            <span className="hero-title-accent">{tr('landing.heroTitleAccent')}</span>
          </h1>
          <p className="hero-desc">{tr('landing.heroDesc')}</p>
          <div className="hero-actions">
            <Link to="/register" className="btn-hero-primary">
              {tr('landing.startFree')}
              <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <Link to="/login" className="btn-hero-secondary">{tr('nav.signIn')}</Link>
          </div>
          <div className="hero-stats" ref={statsRef}>
            {[
              { num: '1200', label: tr('hero.workouts') },
              { num: '15000', label: tr('hero.totalVolume') },
              { num: '5000', label: tr('hero.prs') },
              { num: '50000', label: tr('hero.hours') }
            ].map((s, i) => (
              <AnimatedStat key={i} num={s.num} label={s.label} visible={statsVisible} />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator">
          <span className="hero-scroll-text">SCROLL</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      <section id="features" className="features">
        <div className="container" style={{ maxWidth: '1100px' }}>
          <Reveal>
            <div className="features-header">
              <span className="features-tag">{tr('nav.features')}</span>
              <h2 className="features-title">{tr('landing.builtFor')} <span>{tr('landing.ironMindsets')}</span></h2>
              <p className="features-sub">{tr('landing.dominate')}</p>
            </div>
          </Reveal>
          <div className="row g-4">
            {features.map((f, i) => (
              <Reveal key={f.key} className="col-md-6 col-lg-3" delay={i * 100}>
                <FeatureCard icon={f.icon} color={f.color} title={tr(`features.${f.key}`)} desc={tr(`features.${f.key}Desc`)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-section">
        <Reveal>
          <div className="quote-inner">
            <div className="quote-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
            </div>
            <p className="quote-text">{tr('landing.quote')}</p>
            <p className="quote-author">{tr('landing.quoteAuthor')}</p>
          </div>
        </Reveal>
      </section>

      <section className="cta-section">
        <Reveal>
          <div className="cta-inner">
            <div className="cta-glow" />
            <div className="cta-plates">
              {[1,2,3].map(i => (
                <div key={i} className={`cta-plate cta-plate-${i}`}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="0.8" opacity="0.06" /><circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="0.5" opacity="0.04" /></svg>
                </div>
              ))}
            </div>
            <h2 className="cta-title">{tr('landing.readyToTransform')} <span>{tr('landing.transform')}</span>?</h2>
            <p className="cta-desc">{tr('landing.joinThousands')}</p>
            <Link to="/register" className="btn-hero-primary">
              {tr('landing.startFree')}
              <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

import { useEffect, useRef, useState, useCallback, type ReactNode } from 'react'

/* ---- Palette ---- */
const C = {
  black: '#0A0A0F',
  white: '#F0EEE8',
  cyan: '#00E5C8',
  gray: '#1C1C26',
  amber: '#F5A623',
}

const BASE = {
  background: C.black,
  color: C.white,
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  margin: 0,
  padding: 0,
  boxSizing: 'border-box' as const,
}

/* ---- Terminal simulation ---- */
interface Line { text: string; isCmd?: boolean; isOutput?: boolean; delay?: number }
const lines: Line[] = [
  { text: '', delay: 400 },
  { text: '╭─ OpenCode ──────────────────────────────╮', delay: 100 },
  { text: '│                                          │', delay: 80 },
  { text: '│   Agentic coding for the command line    │', delay: 120 },
  { text: '│                                          │', delay: 80 },
  { text: '╰──────────────────────────────────────────╯', delay: 100 },
  { text: '', delay: 300 },
  { text: '$ claude "Ajoute des tests pour le module auth"', isCmd: true, delay: 60 },
]

const outputs: Record<string, string[]> = {
  'Ajoute des tests pour le module auth': [
    '  ✓ auth.service.spec.ts passed',
    '  ✓ auth.controller.spec.ts passed',
    '  ✓ jwt.middleware.spec.ts passed',
    '  3 tests, 0 failed  (12.4s)',
  ],
  'Comment gérer un 500 inattendu ?': [
    '  → Global exception middleware déjà en place',
    '  → Logging structuré avec Elasticsearch',
    '  → Fallback: retour 500 JSON uniforme',
    '  Conseil: ajoute un health-check endpoint',
  ],
  'Refactorise le repository en pattern générique': [
    '  Création de BaseRepository<T> ...',
    '  Migration de UserRepository ...',
    '  Migration de ProgramRepository ...',
    '  DRY score: 72% → 94%  (+22pp)',
  ],
}

function useTypingEffect(active: boolean) {
  const [displayed, setDisplayed] = useState<ReactNode[]>([])
  const idxRef = useRef(0)
  const charRef = useRef(0)
  const currentRef = useRef<Line | null>(null)
  const outputKeyRef = useRef('')
  const outputIdxRef = useRef(0)

  const tick = useCallback(() => {
    if (idxRef.current >= lines.length) return

    const line = lines[idxRef.current]
    currentRef.current = line

    if (line.text === '') {
      setDisplayed(prev => [...prev, <br key={`b${idxRef.current}`} />])
      idxRef.current++
      setTimeout(tick, line.delay ?? 100)
      return
    }

    if (line.isCmd) {
      const text = line.text.replace('$ ', '')
      if (charRef.current <= text.length) {
        const prefix = line.text.slice(0, 3) // '$ '
        const partial = text.slice(0, charRef.current)
        setDisplayed(prev => {
          const next = [...prev]
          next[next.length - 1] = (
            <div key={`c${idxRef.current}`} style={{ color: C.cyan }}>
              <span style={{ opacity: 0.6 }}>$ </span>
              {partial}
              <span className="oc-cursor" style={{ opacity: charRef.current < text.length ? 1 : 0 }}>▌</span>
            </div>
          )
          return next
        })
        charRef.current++
        setTimeout(tick, 35)
      } else {
        // typing done, show output
        const cmd = text
        const outLines = outputs[cmd] || []
        outputKeyRef.current = cmd
        outputIdxRef.current = 0

        if (outLines.length > 0) {
          const showNextOutput = () => {
            if (outputIdxRef.current >= outLines.length) {
              idxRef.current++
              charRef.current = 0
              setTimeout(tick, 400)
              return
            }
            const ol = outLines[outputIdxRef.current]
            setDisplayed(prev => [...prev, (
              <div key={`o${idxRef.current}-${outputIdxRef.current}`} style={{ color: 'rgba(240,238,232,0.6)', paddingLeft: 4, fontSize: 13 }}>
                {ol}
              </div>
            )])
            outputIdxRef.current++
            setTimeout(showNextOutput, 200)
          }
          setTimeout(showNextOutput, 300)
        } else {
          idxRef.current++
          charRef.current = 0
          setTimeout(tick, 400)
        }
      }
      return
    }

    if (charRef.current <= line.text.length) {
      const partial = line.text.slice(0, charRef.current)
      const isBorder = line.text.startsWith('╭') || line.text.startsWith('╰') || line.text.startsWith('│')
      setDisplayed(prev => {
        const next = [...prev]
        next[next.length - 1] = (
          <div key={`l${idxRef.current}`} style={{ color: isBorder ? 'rgba(0,229,200,0.3)' : C.white, fontFamily: 'inherit' }}>
            {partial}
          </div>
        )
        return next
      })
      charRef.current++
      setTimeout(tick, isBorder ? 8 : 16)
    } else {
      idxRef.current++
      charRef.current = 0
      setTimeout(tick, line.delay ?? 100)
    }
  }, [])

  useEffect(() => {
    if (!active) return
    idxRef.current = 0
    charRef.current = 0
    setDisplayed([])
    setTimeout(tick, 200)
  }, [active, tick])

  return displayed
}

/* ---- Feature cards ---- */
interface Feature {
  title: string
  desc: string
  cmd: string
  color: string
  icon: ReactNode
}
const features: Feature[] = [
  {
    title: 'Agentic Coding',
    desc: 'Claude comprend votre codebase, propose des refactorisations et écrit les tests. Plus qu\'un chat — un vrai pair programmeur.',
    cmd: 'claude "Analyse les dépendances du module auth"',
    color: C.cyan,
    icon: <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>,
  },
  {
    title: 'Context-Aware',
    desc: 'Scan de votre arborescence, lecture intelligente des fichiers, compréhension des imports et de l\'architecture existante.',
    cmd: 'claude "Explique l\'architecture du projet"',
    color: C.amber,
    icon: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
  },
  {
    title: 'Git-Native',
    desc: 'PRs, commits, reviews et rebase depuis le terminal. Claude comprend votre historique et propose des messages de commit pertinents.',
    cmd: 'claude "Génère un commit message pour les changements récents"',
    color: C.cyan,
    icon: <><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></>,
  },
  {
    title: 'Sécurité Intégrée',
    desc: 'Analyse des vulnérabilités, revue des secrets exposés, détection des mauvaises pratiques. Audit de sécurité automatisé.',
    cmd: 'claude "Audite la sécurité du projet"',
    color: C.amber,
    icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
  },
]

/* ---- sendPrompt helper ---- */
function useSendPrompt() {
  const send = useCallback((cmd: string) => {
    const el = document.getElementById('oc-terminal')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('oc-prompt', { detail: cmd }))
      }, 400)
    }
  }, [])
  return send
}

/* ---- Typing FX for sendPrompt ---- */
function usePromptListener(setDisplayed: React.Dispatch<React.SetStateAction<ReactNode[]>>) {
  useEffect(() => {
    const handler = (e: Event) => {
      const cmd = (e as CustomEvent).detail as string
      setDisplayed(prev => [
        ...prev,
        <div key={`prompt-${Date.now()}`} style={{ color: C.cyan, marginTop: 8 }}>
          <span style={{ opacity: 0.6 }}>$ </span>
          {cmd}
        </div>,
        <div key={`out-${Date.now()}`} style={{ color: 'rgba(240,238,232,0.5)', paddingLeft: 4, fontSize: 13 }}>
          <span style={{ color: C.cyan }}>⏳</span> Exécution de la commande...
        </div>,
        <div key={`done-${Date.now()}`} style={{ color: 'rgba(0,229,200,0.7)', paddingLeft: 4, fontSize: 13, marginBottom: 4 }}>
          ✓ Commande envoyée à Claude
        </div>,
      ])
    }
    window.addEventListener('oc-prompt', handler)
    return () => window.removeEventListener('oc-prompt', handler)
  }, [setDisplayed])
}

/* ================================================================
   COMPONENT
   ================================================================ */

export default function OpenCode() {
  const [started, setStarted] = useState(false)
  const [extraLines, setExtraLines] = useState<ReactNode[]>([])
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setStarted(true) }, [])
  const typed = useTypingEffect(started)
  usePromptListener(setExtraLines)

  const send = useSendPrompt()
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const copy = useCallback(async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIdx(idx)
      setTimeout(() => setCopiedIdx(null), 2000)
    } catch { /* fallback */ }
  }, [])

  /* ---- grid animation ---- */
  useEffect(() => {
    const g = gridRef.current
    if (!g) return
    let pos = 0
    const animate = () => {
      pos = (pos + 0.15) % 100
      g.style.backgroundPosition = `${pos}px ${pos}px`
      raf = requestAnimationFrame(animate)
    }
    let raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  const s: Record<string, React.CSSProperties> = {
    page: { background: C.black, color: C.white, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", minHeight: '100vh', position: 'relative', overflow: 'hidden' },
    grid: { position: 'absolute', inset: 0, opacity: 0.035, backgroundImage: `linear-gradient(rgba(0,229,200,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,200,0.3) 1px, transparent 1px)`, backgroundSize: '48px 48px', pointerEvents: 'none' as const },
    container: { maxWidth: 960, margin: '0 auto', padding: '40px 24px 80px', position: 'relative', zIndex: 1 },
    terminal: { background: '#0D0D16', border: '1px solid rgba(0,229,200,0.15)', borderRadius: 12, padding: '20px 24px', fontSize: 14, lineHeight: 1.6, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", minHeight: 320, boxShadow: '0 0 60px rgba(0,229,200,0.04), inset 0 0 60px rgba(0,229,200,0.02)' },
    badge: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 100, border: '1px solid rgba(0,229,200,0.2)', background: 'rgba(0,229,200,0.05)', color: C.cyan, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 40 },
    h1: { fontSize: 'clamp(2.2rem,5vw,3.4rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 12px' },
    h1span: { background: `linear-gradient(135deg, ${C.cyan}, #66f)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    sub: { color: 'rgba(240,238,232,0.4)', fontSize: '1rem', lineHeight: 1.6, maxWidth: 520 },
    card: { background: '#0D0D16', border: '1px solid rgba(240,238,232,0.06)', borderRadius: 14, padding: '28px 24px', transition: 'all 0.3s', cursor: 'pointer' },
    cardIcon: { width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
    cardTitle: { fontWeight: 700, fontSize: '1rem', marginBottom: 8 },
    cardDesc: { color: 'rgba(240,238,232,0.35)', fontSize: '0.82rem', lineHeight: 1.65 },
    cardCmd: { marginTop: 16, padding: '8px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(240,238,232,0.04)', fontSize: 11, color: 'rgba(240,238,232,0.4)', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" },
    copyBtn: { background: 'transparent', border: '1px solid rgba(240,238,232,0.1)', borderRadius: 6, padding: '4px 10px', color: 'rgba(240,238,232,0.3)', fontSize: 10, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' },
    sectionTitle: { fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: C.cyan, marginBottom: 32 },
    footer: { borderTop: '1px solid rgba(240,238,232,0.04)', padding: '32px 24px', textAlign: 'center' as const },
    footerLink: { color: 'rgba(240,238,232,0.25)', textDecoration: 'none', fontSize: '0.8rem', transition: 'color 0.15s' },
  }

  return (
    <div style={s.page}>
      <div ref={gridRef} style={s.grid} />

      <div style={s.container}>
        {/* ---- Terminal Hero ---- */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={s.badge}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.cyan, display: 'inline-block' }} />
            CLI · Agentic · Open Source
          </div>
          <h1 style={s.h1}>
            Codez avec <span style={s.h1span}>Claude</span>,<br />depuis votre terminal
          </h1>
          <p style={{ ...s.sub, margin: '16px auto 0' }}>
            OpenCode transforme votre ligne de commande en un agent de développement.
            Posez des questions, refactorisez, testez — en langage naturel.
          </p>
        </div>

        <div id="oc-terminal" style={s.terminal} onClick={() => setStarted(true)}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
            {['#FF5F56', '#FFBD2E', '#27C93F'].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
            ))}
            <div style={{ flex: 1, textAlign: 'center', fontSize: 11, color: 'rgba(240,238,232,0.2)' }}>open code — agentic terminal</div>
          </div>
          {typed}
          {extraLines}
          {!started && (
            <div style={{ color: 'rgba(240,238,232,0.25)', fontSize: 13, marginTop: 12 }}>
              █ Cliquez pour démarrer
            </div>
          )}
        </div>

        {/* ---- Features ---- */}
        <div style={{ marginTop: 100 }}>
          <div style={s.sectionTitle}>⏎ Capacités</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {features.map((f, i) => (
              <div
                key={i}
                style={s.card}
                className="oc-feature-card"
                onClick={() => send(f.cmd)}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${f.color}30`; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.3)` }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(240,238,232,0.06)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ ...s.cardIcon, background: `${f.color}12`, color: f.color }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {f.icon}
                  </svg>
                </div>
                <div style={s.cardTitle}>{f.title}</div>
                <div style={s.cardDesc}>{f.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
                  <div style={s.cardCmd}><span style={{ color: 'rgba(240,238,232,0.15)' }}>$ </span>{f.cmd}</div>
                  <button
                    style={{ ...s.copyBtn, ...(copiedIdx === i ? { borderColor: C.cyan, color: C.cyan } : {}) }}
                    onClick={(e) => { e.stopPropagation(); copy(f.cmd, i) }}
                  >
                    {copiedIdx === i ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Integrations ---- */}
        <div style={{ marginTop: 100 }}>
          <div style={s.sectionTitle}>⏎ Intégrations</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            {[
              { name: 'GitHub', desc: 'PRs, issues, code review' },
              { name: 'ESLint', desc: 'Lint et fix automatique' },
              { name: 'Jest', desc: 'Tests et coverage' },
              { name: 'Docker', desc: 'Containers et compose' },
              { name: 'npm / yarn', desc: 'Dépendances et scripts' },
              { name: 'VS Code', desc: 'Extension native' },
            ].map((t, i) => (
              <div key={i} style={{ background: '#0D0D16', border: '1px solid rgba(240,238,232,0.04)', borderRadius: 10, padding: '16px 20px', textAlign: 'center', transition: 'all 0.2s' }}
                className="oc-int-card"
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,200,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(240,238,232,0.04)'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{t.name}</div>
                <div style={{ color: 'rgba(240,238,232,0.3)', fontSize: '0.75rem' }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- CTA ---- */}
        <div style={{ marginTop: 100, textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.cyan, marginBottom: 16 }}>⏎ Prêt à coder autrement ?</div>
          <button
            style={{ padding: '14px 36px', background: C.cyan, color: C.black, fontWeight: 700, fontSize: '0.85rem', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
            className="oc-cta"
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 40px rgba(0,229,200,0.25)`; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
            onClick={() => send('claude "Configure OpenCode pour ce projet"')}
          >
            Installer OpenCode
          </button>
          <p style={{ color: 'rgba(240,238,232,0.2)', fontSize: '0.75rem', marginTop: 12 }}>npm install -g @anthropic/opencode · docs.opencode.ai</p>
        </div>
      </div>

      {/* ---- Footer ---- */}
      <footer style={s.footer}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 12 }}>
          <a href="#" style={s.footerLink}>Documentation</a>
          <a href="#" style={s.footerLink}>GitHub</a>
          <a href="#" style={s.footerLink}>Discord</a>
          <a href="#" style={s.footerLink}>Status</a>
        </div>
        <div style={{ color: 'rgba(240,238,232,0.12)', fontSize: '0.75rem' }}>
          &copy; {new Date().getFullYear()} Anthropic · OpenCode est un outil CLI agentique
        </div>
      </footer>
    </div>
  )
}

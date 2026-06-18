import { useEffect, useRef, useState } from 'react'
import { knowledgeBase, findAnswer, generateFallback } from '../data/coachKB'
import { programs, type Program } from '../data/programs'
import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'

const C = {
  black: '#0A0A0F',
  white: '#F0EEE8',
  red: '#DC2626',
  amber: '#F5A623',
}

interface ChatMsg { role: 'user' | 'bot'; text: string }

function typeText(text: string, setText: (s: string) => void, done: () => void, speed = 12) {
  let i = 0
  const iv = setInterval(() => {
    if (i < text.length) {
      setText(text.slice(0, i + (text.length > 80 ? 3 : 1)))
      i += text.length > 80 ? 3 : 1
    } else { clearInterval(iv); done() }
  }, speed)
  return () => clearInterval(iv)
}

function Particles({ count = 20 }: { count?: number }) {
  const arr = Array.from({ length: count }, (_, i) => i)
  return (
    <div className="prog-particles">
      {arr.map(i => (
        <div key={i} className="prog-particle"
          style={{
            left: `${Math.random() * 100}%`,
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${12 + Math.random() * 16}s`,
            opacity: 0.04 + Math.random() * 0.08,
          }} />
      ))}
    </div>
  )
}

function FloatingOrbs() {
  return (
    <div className="prog-orbs">
      <div className="prog-orb prog-orb-1" />
      <div className="prog-orb prog-orb-2" />
      <div className="prog-orb prog-orb-3" />
    </div>
  )
}

function FloatingDumbells() {
  return (
    <div className="prog-dumbells">
      {[1,2,3,4].map(i => (
        <div key={i} className={`prog-dbell prog-dbell-${i}`}>
          <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none">
            <rect x="6" y="18" width="28" height="4" rx="2" fill="#00E5C8" opacity="0.06" />
            <rect x="8" y="14" width="6" height="12" rx="1.5" fill="white" opacity="0.04" />
            <rect x="26" y="14" width="6" height="12" rx="1.5" fill="white" opacity="0.04" />
          </svg>
        </div>
      ))}
    </div>
  )
}

function CoachCard({ p, onClick }: { p: Program; onClick: () => void }) {
  return (
    <div className="coach-card" onClick={onClick}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.red + '30'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(240,238,232,0.06)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
      <div className="coach-card-img" style={{ background: p.gradient }}>
        <img src={p.image} alt="" />
        <div className="coach-card-badge">{p.level}</div>
      </div>
      <div className="coach-card-body">
        <div className="coach-card-name">{p.name}</div>
        <div className="coach-card-goal">{p.goal}</div>
        <div className="coach-card-benefits">
          {p.benefits.slice(0, 2).map((b, i) => (
            <span key={i} className="coach-card-tag">{b}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Programs() {
  const { lang } = useLang()
  const tr = (k: string) => t(k, lang)
  const [msgs, setMsgs] = useState<ChatMsg[]>([{ role: 'bot', text: '' }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [typingText, setTypingText] = useState('')
  const [showPrograms, setShowPrograms] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const chatEndRef = useRef<HTMLDivElement>(null)
  const typingRef = useRef<(() => void) | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = typeText(
      "Bonjour ! Je suis votre coach IA IronTrack. Je connais tous les programmes d'entraînement, la nutrition, la récupération et le fitness. Posez-moi une question !",
      setTypingText, () => {
        setMsgs(prev => [...prev, { role: 'bot', text: "Bonjour ! Je suis votre coach IA IronTrack. Je connais tous les programmes d'entraînement, la nutrition, la récupération et le fitness. Posez-moi une question !" }])
        setTypingText('')
        setTyping(false)
      }, 10
    )
    return t
  }, [])

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, typing])

  useEffect(() => {
    const g = gridRef.current; if (!g) return
    let pos = 0, raf = 0
    const animate = () => { pos = (pos + 0.12) % 100; g.style.backgroundPosition = pos + 'px ' + pos + 'px'; raf = requestAnimationFrame(animate) }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  const handleMouse = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
  }

  const mx = mousePos.x - 0.5
  const my = mousePos.y - 0.5

  const ask = (q: string) => {
    if (!q.trim() || typing) return
    setMsgs(prev => [...prev, { role: 'user', text: q.trim() }])
    setInput(''); setTyping(true)
    setTimeout(() => {
      const result = findAnswer(q)
      const answer = result.score > 0 ? result.answer : generateFallback(q)
      const t = typeText(answer, setTypingText, () => {
        setMsgs(prev => [...prev, { role: 'bot', text: answer }])
        setTypingText(''); setTyping(false)
        inputRef.current?.focus()
      }, 15)
      typingRef.current = t
    }, 400)
  }

  const quickQuestions = [
    'Quel programme pour débuter ?', 'Comment prendre de la masse ?',
    'Quelle fréquence d\'entraînement ?', 'Conseils nutrition',
    'C\'est quoi le PPL ?', 'Comment progresser ?',
  ]

  return (
    <div className="prog-page" onMouseMove={handleMouse}>
      <Particles count={25} />
      <FloatingDumbells />
      <FloatingOrbs />
      <div ref={gridRef} className="prog-grid" />
      <div className="prog-glow" style={{
        transform: `translate(${(mx) * 20}px, ${(my) * 20}px)`,
      }} />

      <div className="prog-container">
        <div className="prog-header anim-fade">
          <div className="prog-badge">
            <span className="prog-badge-dot" />
            COACH IA · FITNESS · 24/7
          </div>
          <h1 className="prog-title">
            {lang === 'fr' ? 'Posez votre question' : lang === 'es' ? 'Haz tu pregunta' : lang === 'de' ? 'Stelle deine Frage' : lang === 'ar' ? 'اطرح سؤالك' : 'Ask your question'}
            {' '}<span className="prog-title-accent">{lang === 'fr' ? 'fitness' : 'fitness'}</span>
          </h1>
          <p className="prog-sub">
            {lang === 'fr' ? 'Programme, nutrition, récupération, exercices — je réponds à toutes vos questions' : 'Program, nutrition, recovery, exercises — I answer all your questions'}
          </p>
        </div>

        <div className="prog-chat anim-fade-up">
          <div className="prog-chat-header">
            {['#FF5F56', '#FFBD2E', '#27C93F'].map((c, i) => (
              <div key={i} className="prog-chat-dot" style={{ background: c }} />
            ))}
            <div className="prog-chat-mode">
              irontrack coach — {lang === 'fr' ? 'mode conversation' : lang === 'es' ? 'modo conversación' : lang === 'de' ? 'Gesprächsmodus' : lang === 'ar' ? 'وضع المحادثة' : 'conversation mode'}
            </div>
          </div>

          <div className="prog-chat-body">
            {msgs.map((m, i) => (
              <div key={i} className={`prog-msg prog-msg-${m.role}`} style={{ animationDelay: '0s' }}>
                <div className={`prog-avatar prog-avatar-${m.role}`}>{m.role === 'user' ? 'U' : 'IA'}</div>
                <div className={`prog-bubble prog-bubble-${m.role}`}>{m.text}</div>
              </div>
            ))}
            {typing && typingText && (
              <div className="prog-msg prog-msg-bot">
                <div className="prog-avatar prog-avatar-bot">IA</div>
                <div className="prog-bubble prog-bubble-bot">{typingText}<span className="prog-cursor">|</span></div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {!typing && msgs.length <= 2 && (
            <div className="prog-quick anim-fade">
              {quickQuestions.map((q, i) => (
                <button key={i} className="prog-quick-btn" onClick={() => ask(q)}
                  style={{ animationDelay: `${i * 0.06}s` }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="prog-input-row">
            <input ref={inputRef} className="prog-input"
              placeholder={lang === 'fr' ? 'Posez votre question...' : lang === 'es' ? 'Haz tu pregunta...' : lang === 'de' ? 'Stelle deine Frage...' : lang === 'ar' ? 'اطرح سؤالك...' : 'Ask your question...'}
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') ask(input) }} />
            <button className="prog-send-btn" onClick={() => ask(input)} disabled={typing}>
              {lang === 'fr' ? 'ENVOYER' : 'SEND'}
            </button>
          </div>
        </div>

        <div className="prog-programs anim-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="prog-programs-header">
            <div className="prog-programs-label">{'>'} {lang === 'fr' ? 'PROGRAMMES DISPONIBLES' : 'AVAILABLE PROGRAMS'}</div>
            <button className="prog-toggle-btn" onClick={() => setShowPrograms(!showPrograms)}>
              {showPrograms ? (lang === 'fr' ? 'MASQUER' : 'HIDE') : (lang === 'fr' ? 'VOIR TOUT' : 'SHOW ALL')}
            </button>
          </div>
          <div className="prog-programs-grid" style={{ maxHeight: showPrograms ? 'none' : 280 }}>
            {programs.slice(0, showPrograms ? 99 : 4).map(p => (
              <CoachCard key={p.id} p={p} onClick={() => ask('Parle-moi du programme ' + p.name)} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.3 } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes orbFloat {
          0%,100% { transform: translate(0,0) scale(1); }
          25% { transform: translate(30px,-20px) scale(1.05); }
          50% { transform: translate(-20px,30px) scale(0.95); }
          75% { transform: translate(20px,20px) scale(1.02); }
        }
        @keyframes particleRise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 0.05; }
          90% { opacity: 0.03; }
          100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }
        @keyframes dbellFloat {
          0%,100% { transform: translateY(0) rotate(0deg); opacity: 0.04; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.08; }
        }
        @keyframes glowPulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        .coach-card:hover img { opacity: 0.7 !important; }
      `}</style>
    </div>
  )
}

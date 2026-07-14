import { useState, useRef, useMemo } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'

const C = { cyan: '#00E5C8', amber: '#F5A623', black: '#0A0A0F', white: '#F0EEE8' }

interface Props {
  show: boolean
  onClose: () => void
  programName?: string
  workoutSummary?: string
  totalVolume?: string
  duration?: string
  exercisesCount?: string
}

const channels = [
  {
    id: 'copy',
    label: 'Copier le lien',
    sub: 'Partager le texte',
    icon: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m4-2v8m0 0 3-3m-3 3L9 7',
  },
  {
    id: 'mail',
    label: 'E-mail',
    sub: 'Gmail / Outlook',
    icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    sub: 'Message direct',
    icon: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
  },
  {
    id: 'sms',
    label: 'SMS',
    sub: 'iMessage / Messages',
    icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  },
  {
    id: 'messenger',
    label: 'Messenger',
    sub: 'Facebook Messenger',
    icon: 'M12 2C6.477 2 2 6.477 2 12c0 1.89.516 3.656 1.406 5.172L2 22l5.172-1.406A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z',
  },
  {
    id: 'copyraw',
    label: 'Texte brut',
    sub: 'Presse-papier',
    icon: 'M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1M8 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M8 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m0 0h2a2 2 0 0 1 2 2v3m2 4H10m0 0 3-3m-3 3 3 3',
  },
]

const mailtoBody = (s: string, pn: string, tv: string, d: string, ec: string) => {
  const lines = [
    `${s} partage sa séance IronTrack avec toi !`,
    '',
    '━━━━━━━━━━━━━━━━━━━',
    `🏋️  ${pn || 'Workout'}`,
    tv ? `📊  ${tv}` : '',
    d ? `⏱️  ${d}` : '',
    ec ? `🎯  ${ec} exercices` : '',
    '━━━━━━━━━━━━━━━━━━━',
    '',
    '👉  http://localhost:3000/dashboard',
  ]
  return encodeURIComponent(lines.filter(Boolean).join('\n'))
}

export default function InviteModal({ show, onClose, programName, workoutSummary, totalVolume, duration, exercisesCount }: Props) {
  const { user } = useAuth()
  const { lang } = useLang()
  const tr = (k: string) => t(k, lang)
  const textRef = useRef<HTMLTextAreaElement>(null)
  const [active, setActive] = useState('copy')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const sender = user?.fullName || user?.username || 'Un ami'

  const shareText = useMemo(() =>
    `${sender} partage sa séance IronTrack avec toi !\n\n` +
    `🏋️  ${programName || 'Workout'}\n` +
    `${workoutSummary ? workoutSummary + '\n' : ''}` +
    `📊  ${totalVolume || '—'}  ·  ⏱️  ${duration || '—'}  ·  🎯  ${exercisesCount || '—'} exercices\n\n` +
    `👉  http://localhost:3000/dashboard`
  , [sender, programName, workoutSummary, totalVolume, duration, exercisesCount])

  const links = useMemo(() => ({
    mail: `mailto:?subject=${encodeURIComponent(`${sender} partage sa séance IronTrack`)}&body=${mailtoBody(sender, programName || 'Workout', totalVolume || '—', duration || '—', exercisesCount || '—')}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
    sms: `sms:?&body=${encodeURIComponent(shareText)}`,
    messenger: `https://m.me/?text=${encodeURIComponent(shareText)}`,
  }), [sender, programName, totalVolume, duration, exercisesCount, shareText])

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setConfirm(label)
      setTimeout(() => { setConfirm(''); onClose() }, 1200)
    } catch {
      textRef.current?.select()
      document.execCommand('copy')
      setConfirm(label)
      setTimeout(() => { setConfirm(''); onClose() }, 1200)
    }
  }

  if (!show) return null

  const close = () => { setConfirm(''); setError(''); onClose() }

  return (
    <div className="invite-overlay" onClick={close}>
      <div className="invite-card" onClick={e => e.stopPropagation()}>
        <button className="invite-close" onClick={close}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* Header */}
        <div className="invite-header">
          <div className="invite-avatar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h2 className="invite-title">Partager cette séance</h2>
          <p className="invite-sub">{sender} · {programName || 'Workout'}</p>
        </div>

        {/* Workout summary card */}
        <div className="invite-summary">
          <div className="invite-summary-item">
            <span className="invite-summary-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.cyan} strokeWidth="1.5"><path d="M3 3v18h18M7 16l4-8 4 4 4-6"/></svg>
            </span>
            <div className="invite-summary-text">
              <span className="invite-summary-value">{totalVolume || '—'}</span>
              <span className="invite-summary-label">Volume</span>
            </div>
          </div>
          <div className="invite-summary-divider" />
          <div className="invite-summary-item">
            <span className="invite-summary-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.cyan} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </span>
            <div className="invite-summary-text">
              <span className="invite-summary-value">{duration || '—'}</span>
              <span className="invite-summary-label">Durée</span>
            </div>
          </div>
          <div className="invite-summary-divider" />
          <div className="invite-summary-item">
            <span className="invite-summary-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.cyan} strokeWidth="1.5"><path d="M6.5 6.5h11M6.5 17.5h11M6.5 6.5l-3 3M6.5 17.5l-3-3M17.5 6.5l3 3M17.5 17.5l3-3"/></svg>
            </span>
            <div className="invite-summary-text">
              <span className="invite-summary-value">{exercisesCount || '—'}</span>
              <span className="invite-summary-label">Exercices</span>
            </div>
          </div>
        </div>

        {/* Channel grid */}
        <div className="invite-channels">
          {channels.map(ch => {
            const isActive = active === ch.id
            const href = links[ch.id as keyof typeof links]
            const isLink = ch.id === 'mail' || ch.id === 'whatsapp' || ch.id === 'sms' || ch.id === 'messenger'

            if (isLink) {
              return (
                <a key={ch.id} href={href} target="_blank" rel="noopener noreferrer"
                  className={`invite-channel ${isActive ? 'active' : ''}`}
                  onClick={() => setActive(ch.id)}
                >
                  <div className="invite-channel-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={ch.icon}/></svg>
                  </div>
                  <span className="invite-channel-label">{ch.label}</span>
                  <span className="invite-channel-sub">{ch.sub}</span>
                </a>
              )
            }

            return (
              <button key={ch.id}
                className={`invite-channel ${isActive ? 'active' : ''}`}
                onClick={() => { setActive(ch.id); copy(shareText, ch.label) }}
              >
                <div className="invite-channel-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={ch.icon}/></svg>
                </div>
                <span className="invite-channel-label">{ch.label}</span>
                <span className="invite-channel-sub">{ch.sub}</span>
              </button>
            )
          })}
        </div>

        {/* Confirmation toast */}
        {confirm && (
          <div className="invite-confirm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.cyan} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Copié dans le presse-papier</span>
          </div>
        )}

        {error && <div className="invite-error">{error}</div>}
      </div>
    </div>
  )
}

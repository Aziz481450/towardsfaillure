import { useState } from 'react'
import { useLang } from '../i18n/LangContext'
import { LANGUAGES, type Lang } from '../i18n/translations'

const flagMap: Record<Lang, string> = {
  en: '🇬🇧', fr: '🇫🇷', ar: '🇸🇦', es: '🇪🇸', de: '🇩🇪',
}

export default function LangSwitcher() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)

  return (
    <div className="lang-switcher" onMouseLeave={() => setOpen(false)}>
      <button className="lang-switcher-btn" onClick={() => setOpen(!open)} onMouseEnter={() => setOpen(true)}>
        <span>{flagMap[lang]}</span>
        <span className="lang-switcher-code">{lang.toUpperCase()}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="lang-switcher-drop">
          {LANGUAGES.filter(l => l.code !== lang).map(l => (
            <button key={l.code} className="lang-switcher-item" onClick={() => { setLang(l.code); setOpen(false) }}>
              <span>{flagMap[l.code]}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

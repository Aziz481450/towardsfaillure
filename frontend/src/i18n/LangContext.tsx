import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Lang } from './translations'

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  dir: 'ltr' | 'rtl'
}

const LangContext = createContext<LangContextType>({ lang: 'en', setLang: () => {}, dir: 'ltr' })

function loadBootstrap(lang: Lang) {
  const id = 'bs-theme'
  const existing = document.getElementById(id)
  if (existing) existing.remove()
  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  const ver = '5.3.3'
  link.href = lang === 'ar'
    ? `https://cdn.jsdelivr.net/npm/bootstrap@${ver}/dist/css/bootstrap.rtl.min.css`
    : `https://cdn.jsdelivr.net/npm/bootstrap@${ver}/dist/css/bootstrap.min.css`
  document.head.appendChild(link)
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('irontrack-lang') as Lang | null
    if (saved && ['en', 'fr', 'ar', 'es', 'de'].includes(saved)) return saved
    const nav = navigator.language.slice(0, 2)
    if (['en', 'fr', 'ar', 'es', 'de'].includes(nav)) return nav as Lang
    return 'en'
  })

  useEffect(() => {
    loadBootstrap(lang)
    localStorage.setItem('irontrack-lang', lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <LangContext.Provider value={{ lang, setLang, dir }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)

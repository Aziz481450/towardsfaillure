import { useLang } from '../i18n/LangContext'
import { t } from '../i18n/translations'

export default function Footer() {
  const { lang } = useLang()
  const tr = (k: string) => t(k, lang)

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">Iron<span>Track</span></div>
        <div>
          <a href="mailto:mohamedazizbenhamida04@gmail.com" className="footer-link">mohamedazizbenhamida04@gmail.com</a>
        </div>
        <div className="footer-copy">&copy; {new Date().getFullYear()} IronTrack. {tr('footer.allRights')}</div>
      </div>
    </footer>
  )
}

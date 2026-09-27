import { useEffect, useState } from 'react'
import { createBrowserRouter, Link, Navigate, Outlet, ScrollRestoration, useLocation } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { ArrowUp, Menu, Phone, X } from 'lucide-react'
import { asset, betrieb, seiten, telLink } from './content'
import Home from './Home'
import LegalPage from './LegalPage'
import { AbschnittLink, weichScrollen } from './components'

// Abschnitte des Onepagers: id = Sprungziel, Beschriftung im Menü
const abschnitte = [
  { id: 'hotel', label: 'Hotel' },
  { id: 'gaststaette', label: 'Gaststätte' },
  { id: 'eiscafe', label: 'Eiscafé' },
  { id: 'freizeit', label: 'Bowling & Billard' },
  { id: 'anreise', label: seiten.anreise.titel },
  { id: 'kontakt', label: seiten.kontakt.titel },
]

const zu = (hash: string) => <Navigate to={{ pathname: '/', hash }} replace />

// Adressen der alten Seite, damit Links aus Suchmaschinen weiter funktionieren
const alteSeiten: Record<string, string> = {
  'start.htm': 'start',
  'hotel.htm': 'hotel',
  'gaststatte.htm': 'gaststaette',
  'eiscafe.htm': 'eiscafe',
  'bowlingbahn.htm': 'freizeit',
  'billardzimmer.htm': 'freizeit',
  'anfahrt.htm': 'anreise',
  'kontakt.htm': 'kontakt',
}

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'impressum', element: <LegalPage seite={seiten.impressum} /> },
        { path: 'datenschutz', element: <LegalPage seite={seiten.datenschutz} /> },
        { path: 'cookies', element: <LegalPage seite={seiten.cookies} /> },
        ...Object.entries(alteSeiten).map(([path, id]) => ({ path, element: zu(id) })),
        { path: 'index.html', element: <Navigate to="/" replace /> },
        { path: 'impressum.htm', element: <Navigate to="/impressum" replace /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)

export default function App() {
  return <RouterProvider router={router} />
}

function Layout() {
  const { pathname } = useLocation()
  const stufe = useScrollStufe()
  useEinblenden(pathname)

  return (
    <>
      <a className="skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>
      <Header gescrollt={stufe > 0} />
      <main id="inhalt" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <div className="schwebend">
        <button
          type="button"
          className={stufe > 1 ? 'nach-oben sichtbar' : 'nach-oben'}
          aria-label="Nach oben"
          tabIndex={stufe > 1 ? 0 : -1}
          onClick={() => weichScrollen(null)}
        >
          <ArrowUp aria-hidden />
        </button>
        <a className="anruf-btn" href={telLink} aria-label={`Anrufen: ${betrieb.telefon}`}>
          <Phone aria-hidden />
        </a>
      </div>
      <ScrollRestoration />
    </>
  )
}

/** 0 = ganz oben, 1 = etwas gescrollt (Header-Schatten), 2 = weit unten ("Nach oben"-Knopf) */
function useScrollStufe() {
  const [stufe, setStufe] = useState(0)
  useEffect(() => {
    const pruefen = () => setStufe(scrollY > 700 ? 2 : scrollY > 20 ? 1 : 0)
    pruefen()
    addEventListener('scroll', pruefen, { passive: true })
    return () => removeEventListener('scroll', pruefen)
  }, [])
  return stufe
}

// Diese Elemente blenden beim Hineinscrollen weich ein (gestaffelt innerhalb ihrer Gruppe).
// Ohne JavaScript oder mit "Animationen reduzieren" bleibt alles sofort sichtbar (siehe styles.css).
const EINBLENDEN =
  '.section-kopf, .section > .container > .prose, .split > *, .cards > *, .preise > *, .gallery > li, .kontakt-liste > li, .freizeit-grid > *, .anreise-grid > *'

function useEinblenden(pfad: string) {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (eintraege) =>
        eintraege.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('sichtbar')
          obs.unobserve(e.target)
        }),
      { rootMargin: '0px 0px -8% 0px' },
    )
    document.querySelectorAll<HTMLElement>(EINBLENDEN).forEach((el) => {
      const i = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0
      el.style.setProperty('--i', String(Math.min(i, 6)))
      el.classList.add('reveal')
      obs.observe(el)
    })
    return () => obs.disconnect()
  }, [pfad])
}

/** Markiert im Menü den Abschnitt, der gerade im Bild ist. */
function useAktiverAbschnitt(aktiv: boolean) {
  const [id, setId] = useState('')
  useEffect(() => {
    if (!aktiv) return setId('')
    const obs = new IntersectionObserver(
      (eintraege) => eintraege.forEach((e) => e.isIntersecting && setId(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['start', ...abschnitte.map((a) => a.id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [aktiv])
  return id
}

function Header({ gescrollt }: { gescrollt: boolean }) {
  const { pathname } = useLocation()
  const [offen, setOffen] = useState(false)
  const aktiv = useAktiverAbschnitt(pathname === '/')

  return (
    <header className={gescrollt ? 'site-header gescrollt' : 'site-header'}>
      <div className="container header-inner">
        <AbschnittLink id="start" className="brand" onClick={() => setOffen(false)}>
          <img src={asset('/bilder/gans.png')} alt="" width="36" height="48" />
          <span>{betrieb.name}</span>
        </AbschnittLink>
        <button
          type="button"
          className="icon-btn menu-toggle"
          aria-expanded={offen}
          aria-controls="hauptmenue"
          aria-label={offen ? 'Menü schließen' : 'Menü öffnen'}
          onClick={() => setOffen(!offen)}
        >
          {offen ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
        <nav id="hauptmenue" className={offen ? 'nav offen' : 'nav'} aria-label="Hauptmenü">
          <ul>
            {abschnitte.map((a) => (
              <li key={a.id}>
                <AbschnittLink
                  id={a.id}
                  aria-current={aktiv === a.id ? 'true' : undefined}
                  onClick={() => setOffen(false)}
                >
                  {a.label}
                </AbschnittLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-marke">
          <img src={asset('/bilder/gans.png')} alt="" width="60" height="80" loading="lazy" />
          <p>
            <span className="footer-art">{betrieb.art}</span>
            <span className="footer-name">„{betrieb.name}“</span>
          </p>
        </div>
        <address>
          {betrieb.strasse}
          <br />
          {betrieb.plz} {betrieb.ort}
          <br />
          <a href={telLink}>Telefon {betrieb.telefon}</a>
          <br />
          <a href={`mailto:${betrieb.email}`}>{betrieb.email}</a>
        </address>
        <nav aria-label="Rechtliches">
          <ul>
            <li><Link to="/impressum" viewTransition>Impressum</Link></li>
            <li><Link to="/datenschutz" viewTransition>Datenschutzerklärung</Link></li>
            <li><Link to="/cookies" viewTransition>Cookie-Hinweis</Link></li>
          </ul>
        </nav>
      </div>
      <p className="container copyright">
        © {new Date().getFullYear()} {betrieb.art} „{betrieb.name}“
      </p>
    </footer>
  )
}

function NotFound() {
  return (
    <section className="section">
      <div className="container prose">
        <title>{`Seite nicht gefunden | ${betrieb.name}`}</title>
        <h1>Seite nicht gefunden</h1>
        <p>Diese Seite gibt es leider nicht.</p>
        <p>
          <Link className="btn btn-primary" to="/">Zur Startseite</Link>
        </p>
      </div>
    </section>
  )
}

import { useRef, useState, type ComponentProps, type MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { ChevronLeft, ChevronRight, Clock, MapPin, X } from 'lucide-react'
import { asset, betrieb, kartenLink, oeffnungszeiten, type Bild, type Preis } from './content'

/**
 * Scrollt weich zu einem Abschnitt (oder nach ganz oben).
 * Eigene Animation statt CSS "scroll-behavior", weil Browser das bei ausgeschalteten
 * Windows-Animationseffekten ignorieren. Mausrad, Touch oder Taste brechen ab.
 */
export function weichScrollen(ziel: HTMLElement | null) {
  const html = document.documentElement
  const abstand = ziel ? parseFloat(getComputedStyle(html).scrollPaddingTop) || 0 : 0
  const start = scrollY
  const ende = ziel ? ziel.getBoundingClientRect().top + scrollY - abstand : 0
  const strecke = ende - start
  const dauer = Math.min(900, Math.max(350, Math.abs(strecke) / 4))
  const t0 = performance.now()
  let aktiv = true
  const abbrechen = () => (aktiv = false)
  const ereignisse = ['wheel', 'touchstart', 'keydown'] as const
  ereignisse.forEach((e) => addEventListener(e, abbrechen, { once: true, passive: true }))
  html.style.scrollBehavior = 'auto'

  const schritt = (jetzt: number) => {
    const t = Math.min(1, (jetzt - t0) / dauer)
    const kurve = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2 // easeInOutCubic
    if (aktiv) scrollTo(0, start + strecke * kurve)
    if (aktiv && t < 1) return requestAnimationFrame(schritt)
    html.style.scrollBehavior = ''
    ereignisse.forEach((e) => removeEventListener(e, abbrechen))
  }
  requestAnimationFrame(schritt)
}

/**
 * Link zu einem Abschnitt der Startseite. Auf der Startseite wird weich gescrollt,
 * von Unterseiten aus normal zur Startseite navigiert.
 */
export function AbschnittLink({ id, onClick, ...props }: { id: string } & Omit<ComponentProps<typeof Link>, 'to'>) {
  const { pathname } = useLocation()
  return (
    <Link
      {...props}
      to={{ pathname: '/', hash: id }}
      onClick={(e) => {
        onClick?.(e)
        const ziel = document.getElementById(id)
        if (pathname !== '/' || !ziel || e.ctrlKey || e.metaKey || e.shiftKey) return
        e.preventDefault()
        history.replaceState(history.state, '', '#' + id)
        weichScrollen(id === 'start' ? null : ziel)
      }}
    />
  )
}

/** Zeigt aus Markdown erzeugtes HTML. Interne Links laufen über den Router (kein Neuladen). */
export function Markdown({ html, className }: { html: string; className?: string }) {
  const navigate = useNavigate()
  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest('a')
    const base = import.meta.env.BASE_URL
    if (!a || a.origin !== location.origin || !a.pathname.startsWith(base) || e.ctrlKey || e.metaKey) return
    e.preventDefault()
    navigate('/' + a.pathname.slice(base.length) + a.hash)
  }
  if (!html) return null
  return <div className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />
}

/** Vorschaubilder; ein Klick öffnet die Bildansicht mit Blättern (Pfeiltasten, Esc schließt). */
export function Gallery({ bilder = [] }: { bilder?: Bild[] }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [i, setI] = useState(0)
  const step = (d: number) => setI((n) => (n + d + bilder.length) % bilder.length)
  const aktuell = bilder[i]
  if (!bilder.length) return null

  return (
    <>
      <ul className="gallery">
        {bilder.map((b, n) => (
          <li key={b.bild}>
            <button
              type="button"
              aria-label={`${b.alt} (vergrößern)`}
              onClick={() => {
                setI(n)
                dialog.current?.showModal()
              }}
            >
              <img src={asset(b.bild)} alt="" loading="lazy" decoding="async" />
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Bildansicht"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      >
        {aktuell && (
          <figure>
            <img key={aktuell.bild} src={asset(aktuell.bild)} alt={aktuell.alt} />
            <figcaption>
              {aktuell.alt} <span className="muted">({i + 1} / {bilder.length})</span>
            </figcaption>
          </figure>
        )}
        <button type="button" className="icon-btn lightbox-close" aria-label="Schließen" onClick={() => dialog.current?.close()}>
          <X aria-hidden />
        </button>
        {bilder.length > 1 && (
          <>
            <button type="button" className="icon-btn lightbox-prev" aria-label="Vorheriges Bild" onClick={() => step(-1)}>
              <ChevronLeft aria-hidden />
            </button>
            <button type="button" className="icon-btn lightbox-next" aria-label="Nächstes Bild" onClick={() => step(1)}>
              <ChevronRight aria-hidden />
            </button>
          </>
        )}
      </dialog>
    </>
  )
}

export function Preisliste({ preise }: { preise: Preis[] }) {
  return (
    <ul className="preise">
      {preise.map((p) => (
        <li key={p.titel} className="preis">
          <span className="preis-titel">{p.titel}</span>
          <span className="preis-betrag">{p.preis}</span>
          {p.zusatz && <span className="preis-zusatz">{p.zusatz}</span>}
        </li>
      ))}
    </ul>
  )
}

export function Oeffnungszeiten({ id }: { id: string }) {
  return (
    <aside className="card zeiten" aria-labelledby={id}>
      <h3 id={id}>
        <Clock aria-hidden size={22} /> Öffnungszeiten
      </h3>
      {oeffnungszeiten.map((g) => (
        <dl key={g.titel}>
          <dt>{g.titel}</dt>
          {g.zeilen.map((z) => (
            <dd key={z.tage}>
              <span>{z.tage}</span>
              <strong>{z.zeit}</strong>
            </dd>
          ))}
        </dl>
      ))}
    </aside>
  )
}

/** Google Maps wird erst nach Klick geladen (keine Datenübertragung vorher). */
export function MapConsent() {
  const [aktiv, setAktiv] = useState(false)
  if (aktiv) {
    return (
      <iframe
        className="map"
        title={`Karte: ${betrieb.name}`}
        src={kartenLink}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    )
  }
  return (
    <div className="map map-consent">
      <MapPin aria-hidden size={40} />
      <p>
        Beim Anzeigen der Karte werden Daten an Google übertragen. Mehr dazu in der{' '}
        <Link to="/datenschutz">Datenschutzerklärung</Link>.
      </p>
      <button type="button" className="btn btn-outline" onClick={() => setAktiv(true)}>
        Karte anzeigen
      </button>
    </div>
  )
}

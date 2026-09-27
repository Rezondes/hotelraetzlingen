import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { Mail, MapPin, Navigation, Phone } from 'lucide-react'
import { asset, betrieb, preise, routeLink, seiten, telLink, type Seite } from './content'
import { AbschnittLink, Gallery, MapConsent, Markdown, Oeffnungszeiten, Preisliste } from './components'

/** Onepager: Willkommen, Hotel, Gaststätte, Eiscafé, Bowling & Billard, Anreise, Kontakt */
export default function Home() {
  const { willkommen, hotel, gaststaette, eiscafe, bowling, billard, anreise, kontakt } = seiten
  // Zum Abschnitt springen (#hotel usw.), auch nach Weiterleitung oder von einer Unterseite aus
  const { hash, key } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash, key])

  return (
    <>
      <title>{`${willkommen.titel} | Gaststätte und Hotel in ${betrieb.ort}`}</title>

      <section id="start" className="hero" aria-labelledby="start-titel">
        <div className="container hero-inner">
          <div className="hero-text">
            <img className="hero-gans" src={asset('/bilder/gans.png')} alt="" width="104" height="139" />
            <p className="hero-art">{betrieb.art}</p>
            <h1 id="start-titel">„{willkommen.titel}“</h1>
            {willkommen.untertitel && <p className="hero-untertitel">{willkommen.untertitel}</p>}
            <div className="btn-row">
              <a className="btn btn-gold" href={telLink}>
                <Phone aria-hidden size={20} /> {betrieb.telefon}
              </a>
              <AbschnittLink className="btn btn-hell" id="anreise">
                <MapPin aria-hidden size={20} /> Anreise
              </AbschnittLink>
            </div>
          </div>
          <ul className="collage" aria-label="Eindrücke">
            {willkommen.bilder?.slice(0, 3).map((b, n) => (
              <li key={b.bild}>
                <img src={asset(b.bild)} alt={b.alt} fetchPriority={n === 0 ? 'high' : undefined} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-label="Willkommen">
        <div className="container">
          <Markdown className="prose lead" html={willkommen.intro} />
          <Karten seite={willkommen} />
        </div>
      </section>

      <section id="hotel" className="section section-alt" aria-labelledby="hotel-titel">
        <div className="container">
          <Kopf id="hotel-titel" seite={hotel} />
          <div className="split">
            <Markdown className="prose" html={hotel.intro} />
            <div>
              <h3 className="klein-titel">Übernachtungspreise inkl. Frühstück</h3>
              <Preisliste preise={preise.hotel} />
            </div>
          </div>
          <Gallery bilder={hotel.bilder} />
        </div>
      </section>

      <section id="gaststaette" className="section" aria-labelledby="gaststaette-titel">
        <div className="container">
          <Kopf id="gaststaette-titel" seite={gaststaette} />
          <div className="split">
            <Markdown className="prose" html={gaststaette.intro} />
            <Oeffnungszeiten id="zeiten-gaststaette" />
          </div>
          {gaststaette.sections.length > 0 && <h3 className="klein-titel">Unsere Räume</h3>}
          <Karten seite={gaststaette} />
          <Gallery bilder={gaststaette.bilder} />
        </div>
      </section>

      <section id="eiscafe" className="section section-alt" aria-labelledby="eiscafe-titel">
        <div className="container">
          <Kopf id="eiscafe-titel" seite={eiscafe} />
          <Markdown className="prose" html={eiscafe.intro} />
          <Karten seite={eiscafe} />
          <Gallery bilder={eiscafe.bilder} />
        </div>
      </section>

      <section id="freizeit" className="section" aria-labelledby="freizeit-titel">
        <div className="container">
          <header className="section-kopf">
            <h2 id="freizeit-titel">Bowling & Billard</h2>
          </header>
          <div className="freizeit-grid">
            {[bowling, billard].map((s) => (
              <article key={s.titel} className="card">
                <h3>{s.titel}</h3>
                <Markdown className="prose" html={s.intro} />
                {s === bowling && <Preisliste preise={preise.bowling} />}
                <Gallery bilder={s.bilder} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="anreise" className="section section-alt" aria-labelledby="anreise-titel">
        <div className="container">
          <Kopf id="anreise-titel" seite={anreise} />
          <Markdown className="prose" html={anreise.intro} />
          <div className="anreise-grid">
            <div className="card adresse">
              <MapPin aria-hidden size={32} className="akzent" />
              <address>
                <strong>{betrieb.art} „{betrieb.name}“</strong>
                <br />
                {betrieb.strasse}
                <br />
                {betrieb.plz} {betrieb.ort}
              </address>
              <a className="btn btn-primary" href={routeLink} target="_blank" rel="noopener noreferrer">
                <Navigation aria-hidden size={20} /> Route in Google Maps
              </a>
            </div>
            <MapConsent />
          </div>
          <Karten seite={anreise} />
        </div>
      </section>

      <section id="kontakt" className="section" aria-labelledby="kontakt-titel">
        <div className="container">
          <Kopf id="kontakt-titel" seite={kontakt} />
          <Markdown className="prose" html={kontakt.intro} />
          <div className="split">
            <ul className="kontakt-liste">
              <li>
                <a className="kontakt-karte" href={telLink}>
                  <Phone aria-hidden size={28} />
                  <span className="kontakt-label">Telefon</span>
                  <span className="kontakt-wert">{betrieb.telefon}</span>
                </a>
              </li>
              <li>
                <a className="kontakt-karte" href={`mailto:${betrieb.email}`}>
                  <Mail aria-hidden size={28} />
                  <span className="kontakt-label">E-Mail</span>
                  <span className="kontakt-wert">{betrieb.email}</span>
                </a>
              </li>
              <li>
                <div className="kontakt-karte">
                  <MapPin aria-hidden size={28} />
                  <span className="kontakt-label">Adresse</span>
                  <span className="kontakt-wert">
                    {betrieb.strasse}, {betrieb.plz} {betrieb.ort}
                  </span>
                </div>
              </li>
            </ul>
            <Oeffnungszeiten id="zeiten-kontakt" />
          </div>
          <Karten seite={kontakt} />
        </div>
      </section>
    </>
  )
}

function Kopf({ id, seite }: { id: string; seite: Seite }) {
  return (
    <header className="section-kopf">
      <h2 id={id}>{seite.titel}</h2>
      {seite.untertitel && <p className="lead">{seite.untertitel}</p>}
    </header>
  )
}

/** Jeder "## "-Abschnitt einer Inhaltsdatei wird eine Karte. */
function Karten({ seite }: { seite: Seite }) {
  if (!seite.sections.length) return null
  return (
    <div className="cards">
      {seite.sections.map((s) => (
        <article key={s.titel} className="card">
          <h3>{s.titel}</h3>
          <Markdown className="prose" html={s.html} />
        </article>
      ))}
    </div>
  )
}

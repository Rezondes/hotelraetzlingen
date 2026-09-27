import { Link } from 'react-router'
import { betrieb, type Seite } from './content'
import { Markdown } from './components'

/** Impressum, Datenschutz, Cookie-Hinweis: eigene Unterseiten, erreichbar über den Footer. */
export default function LegalPage({ seite }: { seite: Seite }) {
  return (
    <section className="section legal">
      <div className="container prose">
        <title>{`${seite.titel} | ${betrieb.name}`}</title>
        <p>
          <Link to="/" viewTransition>← Zurück zur Startseite</Link>
        </p>
        <h1>{seite.titel}</h1>
        <Markdown html={seite.intro} />
        {seite.sections.map((s) => (
          <section key={s.titel}>
            <h2>{s.titel}</h2>
            <Markdown html={s.html} />
          </section>
        ))}
      </div>
    </section>
  )
}

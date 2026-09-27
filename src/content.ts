// Einziger Zugriffspunkt auf die Inhalte im Ordner content/.
// Die Typen sorgen dafür, dass der Build bei fehlenden oder falschen Feldern abbricht.
import betriebJson from '../content/betrieb.json'
import preiseJson from '../content/preise.json'
import zeitenJson from '../content/oeffnungszeiten.json'
import willkommen from '../content/seiten/willkommen.md'
import hotel from '../content/seiten/hotel.md'
import gaststaette from '../content/seiten/gaststaette.md'
import eiscafe from '../content/seiten/eiscafe.md'
import bowling from '../content/seiten/bowling.md'
import billard from '../content/seiten/billard.md'
import anreise from '../content/seiten/anreise.md'
import kontakt from '../content/seiten/kontakt.md'
import impressum from '../content/seiten/impressum.md'
import datenschutz from '../content/seiten/datenschutz.md'
import cookies from '../content/seiten/cookies.md'

export type Betrieb = {
  name: string
  art: string
  strasse: string
  plz: string
  ort: string
  telefon: string
  email: string
}
export type Preis = { titel: string; preis: string; zusatz: string }
export type Zeiten = { titel: string; zeilen: { tage: string; zeit: string }[] }
export type Bild = { bild: string; alt: string }
export type Seite = typeof willkommen

export const betrieb: Betrieb = betriebJson
export const preise: { hotel: Preis[]; bowling: Preis[] } = preiseJson
export const oeffnungszeiten: Zeiten[] = zeitenJson
export const seiten = {
  willkommen,
  hotel,
  gaststaette,
  eiscafe,
  bowling,
  billard,
  anreise,
  kontakt,
  impressum,
  datenschutz,
  cookies,
}

/** "/bilder/x.jpg" -> Pfad inkl. Basis-Ordner der Seite */
export const asset = (pfad: string) => import.meta.env.BASE_URL + pfad.replace(/^\//, '')

/** "039057 97063" -> "tel:+493905797063" (deutsche Nummer vorausgesetzt) */
export const telLink = 'tel:+49' + betrieb.telefon.replace(/\D/g, '').replace(/^0/, '')

const adresse = `${betrieb.name}, ${betrieb.strasse}, ${betrieb.plz} ${betrieb.ort}`
export const routeLink = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(adresse)
export const kartenLink = 'https://maps.google.com/maps?q=' + encodeURIComponent(adresse) + '&t=m&z=14&output=embed&iwloc=near'

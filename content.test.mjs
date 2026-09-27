// Prüft vor jedem Build, ob alle Inhalte gültig sind.
// Schlägt ein Test fehl, wird die Seite NICHT veröffentlicht und die Meldung sagt, was zu tun ist.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { parsePage } from './content-plugin.mjs'

const lesen = (pfad) => readFileSync(new URL(pfad, import.meta.url), 'utf8')
const json = (pfad) => {
  try {
    return JSON.parse(lesen(pfad))
  } catch (e) {
    assert.fail(`${pfad} ist kein gültiges JSON (Komma oder Anführungszeichen vergessen?): ${e.message}`)
  }
}
const bildDa = (pfad) => existsSync(new URL('./public' + pfad, import.meta.url))
const text = (wert) => typeof wert === 'string' && wert.trim() !== ''

test('Markdown-Umwandlung: Kopf, Abschnitte, Bildpfade', () => {
  const p = parsePage('---\ntitel: T\n---\nEinleitung\n\n## Eins\n![a](/bilder/x.jpg)\n## Zwei\nText', '/repo/')
  assert.equal(p.titel, 'T')
  assert.equal(p.intro, '<p>Einleitung</p>')
  assert.deepEqual(p.sections.map((s) => s.titel), ['Eins', 'Zwei'])
  assert.match(p.sections[0].html, /<img loading="lazy" decoding="async" src="\/repo\/bilder\/x\.jpg"/)
})

for (const datei of readdirSync(new URL('./content/seiten', import.meta.url))) {
  test(`content/seiten/${datei}`, () => {
    const p = parsePage(lesen(`./content/seiten/${datei}`))
    assert.ok(p.titel, `content/seiten/${datei}: Feld "titel" fehlt im Kopf (zwischen den ---).`)
    ;(p.bilder ?? []).forEach((b, i) => {
      assert.ok(text(b?.alt), `content/seiten/${datei}, Foto ${i + 1}: Bildbeschreibung "alt" fehlt.`)
      assert.ok(text(b?.bild) && bildDa(b.bild), `content/seiten/${datei}, Foto ${i + 1}: Datei ${b?.bild} gibt es nicht in public/.`)
    })
    const html = [p.intro, ...p.sections.map((s) => s.html)].join('')
    for (const [, src] of html.matchAll(/src="\/([^"]+)"/g)) {
      assert.ok(bildDa('/' + src), `content/seiten/${datei}: Bild /${src} gibt es nicht in public/.`)
    }
  })
}

test('content/betrieb.json', () => {
  const b = json('./content/betrieb.json')
  for (const feld of ['name', 'art', 'strasse', 'plz', 'ort', 'telefon', 'email']) {
    assert.ok(text(b[feld]), `content/betrieb.json: Feld "${feld}" fehlt oder ist leer.`)
  }
  assert.match(b.telefon, /^0[\d /]+$/, 'content/betrieb.json: Telefon bitte mit Vorwahl, z. B. "039057 97063".')
})

test('content/preise.json', () => {
  const p = json('./content/preise.json')
  for (const bereich of ['hotel', 'bowling']) {
    assert.ok(Array.isArray(p[bereich]) && p[bereich].length, `content/preise.json: Liste "${bereich}" fehlt oder ist leer.`)
    p[bereich].forEach((e, i) => {
      for (const feld of ['titel', 'preis']) {
        assert.ok(text(e[feld]), `content/preise.json, ${bereich} Eintrag ${i + 1}: Feld "${feld}" fehlt.`)
      }
    })
  }
})

test('content/oeffnungszeiten.json', () => {
  const liste = json('./content/oeffnungszeiten.json')
  assert.ok(Array.isArray(liste), 'content/oeffnungszeiten.json: muss eine Liste sein.')
  liste.forEach((g, i) => {
    assert.ok(text(g.titel), `content/oeffnungszeiten.json, Eintrag ${i + 1}: "titel" fehlt.`)
    assert.ok(Array.isArray(g.zeilen) && g.zeilen.length, `content/oeffnungszeiten.json, ${g.titel}: keine Zeiten eingetragen.`)
    g.zeilen.forEach((z, n) => {
      assert.ok(text(z.tage) && text(z.zeit), `content/oeffnungszeiten.json, ${g.titel} Zeile ${n + 1}: "tage" oder "zeit" fehlt.`)
    })
  })
})

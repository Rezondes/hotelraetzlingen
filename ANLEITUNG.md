# Anleitung: Inhalte der Website ändern

Alle Texte, Preise, Öffnungszeiten, Kontaktdaten und Fotos liegen im Ordner **`content/`** bzw. **`public/bilder/`**.
Am Programmcode muss dafür nichts geändert werden. Nach dem Speichern wird die Seite automatisch neu gebaut und ist nach **ca. 1 bis 2 Minuten** online.

## Wo steht was?

| Was | Datei |
|---|---|
| Startbereich und Begrüßung, Naturpark Drömling | `content/seiten/willkommen.md` |
| Hotel (Text + Fotos) | `content/seiten/hotel.md` |
| Gaststätte (Text, Räume + Fotos) | `content/seiten/gaststaette.md` |
| Eiscafé (Text + Fotos) | `content/seiten/eiscafe.md` |
| Bowlingbahn / Billardzimmer | `content/seiten/bowling.md`, `content/seiten/billard.md` |
| Anreise (Routen) | `content/seiten/anreise.md` (Adresse kommt aus `betrieb.json`) |
| Kontakt | `content/seiten/kontakt.md` (Daten kommen aus `betrieb.json`) |
| **Preise** (Zimmer, Bowling) | `content/preise.json` |
| **Öffnungszeiten** | `content/oeffnungszeiten.json` |
| Name, Adresse, Telefon, E-Mail | `content/betrieb.json` |
| Impressum, Datenschutz, Cookie-Hinweis | `content/seiten/impressum.md`, `datenschutz.md`, `cookies.md` |

**Achtung:**
- Telefonnummer und Adresse stehen zusätzlich als Text im Impressum und in der Datenschutzerklärung. Bei einer Änderung bitte dort ebenfalls anpassen.
- Die Zeiten des Eiscafés stehen auch im Fließtext von `eiscafe.md`, der Preis der Bowlingschuhe in `preise.json`.

## Weg 1 (empfohlen): Pages CMS

Eine einfache Web-Oberfläche mit Formularen, ohne Installation.

1. [app.pagescms.org](https://app.pagescms.org) öffnen und mit dem GitHub-Konto anmelden.
2. Das Repository der Website auswählen.
3. Links den Bereich wählen (z. B. „Preise“), ändern, **Speichern**.

Fotos lassen sich dort direkt hochladen.

## Weg 2: Direkt auf GitHub.com

1. Im Repository die Datei öffnen (z. B. `content/preise.json`).
2. Oben rechts auf das **Stift-Symbol** klicken.
3. Text ändern, dann **„Commit changes“** klicken.

## So sind die Textdateien (.md) aufgebaut

```
---
titel: Unser Hotel
bilder:
  - bild: /bilder/doppelzimmer1.jpg
    alt: Doppelzimmer
---
Einleitungstext.

## Überschrift einer Karte
Text der Karte.
```

- Oben zwischen den beiden `---` stehen Überschrift, Fotos und Einstellungen. Das Format `name: wert` und die Einrückung (Leerzeichen) bitte beibehalten.
- Zeilen mit `#` im Kopf sind nur Hinweise und erscheinen nicht auf der Seite.
- Eine Zeile, die mit `## ` beginnt, startet eine neue Karte (z. B. die Räume der Gaststätte).
- Eine Leerzeile beginnt einen neuen Absatz. Ein einfacher Zeilenumbruch bleibt ein Zeilenumbruch.
- `**fett**` schreibt **fett**, `- ` am Zeilenanfang erzeugt einen Aufzählungspunkt.
- Link: `[Linktext](https://adresse.de)`

## So sind die Listen (.json) aufgebaut

Beispiel Preis in `content/preise.json`:

```json
{ "titel": "Doppelzimmer", "preis": "50,00 €", "zusatz": "pro Zimmer und Nacht, inkl. Frühstück" }
```

Beispiel Öffnungszeit in `content/oeffnungszeiten.json`:

```json
{ "tage": "Dienstag bis Freitag", "zeit": "11 bis 14 Uhr und 17 bis 23 Uhr" }
```

- Texte immer in `"Anführungszeichen"`.
- Zwischen zwei Einträgen steht ein Komma, nach dem letzten Eintrag **kein** Komma.

## Neues Foto hinzufügen

1. Foto in `public/bilder/` hochladen (am besten JPG, max. ca. 1600 Pixel breit, Dateiname ohne Leerzeichen und Umlaute).
2. In der passenden `.md`-Datei unter `bilder:` einen Eintrag ergänzen (gleiche Einrückung wie die anderen):
   ```
     - bild: /bilder/mein-foto.jpg
       alt: Kurze Beschreibung, was zu sehen ist
   ```
3. Im Startbereich (`willkommen.md`) werden die ersten drei Fotos als Collage gezeigt; das erste sollte ein Hochformat sein.

## Wenn etwas schiefgeht

Vor jeder Veröffentlichung prüft die Seite automatisch alle Inhalte. Ist z. B. ein Komma vergessen oder fehlt ein Foto, wird **nicht veröffentlicht**. Die alte Version bleibt online.

- Auf GitHub im Reiter **„Actions“** steht beim roten Eintrag eine Meldung wie
  `content/preise.json, hotel Eintrag 2: Feld "preis" fehlt.`
- Fehler korrigieren und erneut speichern.
- Jede Änderung lässt sich im Verlauf (History) der Datei wieder rückgängig machen.

## Für Technik-Interessierte

```
npm install      # einmalig
npm run dev      # lokale Vorschau auf http://localhost:5173
npm test         # Inhalte prüfen
npm run build    # fertige Seite in dist/
```

Veröffentlichung: `.github/workflows/deploy.yml`. Einmalig im Repository unter **Settings > Pages > Source** „GitHub Actions“ auswählen. Eine eigene Domain (z. B. www.hotel-raetzlingen.de) kann später unter **Settings > Pages** eingetragen werden; der Unterordner-Pfad passt sich dann automatisch an.

# Relaunch hotel-raetzlingen.de: Plan

> **Stand: umgesetzt (27.09.2026).** Entscheidungen zu Abschnitt 8 und Abweichungen vom Plan:
> - Preise, Öffnungszeiten, Inhaberin und Impressum wörtlich übernommen (Impressum inkl. der Nummer „105/292/01805“, kann später angepasst werden). Tippfehler korrigiert.
> - **Anreise mit Google Maps** (Zwei-Klick-Lösung wie bei pbsvzerbst: Karte lädt erst nach Klick) plus Button „Route in Google Maps“. Das alte Kartenbild wird nicht übernommen. Datenschutz- und Cookie-Text beschreiben Google Maps entsprechend.
> - Vorerst nur GitHub-Pages-Adresse, keine eigene Domain (kein CNAME).
> - Es bleiben die vorhandenen kleinen Fotos, keine WebP-Umwandlung (Dateien sind ohnehin klein, ca. 80-100 KB).
> - Öffnungszeiten erscheinen bei „Gaststätte“ und „Kontakt“, nicht zusätzlich im Willkommen-Bereich.

Neue, statische Website für die **Land- und Speisegaststätte „Zur Goldenen Gans“** in Rätzlingen mit TypeScript, React und Vite, gehostet auf GitHub Pages.
Grundlage ist ausschließlich der Inhalt der aktuellen Seite (ausgelesen am 27.09.2026). Technik und Pflegekonzept werden von `F:\Code\pbsvzerbst` übernommen.

Sicherung der alten Seite: `_orig/` (alle HTML-Seiten und alle 24 Bilder, wird nicht ins Repo eingecheckt).

---

## 1. Bestandsaufnahme der aktuellen Seite

### Technik
- Uralte **Frameset-Seite** (erstellt mit „ViennaSoft“), kein WordPress. Drei Frames: Banner oben, Menü links, Inhalt rechts.
- Alle Elemente absolut positioniert (feste Pixel), dadurch **nicht mobiltauglich**, kein HTTPS.
- Schrift: Arial *kursiv*, Fließtext 16px schwarz. Hintergrund: hellgraue Papier-Struktur (`hintergrund75x75.jpg`, Kacheln).
- Fotos mit grauem 1px-Rahmen, auf der Startseite **überlappend** angeordnet (Collage).
- Gelb kommt nur im Banner vor: Schriftzug „Zur Goldenen Gans“ in Goldgelb (ca. `#E6CC28`) mit gelber Gans (Maskottchen).
- Externer Besucherzähler `powercounter.org` (lädt ein Bild von einem Fremdserver, datenschutzrechtlich problematisch).

> **Hinweis:** Anders als im Auftrag beschrieben gibt es hier **keine gelbe Schrift auf Schwarz** und **keine WordPress-Cookie-Richtlinie**. Das trifft auf die alte pbsvzerbst-Seite zu. Die Probleme hier sind: kursive Arial auf gemustertem Grund, feste Pixel-Layouts, keine mobile Ansicht, **gar keine Datenschutzerklärung** und ein Tracking-Zähler ohne Hinweis.

### Seiten (Sitemap)
| Seite | URL | Inhalt | Bilder |
|---|---|---|---|
| Willkommen | `start.htm` | Begrüßung, Feiern/Seminare, Naturpark Drömling (280 km²), Kremserfahrt, Naturparkverwaltung Kämkerhorst | doppelzimmer1, eiscafeinnen1, wirtschaftaussen2 |
| Hotel | `hotel.htm` | 8 DZ, 6 EZ, Ausstattung, Preise inkl. Frühstück | doppelzimmer1-2, einzelzimmer1-3 |
| Gaststätte | `gaststatte.htm` | Gastraum 28 P., Bar, Vereinsraum 30 P., Saal 100 P. mit Bühne, Frühstücksraum 20 P., Speisekarte, Biere, **Öffnungszeiten** | wirtschaftinnen1-7 |
| Eiscafe | `eiscafe.htm` | 1. Mai bis 30. Sept., 14-18 Uhr, 35 (bis 55) Plätze, buchbar für Seminare | eiscafeinnen1-3, eiscafeaussen1 |
| Bowlingbahn | `bowlingbahn.htm` | 3 Bahnen je 10 Gäste, **Preise**, Schuhverleih | bowlingbahninnen1-2 |
| Billardzimmer | `billardzimmer.htm` | Poolbillard im OG, 10 Personen | billardzimmer1-2 |
| Anreise | `anfahrt.htm` | Routen per PKW (4 Richtungen) und Bahn (2 Richtungen) | karteanfahrt (Kartenbild 700x519) |
| Kontakt | `kontakt.htm` | Adresse, Telefon, E-Mail | - |
| Impressum | `impressum.htm` | Pflichtangaben + Haftungstexte | - |

### Stammdaten (aus Impressum / Kontakt)
- Land- und Speisegaststätte „Zur Goldenen Gans“, Dorfstrasse 1, 39359 Rätzlingen
- Telefon: (+49) 039057 / 97063, E-Mail: Info@Hotel-Raetzlingen.de
- Inhaberin und inhaltlich verantwortlich: Yvonne Zimmermann
- Aufsichtsbehörde: Gewerbeamt Oebisfelde, Kammer: IHK Magdeburg, Finanzamt Haldensleben
- „Umsatzsteuer-Identifikationsnummer“: 105/292/01805

### Preise und Zeiten (wörtlich übernommen)
| Angebot | Preis / Zeit |
|---|---|
| Doppelzimmer inkl. Frühstück | 50,00 € pro Zimmer und Nacht |
| Einzelzimmer inkl. Frühstück | 30,00 € pro Zimmer und Nacht |
| Bowling 60 Min. vor 20 Uhr | 11,50 € pro Bahn |
| Bowling 60 Min. nach 20 Uhr | 12,50 € pro Bahn |
| Bowlingschuhe | 1,50 € |
| Gaststätte Di-Fr | 11-14 Uhr und 17-23 Uhr |
| Gaststätte Sa-So | 11-23 Uhr durchgehend |
| Eiscafe (1. Mai - 30. Sept.) | 14-18 Uhr |

### Bilder
Alle 24 Bilder sind **klein** (Fotos 400x279 bzw. 279x400, Banner 573x140). Größere Originale gibt es online nicht. Folgen für das Design:
- Kein bildschirmfüllendes Hero-Foto (wäre unscharf). Fotos werden höchstens in Originalgröße gezeigt, auch in der Lightbox.
- Die Gans wird aus dem Banner ausgeschnitten (ca. 110x140 px) und als Logo/Favicon genutzt. Besser wäre später eine nachgezeichnete SVG-Version.
- Alle Bilder werden einmalig nach WebP (mit JPG-Fallback) konvertiert, Dateinamen bleiben.

---

## 2. Ziele

1. **Lesbarkeit:** Dunkle, gerade (nicht kursive) Schrift auf ruhigem hellem Grund, Kontrast mindestens 4.5:1, Fließtext mindestens 17px.
2. **Charakter erhalten:** Gans-Maskottchen, Goldgelb, Papier-Struktur, gerahmte und leicht überlappende Fotos, familiärer Ton. Die Texte bleiben wörtlich.
3. **Modern und mobil:** Mobile-first, klare Abschnitte, Preise und Öffnungszeiten als Tabellen/Karten statt Leerzeichen-Einrückungen.
4. **Einfach pflegbar:** Texte, Preise, Zeiten und Bilder ohne Programmierkenntnisse ändern (siehe Abschnitt 6).
5. **Statisch:** `npm run build` erzeugt reines HTML/CSS/JS, Deployment automatisch per GitHub Actions.
6. **Keine erfundenen Inhalte**, keine Cookies, kein Tracking, keine Fremdserver.

---

## 3. Informationsarchitektur: Onepager + Rechtsseiten

Die 8 Inhaltsseiten sind alle kurz (1-3 Absätze), das passt ideal auf **eine Seite**. Reihenfolge nach Wichtigkeit für Gäste:

| # | Abschnitt (Anker) | Quelle | Aufbau |
|---|---|---|---|
| 1 | Willkommen (`#start`) | start.htm | Gans + Name + Untertitel aus dem Banner, Begrüßungstext, Foto-Collage der 3 Startbilder (wie bisher überlappend). Zwei Buttons: „Anrufen“, „Anreise“ |
| 2 | Hotel (`#hotel`) | hotel.htm | Text, Preiskarten DZ/EZ, Galerie (5) |
| 3 | Gaststätte (`#gaststaette`) | gaststatte.htm | Text, Raum-Übersicht als Karten (Gastraum 28, Vereinsraum 30, Saal 100, Frühstücksraum 20), Getränke, **Öffnungszeiten-Box**, Galerie (7) |
| 4 | Eiscafé (`#eiscafe`) | eiscafe.htm | Text, Saison/Zeiten-Box, Galerie (4) |
| 5 | Bowling & Billard (`#freizeit`) | bowlingbahn.htm + billardzimmer.htm | Zwei Karten nebeneinander, Bowling-Preistabelle, je Galerie (2+2) |
| 6 | Anreise (`#anreise`) | anfahrt.htm | Routen als Liste mit Pfeilen statt Bindestrich-Ketten, Kartenbild, Link „Route planen“ (öffnet OpenStreetMap/Google Maps im neuen Tab, **kein Einbetten**) |
| 7 | Kontakt (`#kontakt`) | kontakt.htm | Adresse, Telefon (klickbar), E-Mail (klickbar), Öffnungszeiten-Kurzfassung |

Eigene Seiten (Footer-Links):
- `/impressum` (Text von impressum.htm, Formatierung bereinigt)
- `/datenschutz` (**neu, gibt es bisher nicht**, siehe Abschnitt 7)
- `/cookies` (kurzer Hinweis: keine Cookies, kein Tracking)

Navigation: Sticky Header mit Gans-Logo links, Menü rechts (Hotel, Gaststätte, Eiscafé, Freizeit, Anreise, Kontakt), auf dem Handy Burger-Menü. Aktiver Abschnitt wird hervorgehoben (IntersectionObserver wie bei pbsvzerbst). Zusätzlich auf dem Handy ein fester „Anrufen“-Button unten.

Alte URLs leiten weiter (Links in Google und Verzeichnissen bleiben gültig): `start.htm` → `/#start`, `hotel.htm` → `/#hotel`, `gaststatte.htm` → `/#gaststaette`, `eiscafe.htm` → `/#eiscafe`, `bowlingbahn.htm` / `billardzimmer.htm` → `/#freizeit`, `anfahrt.htm` → `/#anreise`, `kontakt.htm` → `/#kontakt`, `impressum.htm` → `/impressum`. Funktioniert über die 404.html-Kopie wie bei pbsvzerbst.

---

## 4. Design-System

### Farben (Tokens in `:root`)
| Token | Wert | Verwendung |
|---|---|---|
| `--c-bg` | `#F7F4EC` warmes Papierweiß + Papier-Struktur `hintergrund75x75.jpg` sehr dezent (Deckkraft ca. 40%) | Seitenhintergrund |
| `--c-surface` | `#FFFFFF` | Karten, Preisboxen |
| `--c-text` | `#2A2418` fast Schwarz, warm | Fließtext (Kontrast > 13:1) |
| `--c-muted` | `#5E5646` | Nebentexte (Kontrast > 6:1) |
| `--c-gold` | `#E6CC28` Gold aus dem Banner | nur Flächen/Deko: Linien, Unterstreichungen, Icon-Hintergründe, Header-Streifen |
| `--c-gold-dark` | `#7A6300` | Links, Überschriften-Akzente, Button-Hintergrund (weiße Schrift, Kontrast > 5:1) |
| `--c-orange` | `#D9661E` Schnabel der Gans | sparsamer Akzent, z. B. Preis-Hervorhebung |
| `--c-border` | `#D8D2C2` | Foto-Rahmen, Trennlinien |

Regel: Goldgelb ist nie Textfarbe auf Hell (zu wenig Kontrast). Gold-Text nur auf dunklem Footer (`#2A2418`).

### Schrift
- Überschriften: **Fira Sans Condensed**, fett, *kursiv* (erinnert an den kursiven Banner-Schriftzug, bleibt aber gut lesbar)
- Fließtext: **Fira Sans** Regular, gerade, 17-18px, Zeilenhöhe 1.6, max. ca. 70 Zeichen pro Zeile
- Lokal über `@fontsource` eingebunden (keine Google-Server), nur Latin-Subset

### Stilelemente, die den alten Charakter tragen
- Gans als Logo im Header und groß im Willkommen-Bereich, als Favicon
- Fotos mit weißem Rand und grauer Linie (wie früher), in der Collage leicht gedreht (±2°) und überlappend
- Abschnittsüberschriften mit goldener Unterstreichung
- Footer dunkel mit goldenem Namenszug („Zur Goldenen Gans“) wie im Banner
- Icons: Lucide (Bett, Besteck, Eis, Kegel, Karte, Telefon, Uhr), einheitliche Strichstärke

### Barrierefreiheit
Skip-Link, sichtbare Fokusrahmen, Alt-Texte für alle Fotos (aus Dateiname/Kontext, z. B. „Gastraum mit Bar“), Lightbox als `<dialog>` mit Pfeiltasten und Esc, `prefers-reduced-motion` schaltet Animationen ab, Touch-Ziele mindestens 44px.

---

## 5. Technik (übernommen von pbsvzerbst)

- React 19, Vite, TypeScript (strict), react-router, lucide-react, @fontsource/fira-sans + fira-sans-condensed
- Dev-Abhängigkeiten: marked, yaml (Markdown wird zur Build-Zeit umgewandelt)
- Dateien, die fast 1:1 übernommen werden: `content-plugin.mjs`, `content.test.mjs` (angepasst), `src/content.ts`, `src/components.tsx` (Markdown, Gallery/Lightbox), `src/LegalPage.tsx`, `src/App.tsx` (Router, Header, Footer), `.github/workflows/deploy.yml`, `.pages.yml`, `ANLEITUNG.md`
- Neu bzw. stark angepasst: `src/Home.tsx` (Abschnitte), `src/styles.css` (neues Design), Komponenten `PriceTable`, `OpeningHours`, `RoomCards`, `PhotoCollage`
- Build: `node --test && tsc -b && vite build` + Kopie `index.html` → `404.html`
- Kein Google-Maps-Iframe und damit kein Zwei-Klick-Baustein nötig: das vorhandene Kartenbild reicht, dazu ein externer Routen-Link
- `public/CNAME` mit `www.hotel-raetzlingen.de` (wenn die Domain auf GitHub Pages zeigen soll), HTTPS über GitHub

---

## 6. Pflege für Nicht-Techniker

```
content/
  betrieb.json         Name, Adresse, Telefon, E-Mail, Inhaberin
  oeffnungszeiten.json Gaststätte + Eiscafé (Tage, Uhrzeiten, Saison)
  preise.json          Zimmer + Bowling (Titel, Preis, Zusatz)
  seiten/
    willkommen.md  hotel.md  gaststaette.md  eiscafe.md
    bowling.md  billard.md  anreise.md  kontakt.md
    impressum.md  datenschutz.md  cookies.md
public/bilder/         alle Fotos
```

- Jede `.md`-Datei: oben Titel und Bilderliste (`bilder:` mit Datei + Beschreibung), darunter normaler Text. Absatz = Leerzeile.
- Telefon, Adresse, Preise und Öffnungszeiten stehen **nur einmal** in den JSON-Dateien und erscheinen automatisch überall (Kontakt, Footer, Impressum). Anders als bei pbsvzerbst wird das Impressum Telefon/Adresse aus `betrieb.json` ziehen, damit nichts doppelt gepflegt werden muss.
- Bearbeitung über **Pages CMS** (Formular im Browser, deutsche Feldnamen, Foto-Upload) oder direkt auf GitHub.com. Jede Änderung wird automatisch veröffentlicht.
- `content.test.mjs` prüft vor jeder Veröffentlichung: Pflichtfelder vorhanden, alle Bilder existieren, Preise im Format „12,50“. Fehlermeldungen auf Deutsch. Bei Fehler bleibt die alte Seite online.
- `ANLEITUNG.md` auf Deutsch mit Beispielen: Text ändern, Preis ändern, Öffnungszeiten ändern, Foto austauschen.

---

## 7. Datenschutz und Cookies

Die alte Seite hat **keine Datenschutzerklärung** und bindet einen fremden Zähler ein. Die neue Seite:
- setzt **keine Cookies**, nutzt kein Tracking, keinen Zähler, keine Fremd-Schriften, keine eingebetteten Karten → **kein Cookie-Banner nötig**
- Datenschutzerklärung neu: Verantwortliche (aus Impressum), Hosting bei GitHub Pages (Server-Logs, Drittlandübermittlung USA/Data Privacy Framework), Kontakt per E-Mail/Telefon, Betroffenenrechte, Beschwerderecht (Landesbeauftragter für den Datenschutz Sachsen-Anhalt), externe Links (Routenplaner). Vorlage wie bei pbsvzerbst, angepasst.
- Cookie-Seite: kurzer Hinweis, dass keine Cookies gesetzt werden.

Diese beiden Texte sind die einzigen neuen Texte. Sie sind rechtlich nötig und sollten von der Inhaberin geprüft oder über einen Generator (z. B. e-recht24) gegengecheckt werden.

---

## 8. Unstimmigkeiten, die vor dem Livegang geklärt werden sollten

1. **Aktualität:** Die Seite ist sehr alt. Stimmen Zimmerpreise (30/50 €), Bowlingpreise, Öffnungszeiten, Biersorten und Inhaberin noch? Der Plan übernimmt alles wörtlich.
2. **„Umsatzsteuer-Identifikationsnummer 105/292/01805“** ist dem Format nach eine **Steuernummer**, keine USt-IdNr. (die beginnt mit „DE“). Eine Steuernummer gehört nicht ins Impressum. Vorschlag: Zeile weglassen oder echte USt-IdNr. eintragen.
3. **Telefon „(+49) 039057 / 97063“** ist doppelt formatiert. Anzeige neu: `039057 97063`, Link: `tel:+493905797063`.
4. **Tippfehler** (Vorschlag: korrigieren): „Satteliten-TV“ → „Satelliten-TV“, „beispielweise“ → „beispielsweise“, „umgehen per elektronischer Post“ → „umgehend“, „Zuständiges Finanzbehörde“ → „Zuständige“, „ihren Besuch“ → „Ihren Besuch“, „Köstrizer“ → „Köstritzer“, „Eiscafe“ → „Eiscafé“ (optional). „Bad Helmstedt“ in der Anreise ebenfalls prüfen (heißt „Helmstedt“).
5. **Impressum-Textbausteine** „Schutzrechtsverletzung“ und „Abgrenzung“ sind veraltete Floskeln ohne Rechtswirkung. Vorschlag: behalten (nichts erfinden) oder auf Wunsch streichen.
6. **Domain:** Soll `www.hotel-raetzlingen.de` auf GitHub Pages umgestellt werden (DNS-Änderung beim Provider)?
7. **Bessere Fotos:** Gibt es die Originale in höherer Auflösung? Dann wird die Seite deutlich schöner (großes Startbild möglich).

---

## 9. Umsetzungsschritte

1. Projekt anlegen (Vite + React + TS), Struktur und Build-Skripte von pbsvzerbst übernehmen, `_orig/` in `.gitignore`
2. Bilder nach `public/bilder/` (WebP + JPG), Gans aus dem Banner freistellen, Favicon/Touch-Icon erzeugen
3. Inhalte in `content/` übertragen (wörtlich, nach Klärung von Abschnitt 8 ggf. korrigiert)
4. `content.test.mjs` für die neuen Dateien anpassen
5. Layout: Header, Burger-Menü, Footer, Rechtsseiten, Weiterleitungen alter `.htm`-URLs
6. Abschnitte: Willkommen mit Collage, Hotel, Gaststätte, Eiscafé, Freizeit, Anreise, Kontakt
7. Datenschutz- und Cookie-Text schreiben
8. `.pages.yml` und `ANLEITUNG.md` anpassen
9. Prüfen: 375 / 768 / 1280 px, Tastatur, Kontrast, Lighthouse, alle alten URLs
10. GitHub-Repo + Actions-Deployment, optional Domain (CNAME)

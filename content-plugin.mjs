// Wandelt content/**/*.md zur Build-Zeit in fertiges HTML um.
// Aufbau einer Datei: optionaler YAML-Kopf zwischen "---", danach Markdown.
// Jede Zeile "## Überschrift" beginnt einen neuen Abschnitt.
import { parse } from 'yaml'
import { Marked } from 'marked'

const marked = new Marked({ breaks: true })

export function parsePage(src, base = '/') {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  const data = (m && parse(m[1])) || {}
  const body = m ? m[2] : src
  // Bildpfade wie "/bilder/x.jpg" auf den Basis-Pfad der Seite umbiegen (GitHub Pages Unterordner)
  const html = (md) =>
    marked
      .parse(md)
      .replace(/(src|href)="\/(?!\/)/g, `$1="${base}`)
      .replace(/<img /g, '<img loading="lazy" decoding="async" ')
      .trim()
  const parts = body.split(/^##[ \t]+(.+)$/m)
  const sections = []
  for (let i = 1; i < parts.length; i += 2) {
    sections.push({ titel: parts[i].trim(), html: html(parts[i + 1]) })
  }
  return { ...data, intro: html(parts[0]), sections }
}

export function contentPlugin() {
  let base = '/'
  return {
    name: 'goldene-gans-content',
    configResolved(config) {
      base = config.base
    },
    transform(src, id) {
      if (!id.endsWith('.md')) return
      return { code: `export default ${JSON.stringify(parsePage(src, base))}`, map: null }
    },
  }
}

// Form einer content/seiten/*.md-Datei nach dem Build (siehe content-plugin.mjs)
declare module '*.md' {
  const page: {
    titel: string
    untertitel?: string
    beschreibung?: string
    bilder?: { bild: string; alt: string }[]
    intro: string
    sections: { titel: string; html: string }[]
  }
  export default page
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Nur lateinische Zeichen (inkl. ä ö ü ß €), hält die Seite klein
import '@fontsource/fira-sans/latin-400.css'
import '@fontsource/fira-sans/latin-600.css'
import '@fontsource/fira-sans-condensed/latin-600-italic.css'
import '@fontsource/fira-sans-condensed/latin-700-italic.css'
import './styles.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

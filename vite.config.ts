import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { contentPlugin } from './content-plugin.mjs'

// BASE_PATH setzt der GitHub-Workflow automatisch ("/" bei eigener Domain, "/repo/" sonst)
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), contentPlugin()],
})

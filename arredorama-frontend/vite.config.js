import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/arredorama-portfolio/', // <--- AGGIUNGI QUESTO (metti il nome esatto del tuo repo)
})
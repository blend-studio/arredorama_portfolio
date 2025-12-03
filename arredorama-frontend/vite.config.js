import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  return {
    plugins: [react()],
    // IN LOCALE usa '/', ONLINE usa il nome del tuo repo.
    // ATTENZIONE: Controlla se il tuo repo GitHub ha il trattino (-) o l'underscore (_)
    // Dallo screen sembrava col trattino, ma prima mi hai detto underscore. Metti quello GIUSTO qui sotto:
    base: isDev ? '/' : '/arredorama_portfolio/', 
  }
})

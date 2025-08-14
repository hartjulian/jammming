import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import netlify from '@netlify/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), netlify()],
  server: {
    host: '127.0.0.1',
  },
})

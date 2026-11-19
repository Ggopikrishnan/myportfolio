import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Local dev: forward contact-form requests to the Express backend in /server.
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})

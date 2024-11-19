import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Habilita describe, it, expect globalmente
    environment: 'jsdom', // Simula el DOM
    setupFiles: './src/setupTests.js', // Archivo opcional para configuraciones globales
  },
})

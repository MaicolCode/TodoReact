/// <reference types="vitest" />
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    viteCompression({ algorithm: 'gzip', ext: '.gz' })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTest.ts'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})

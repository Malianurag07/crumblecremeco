import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // BASE_PATH lets the same build run at a domain root (default) or a sub-path like GitHub Pages
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  ssgOptions: {
    script: 'async',
    formatting: 'none',
    dirStyle: 'nested',
  },
})

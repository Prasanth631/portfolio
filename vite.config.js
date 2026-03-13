import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages needs '/portfolio/' but Vercel needs '/'
// GITHUB_ACTIONS is automatically set to 'true' inside GitHub Actions runners
const base = process.env.GITHUB_ACTIONS ? '/portfolio/' : '/';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
})

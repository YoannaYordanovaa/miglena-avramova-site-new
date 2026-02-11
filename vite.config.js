import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: false
  }
})



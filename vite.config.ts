import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 조직 페이지(minsu-codelab.github.io)는 루트에서 서빙되므로 base='/'
export default defineConfig({
  base: '/',
  plugins: [react()],
})

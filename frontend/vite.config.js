import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'; // ✅ 추가
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    devSourcemap: true, // 개발 환경에서 소스맵 활성화
  }
})

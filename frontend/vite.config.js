import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'; // ✅ 추가
export default defineConfig({
   plugins: [react()],
  base: "/", // 혹시 Vercel에서 서브경로 배포 시 base 설정 필요
  build: {
    outDir: "dist",
  },
  plugins: [react(), svgr()],
  css: {
    devSourcemap: true, // 개발 환경에서 소스맵 활성화
  }
})

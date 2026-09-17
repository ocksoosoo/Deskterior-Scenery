import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // React 핵심 라이브러리 별도 분리
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            // 그 외 나머지 외부 라이브러리 묶음
            return 'vendor'
          }
        },
      },
    },
    // 단일 청크 경고 기준 상향 (필요 시 조절, 기본값 500)
    chunkSizeWarningLimit: 600,
  },
})
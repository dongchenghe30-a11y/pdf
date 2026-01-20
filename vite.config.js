import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'pdf-lib': ['pdf-lib'],
          'react-router-dom': ['react-router-dom'],
          'file-saver': ['file-saver']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['pdf-lib', 'react-router-dom', 'file-saver']
  },
  // 确保正确的入口点配置
  root: '.',
  publicDir: 'public'
})

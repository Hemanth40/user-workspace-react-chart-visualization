import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
    host: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    middleware: [
      (req, res, next) => {
        // Enable history fallback for client-side routing
        if (!req.url.includes('.')) {
          req.url = '/';
        }
        next();
      }
    ]
  },
  preview: {
    port: 8000
  },
  base: '/'
})

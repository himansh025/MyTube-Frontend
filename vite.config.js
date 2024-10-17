import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import apiUrl from './src/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: apiUrl, // Vercel deployment URL for backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/v1"), // Adjusts the path for API routes
      },
    },
  },
});

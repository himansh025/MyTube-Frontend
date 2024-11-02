import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import apiUrl from './src/config';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: apiUrl,
        changeOrigin: true,
        secure: false, // Set to false for local dev, especially if using HTTP
      },
    },
  },
});

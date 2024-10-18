import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import apiUrl from './src/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: apiUrl, // Directly proxy to apiUrl without rewriting the path
        changeOrigin: true,
        secure: false, // Ensure it's false if you're targeting an API with self-signed SSL cert
      },
    },
  },
});

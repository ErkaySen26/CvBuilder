import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // 🟢 Netlify için gerekli (root’a deploy ediyoruz)
  plugins: [react()],
});

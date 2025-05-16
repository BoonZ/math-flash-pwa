import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/math-flash-pwa/',          // <-- must match GitHub Pages subfolder
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      manifest: {
        name: 'Math Flash Cards',
        short_name: 'MathCards',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1890ff',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
});

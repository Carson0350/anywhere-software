import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://anywheresoftware.com',
  integrations: [tailwind()],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info']
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['astro/components']
          }
        }
      }
    }
  },
  compressHTML: true,
  scopedStyleStrategy: 'class'
});

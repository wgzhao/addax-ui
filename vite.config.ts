import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import Vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Vuetify({
      autoImport: false,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://wgzhao-mbp:5001',
        changeOrigin: true
      }
    }
  },
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
})

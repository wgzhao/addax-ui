import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import alias from '@rollup/plugin-alias'

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  // css: {
  //   devSourcemap: true,
  // },
  plugins: [
    vue(),
    alias({
      entries: [
        {
          find: '@',
          replacement: resolve(projectRootDir, 'src')
        }
      ]
    })
  ],
  server: {
    host: "0.0.0.0"
  },
})

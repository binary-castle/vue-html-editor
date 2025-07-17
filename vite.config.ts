import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite"
import dts from 'vite-plugin-dts'


// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(), dts()],
  build: {
    lib: {
      entry: 'src/lib/index.ts',
      name: 'VueHtmlEditor',
      fileName: (format) => `vue-html-editor.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          vue: 'Vue'
        },
        // Preserve CSS
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'vue-html-editor.css'
          }
          return assetInfo.name!
        }
      }
    },
    cssCodeSplit: false
  }
})

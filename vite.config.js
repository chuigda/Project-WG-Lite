import { defineConfig } from 'vite'

export default defineConfig({
   base: '',
   build: {
      target: 'es2018',
      cssCodeSplit: false,
      assetsDir: '.',
      rollupOptions: {
         output: {
            entryFileNames: 'index.js',
            assetFileNames: 'index.css',
         }
      }
   }
})
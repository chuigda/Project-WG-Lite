import { defineConfig } from 'vite'

export default defineConfig({
   base: '',
   build: {
      target: 'es2018',
      cssCodeSplit: false,
      copyPublicDir: false,
      lib: {
         entry: 'src/main.mjs',
         name: 'project-wg-lite',
         fileName: 'project-wg-lite',
         formats: ['es'],
      }
   }
})
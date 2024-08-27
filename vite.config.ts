import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    minify: false,
  },
  // // Uncomment these lines when 'hacking' on @croquet/react
  // optimizeDeps: {
  //   exclude: ['@croquet/react'],
  //   include: ['@croquet/react > @croquet/croquet', '@croquet/react > object-hash'],
  // },
})

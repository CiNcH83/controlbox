import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  publicDir: "public",
  build: {
    outDir: "./dist/",
    emptyOutDir: true,
  },
  server: {
    port: 7081,
    host: true,
    proxy: {
      "/ws": { target: "ws://localhost:7080", ws: true },
    },
  },plugins: [vue()],
})

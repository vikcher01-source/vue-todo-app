import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Конфигурация Vite для Vue 3
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})

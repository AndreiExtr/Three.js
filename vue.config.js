import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: process.env.NODE_ENV === 'production' ? '/Threejs/' : '/',
  build: {
    outDir: 'dist',  // Папка для сборки
    assetsDir: 'assets',  // Папка для статичных ресурсов
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',  // Генерация файлов с хешами для предотвращения кэширования
        chunkFileNames: 'assets/[name].[hash].js',  // Путь к JS-чанкам
        entryFileNames: 'assets/[name].js',  // Путь к основным JS-файлам
      },
    },
  },
  css: {
    extract: true,  // извлечение CSS в отдельный файл
  },
})
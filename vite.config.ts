import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import presetAttributify from 'unocss/preset-attributify'
import presetUno from 'unocss/preset-uno'
import { presetScrollbar } from 'unocss-preset-scrollbar'

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const viteEnv = loadEnv(env.mode, process.cwd()) as unknown as ImportMetaEnv
  return {
    plugins: [
      react(),
      UnoCSS({
        presets: [presetUno(), presetAttributify(), presetScrollbar({})],
      }),
    ],
    server: {
      port: 3001,
      host: '0.0.0.0',
      open: false,
      proxy: {
        '/api': {
          target: viteEnv.VITE_APP_API_BASE_URL,
          changeOrigin: true, // 允许跨域
          rewrite: (path) => path.replace('/api/', '/'),
        },
      },
    },
    build: {},
  }
})

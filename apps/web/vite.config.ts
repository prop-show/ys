import ui from '@nuxt/ui/vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'
// import AutoImport from 'unplugin-auto-import/vite'
// import Component from 'unplugin-vue-components/vite'
// import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import VueDevtools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'

const RouteGenerateExclude = ['**/components/**', '**/layouts/**', '**/data/**', '**/types/**']
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      exclude: RouteGenerateExclude,
      dts: 'types/typed-router.d.ts',
    }),
    vue(),
    tailwindcss(),
    ui(),
    Layouts({
      defaultLayout: 'default',
    }),
    // AutoImport({
    //   include: [/\.[tj]sx?$/, /\.vue$/, /\.md$/],
    //   imports: ['vue', 'vue-router', VueRouterAutoImports],
    //   dirs: ['src/composables/**/*.ts', 'src/constants/**/*.ts', 'src/stores/**/*.ts'],
    //   defaultExportByFilename: true,
    // }),
    // Component({
    //   dirs: ['src/components'],
    //   collapseSamePrefixes: true, // 组件名去重
    //   directoryAsNamespace: true, // 以目录名作为命名空间
    //   // 如果有element或者其他的UI库，可以在这里配置
    //   // resolvers: [ElementPlusResolver()],
    // }),
    vueJsx(),
    VueDevtools(),
    visualizer({
      gzipSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})

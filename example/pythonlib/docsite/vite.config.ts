import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Pages from 'vite-plugin-pages'
import { libName } from "./src/conf";
import { parseDir } from '../../../package/js/bin/lib'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        IconsResolver()
      ],
    }),
    Icons({
      scale: 1.2,
      defaultClass: 'inline-block align-middle',
      compiler: 'vue3',
    }),
    Pages(),
    {
      name: 'watch-doc',
      handleHotUpdate({ file }) {
        if (file.includes("src/assets/doc") && !file.endsWith("index.json") && !file.endsWith("docstrings.json")) {
          //const dirpath = file.split("/").slice(0, -1).join("/");
          parseDir(path.resolve("./src/assets/doc"))
        }
      },
    }
  ],
  assetsInclude: ["**/*.md"],
  base: process.env.NODE_ENV === 'production' ? `/${libName.toLowerCase()}/` : './',
  resolve: {
    alias: [
      { find: '@/', replacement: '/src/' },
      {
        find: 'vue',
        replacement: path.resolve("./node_modules/vue"),
      },
    ]
  },
})
/**
 * https://nuxt.com/docs/api/configuration/nuxt-config
 */
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineNuxtConfig({
  /** 模块 */
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxt/image', '@nuxtjs/device', '@nuxt/icon'],

  /** 插件 */
  plugins: [],

  /** 自动引入其他文件夹 */
  // imports: {
  //   dirs: ['./configs'],
  // },

  /** 开发工具 */
  devtools: { enabled: true },

  app: {
    // 静态资源路径
    cdnURL: process.env.NUXT_APP_CDN_URL,
  },

  /** 全局样式文件 */
  css: ['normalize.css', '~/assets/styles/main.scss'],

  /** 运行时变量 */
  runtimeConfig: {
    // 只能在服务端访问
    serverOnly: 'server', // 这个值会被环境变量中的 NUXT_SERVER_ONLY 覆盖
    // public 下的内容可以在客户端和服务端访问
    public: {
      // API 接口地址
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  // srcDir: 'app/',
  // future: {
  //   compatibilityVersion: 4, // 启用 Nuxt 4 版本后，目录结构会发生改变；暂时使用 Nuxt 3 版本，不使用 app 或 src 文件夹
  // },

  compatibilityDate: '2024-04-03',

  /** Nitro 服务器配置 */
  nitro: {
    prerender: {
      ignore: [
        (route) => {
          const regex = /.*\/(components|configs|modules|utils)(\/|$)/
          return regex.test(route)
        },
      ],
    },
  },

  /** Vite 配置 */
  vite: {
    plugins: [
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [
          path.resolve(process.cwd(), 'assets/icons'),
          path.resolve(process.cwd(), 'assets/logos'),
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // 使用新版 sass 编译器
          additionalData: '@use "~/assets/styles/variables.scss" as *;', // 引入全局样式变量
        },
      },
    },
  },

  /** 钩子 */
  hooks: {
    'pages:extend'(pages) {
      // 新增路由
      pages.push({
        name: 'HomeChannel',
        path: '/:channel(channel[1-9]\\d?)',
        file: '~/pages/index.vue',
      })
    },
  },

  /** Nuxt Img 模块 */
  // image: {
  //   dir: 'assets/images', // 图片存放目录
  // },

  /** Nuxt Device 模块 */
  // device: {
  //   refreshOnResize: true,

  // },

  /** Nuxt ESLint 模块 */
  eslint: {
    config: {
      stylistic: true, // 启用样式校验
    },
  },

  /** Nuxt Icon 模块 */
  icon: {
    customCollections: [
      {
        prefix: 'local',
        dir: './assets/icons',
      },
    ],
  },
})

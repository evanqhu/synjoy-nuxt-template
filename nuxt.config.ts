/**
 * https://nuxt.com/docs/api/configuration/nuxt-config
 */
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineNuxtConfig({
  /** 模块 */
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/device',
    '@nuxt/icon',
    '@element-plus/nuxt',
  ],

  /** 插件 */
  plugins: [],

  /** 自动导入 */
  imports: {
    dirs: ['api'], // api 文件夹顶层路径中的资源会被自动导入
  },

  /** 自动引入其他文件夹 */
  // imports: {
  //   dirs: ['./configs'],
  // },

  /** 开发工具 */
  devtools: { enabled: true },

  app: {
    // 静态资源路径
    cdnURL: process.env.NUXT_APP_CDN_URL,
    // baseURL: '/prefix', // 设置后，所有路由都会带上这个前缀，部署在子路径时需要设置
  },

  /** 全局样式文件 */
  css: ['~/assets/styles/main.scss'],

  /** 运行时变量 */
  runtimeConfig: {
    // 只能在服务端访问
    // serverOnly: 'server', // 这个值会被环境变量中的 NUXT_SERVER_ONLY 覆盖
    // public 下的内容可以在客户端和服务端访问
    public: {
      // API 接口地址
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  /** 服务器路由渲染规则 */
  // 更正：这些页面中包含动态内容，比如 url 等，需要根据客户端请求的 host 来决定，因此无法在构建时生成，只能通过服务端渲染来实现。
  // routeRules: {
  //   '/privacy-policy': { prerender: true },
  //   '/terms-of-service': { prerender: true },
  // },

  /** 实验性配置 */
  experimental: {
    inlineRouteRules: true, // 启用后可以在路由组件中使用 defineRouteRules() 配置 prerender
  },

  // srcDir: 'app/',
  // future: {
  //   compatibilityVersion: 4, // 启用 Nuxt 4 版本后，目录结构会发生改变；暂时使用 Nuxt 3 版本，不使用 app 或 src 文件夹
  // },

  compatibilityDate: '2024-04-03',

  /** Nitro 服务器配置 */
  // nitro: {
  //   prerender: {
  //     ignore: [
  //       (route) => {
  //         const regex = /.*\/(components|configs|modules|utils)(\/|$)/
  //         return regex.test(route)
  //       },
  //     ],
  //   },
  // },

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
    esbuild: process.env.NODE_ENV === 'production'
      ? {
        // 打包时移除 console.log
          pure: process.env.NUXT_DROP_CONSOLE === 'true' ? ['console.log'] : [],
          // 打包时移除 debugger
          drop: ['debugger'],
          // 打包时移除所有注释
          legalComments: 'none',
        }
      : undefined,
    css: {
      preprocessorOptions: {
        // 引入全局样式变量
        scss: { additionalData: '@use "~/assets/styles/variables.scss" as *;' },
      },
    },
  },

  /** 钩子 */
  hooks: {
    // 'pages:extend'(pages) {
    //   // 新增路由
    //   pages.push(
    //     {
    //       name: 'HomeChannel',
    //       path: '/:channel(channel[1-9]\\d?)',
    //       file: '~/pages/index.vue',
    //     },
    //     {
    //       name: 'DetailChannel',
    //       path: '/:channel(channel[1-9]\\d?)/detail',
    //       file: '~/pages/detail.vue',
    //     })
    // },
  },
  /** Element Plus 配置 */
  elementPlus: {
    importStyle: 'scss',
    // themes: ['dark'],
  },

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

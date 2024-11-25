/**
 * https://nuxt.com/docs/api/configuration/nuxt-config
 */
export default defineNuxtConfig({
  /** 模块 */
  modules: ['@nuxt/eslint', '@pinia/nuxt', 'nuxt-icons', '@nuxt/image', '@nuxtjs/device'],

  /** 插件 */
  plugins: [],

  /** 自动引入其他文件夹 */
  // imports: {
  //   dirs: ['./configs'],
  // },

  /** 开发工具 */
  devtools: { enabled: true },

  app: {
    // 打包路径
    baseURL: process.env.NUXT_APP_BASE_URL,
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
      baseURL: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },

  // srcDir: 'app/',
  // future: {
  //   compatibilityVersion: 4, // 启用 Nuxt 4 版本后，目录结构会发生改变；暂时使用 Nuxt 3 版本，不使用 app 或 src 文件夹
  // },

  compatibilityDate: '2024-04-03',

  /** Vite 配置 */
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // 使用新版 sass 编译器
          additionalData: '@use "~/assets/styles/variables.scss" as *;', // 引入全局样式变量
        },
      },
    },
  },

  /** ESLint 配置 */
  eslint: {
    config: {
      stylistic: true, // 启用样式校验
    },
  },

  /** NuxtImg 配置 */
  // image: {
  //   dir: 'assets/images', // 图片存放目录
  // },
})

/**
 * https://nuxt.com/docs/api/configuration/nuxt-config
 */
export default defineNuxtConfig({
  /** 模块 */
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    '@element-plus/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  /** 自动导入 */
  imports: {
    dirs: ['api'], // api 文件夹顶层路径中的资源会被自动导入
  },
  /** 开发工具 */
  devtools: { enabled: true },
  app: {
    // cdnURL: process.env.NUXT_APP_CDN_URL, // 静态资源路径
  },
  /** 全局样式文件 */
  css: ['~/assets/styles/main.scss', '~/assets/styles/tailwind.css'],
  /** 运行时变量 */
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE, // API 接口地址
      // googleClientId: process.env.NUXT_GOOGLE_CLIENT_ID, // 谷歌登录 ID
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  /** Vite 配置 */
  vite: {
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
        scss: {
          additionalData: '@use "~/assets/styles/element.scss" as element;',
        },
      },
    },
    server: {
      allowedHosts: ['.ngrok-free.app'], // 允许访问 ngrok 内网穿透代理的域名
    },
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
        dir: './app/assets/icons',
      },
      {
        prefix: 'logo',
        dir: './public/logos',
      },
    ],
  },
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  devtools: { enabled: true },
  // srcDir: 'app/',
  // future: {
  //   compatibilityVersion: 4, // 启用 Nuxt 4 版本后，目录结构会发生改变；暂时使用 Nuxt 3 版本，不使用 app 或 src 文件夹
  // },
  compatibilityDate: '2024-04-03',
  eslint: {
    config: {
      stylistic: true, // 启用样式校验
    },
  },
})

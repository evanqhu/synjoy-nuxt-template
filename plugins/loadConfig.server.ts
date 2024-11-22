// 将 nuxtApp 上下文中的网站配置注入到 Pinia Store 中
export default defineNuxtPlugin((nuxtApp) => {
  // 获取 Pinia Store
  const appStore = useAppStore()

  // 从服务端上下文中注入配置到 Pinia
  if (nuxtApp.ssrContext?.event.context.config) {
    appStore.webConfig = nuxtApp.ssrContext.event.context.config
  }
})

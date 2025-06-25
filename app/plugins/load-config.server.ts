/**
 * @name 服务端插件
 * @description 将 nuxtApp 上下文中的网站配置注入到 Pinia Store 中
 */
import type { Pinia } from 'pinia'

// 将 nuxtApp 上下文中的网站配置注入到 Pinia Store 中
export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia
  // 获取 Pinia Store 实例
  const appStore = useAppStore(pinia)

  // 从服务端上下文中注入配置到 Pinia
  appStore.webConfig = nuxtApp.ssrContext?.event.context.config || {}
})

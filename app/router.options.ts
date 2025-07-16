/**
 * @name 自定义路由
 * @description 为所有路由添加可选的 channel1～99 前缀
 * @description 无需在每个路由组件中使用 definePageMeta 来重新定义路由了
 */
import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  routes: (_routes) => {
    const routes = [..._routes]

    // 为所有路由添加可选的 channel 前缀
    routes.forEach((route) => {
      // 检查路径中是否已经包含 channel 参数
      if (!route.path.includes(':channel(channel[1-9]')) {
        route.path = `/:channel(channel[1-9]\\d?)?${route.path}`
      }
    })

    return routes
  },
}

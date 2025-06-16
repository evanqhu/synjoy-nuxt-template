/**
 * 自定义路由跳转方法，用于在路由跳转时保留当前 channel 参数和查询参数
 */
// 定义路由参数类型
import type { RouteLocationRaw } from 'vue-router'

export const useCustomRouting = () => {
  const route = useRoute()

  /** 路由跳转时携带 channel params 和 query 参数 */
  const smartNavigate = (to: RouteLocationRaw, options?: Record<string, any>) => {
    const fullChannel = route.params.channel ? `/${route.params.channel}` : '' // /channel12

    // 如果是字符串，则直接跳转
    if (typeof to === 'string') {
      const fullPath = `${fullChannel}${to}`
      return navigateTo({
        path: fullPath,
        query: route.query,
      }, options)
    }
    // 如果是对象
    else {
      if ('name' in to) {
        return navigateTo({
          ...to,
          params: {
            ...route.params,
            ...to?.params,
          },
          query: {
            ...route.query,
            ...to?.query,
          },
        }, options)
      }
      else {
        const { path, query, ...rest } = to
        const fullPath = `${fullChannel}${path}`
        return navigateTo({
          path: fullPath,
          query: {
            ...query,
            ...route.query,
          },
          ...rest,
        }, options)
      }
    }
  }

  /** 获取包含 channel params 和 query 参数的跳转链接 */
  const getHref = (path: string) => {
    const fullChannel = route.params.channel ? `/${route.params.channel}` : '' // /channel12
    const queryString = new URLSearchParams(route.query as Record<string, string>).toString()
    const fullQueryString = queryString ? `?${queryString}` : ''
    return `${fullChannel}${path}${fullQueryString}`
  }

  return { smartNavigate, getHref }
}

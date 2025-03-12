/**
 * 自定义路由跳转方法，用于在路由跳转时保留当前 channel 参数和查询参数
 */
// 定义路由参数类型
import type { RouteLocationRaw } from 'vue-router'

export const useCustomRouting = () => {
  const router = useRouter()
  const { params, query } = router.currentRoute.value
  const { channel } = params
  const queryString = new URLSearchParams(query as Record<string, string>).toString()
  const fullChannel = channel ? `/${channel}` : '' // /channel12
  const fullQueryString = queryString ? `?${queryString}` : '' // ?db=1

  /** 路由跳转时携带 channel params 和 query 参数 */
  const smartNavigate = (to: RouteLocationRaw, options?: Record<string, any>) => {
    // 如果是字符串，则直接跳转
    if (typeof to === 'string') {
      const fullPath = `${fullChannel}${to}`
      return navigateTo({
        path: fullPath,
        query,
      }, options)
    }
    // 如果是对象
    else {
      if ('name' in to) {
        return navigateTo({
          ...to,
          params,
          query: {
            ...to?.query,
            ...query,
          },
        }, options)
      }
      else {
        const fullPath = `${fullChannel}${to?.path}`
        return navigateTo({
          ...to,
          path: fullPath,
          query: {
            ...to?.query,
            ...query,
          },
        }, options)
      }
    }
  }

  /** 获取包含 channel params 和 query 参数的跳转链接 */
  const getHref = (path: string) => {
    return `${fullChannel}${path}${fullQueryString}`
  }

  return { smartNavigate, getHref }
}

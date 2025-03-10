/**
 * 自定义路由跳转方法，用于在路由跳转时保留当前 channel 参数和查询参数
 */
// 定义路由参数类型
type CustomRouteOptions = {
  path: string
  [key: string]: any
}
export const useCustomRouting = () => {
  const router = useRouter()
  const { params, query } = router.currentRoute.value
  const { channel } = params
  const queryString = new URLSearchParams(query as Record<string, string>).toString()
  const fullChannel = channel ? `/${channel}` : ''
  const fullQueryString = queryString ? `?${queryString}` : ''

  /** 路由跳转时携带 channel params 和 query 参数 */
  const smartNavigate = (to: string | CustomRouteOptions, options?: Record<string, any>) => {
    const basePath = typeof to === 'string' ? to : to.path
    const fullPath = `${fullChannel}${basePath}${fullQueryString}`

    if (typeof to === 'string') {
      return navigateTo({
        path: fullPath,
      }, options)
    }
    else {
      return navigateTo({
        ...to,
        path: fullPath,
      }, options)
    }
  }

  /** 获取包含 channel params 和 query 参数的跳转链接 */
  const getHref = (path: string) => {
    return `${fullChannel}${path}${fullQueryString}`
  }

  return { smartNavigate, getHref }
}

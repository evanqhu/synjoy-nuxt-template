/**
 * 自定义路由跳转方法，用于在路由跳转时保留当前频道参数和查询参数
 */
export const useCustomRouting = () => {
  const router = useRouter()
  const { params, query } = router.currentRoute.value
  const { channel } = params
  const queryString = new URLSearchParams(query as Record<string, string>).toString()
  const fullChannel = channel ? `/${channel}` : ''
  const fullQueryString = queryString ? `?${queryString}` : ''

  const customPush = (path: string) => {
    navigateTo(`${fullChannel}${path}${fullQueryString}`)
  }

  const getHref = (path: string) => {
    return `${fullChannel}${path}${fullQueryString}`
  }

  return { customPush, getHref }
}

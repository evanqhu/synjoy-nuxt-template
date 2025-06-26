/**
 * @name 自定义路由跳转方法
 * @description 用于在路由跳转时保留当前 channel(params) 参数和 db(query) 参数
 */
import type { RouteLocationRaw } from 'vue-router'

/** 只保留 db 字段的 query 参数 */
function pickDbQuery(query: Record<string, any>) {
  return query && query.db ? { db: query.db } : {}
}

export function useCustomRouting(customRoute?: ReturnType<typeof useRoute> | any) {
  const route = customRoute || useRoute()

  /** 路由跳转时携带 channel params 和 db query 参数 */
  const smartNavigate = (to: RouteLocationRaw, options?: Record<string, any>) => {
    const fullChannel = route.params.channel ? `/${route.params.channel}` : '' // /channel12

    // 如果是字符串，则直接跳转
    if (typeof to === 'string') {
      const fullPath = `${fullChannel}${to}`
      return navigateTo({
        path: fullPath,
        query: pickDbQuery(route.query),
      }, options)
    }
    // 如果是对象
    else {
      if ('name' in to) {
        const { params, query, ...rest } = to
        return navigateTo({
          ...rest,
          params: {
            ...(route.params.channel ? { channel: route.params.channel } : {}),
            ...params,
          },
          query: {
            ...pickDbQuery(route.query),
            ...query,
          },
        }, options)
      }
      else {
        const { path, query, ...rest } = to
        const fullPath = `${fullChannel}${path}`
        return navigateTo({
          ...rest,
          path: fullPath,
          query: {
            ...pickDbQuery(route.query),
            ...query,
          },
        }, options)
      }
    }
  }

  /** 获取包含 channel params 和 db query 参数的跳转链接 */
  const getHref = (path: string) => {
    const fullChannel = route.params.channel ? `/${route.params.channel}` : '' // /channel12
    const dbQuery = pickDbQuery(route.query)
    const queryString = new URLSearchParams(dbQuery as Record<string, string>).toString()
    const fullQueryString = queryString ? `?${queryString}` : ''
    return `${fullChannel}${path}${fullQueryString}`
  }

  return { smartNavigate, getHref }
}

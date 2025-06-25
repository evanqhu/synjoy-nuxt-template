/**
 * @name 重定向中间件
 * @description 如果请求的 host 以 www. 开头，则重定向到非 www 的 host
 */
import type { H3Event } from 'h3'
import { getHost } from '../utils/index'

export default defineEventHandler((event: H3Event) => {
  const host = getHost(event)
  if (!host.startsWith('www.')) return

  // 构造去除 www 的 host
  const nonWwwHost = host.replace(/^www\./, '')

  // 获取原始请求 URL
  const url = getRequestURL(event)
  url.host = nonWwwHost

  // 301 重定向到非 www 域名
  return sendRedirect(event, url.toString(), 301)
})

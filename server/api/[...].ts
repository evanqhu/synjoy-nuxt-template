/**
 * @name 通过服务端转发请求
 */
import type { H3Event } from 'h3'
import { joinURL } from 'ufo'

export async function defineEventHandler(event: H3Event) {
  const runtimeConfig = useRuntimeConfig()
  const proxyUrl = runtimeConfig.public.apiBase || ''

  // 替换开头 的/api，用 正则表达式
  const path = event.path.replace(/^\/api/, '')
  const target = joinURL(proxyUrl, path)

  return proxyRequest(event, target)
}

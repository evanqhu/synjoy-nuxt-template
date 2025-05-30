/**
 * 所有请求都通过服务端进行转发
 */
import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  // Proxy url
  const runtimeConfig = useRuntimeConfig()
  const proxyUrl = runtimeConfig.public.apiBase || ''
  // console.log('🚀🚀🚀 proxyUrl: ', proxyUrl)

  // check the path
  // 替换开头 的/api，用 正则表达式

  const path = event.path.replace(/^\/api/, '')
  const target = joinURL(proxyUrl, path)
  // console.log('🚀🚀🚀 target: ', target)

  // proxy it
  return proxyRequest(event, target)
})

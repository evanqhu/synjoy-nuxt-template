/**
 * 用于本地开发环境代理
 */
import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  // console.info('🚀🚀🚀 event method: ', event.method)
  // console.info('🚀🚀🚀 event path: ', event.path)
  // console.info('🚀🚀🚀 event headers: ', JSON.stringify(event.headers))
  // Proxy url
  const proxyUrl = process.env.DEV_PROXY_URL || ''

  // check the path
  // 替换开头 的/api，用 正则表达式

  const path = event.path.replace(/^\/api/, '')
  const target = joinURL(proxyUrl, path)
  // console.log('🚀🚀🚀 target: ', target)

  // proxy it
  return proxyRequest(event, target)
})

/**
 * 用于本地开发环境代理
 */
import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  // console.log('🚀🚀🚀🚀🚀🚀 event method: ', event.method)
  // console.log('🚀🚀🚀 event path: ', event.path)
  // console.log('🚀🚀🚀 event headers: ', event.headers)
  // Proxy url
  const proxyUrl = 'https://jsonplaceholder.typicode.com'

  // check the path
  // 替换开头 的/api，用 正则表达式

  const path = event.path.replace(/^\/api/, '')
  const target = joinURL(proxyUrl, path)
  // console.log('🚀🚀🚀 target: ', target)

  // proxy it
  return proxyRequest(event, target)
})

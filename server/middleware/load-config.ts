/**
 * @name 加载配置中间件
 * @description 根据请求的 host，加载对应的配置到 nuxtApp 的上下文中，即 event.context.config
 */
import { getHost } from '../utils/index'
import webConfigs from '~/web-configs'

export default defineEventHandler((event) => {
  const host = getHost(event)
  const config = webConfigs[host] || webConfigs.localhost
  event.context.config = config

  // 处理 /ads.txt 请求
  if (event.node.req.url === '/ads.txt') {
    event.node.res.setHeader('Content-Type', 'text/plain')
    event.node.res.end(config.adSense?.ads || '')
    return
  }
})

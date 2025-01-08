/**
 * 服务器中间件
 * 根据请求的 host，加载对应的配置到 nuxtApp 的上下文中
 */
import webConfigs from '~/configs/web-configs'

export default defineEventHandler((event) => {
  // console.log('🚀🚀🚀 process.env.NODE_ENV: ', process.env.NODE_ENV)

  const originHost = getHeader(event, 'host')?.split(':')[0] || 'localhost'
  const host = originHost.replace(/^www\./, '')

  // console.log('🚀🚀🚀 请求的 host: ', host)

  const config = webConfigs[host] || webConfigs.localhost

  // 将配置注入到响应的上下文中
  event.context.config = config

  /** 处理 ads.txt 请求 */
  const url = event.node.req.url
  // console.log('🚀🚀🚀 请求的 url: ', url)

  // 如果请求的路径是 /ads.txt
  if (url === '/ads.txt') {
    // 设置响应类型为纯文本
    event.node.res.setHeader('Content-Type', 'text/plain')

    // 返回自定义的 ads.txt 内容
    event.node.res.end(config.adSense?.ads)
  }
})

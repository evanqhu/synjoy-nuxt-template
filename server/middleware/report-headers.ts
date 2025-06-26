/**
 * @name 上报中间件
 * @description 上报请求的 header 信息到后端的 /web/report 接口，用于统计请求来源
 */
import type { H3Event } from 'h3'
import { getHost } from '../utils/index'

export default defineEventHandler((event: H3Event) => {
  // 只在生产环境上报
  if (process.env.NODE_ENV !== 'production') return

  const url = event.node.req.url
  if (!url || url.includes('.')) return

  const host = getHost(event)
  const data = {
    dt: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    host,
    path: url,
    timestamp: Date.now(),
    ...event.node.req.headers,
  }

  // 异步上报，不阻塞主流程
  void $fetch('http://data-tr.videodownloader.software/web/report', {
    method: 'POST',
    body: data,
  }).catch((error) => {
    // 仅打印简要错误信息
    console.error('Error sending data to /web/report:', error)
  })
})

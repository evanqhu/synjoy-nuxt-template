/**
 * @name 上报路由切换
 * @description 在路由切换时上报
 */
import type { H3Event } from 'h3'
import { getHost } from '../utils/index'

export async function defineEventHandler(event: H3Event) {
  const host = getHost(event)
  const url = event.node.req.url

  // 只上报非静态资源请求
  if (!url?.includes('.')) {
    const data = {
      dt: new Date().toISOString().split('T')[0], // 当前日期，格式为 YYYY-MM-DD
      host: host,
      path: url,
      timestamp: Date.now(),
      ...event.node.req.headers,
    }
    // 异步地发送 POST 请求到后端的 /abc 接口
    try {
      // 使用 $fetch 发送 POST 请求
      const result: any = await $fetch('http://data-tr.videodownloader.software/web/report', {
        method: 'POST',
        body: data,
      })
      if (result.success) {
        return { success: true, data: result }
      }
      else {
        return { success: false, data: result }
      }
    }
    catch (error) {
      // 处理错误，但不影响后续的渲染
      console.error('Error sending data to /web/report:', error)
      return { success: false, data: error }
    }
  }
}

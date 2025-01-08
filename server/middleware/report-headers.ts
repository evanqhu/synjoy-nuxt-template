/**
 * header 上报
 */
export default defineEventHandler(async (event) => {
  const originHost = getHeader(event, 'host')?.split(':')[0] || 'localhost'
  const host = originHost.replace(/^www\./, '')
  const url = event.node.req.url
  console.log('🚀🚀🚀 请求的 url: ', url)

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
      await $fetch('http://data-tr.videodownloader.software/web/report', {
        method: 'POST',
        body: data,
      })
    }
    catch (error) {
      // 处理错误，但不影响后续的渲染
      console.error('Error sending data to /web/report:', error)
    }
  }
})

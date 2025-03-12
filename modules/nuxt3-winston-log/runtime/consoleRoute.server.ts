/**
 * 4. 作为 Nuxt3 的服务端插件，用于监控和记录 HTTP 请求信息
 * 通过 Nitro 的钩子系统，在每次页面渲染时捕获请求信息
 * 过滤掉 Nuxt 内部资源请求（ _nuxt 路径）
 * 记录请求信息
 */
// 导入 Nitro 应用插件类型
import type { NitroAppPlugin } from 'nitropack'

// 导出一个 Nitro 应用插件
// 这个插件用于记录所有非 _nuxt 路径的请求信息
export default <NitroAppPlugin> function (nitroApp) {
  // 注册一个 render:html 钩子
  // 这个钩子会在每次渲染 HTML 时触发
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    // 请求的主机地址
    const host = getHeader(event, 'host')
    // 请求的路径
    const path = event.path
    // 请求方法（GET, POST 等）
    const method = event.method
    // 请求头信息
    const headers = event.node.req.headers

    // 只记录非 _nuxt 路径的请求
    // _nuxt 路径通常是 Nuxt.js 的内部资源请求，不需要记录
    if (path && !path.includes('_nuxt')) {
      const logData = {
        host,
        path,
        method,
        headers,
        statusCode: event.node.res.statusCode,
      }
      // console.info(`📝 Route Request: ${JSON.stringify(logData)}`)
      // // 打印请求的路径名
      // console.info(`📝 host=${host}`)
      // // 打印完整的 URL 路径
      // console.info(`📝 url=${path}`)
      // // 打印请求方法
      // console.info(`📝 method=${method}`)
      // // 打印请求头信息（转换为 JSON 字符串）
      // console.info(`📝 headers=${JSON.stringify(headers)}`)
    }
  })

  // 被注释掉的代码：响应渲染钩子
  // 可以用于记录响应相关的信息
  // nitroApp.hooks.hook("render:response", (response, { event }) => {
  //   console.log("render:response");
  // });
}

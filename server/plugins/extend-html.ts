/**
 * 您可以通过添加一个注册钩子的 Nitro 插件来完全控制 HTML 模板。
 * render:html 钩子的回调函数允许您在将 HTML 发送到客户端之前对其进行修改。
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    // 设置 html 的 lang 属性
    html.htmlAttrs.push('lang="en"')
    // html.htmlAttrs.push('class="dark"')
    // console.log('🚀🚀🚀 event.context.config: ', event.context.config)
    // 注入 adScore 脚本
    const config = event.context.config
    if (config?.adScore) {
      html.head.push(config.adScore)
    }
  })
  // // You can also intercept the response here.
  // nitroApp.hooks.hook('render:response', (response, { event }) => {
  //   console.log("🚀🚀🚀  response: ", response);
  // })
})

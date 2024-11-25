// 您可以通过添加一个注册钩子的 Nitro 插件来完全控制 HTML 模板。
// render:html 钩子的回调函数允许您在将 HTML 发送到客户端之前对其进行修改。
// export default defineNitroPlugin((nitroApp) => {
//   nitroApp.hooks.hook('render:html', (html, { event }) => {
//     console.log("🚀🚀🚀  html: ", html);
//     html.head.push(
//       `<meta name="description" content="My custom description" />`,
//     )
//   })
//   // You can also intercept the response here.
//   nitroApp.hooks.hook('render:response', (response, { event }) => {
//     console.log("🚀🚀🚀  response: ", response);
//   })
// })

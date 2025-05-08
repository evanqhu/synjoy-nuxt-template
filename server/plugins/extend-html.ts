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

    // 注入 fbq 脚本
    if (config?.fbq) {
      html.head.push(`
        <script>
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${config.fbq}');
          fbq('track', 'PageView');
        </script>
        <noscript>
          <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${config.fbq}&ev=PageView&noscript=1"/>
        </noscript>`)
    }
  })
  // // You can also intercept the response here.
  // nitroApp.hooks.hook('render:response', (response, { event }) => {
  //   console.log("🚀🚀🚀  response: ", response);
  // })
})

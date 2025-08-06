import type { WebConfig } from '~/web.configs'

/**
 * @name 扩展模板
 * @description 在 HTML 模板中注入脚本，如 adScore 和 fbq 脚本
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    // 获取配置
    const config = event.context.config as WebConfig

    // 设置 lang 属性
    html.htmlAttrs.push('lang="en"')

    // 设置 class 属性
    // html.htmlAttrs.push('class="dark"')

    // 设置 favicon
    html.head.push(`
      <link rel="icon" href="/logos/${config.webLogo}.svg" />
    `)

    // 只在生产环境注入脚本
    if (process.env.NODE_ENV !== 'production') return

    // 注入 adSense 脚本
    if (config.adSense?.clientId) {
      html.head.push(`
        <script
          async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.adSense.clientId}"
          crossorigin="anonymous">
        </script>`,
      )
    }

    // 注入 adExchange 脚本
    if (config.adExchange) {
      html.head.push(`
        <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
      `)
    }

    // 注入 ttq 脚本 (TikTok Pixel Track)
    if (config.ttq) {
      html.head.push(`
        <script>
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
            ttq.load('${config.ttq}');
            ttq.page();
          }(window, document, 'ttq');
        </script>`,
      )
    }

    // 注入 fbq 脚本 (Facebook Pixel Track)
    if (config.fbq) {
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
        </noscript>`,
      )
    }

    // 注入 bigo 脚本 (Bigo Pixel Track)
    if (config.bigo) {
      html.head.push(`
        <script>
          window.bgdataLayer = window.bgdataLayer || [];
          function bge(){bgdataLayer.push(arguments);}
          bge('init', "${config.bigo}");
        </script>
        <script async src="https://api.topnotchs.site/ad/events.js?pixel_id=${config.bigo}"></script>
      `)
    }

    // 注入 kwai 脚本 (Kwai Track)
    if (config.kwai) {
      html.head.push(`
        <script>
          !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.install=t():e.install=t()}(window,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var o=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var o,r=0,i=t.length;r<i;r++)!o&&r in t||(o||(o=Array.prototype.slice.call(t,0,r)),o[r]=t[r]);return e.concat(o||Array.prototype.slice.call(t))};Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t,n){var o,i=e.createElement("script");i.type="text/javascript",i.async=!0,i.src=t,n&&(i.onerror=function(){r(e,n)});var a=e.getElementsByTagName("script")[0];null===(o=a.parentNode)||void 0===o||o.insertBefore(i,a)};!function(e,t,n){e.KwaiAnalyticsObject=n;var i=e[n]=e[n]||[];i.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];var a=function(e,t){e[t]=function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];var i=o([t],n,!0);e.push(i)}};i.methods.forEach((function(e){a(i,e)})),i.instance=function(e){var t,n=(null===(t=i._i)||void 0===t?void 0:t[e])||[];return i.methods.forEach((function(e){a(n,e)})),n},i.load=function(e,o){var a="//s15-def.ap4r.com/kos/s101/nlav11187/pixel/events.js";i._i=i._i||{},i._i[e]=[],i._i[e]._u=a,i._t=i._t||{},i._t[e]=+new Date,i._o=i._o||{},i._o[e]=o||{};var c="?sdkid=".concat(e,"&lib=").concat(n);r(t,a+c,"https://s16-11187.ap4r.com/kos/s101/nlav11187/pixel/events.js"+c)}}(window,document,"kwaiq")}])}));
        </script>
        <script>
          kwaiq.load('${config.kwai}');
          kwaiq.page();
        </script>
      `)
    }

    // 注入 adScore 脚本
    if (config.adScore) {
      html.head.push(`
        <script
          async
          src="//c.adsco.re"
          type="text/javascript"
          onload='AdscoreInit("${config.adScore}",
          {sub_id: "${config.webUrl}",async_callback: 1});'>
        </script>`,
      )
    }

    // 注入谷歌登录脚本
    // if (config.googleClientId) {
    //   html.head.push(`
    //     <script async src="https://accounts.google.com/gsi/client"></script>
    //   `)
    // }
  })
})

/** 加载全局脚本 */
export const loadGlobalScripts = (webConfig: WebConfig) => {
  const runtimeConfig = useRuntimeConfig()
  const clientId = webConfig.adSense?.clientId
  const isAdx = !!webConfig.adExchange

  const globalScripts: Array<object> = [] // 全局脚本

  // 1. 是 Google adSense 广告且是生产环境，则加载 adSense 广告脚本
  if (clientId && process.env.NODE_ENV === 'production') {
    globalScripts.push(getAdSenseScript(clientId))
  }
  // 2. 是 Google adx 广告则加载 adx 广告脚本
  if (isAdx) {
    globalScripts.push(getAdxScript())
  }
  // 3. TikTok Pixel 追踪
  if (webConfig.pixelTrackKey) {
    globalScripts.push(getPixelTrackScript(webConfig.pixelTrackKey))
  }
  // 4. 谷歌登录脚本
  if (runtimeConfig.public.googleClientId) {
    globalScripts.push(getGoogleLoginScript())
  }

  return globalScripts
}

/** 获取 Google AdSense 广告脚本 */
export const getAdSenseScript = (clientId: string) => {
  return {
    src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`,
    crossorigin: 'anonymous' as const,
    async: true,
  }
}

/** 获取 Google Ad Exchange 广告脚本 */
export const getAdxScript = () => {
  return {
    src: `https://securepubads.g.doubleclick.net/tag/js/gpt.js`,
    crossorigin: 'anonymous' as const,
    async: true,
  }
}

/** 获取 TikTok Pixel 追踪脚本 */
export const getPixelTrackScript = (pixelTrackKey: string) => {
  return {
    innerHTML: `!function (w, d, t) {
      w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || []; ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"], ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } }; for (var i = 0; i < ttq.methods.length; i++)ttq.setAndDefer(ttq, ttq.methods[i]); ttq.instance = function (t) { for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)ttq.setAndDefer(e, ttq.methods[n]); return e }, ttq.load = function (e, n) { var i = "https://analytics.tiktok.com/i18n/pixel/events.js"; ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = i, ttq._t = ttq._t || {}, ttq._t[e] = +new Date, ttq._o = ttq._o || {}, ttq._o[e] = n || {}; var o = document.createElement("script"); o.type = "text/javascript", o.async = !0, o.src = i + "?sdkid=" + e + "&lib=" + t; var a = document.getElementsByTagName("script")[0]; a.parentNode.insertBefore(o, a) };
      ttq.load("${pixelTrackKey}");
      ttq.page();
    }(window, document, 'ttq');`,
  }
}

/** 谷歌登录脚本 */
export const getGoogleLoginScript = () => {
  return {
    src: 'https://accounts.google.com/gsi/client',
    async: true,
  }
}

/** 字符串首字母大写 */
export const capitalizeFirstLetter = (str?: string) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

<!-- 入口组件 -->
<script lang="ts" setup>
console.log('🚀🚀🚀 NODE_ENV: ', process.env.NODE_ENV)
/** 启用 Firebase */
useFirebase()
/** 监听广告点击 */
// useAdsClickListener()

const appStore = useAppStore()
const { webConfig } = appStore
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
globalScripts.push(getGoogleLoginScript())

useSeoMeta({
  title: webConfig.webTitle,
  titleTemplate: '%s | ' + webConfig.webTitleTemplate,
  description: webConfig.webDescription,
  ogTitle: webConfig.webTitle,
  ogDescription: webConfig.webDescription,
})

useHead({
  script: [...globalScripts],
  link: [
    {
      rel: 'icon',
      href: (await import(`~/assets/logos/${webConfig.webLogo}.svg`)).default,
    },
  ],
}, { mode: 'client' })
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
</style>

<!-- 入口组件 -->
<script lang="ts" setup>
import { webDescription } from '~/configs/web-configs'

useAdsClickListener()
const appStore = useAppStore()
const { webConfig } = appStore
const clientId = webConfig.adSense?.clientId
const isAdx = !!webConfig.adSense
const globalScripts = [] // 全局脚本

console.log('🚀🚀🚀 NODE_ENV: ', process.env.NODE_ENV)

// 是 Google adSense 广告且是生产环境，则加载 adSense 广告脚本
if (clientId && process.env.NODE_ENV === 'production') {
  globalScripts.push(getAdSenseScript(clientId))
}
// 是 Google adx 广告则加载 adx 广告脚本
if (isAdx) {
  globalScripts.push(getAdxScript())
}
// TikTok Pixel 追踪
if (webConfig.pixelTrackKey) {
  globalScripts.push(getPixelTrackScript(webConfig.pixelTrackKey))
}

useSeoMeta({
  title: webConfig.webTitle,
  titleTemplate: '%s | ' + webConfig.webTitleTemplate,
  description: webDescription,
  ogTitle: webConfig.webTitle,
  ogDescription: webDescription,
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
// 0. __nuxt 容器
#__nuxt {
  height: 100vh;
  width: 100vw;
}

// 1. 布局容器
.default-layout,
.legal-layout {
  width: 100%;
  height: 100%;
}

// 2. 网页主体容器 (header 和 footer 中间部分)
.app-main {
  padding-top: $header-height;
}

// 3. 网页内容容器 (限制版心宽宽度，设置内部 padding)
.app-content {
  max-width: $container-width;
  margin: 0 auto;
  padding: 1rem;

  // > 1200px
  @media screen and (min-width: $container-width) {
    padding: 1rem 0;
  }
}
</style>

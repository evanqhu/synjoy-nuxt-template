<!-- 入口组件 -->
<script lang="ts" setup>
import { webDescription } from '~/configs/web-configs'

const appStore = useAppStore()
const { webConfig } = appStore
const clientId = webConfig.adSense?.clientId
const isAdx = !!webConfig.adSense

useSeoMeta({
  title: webConfig.webTitle,
  titleTemplate: '%s | ' + webConfig.webTitleTemplate,
  description: webDescription,
  ogTitle: webConfig.webTitle,
  ogDescription: webDescription,
})
useHead({
  script: [
    ...(clientId && process.env.NODE_ENV === 'production'
      ? [{
          src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`,
          crossorigin: 'anonymous' as const,
          async: true,
        }]
      : []),
    ...(isAdx && process.env.NODE_ENV === 'production'
      ? [{
          src: `https://securepubads.g.doubleclick.net/tag/js/gpt.js`,
          crossorigin: 'anonymous' as const,
          async: true,
        }]
      : []),
  ],
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
.policies-layout {
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

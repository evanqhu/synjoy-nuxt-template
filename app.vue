<!-- 入口组件 -->
<script lang="ts" setup>
import { webDescription } from '~/configs/web-configs'

const appStore = useAppStore()
const { webConfig } = appStore
const clientId = webConfig.adSense?.clientId

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
#__nuxt {
  height: 100vh;
  width: 100vw;
}

.app-main {
  padding-top: $header-height;
  max-width: $container-width;
  margin: 0 auto;
}

.app-content {
  padding: 1rem;

  // > 1200px
  @media screen and (min-width: $container-width) {
    padding: 1rem 0;
  }
}
</style>

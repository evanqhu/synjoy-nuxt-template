<!-- 入口组件 -->
<script lang="ts" setup>
const appStore = useAppStore()
const { webConfig } = appStore

/** 网站图标 */
let iconHref = ''
try {
  iconHref = (await import(`~/assets/logos/${webConfig.appLogo}.svg`)).default
}
catch (error) {
  console.error('Failed to load app logo:', error)
  iconHref = '' // 设置为默认值或留空
}

// 加载谷歌广告脚本
useHead({
  title: webConfig.appTitle,
  meta: [
    {
      name: 'og:title',
      content: webConfig.appTitle,
    },
  ],
  script: [{
    src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${webConfig.adSense.clientId}`,
    crossorigin: 'anonymous',
    async: true,
  }],
  link: [
    {
      rel: 'icon',
      href: iconHref,
    },
  ],
})
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
</style>

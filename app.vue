<!-- 入口组件 -->
<script lang="ts" setup>
const appStore = useAppStore()
const { webConfig } = appStore

/** 网站图标 */
const iconHref = ref('')
try {
  iconHref.value = (await import(`~/assets/logos/${webConfig.appLogo}.svg`)).default
}
catch (error) {
  console.error('Failed to load app logo:', error)
  iconHref.value = '' // 设置为默认值或留空
}

useSeoMeta({
  title: webConfig.appTitle,
  description: 'app description',
  ogTitle: webConfig.appTitle,
})
useHead({
  script: [
    ...(webConfig.adSense?.clientId && process.env.NODE_ENV === 'production'
      ? [{
          src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${webConfig.adSense?.clientId}`,
          crossorigin: 'anonymous' as const,
          async: true,
        }]
      : []),
  ],
  link: [
    {
      rel: 'icon',
      href: iconHref,
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

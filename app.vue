<!-- 入口组件 -->
<script lang="ts" setup>
console.log('🚀🚀🚀 NODE_ENV: ', process.env.NODE_ENV)
/** 启用 Firebase */
useFirebase()
/** 监听广告点击 */
// useAdsClickListener()

const appStore = useAppStore()
const { webConfig } = appStore
const globalScripts = loadGlobalScripts(webConfig) // 全局脚本

useSeoMeta({
  title: webConfig.webTitle,
  titleTemplate: '%s | ' + webConfig.metaTitleTemplate,
  description: webConfig.metaDescription,
  ogTitle: webConfig.webTitle,
  ogDescription: webConfig.metaDescription,
})

useHead({
  script: [...globalScripts],
  link: [
    {
      rel: 'icon',
      href: (await import(`~/assets/logos/${webConfig.webLogo}.svg`))?.default,
    },
  ],
}, { mode: 'client' })
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
</style>

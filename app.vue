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
      href: (await import(`~/assets/logos/${webConfig.webLogo}.svg`))?.default,
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

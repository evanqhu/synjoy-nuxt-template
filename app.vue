<!-- 入口组件 -->
<script lang="ts" setup>
// const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const appStore = useAppStore()
const { webConfig } = appStore

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
})

onBeforeMount(() => {
  // 开启广告调试模式
  if (route.query.db) {
    appStore.toggleDebug(true)
  }
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

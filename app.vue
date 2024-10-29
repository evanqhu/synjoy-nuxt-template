<!-- 入口组件 -->
<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()

// 加载谷歌广告脚本
useHead({
  script: [{
    src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${runtimeConfig.public.googleClientId}`,
    crossorigin: 'anonymous',
    async: true,
  }],
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

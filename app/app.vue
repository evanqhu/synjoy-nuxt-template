<script lang="ts" setup>
/** 监听广告点击 */
useAdsClickListener()

const appStore = useAppStore()
const { webConfig } = appStore

useSeoMeta({
  title: webConfig.webTitle,
  titleTemplate: '%s | ' + webConfig.metaTitleTemplate,
  description: webConfig.metaDescription,
  ogTitle: webConfig.webTitle,
  ogDescription: webConfig.metaDescription,
})
</script>

<template>
  <NuxtLoadingIndicator color="var(--theme-color)" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

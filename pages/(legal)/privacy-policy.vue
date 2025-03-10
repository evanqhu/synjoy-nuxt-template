<!-- 隐私协议 -->
<script setup lang="ts">
definePageMeta({
  layout: 'legal',
  title: 'Privacy Policy',
})

const appStore = useAppStore()
const { webConfig } = appStore
</script>

<template>
  <div class="app-content">
    privacy policy
    <div>{{ webConfig.webTitle }}</div>
  </div>
</template>

<style lang="scss" scoped>
</style>

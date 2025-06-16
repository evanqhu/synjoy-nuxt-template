<!-- 首页 home -->
<script setup lang="ts">
const { data: homeContent } = await useAsyncData('homeContent', api.defaultApi.requestHomeContent)
console.log('🚀🚀🚀 homeContent: ', homeContent)
</script>

<template>
  <div class="app-wrapper">
    <div class="app-content">
      home
    </div>
  </div>
</template>

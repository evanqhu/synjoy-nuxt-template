<script setup lang="ts">
definePageMeta({
  path: '/:channel(channel[1-9]\\d?)?/detail',
})

// 防止出现水合错误
const timeNow = useState('timeNow', getNowTime)
</script>

<template>
  <div class="app-content">
    <div>detail</div>
    <br>
    <div>{{ timeNow }}</div>
  </div>
</template>

<style lang="scss" scoped>
</style>

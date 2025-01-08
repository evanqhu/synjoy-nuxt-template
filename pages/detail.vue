<script setup lang="ts">
defineOptions({
  name: 'DetailPage',
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

<script setup lang="ts">
import dayjs from 'dayjs'

useSeoMeta({
  title: 'Detail',
})

// 防止出现水合错误
const timeNow = useState('timeNow', () => dayjs().format('MMM D, YYYY, h:mm A'))
</script>

<template>
  <div class="app-content-wrapper">
    <div class="app-content">
      <div>detail</div>
      <br>
      <div>{{ timeNow }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

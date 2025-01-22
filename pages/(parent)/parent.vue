<script setup lang="ts">
definePageMeta({
  path: '/:channel(channel[1-9]\\d?)?/parent',
})
</script>

<template>
  <div>
    <div>parent</div>
    <NuxtPage />
  </div>
</template>

<style lang="scss" scoped>
</style>

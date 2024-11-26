<script setup lang="ts">
defineOptions({
  name: 'HomeDesktop',
})

defineProps({
  adSense: Object,
})
</script>

<template>
  <div class="home">
    <h1>This is the home desktop page</h1>
    <!-- <AdsbyGoogle :ads-attrs="adSense?.home_1" />
    <AdsbyGoogle :ads-attrs="adSense?.home_2" /> -->
  </div>
</template>

<style lang="scss" scoped></style>

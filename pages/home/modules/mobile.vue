<script setup lang="ts">
// definePageMeta({
//   validate: async () => false,
// })

interface Props {
  adSense: WebConfig['adSense']
}

defineProps<Props>()
</script>

<template>
  <div class="home">
    <h1>This is the home mobile page2</h1>
    <AdsbyGoogle :ads-attrs="adSense.home_1" />
    <AdsbyGoogle :ads-attrs="adSense.home_2" />
  </div>
</template>

<style lang="scss" scoped></style>

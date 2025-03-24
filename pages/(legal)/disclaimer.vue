<!-- 免责声明 -->
<script setup lang="ts">
useSeoMeta({
  title: 'Disclaimer',
})

const { webConfig } = useAppStore()
// {{ webConfig.webUrl }}
// {{ capitalizeFirstLetter(webConfig.webUrl) }}
// <a :href="`mailto:${webConfig.webEmail}`" class="mail">{{ webConfig.webEmail }}</a>
</script>

<template>
  <div class="legal-page app-content-wrapper">
    <div class="app-content">
      <h2 class="legal-title">
        Disclaimer
      </h2>
      <div class="term-list">
        <div class="term-item">
          <h3 class="term-title">
            1. lorem
          </h3>
          <p>
            lorem
          </p>
        </div>
        <div class="term-item">
          <h3 class="term-title">
            2. lorem
          </h3>
          <p>
            lorem
          </p>
          <ul>
            <li>
              lorem
            </li>
          </ul>
        </div>
        <p>
          lorem
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

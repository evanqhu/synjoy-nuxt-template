<!-- 服务条款 -->
<script setup lang="ts">
useSeoMeta({
  title: 'Terms of Service',
})

const { webConfig } = useAppStore()
// {{ webConfig.webUrl }}
// {{ capitalizeFirstLetter(webConfig.webUrl) }}
// <a :href="`mailto:${webConfig.webEmail}`" class="mail">{{ webConfig.webEmail }}</a>
</script>

<template>
  <div class="legal-page">
    <div class="app-content-wrapper">
      <div class="app-content">
        <h2 class="legal-title">
          Terms of Service
        </h2>
        <p>
          lorem
        </p>
        <div class="term-list">
          <div class="term-item">
            <h3 class="term-title">
              1. lorem
            </h3>
            <p>lorem</p>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              2. lorem
            </h3>
            <p>lorem</p>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              3. lorem
            </h3>
            <ul>
              <li>
                lorem
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

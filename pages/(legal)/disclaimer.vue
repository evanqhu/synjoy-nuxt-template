<!-- 免责声明 -->
<script setup lang="ts">
import DOMPurify from 'dompurify'
import { marked } from 'marked'

useSeoMeta({
  title: 'Disclaimer',
})

const { webConfig } = useAppStore()

const content = ref(`
## Disclaimer
Welcome to ${webConfig.webUrl}. Please read this disclaimer carefully.

### 1. Third-Party Data
The data and information provided on our site come from third-party services. We strive for accuracy but cannot guarantee the completeness or reliability of third-party content.

### 2. No Downloads
We do not offer downloads of any games. Our site serves as a platform for information and entertainment purposes only.

### 3. No Infringement
We do not support or facilitate any infringement of intellectual property rights. If you believe your rights have been violated, please contact us immediately.

### 4. Contact Us
For any concerns or issues, please reach out to us at [${webConfig.webEmail}](mailto:${webConfig.webEmail}).
`)

const compiledMarkdown = computed(() => {
  const html = marked.parse(content.value) as string
  if (import.meta.client) {
    return DOMPurify.sanitize(html)
  }
  return html
})
</script>

<template>
  <div class="legal-page app-content-wrapper">
    <div class="app-content">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="compiledMarkdown" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

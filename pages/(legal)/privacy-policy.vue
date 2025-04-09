<!-- 服务条款 -->
<script setup lang="ts">
import DOMPurify from 'dompurify'
import { marked } from 'marked'

useSeoMeta({
  title: 'Privacy Policy',
})

const { webConfig } = useAppStore()

const content = ref(`
## Privacy Policy
Welcome to ${webConfig.webUrl}. Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information.

### 1. Information We Collect
We only collect information that you voluntarily provide when creating an account or contacting us. This may include your name and email address.

### 2. Use of Information
We use your information to enhance your experience on our site, respond to inquiries, and provide customer support.

### 3. No Cookies
We do not use cookies or any tracking technologies to collect information about your browsing activities.

### 4. Data Security
We implement security measures to protect your personal information from unauthorized access or disclosure.

### 5. Third-Party Services
We do not share your information with third parties except as required by law.

### 6. Changes to This Policy
We may update this Privacy Policy from time to time. Any changes will be posted on this page.

### 7. Contact Us
If you have questions about this Privacy Policy, please contact us at [${webConfig.webEmail}](mailto:${webConfig.webEmail}).
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
  <div class="legal-page">
    <div class="app-content-wrapper">
      <div class="app-content">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="compiledMarkdown" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

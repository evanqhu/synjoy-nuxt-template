<!-- 服务条款 -->
<script setup lang="ts">
import DOMPurify from 'dompurify'
import { marked } from 'marked'

useSeoMeta({
  title: 'Terms of Service',
})

const { webConfig } = useAppStore()

const content = ref(`
## Terms of Service
Welcome to ${webConfig.webUrl}. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.

### 1. Acceptance of Terms
By accessing our site, you agree to these Terms of Service. If you do not agree, please do not use our services.

### 2. Use of the Site
You agree to use the site for lawful purposes only and in a way that does not infringe the rights of others or restrict their use and enjoyment of the site.

### 3. User Accounts
You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your account information.

### 4. Content Ownership
All content on the site, including games and graphics, is owned by ${webConfig.webUrl} or our licensors. Unauthorized use is prohibited.

### 5. Limitation of Liability
${capitalizeFirstLetter(webConfig.webUrl)} is not liable for any damages arising from the use of our site or services.

### 6. Changes to Terms
We reserve the right to modify these terms at any time. Continued use of the site signifies acceptance of any changes.
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

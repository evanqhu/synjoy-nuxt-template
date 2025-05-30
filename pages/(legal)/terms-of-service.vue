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
Welcome to ${webConfig.webUrl}! By accessing or using our site, you agree to adhere to these Terms of Service. Please review them carefully. If any part of these terms is unacceptable to you, kindly refrain from using the website.

### 1. Use of the Website
You agree to utilize ${webConfig.webUrl} solely for lawful purposes and in a manner that respects the rights of others. Engaging in illegal activities, such as distributing harmful software or infringing on intellectual property rights, is strictly prohibited.

### 2. Content
The content on ${webConfig.webUrl}, including novels from third-party sources, is provided "as is." We do not guarantee the accuracy, legality, or quality of this material, and you assume all risks associated with accessing and reading it.

### 3. Third-Party Content
Novels available on our site are supplied by third-party providers. While we have permission to display this content, we do not own the rights. For any concerns, please contact us directly.

### 4. Termination
We reserve the right to suspend or terminate your access to ${webConfig.webUrl} at our discretion, without notice, for any conduct that violates these terms or is harmful to the site or its users.

### 5. Limitation of Liability
We are not responsible for any direct, indirect, incidental, or consequential damages arising from your use of our website, including errors in the content or any third-party material accessed through the site.

### 6. Modifications
We may revise these Terms of Service at any time. Updates will be posted on this page, and continued use of the website after changes are made will signify your acceptance of the new terms.
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
  <div class="app-wrapper">
    <div class="app-content py-8">
      <div
        class="legal-content"
        v-html="compiledMarkdown"
      />
    </div>
  </div>
</template>

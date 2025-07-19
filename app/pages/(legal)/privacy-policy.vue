<!-- 服务条款 -->
<script setup lang="ts">
import DOMPurify from 'dompurify'
import { marked } from 'marked'

useSeoMeta({
  title: 'Privacy Policy',
})

// const { webConfig } = useAppStore()

const content = ref(`
## Privacy Policy
Protecting your personal information is important to us. This notice outlines how we gather, use, and safeguard your data when you engage with this website.
### 1. What We Collect
When you access the site or interact with its features, we may collect details such as your name, email address, and browsing activity.
### 2. How We Use Your Information
We may use your data to enhance site functionality, communicate updates, or occasionally provide marketing messages relevant to your interests.
### 3. Cookies & Tracking Tools
To better understand user behavior and improve site performance, we use cookies and similar technologies. You can manage or disable these through your browser settings.
### 4. AI Personalization
Your input may be used to tailor AI-generated content—like images or quotes—to suit your preferences. Unless clearly stated otherwise, we do not retain the AI output linked to individual users.
### 5. Data Sharing with Partners
In some cases, trusted third-party services help us operate this site. These partners may receive access to necessary data under strict confidentiality obligations.
### 6. Your Control Over Your Data
You have the right to access, correct, or request the deletion of your personal information. Feel free to reach out if you wish to exercise these rights.
### 7. Information Security
We use standard industry practices to protect your data. However, no digital system is completely immune to breaches, and we cannot offer absolute guarantees.
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
      <!-- eslint-disable-next-line vue/no-v-html vue/max-attributes-per-line -->
      <div class="legal-content" v-html="compiledMarkdown" />
    </div>
  </div>
</template>

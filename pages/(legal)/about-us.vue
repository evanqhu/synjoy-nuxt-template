<script setup lang="ts">
import DOMPurify from 'dompurify'
import { marked } from 'marked'

useSeoMeta({
  title: 'About Us',
})

const { webConfig } = useAppStore()

const content = ref(`
## Who We Are
At ${webConfig.webUrl}, we’re passionate about the magic of language—how a few carefully chosen words can uplift, comfort, or provoke thought. Our platform blends advanced AI with human emotion to craft quotes that speak directly to your experiences and moods.
### Our Purpose
We created this space for anyone who finds meaning in words. Whether you're looking for encouragement, introspection, affection, or simply a touch of daily inspiration, our tools help you generate and personalize quotes that truly connect.
### What Sets Us Apart
- AI-crafted quotes that are original and emotionally rich
- Personalized options to match tone, feeling, and visual aesthetic
- Instantly downloadable, beautifully designed quote graphics to share or save
### Our Dream
We envision a world where thoughtful expression is effortless—where everyone has access to words that reflect who they are and what they feel. At ${webConfig.webUrl}, we’re making meaningful language more personal, more creative, and more beautiful than ever.
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

<style lang="scss" scoped>
</style>

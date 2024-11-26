<script setup lang="ts">
// import { HomeMobile, HomeDesktop } from '#components'
import HomeMobile from './modules/mobile.vue'
import HomeDesktop from './modules/desktop.vue'

defineOptions({
  name: 'HomeView',
})

useHead({
  title: 'Home Page',
  meta: [
    {
      name: 'description',
      content: 'My home page description',
    },
  ],
})

// const HomeMobile = resolveComponent('HomeMobile')
// const HomeDesktop = resolveComponent('HomeDesktop')

const { isMobile } = useDevice()

const appStore = useAppStore()
const {
  webConfig: { adSense },
} = appStore
</script>

<template>
  <component :is="isMobile ? HomeMobile : HomeDesktop" :ad-sense="adSense" />
</template>

<script setup lang="ts">
// const appStore = useAppStore()
// const { webConfig } = appStore
// const { smartNavigate, getHref } = useCustomRouting()
// const route = useRoute()
// const userStore = useUserStore()
</script>

<template>
  <header class="header app-content-wrapper">
    <div class="header-content app-content">
      header
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  height: $header-height;
  position: fixed;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 2001;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2rem);

  .header-content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

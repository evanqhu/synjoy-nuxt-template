<!-- 默认布局 -->
<template>
  <div>
    <AppHeader />
    <main class="app-main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  padding-top: $header-height;
}
</style>

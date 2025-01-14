<!-- 默认布局 -->
<template>
  <div>
    <BaseMenuDrawer />

    <div class="default-layout">
      <BaseHeader />
      <div class="app-main">
        <slot />
      </div>
      <BaseFooter />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

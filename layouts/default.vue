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
.default-layout {
  width: 100%;
  height: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: $header-height;
  bottom: 0;
  position: fixed;
  z-index: 2001;
}

.app-main {
  padding-top: $header-height;
}
</style>

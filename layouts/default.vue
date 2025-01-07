<!-- 默认布局 -->
<template>
  <div class="default-layout">
    <header class="header">
      <div class="header-title">
        <SvgIcon name="nuxt" size="2rem" />
        <span>123</span>
      </div>
      <div class="header-menu">
        123
      </div>
    </header>
    <div class="app-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  width: 100%;
  height: 100%;
}

.header {
  height: $header-height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  background: #fff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  z-index: 2001;

  @media (min-width: $container-width) {
    padding: 0 calc((100% - $container-width) / 2);
  }
}

.header-title {
  display: flex;
  align-items: center;
  gap: 5px;

  // ::v-deep .nuxt-icon svg {
  //   width: 30px;
  //   height: 30px;
  // }
}

.app-content {
  padding: 1rem;
}
</style>

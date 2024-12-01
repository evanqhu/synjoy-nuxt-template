<!-- 默认布局 -->
<template>
  <div class="default-layout">
    <header class="header">
      <div class="header-title">
        <!-- <NuxtIcon name="nuxt" filled :width="30" :height="40" /> -->
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
  height: rem(50);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background: #fff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  z-index: 1000;

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

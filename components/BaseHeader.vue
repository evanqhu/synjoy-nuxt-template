<script setup lang="ts">
const appStore = useAppStore()
const { webConfig, toggleMenuDrawer } = appStore
const { customPush, getHref } = useCustomRouting()

/** 点击菜单 */
const handleMenuClick = () => {
  toggleMenuDrawer(!appStore.menuDrawerOpened)
}
</script>

<template>
  <header class="header">
    <NuxtLink :to="getHref('/')" class="header__left">
      <SvgIcon :name="webConfig.webLogo" size="2rem" />
      <span class="web-title">{{ webConfig.webTitle }}</span>
    </NuxtLink>
    <div class="header__right" @click="handleMenuClick">
      <SvgIcon v-if="appStore.menuDrawerOpened" name="close" size="24" />
      <SvgIcon v-else name="menu" size="24" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  height: $header-height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  background: #fff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  z-index: 2001;

  &__left {
    display: flex;
    align-items: center;
    gap: 6px;
    @include hover(0.6);

    .web-title {
      font-size: rem(24);
      font-weight: 900;
    }
  }

  &__right {
    padding: 0.25rem;
    display: flex;
    align-items: center;
    border-radius: 4px;
    @include hover($bg-color: rgba(0, 0, 0, 0.08));
  }

  // > 1200px
  @media (min-width: $container-width) {
    padding: 0 calc((100% - $container-width) / 2);
  }
}
</style>

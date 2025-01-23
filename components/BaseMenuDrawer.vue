<script setup lang="ts">
import { resourceList } from '~/configs/constants'

const appStore = useAppStore()
const { toggleMenuDrawer } = appStore

const handleItemClick = (item: { name: string, path: string }) => {
  navigateTo(item.path)
  toggleMenuDrawer(false)
}

watch(
  () => appStore.menuDrawerOpened,
  (val) => {
    document.body.style.overflow = val ? 'hidden' : 'auto'
  },
)
</script>

<template>
  <div v-if="appStore.menuDrawerOpened" class="drawer-bg" @click="toggleMenuDrawer(false)" />
  <Transition>
    <div v-if="appStore.menuDrawerOpened" class="menu__drawer">
      <h2 class="menu__title">
        Resource
      </h2>
      <div class="menu__list">
        <div
          v-for="(item, index) in resourceList"
          :key="index"
          class="menu__item"
          @click="handleItemClick(item)"
        >
          <span>{{ item.name }}</span>
          <SvgIcon name="arrow-right" size="1rem" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: $header-height;
  bottom: 0;
  position: fixed;
  z-index: 2001;
}

.menu__drawer {
  position: fixed;
  top: $header-height;
  z-index: 2001;
  width: 100%;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: var(--bg-color);
  padding: 0.5rem;

  .menu__title {
    padding: 0.75rem;
    font-weight: 700;
  }

  .menu__list {
    .menu__item {
      padding: 0.75rem;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 3rem;
      font-weight: 600;
      font-size: 0.875rem;
      border-radius: 0.5rem;
      @include hover($bg-color: rgba(0, 0, 0, 0.08));
    }
  }
  // PC
  @media (min-width: $device-point) {
    width: 360px;
    right: 0;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);
  }

  // > 1200px
  @media (min-width: $container-width) {
    right: calc((100% - $container-width) / 2);
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-100%);
}
</style>

<script setup lang="ts">
import { resourceList } from '~/configs/constants'

const appStore = useAppStore()
const { toggleMenuDrawer } = appStore

const router = useRouter()

const handleItemClick = (item: { name: string, path: string }) => {
  router.push(item.path)
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
  <div
    :class="['menu-drawer', { opened: appStore.menuDrawerOpened }]"
    :style="{ transform: 'translateY(-120%)' }"
  >
    <h2 class="resource">
      Resource
    </h2>
    <ul class="menu-list">
      <li
        v-for="(item, index) in resourceList"
        :key="index"
        class="menu-item"
        @click="handleItemClick(item)"
      >
        <span>{{ item.name }}</span>
        <SvgIcon name="arrow-right" width="6.5" height="11" />
      </li>
    </ul>
  </div>
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

.menu-drawer {
  position: fixed;
  top: $header-height;
  z-index: 2001;
  width: 100%;
  background: #fff;
  transition: all 0.2s ease-in-out;
  padding: 1.5rem 1rem 0.75rem;

  &.opened {
    transform: translateY(0) !important;
  }

  .resource {
    font-family: "Rubik One";
    height: 1.5rem;
    font-weight: 600;
  }

  .menu-list {
    .menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 3rem;
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;

      &:not(:last-of-type) {
        border-bottom: 1px solid #e6e8ea;
      }
    }
  }

  @media (min-width: 768px) {
    width: 360px;
    right: 0;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);
  }

  @media (min-width: $container-width) {
    right: calc((100% - $container-width) / 2);
  }
}
</style>

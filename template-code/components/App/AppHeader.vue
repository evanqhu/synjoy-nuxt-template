<script setup lang="ts">
const appStore = useAppStore()
const { webConfig } = appStore
const { smartNavigate, getHref } = useCustomRouting()
const route = useRoute()
const userStore = useUserStore()

const popoverRef = useTemplateRef<any>('popover-ref')

// 是否显示登录按钮
const isShowLogin = computed(() => {
  if (route.path.includes('login') || userStore.isAuth) return false
  return true
})

/** 点击菜单项 */
const handleItemClick = (path: string) => {
  // 外部链接
  if (path.includes('http')) {
    return navigateTo(path, { external: true })
  }
  popoverRef?.value?.hide()
  smartNavigate(path)
}

/** 退出登录 */
const handleLogout = async () => {
  try {
    await userStore.logout()
    ElMessage.success('Logout successful.')
    smartNavigate('/')
  }
  catch (error) {
    console.error('🚀🚀🚀 退出登录失败: ', error)
    ElMessage.error('Logout failed, please try again.')
  }
}
</script>

<template>
  <header class="header app-content-wrapper">
    <div class="header-content app-content">
      <NuxtLink :to="getHref('/')" class="header__left">
        <SvgIcon :name="webConfig.webLogo!" size="1.75rem" />
        <span class="web-title">{{ webConfig.webTitle }}</span>
      </NuxtLink>
      <ClientOnly>
        <el-button v-if="isShowLogin" type="primary" @click="smartNavigate('/login')">
          Login
        </el-button>
        <div v-if="userStore.isAuth" class="user-container">
          <a class="diamond-wrapper" :href="chargeLink" target="_blank">
            <SvgIcon name="diamond" size="1.5rem" />
            <span class="highlight">{{ userStore.userInfo?.coinsTotal || 0 }}</span>
          </a>
          <el-popover
            ref="popover-ref"
            trigger="click"
            :width="370"
            placement="bottom-end"
            :show-arrow="false"
            popper-class="menu-popover"
          >
            <template #default>
              <div class="menu-content">
                <!-- Account -->
                <div class="menu-item">
                  <h2 class="title">
                    Account
                  </h2>
                  <div class="list-item active">
                    <KeepAlive>
                      <el-avatar shape="circle" :size="32" :src="userStore.userInfo?.avatar" />
                    </KeepAlive>
                    <span class="ellipsis">{{ userStore.userInfo?.email }}</span>
                  </div>
                  <div class="list-item" @click="handleItemClick('/my-images')">
                    <SvgIcon name="my-images" size="2rem" />
                    My Images
                  </div>
                </div>
                <!-- Resources -->
                <div class="menu-item">
                  <h2 class="title">
                    Resources
                  </h2>
                  <a class="list-item" :href="feedbackLink" target="_blank">
                    <SvgIcon name="feedback" size="2rem" />
                    Feedback
                  </a>
                  <div v-for="(item, index) in resourcesList" :key="index" class="list-item" @click="handleItemClick(item.path)">
                    <SvgIcon :name="item.path.replace('/', '')" size="2rem" />
                    {{ item.name }}
                  </div>
                </div>
                <!-- Log Out -->
                <el-button link type="primary" class="log-out" @click="handleLogout">
                  Log Out
                </el-button>
              </div>
            </template>
            <template #reference>
              <el-avatar shape="circle" :src="userStore.userInfo?.avatar" />
            </template>
          </el-popover>
        </div>
      </ClientOnly>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 2001;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(32px);

  .header-content {
    height: $header-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    @include hover;

    .web-title {
      font-size: 1.75rem;
      font-family: 'Bakbak One';
      color: $theme-color;
    }
  }

  .user-container {
    display: flex;
    align-items: center;
    gap: 1rem;

    .diamond-wrapper {
      font-weight: 900;
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      border: 1px solid rgba(0, 0, 0, 0.10);
      background: #FFF;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      @include hover;

      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    .el-avatar {
      @include hover;
    }
  }
}
</style>

<style lang="scss">
.el-popover.menu-popover {
  border-radius: 1rem;
  padding: 1rem;
  max-width: 320px;

  .menu-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.10);
    margin-bottom: 1rem;

    .title {
      color: $theme-color;
      font-family: 'Bakbak One';
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }

    .list-item {
      height: 3.75rem;
      padding-left: 1.25rem;
      font-size: 1.125rem;
      color: var(--text-color);
      display: flex;
      align-items: center;
      gap: 1.25rem;
      border-radius: 1rem;
      @include hover {
        background: #ebe5f7;
      };

      &.active {
        color: #fff;
        background: $theme-color;
      }

      .el-avatar {
        border: 1px solid #fff;
      }
    }
  }

  .log-out {
    width: 100%;
    font-size: 1.125rem;
    font-weight: 900;
    color: $theme-color;
  }
}

@media screen and (max-width: 768px) {
  .el-popover.menu-popover {
    max-width: 260px;

    .menu-item {
      .title {
        font-size: 1rem;
        margin-bottom: 0;
      }

      .list-item {
        height: 3rem;
        font-size: 14px;
        padding-left: 0.75rem;
        border-radius: 0.5rem;
      }
    }

    .log-out {
      font-size: 1rem;
    }
  }
}
</style>

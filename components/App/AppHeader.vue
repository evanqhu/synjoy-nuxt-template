<script setup lang="ts">
const appStore = useAppStore()
const { webConfig } = appStore
const { smartNavigate } = useCustomRouting()
const route = useRoute()

// 导航栏
const navs = [
  { icon: 'local:home', text: 'home', path: '/' },
  { icon: 'local:category', text: 'category', path: '/category' },
  { icon: 'local:about-us', text: 'about us', path: '/about-us' },
]

/** 导航栏点击回调 */
const handleNavClick = (path: string) => {
  smartNavigate(path)
}
</script>

<template>
  <header class="w-full fixed bg-white z-[2001]">
    <div class="flex flex-col items-center uppercase h-full">
      <div
        class="flex items-center gap-2 px-4 h-16 text-base font-extrabold hoverable hover:opacity-70 md:text-xl"
        @click="smartNavigate('/')"
      >
        <Icon
          name="local:logo"
          size="1.5rem"
        />
        <span>{{ webConfig.webTitle }}</span>
      </div>
      <div class="w-full h-10 flex items-center justify-between gap-4 border-y border-black/10 md:justify-center md:gap-16">
        <div
          v-for="nav in navs"
          :key="nav.icon"
          :class="[
            'flex items-center justify-center gap-1 w-[7.5rem] h-full text-sm hoverable hover:opacity-70',
            route.path === nav.path ? 'text-primary shadow-[inset_0_-2px_0_theme(colors.primary)] [text-shadow:.01em_0_0_currentColor,-.03em_0_0_currentColor]' : '',
          ]"
          @click="handleNavClick(nav.path)"
        >
          <Icon
            :name="nav.icon"
            size="0.875rem"
          />
          <span>{{ nav.text }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

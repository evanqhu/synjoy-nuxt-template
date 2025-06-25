<script setup lang="ts">
const appStore = useAppStore()
const { webConfig } = appStore
const { smartNavigate, getHref } = useCustomRouting()
const route = useRoute()

const MENU_ITEMS = [
  { label: 'Home', path: '/' },
  ...RESOURCE_LIST,
]

const MENU_ITEMS_PC = [
  { label: 'Home', path: '/', routeName: 'index' },
  { label: 'About Us', path: '/about-us', routeName: 'about-us' },
]

/** 点击移动端菜单项 */
function handleItemClick(path: string) {
  appStore.menuDrawerOpened = false
  smartNavigate(path)
}
</script>

<template>
  <header class="app-wrapper fixed bg-neutral-100 z-[2001]">
    <div class="app-content h-header flex items-center justify-between">
      <NuxtLink
        class="text-2xl font-extrabold line-clamp-1 hoverable hover:opacity-70"
        :to="getHref('/')"
      >
        {{ webConfig.webTitle }}
      </NuxtLink>

      <!-- PC 端导航 -->
      <div class="hidden h-full md:flex gap-16">
        <NuxtLink
          v-for="item in MENU_ITEMS_PC"
          :key="item.path"
          :to="getHref(item.path)"
          class="pt-[2px] px-2 hoverable flex items-center border-b-2"
          :class="[route.name === item.routeName ? ' border-current text-shadow-[0.5px_0_0_currentColor]' : 'border-transparent hover:opacity-70']"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

      <!-- 移动端导航 Icon -->
      <div
        class="md:hidden flex items-center justify-center"
        @click="appStore.menuDrawerOpened = !appStore.menuDrawerOpened"
      >
        <Icon
          v-if="appStore.menuDrawerOpened"
          name="local:close"
          size="1.25rem"
        />
        <Icon
          v-else
          name="local:menu"
          size="1.25rem"
        />
      </div>

      <!-- 移动端菜单 -->
      <ClientOnly>
        <Teleport
          defer
          to="#__nuxt"
        >
          <div
            v-if="appStore.menuDrawerOpened"
            class="fixed bg-white w-full top-header bottom-0 z-[2000] md:hidden"
            @click="appStore.menuDrawerOpened = false"
          />
          <Transition>
            <div
              v-if="appStore.menuDrawerOpened"
              class="fixed w-full bg-white top-header z-[2000] p-4 flex flex-col gap-4 md:hidden"
            >
              <div
                v-for="item in MENU_ITEMS"
                :key="item.path"
                class="px-6 py-4 flex items-center justify-between rounded-2xl text-primary bg-[#006944]/[0.08]"
                @click="handleItemClick(item.path)"
              >
                {{ item.label }}
                <Icon
                  name="local:arrow-right"
                  size="0.875rem"
                />
              </div>
            </div>
          </Transition>
        </Teleport>
      </ClientOnly>
    </div>
  </header>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: transform 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-100%);
}
</style>

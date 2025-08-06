<script setup lang="ts">
const appStore = useAppStore()
const { webConfig } = appStore
const { getHref } = useCustomRouting()
const resourcesList = [
  {
    name: 'About Us',
    path: '/about-us',
  },
  {
    name: 'Terms of Service',
    path: '/terms-of-service',
  },
  {
    name: 'Privacy Policy',
    path: '/privacy-policy',
  },
  {
    name: 'Disclaimer',
    path: '/disclaimer',
  },
]

const socialList = ['local:social-tiktok', 'local:social-x', 'local:social-facebook', 'local:social-ins']

const handleSocialLinkClick = () => {
  const contentToCopy = window.location.href
  navigator.clipboard.writeText(contentToCopy).then(() => {
    ElMessage.success('Link copied.')
  }).catch((err) => {
    console.error('🚀🚀🚀 Link copy err: ', err)
  })
}
</script>

<template>
  <footer class="app-wrapper overflow-hidden py-10 border-t border-black/10">
    <div class="app-content flex flex-col">
      <div class="mb-4 flex items-center gap-2 text-base font-extrabold uppercase md:text-xl">
        <Icon
          :name="`logo:${webConfig.webLogo}`"
          size="1.5rem"
        />
        <span>{{ webConfig.webTitle }}</span>
      </div>
      <p class="text-sm">
        {{ webConfig.aboutUs }}
      </p>
      <el-divider />
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-4 md:flex-row md:gap-0">
          <div class="uppercase font-extrabold md:flex-[0_0_10rem]">
            Resources
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm md:grid-cols-[repeat(4,auto)] md:gap-8">
            <NuxtLink
              v-for="item in resourcesList"
              :key="item.name"
              :href="getHref(item.path)"
              class="text-primary hoverable hover:opacity-70"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
        <div class="flex flex-col gap-4 md:flex-row md:gap-0">
          <div class="uppercase font-extrabold md:flex-[0_0_10rem]">
            Contact Us
          </div>
          <a
            :href="`mailto:${webConfig.webEmail}`"
            class="text-sm text-primary hoverable hover:opacity-70"
          >{{ webConfig.webEmail }}</a>
        </div>
        <div class="flex flex-col gap-4 md:flex-row md:gap-0">
          <div class="uppercase font-extrabold md:flex-[0_0_10rem]">
            Share With
          </div>
          <div class="flex items-center gap-4 text-primary">
            <Icon
              v-for="(item, index) in socialList"
              :key="index"
              :name="item"
              class="hover:opacity-70 cursor-pointer"
              size="1.25rem"
              @click="handleSocialLinkClick"
            />
          </div>
        </div>
      </div>
      <el-divider />
      <div class="text-xs">
        Copyright © {{ new Date().getFullYear() }} {{ webConfig.webUrl }}. All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

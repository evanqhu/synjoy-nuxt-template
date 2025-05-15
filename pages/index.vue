<!-- 首页 home -->
<script setup lang="ts">
useSeoMeta({
  title: 'Home',
})

const appStore = useAppStore()
const { webConfig } = appStore
const { adSense, adExchange } = webConfig

const { isMobile } = useCustomDevice()
const { smartNavigate } = useCustomRouting()

const { data: jokeData, status, refresh: refreshJoke } = useLazyAsyncData('joke', () => $fetch('http://hmajax.itheima.net/api/randjoke'), {
  watch: [isMobile],
  transform: data => (data as any).data || '', // 使用 transform 函数来更改查询的结果
})
</script>

<template>
  <div class="home app-content-wrapper">
    <div class="app-content">
      <div>首页</div>
      <br>
      <el-button @click="refreshJoke()">
        刷新 joke 数据
      </el-button>
      <br>
      <p v-loading="status === 'pending'">
        {{ jokeData }}
      </p>
      <br>
      <br>
      <button @click="smartNavigate('/detail')">
        to detail
      </button>
      <br>
      <div>isMobile: {{ isMobile }}</div>
      <!-- <SvgIcon name="nuxt" size="2rem" /> -->
      <br>
      <Icon name="local:nuxt" size="2rem" />
      <!-- <br> -->
      <AdsbyGoogle :ads-attrs="adSense?.home_1" />
      <AdsbyGoogle :ads-attrs="adSense?.home_2" />
      <AdsbyExchange :ads-attrs="adExchange?.home_1" />
      <!-- <br> -->
      <NuxtImg src="https://image.lexica.art/sm2_webp/58cd23b6-723a-4451-91c0-b88456f72a88" loading="lazy" />
      <img src="~/assets/images/vite.jpg" alt="">
      <NuxtImg src="/images/vite.jpg" loading="lazy" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

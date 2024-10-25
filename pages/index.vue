<!-- 首页 -->
<script setup lang="ts">
import { getData } from '~/api/modules/blog'
import imgURL from '~/assets/imgs/demo.jpg'

definePageMeta({
  middleware: 'home-auth',
})

/** 定义组件 head 数据，可在服务端渲染，可使用响应式数据 */
// useHead({
//   title: 'My App',
//   meta: [{ name: 'description', content: 'My amazing site.' }],
//   bodyAttrs: {
//     class: 'test',
//   },
//   script: [{ innerHTML: 'console.log(\'Hello world\')' }],
// })
// useSeoMeta({
//   title: 'My Amazing Site',
//   ogTitle: 'My Amazing Site',
//   description: 'This is my amazing site, let me tell you all about it.',
//   ogDescription: 'This is my amazing site, let me tell you all about it.',
//   ogImage: 'https://example.com/image.png',
//   twitterCard: 'summary_large_image',
// })

/** 路由离开时执行 */
// onBeforeRouteLeave((to, from, next) => {
//   console.log('🚀🚀🚀 to: ', to)
//   console.log('🚀🚀🚀 from: ', from)
//   next()
// })

/** 运行时变量 */
const runtimeConfig = useRuntimeConfig()

/** 全局 App 变量 */
const appConfig = useAppConfig()

/** 写在 server 中的接口 */
// const { data: hello } = await useFetch('/api/hello')
const { data: hello } = await useAsyncData('hello', () => $fetch('/api/hello'))
// console.log('🚀🚀🚀  hello: ', hello.value)

const { data: blogs } = await useAsyncData('blogs', () => getData('test params'))
// console.log('🚀🚀🚀  blogs: ', blogs.value)
/** 外部接口 */
</script>

<template>
  <div class="home">
    <div>首页</div>
    <button @click="getData('test params')">
      click
    </button>
    <Counter />
    <img
      :src="imgURL"
      alt=""
    >
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;

  img {
    width: 100%;
  };
}
</style>

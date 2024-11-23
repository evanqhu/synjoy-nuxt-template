<!-- 首页 -->
<script setup lang="ts">
// import { getData } from '~/api/modules/blog'
import imgURL from '~/assets/images/demo.jpg'

definePageMeta({
  middleware: 'home-auth',
  layout: 'default',
})

const appStore = useAppStore()
const { webConfig: { adSense } } = appStore

// const { blogApi } = useApi()
/** 运行时变量 */
// const runtimeConfig = useRuntimeConfig()
/** 全局 App 变量 */
// const appConfig = useAppConfig()

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

/** 写在 server 中的接口 */
// const { data: hello } = await useFetch('/api/hello')
// const { data: hello } = await useAsyncData('hello', () => $fetch('/api/hello'))
// console.log('🚀🚀🚀  hello: ', hello.value)

// const { data: blogs } = await useAsyncData('blogs', () => getData('test params'))
// console.log('🚀🚀🚀  blogs: ', blogs.value)

// const { isMobile } = useDevice()
</script>

<template>
  <div class="home">
    <div>首页</div>
    <br>
    <!-- <button @click="blogApi.getData('test params')">
      click
    </button> -->
    <Counter />
    <!-- <div>{{ (blogs as Array<any>)?.length }}</div> -->
    <NuxtIcon
      name="nuxt"
      filled
    />
    <div v-if="$device.isDesktop">
      Desktop
    </div>
    <div v-else-if="$device.isTablet">
      Tablet
    </div>
    <div v-else>
      Mobile
    </div>
    <Adsbygoogle :ads-attrs="adSense.home_1" />
    <Adsbygoogle :ads-attrs="adSense.home_2" />

    <div class="text">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet provident saepe laboriosam tempore molestiae reprehenderit qui, commodi at minus exercitationem dolorum accusamus facilis quibusdam. Delectus soluta sint maiores ipsa reprehenderit!
      Exercitationem excepturi at reprehenderit! Tempore consectetur facilis rem accusamus dolor voluptate impedit rerum! Facilis, qui! Exercitationem hic magnam sapiente soluta rem facere laborum, laboriosam fugit harum repellendus esse natus amet.
      Consequuntur eveniet blanditiis, eum aliquid qui doloribus rerum libero non dolorem. Sint nihil voluptate error pariatur ducimus natus, accusantium est. Quis dignissimos ab odit quia molestias quaerat voluptates distinctio veritatis.
      Voluptatem deserunt delectus est sint dolorem, odio ex vitae asperiores in quisquam ipsa velit fugit? Porro dicta adipisci exercitationem, cumque ducimus, possimus nisi ea rerum quisquam recusandae expedita laborum architecto.
      Explicabo quas qui rem quod magnam atque animi provident ex, deleniti assumenda repudiandae? Enim expedita maxime, facilis itaque magni deleniti eaque reprehenderit, tenetur nobis officiis, recusandae eligendi quis doloremque dignissimos.
      Soluta vel mollitia eligendi commodi in incidunt atque excepturi sapiente praesentium, nobis labore eveniet possimus maxime nam, ducimus ipsum. Consequatur eos culpa inventore possimus omnis architecto fugiat fuga obcaecati beatae!
      Maiores, alias corrupti? Non minima neque adipisci quisquam! Quo, dolor sed. Autem illum, eveniet, rem fugiat dignissimos quas nemo tempora officiis eius perspiciatis dolor fugit a unde error quae adipisci.
      At inventore fuga officiis adipisci, magnam fugit, id repellat iure, excepturi pariatur molestiae ducimus? Porro dolores suscipit facere dolore. Quia porro tempora modi, delectus praesentium quo excepturi eligendi laborum sunt!
      Natus incidunt nobis molestiae maxime at quam facere consequatur neque voluptatum possimus, suscipit ab recusandae, sint provident asperiores deserunt ad, aliquam minima dolores eveniet adipisci harum ipsa reiciendis. Odit, sunt.
      Velit rerum harum perspiciatis voluptatibus iure distinctio totam vel! Corrupti perferendis commodi distinctio consequatur possimus cumque, blanditiis dolorem soluta architecto eum dicta magni saepe magnam deleniti, delectus, hic amet? Mollitia.
    </div>
    <NuxtImg src="/demo.jpg" />
    <img
      :src="imgURL"
      alt=""
    >
    <NuxtImg
      src="https://picsum.photos/200/300"
      loading="lazy"
    />
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;

  img {
    width: 100%;
  };

  .text {
    height: 3000px;
  }
}
</style>

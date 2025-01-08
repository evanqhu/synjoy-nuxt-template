<!-- 首页 home -->
<script setup lang="ts">
import imgURL from '~/assets/images/vite.jpg'

useSeoMeta({
  title: 'Home Page',
  description: 'My home page description',
})

/** 运行时变量 */
// const runtimeConfig = useRuntimeConfig()
/** 全局 App 变量 */
// const appConfig = useAppConfig()
/** App Store */
const appStore = useAppStore()
const { webConfig } = appStore
const { adSense } = webConfig

const { isMobile } = useCustomDevice()
const customPush = useCustomPush()
</script>

<template>
  <div class="home app-content">
    <div>首页</div>
    <br>
    <button @click="customPush('/detail')">
      to detail
    </button>
    <br>
    <br>
    <div>isMobile: {{ isMobile }}</div>
    <br>
    <Counter />
    <br>
    <SvgIcon name="nuxt" size="2rem" />
    <br>
    <!-- <AdsbyGoogle :ads-attrs="adSense.home_1" />
    <AdsbyGoogle :ads-attrs="adSense.home_2" /> -->
    <br>
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
    <NuxtImg src="/images/demo.jpg" />
    <img :src="imgURL" alt="">
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

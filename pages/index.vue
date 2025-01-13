<!-- 首页 home -->
<script setup lang="ts">
definePageMeta({
  path: '/:channel(channel[1-9]\\d?)?',
})

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
const { defaultApi } = useApi()

const { status, data: topMoversData, refresh: refreshTopMovers } = useLazyAsyncData('topMovers', defaultApi.fetchTopMovers)
const topMovers = computed(() => topMoversData.value?.datas || [])

const { data: jokeData, refresh: refreshJoke } = useLazyAsyncData('blog', () => $fetch('https://official-joke-api.appspot.com/random_joke'), {
  watch: [isMobile],
  // 使用 transform 函数来更改查询的结果
  transform: (data) => {
    return (data as any).setup
  },
})
// const joke = computed(() => (jokeData.value as any)?.setup)
</script>

<template>
  <div class="home app-content">
    <div>首页</div>
    <br>
    <button @click="refreshTopMovers()">
      刷新 top movers 数据
    </button>
    <br>
    <br>
    <button @click="refreshJoke()">
      刷新 joke 数据
    </button>
    <br>
    <br>
    <p>{{ jokeData }}</p>
    <br>
    <div
      v-loading="{
        show: status === 'pending',
        text: 'loading',
        background: 'rgba(255, 255, 255, 0.5)',
      }"
      class="top-cards-wrapper"
    >
      <div
        v-for="(item, index) in topMovers"
        :key="index"
        class="card-item"
        @click="customPush(`/${item.originId}`)"
      >
        <img class="icon" :src="item.logoUrl">
        <div class="name">
          {{ item.coinFullName }}
        </div>
        <div class="abbr">
          {{ item.coinShortName }}
        </div>
        <div class="price">
          <span class="num">${{ item.nowPriceText }}</span>
          <div class="trend">
            <SvgIcon name="up" size="1rem" style="margin-right: 8px" />
            <span>{{ item.priceChange1d }}%</span>
          </div>
        </div>
      </div>
    </div>
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
    <Icon name="local:nuxt" size="2rem" />
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
    <img src="~/assets/images/vite.jpg" alt="">
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;

  img {
    width: 100%;
  };
}

.top-cards-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4 列
  gap: 20px;
  min-height: 168px;

  .card-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    width: 100%;
    min-width: 250px;
    height: 168px;
    padding: 16px;
    border-radius: 12px;
    color: #fff;
    background: #151617;

    &:hover {
      cursor: pointer;
    }

    .icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      outline: 2px solid rgba(255, 255, 255, 0.1);
    }

    .name {
      font-size: rem(20);
      font-weight: 900;
      max-width: 140px;
      @include ellipsis;
    }

    .abbr {
      font-size: 1rem;
      color: #8c8c8c;
    }

    .price {
      display: flex;
      justify-content: space-between;
      font-size: rem(20);
      font-weight: 900;

      .num {
        max-width: 120px;
        @include ellipsis;
      }

      .trend {
        color: #1dc47b;
      }
    }

    .sparkline {
      position: absolute;
      top: 16px;
      right: 16px;
    }
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr; /* 单列布局 */
    min-height: auto;

    .card-item {
      height: 96px;
      width: calc(100vw - 2rem);
      padding-left: 70px;
      padding-bottom: 12px;

      .icon {
        position: absolute;
        left: 1rem;
      }
      .sparkline {
        top: 10px;
      }
    }
  }
}
</style>

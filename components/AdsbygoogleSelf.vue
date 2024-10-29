<script lang="ts" setup>
defineOptions({
  name: 'AdsbyGoogleSelf',
})

interface Props {
  /**
   * 广告配置对象 data-ad-client data-ad-slot 等
   */
  adsAttrs: object
  /**
   * 是否显示调试信息
   */
  showDebug?: boolean
  /**
   * 自定义样式
   */
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  adsAttrs: () => ({}),
  showDebug: false,
  customClass: '',
})

/** ins 标签模板引用 */
const adsense = ref<HTMLElement>()

/** 广告是否显示 */
const isAdFilled = ref(true)

let observer: MutationObserver

/** 监视广告是否加载成功，来控制是否显示广告内容区 */
const observeAdStatus = () => {
  /** ins 标签 DOM */
  const ads = adsense.value
  if (!ads) return

  // 监听 DOM 树变动
  observer = new MutationObserver((mutations) => {
    // 遍历监听到的 DOM 变化
    mutations.forEach((mutation) => {
      const target = mutation.target as Element
      if (mutation.attributeName === 'data-ad-status') {
        isAdFilled.value = target.getAttribute('data-ad-status') !== 'unfilled'
      }
    })
  })

  observer.observe(ads, {
    attributes: true, // 监听属性变动
    attributeFilter: ['data-ad-status'], // 只监听 data-ad-status 属性
  })

  // 初始化检查
  isAdFilled.value = ads.getAttribute('data-ad-status') !== 'unfilled'
}

defineExpose({
  adsAttrs: props.adsAttrs,
})

onMounted(() => {
  observeAdStatus()
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="ads-item">
    <div
      v-show="isAdFilled"
      class="ads-content"
      :class="customClass"
    >
      <div class="ads-content-title">
        Advertisement
      </div>
      <ins
        ref="adsense"
        v-bind="adsAttrs"
      />
    </div>
    <div
      v-if="showDebug"
      class="ads-debug"
    >
      {{ adsAttrs }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ads-item {
  display: flex;
  flex-direction: column;
}
.ads-content {
  border-bottom: 1px solid #c6c6c6;
  height: fit-content;

  .ads-content-title {
    display: flex;
    place-items: center;
    font-family: Roboto;
    font-size: 10px;
    color: #999;
    line-height: normal;

    &::before,
    &::after {
      content: "";
      flex: 1;
      border-bottom: 1px solid #c6c6c6;
    }

    &::before {
      margin-right: 15px;
    }

    &::after {
      margin-left: 15px;
    }
  }
}
</style>

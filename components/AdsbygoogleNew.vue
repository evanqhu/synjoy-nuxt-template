<script lang="ts" setup>
import { $eventTrack, type eventTrackType } from '~/configs/constants'

const route = useRoute()
const { adSense } = useAppStore()
const eventTrack = inject($eventTrack) as eventTrackType

defineOptions({
  name: 'AdsbyGoogleNew',
})

interface Props {
  /**
   * 广告配置对象 data-ad-client data-ad-slot 等
   */
  adsAttrs: object
  /**
   * 自定义样式
   */
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  adsAttrs: () => ({}),
  customClass: '',
})

/** ins 标签模板引用 */
const adsenseRef = ref<HTMLElement>()
/** 广告是否显示 */
const isAdFilled = ref(true)
/** 是否进入调试模式 */
const showDebug = ref(false)

let observer: MutationObserver

/** 监视广告是否加载成功，来控制是否显示广告内容区 */
const observeAdStatus = () => {
  /** ins 标签 DOM */
  const ads = adsenseRef.value
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

/** 加载脚本 URL */
const loadAdSenseScript = () => {
  // 1. 如果不存在广告脚本，则不加载
  if (!adSense?.scriptUrl) {
    console.log('🚀🚀🚀 广告脚本的 URL 不存在，终止加载广告外链')
    eventTrack('no_adscript_config', 'expose')
    return
  }

  // 2. 广告脚本已加载完毕
  if (window.adsbygoogle && window.adsbygoogle.loaded) {
    console.log('脚本已插入完成')
    eventTrack('adscript_loaded', 'expose')
    displayAd()
    return
  }

  // 3. 广告脚本已插入，还未加载完成
  const existingScript = document.querySelector(`script[src="${adSense.scriptUrl}"]`)
  if (existingScript) {
    console.log('🚀🚀🚀 脚本已存在，无需重新添加')
    eventTrack('adscript_exist', 'expose')
    displayAd()
    return
  }

  // 4. 广告脚本还未插入
  console.log('🚀🚀🚀 脚本未创建，准备创建并插入脚本')
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = adSense.scriptUrl
  script.crossOrigin = 'anonymous'
  script.async = true
  document.head.appendChild(script)

  eventTrack('adscript_add_success', 'expose')
  console.log('🚀🚀🚀 脚本插入完成，加载完成，执行加载插入广告及监听操作')
  script.onerror = () => console.error('🚀🚀🚀 广告脚本加载失败')
  script.onload = displayAd
}

/** 加载广告 */
const displayAd = async () => {
  await nextTick() // 等待 DOM 更新完成
  if (!window.adsbygoogle || !window.adsbygoogle.loaded) {
    console.log('🚀🚀🚀 props.adsAttrs: ', props.adsAttrs)
    console.log('🚀🚀🚀 广告脚本还未加载成功，延迟再次尝试 Adsense script not loaded yet, delaying ad display.')
    setTimeout(displayAd, 500) // 延迟再次尝试
    return
  }

  // 遍历所有广告元素并加载广告
  console.log(`🚀🚀🚀 ready to push ad`, props.adsAttrs)
  ;(window.adsbygoogle = window.adsbygoogle || []).push({}) // 加载广告
}

/** 展示广告 */
const showAd = async () => {
  await nextTick()
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  console.log('🚀🚀🚀 onMounted')
  // 开启广告调试模式
  if (route.query.db) {
    showDebug.value = true
  }
  loadAdSenseScript()
  // showAd()
  observeAdStatus()
})

onActivated(() => {
  console.log('🚀🚀🚀 onActivated')
  loadAdSenseScript()
  // showAd()
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
        ref="adsenseRef"
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

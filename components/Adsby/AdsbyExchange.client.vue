<!-- Ad Exchange 广告 -->
<!-- https://developers.google.com/publisher-tag/guides/get-started?hl=zh-cn -->
<script lang="ts" setup>
// const { $eventTrack } = useNuxtApp()
const { customEventTrack } = useFirebase()
const route = useRoute()

interface AdConfig {
  index: string
  headScript?: string
  bodyScript?: string
}

interface Props {
  /**
   * 广告配置对象 headScript bodyScript 等
   */
  adsAttrs?: AdConfig
  /**
   * 自定义样式
   */
  customClass?: string
}

const { adsAttrs = {} as AdConfig, customClass = '' } = defineProps<Props>()

/** adx 广告标签模板引用 */
const adxRef = useTemplateRef<HTMLElement>('adx')

/** 是否显示广告 */
const isShowAd = computed(() => !!(adsAttrs.headScript || adsAttrs.bodyScript))
/** 是否进入调试模式 */
const isShowDebug = ref(false)

const insertScript = (scriptContent: string, target: HTMLElement) => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  // 将 scriptContent 中的 script 标签（包括它们的属性）去掉，仅保留它们之间的内容
  script.text = scriptContent.replace(/<\/?script\b[^>]*>/gi, '')
  target.appendChild(script)
}

const insertAdxScript = async () => {
  if (!isShowAd.value) return
  await nextTick()
  const { headScript, bodyScript } = adsAttrs
  if (headScript) {
    const head = document.head || document.getElementsByTagName('head')[0]
    insertScript(headScript, head)
  }
  if (bodyScript && adxRef.value) {
    adxRef.value.innerHTML = bodyScript
    const scripts = adxRef.value.getElementsByTagName('script')
    for (const script of scripts) {
      const newScript = document.createElement('script')
      newScript.type = 'text/javascript'
      newScript.text = script.text
      document.body.appendChild(newScript)
    }
  }
  // $eventTrack('load_ads', 'expose')
  customEventTrack.value('load_ads', 'expose', {
    adExcahnge: adsAttrs.index,
  })
}

onMounted(async () => {
  // 开启广告调试模式
  if (route.query.db) {
    isShowDebug.value = true
  }
  insertAdxScript()
})

onActivated(() => {
})
</script>

<template>
  <div
    v-if="isShowAd"
    class="ads-item"
  >
    <div
      class="ads-content"
      :class="customClass"
    >
      <div class="ads-content-title">
        Advertisement
      </div>
      <div
        ref="adx"
        class="adsbyexchange"
      />
    </div>
    <div
      v-if="isShowDebug"
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
  width: 100%;
  font-weight: 400;
  font-size: 16px;
}

.ads-content {
  border-bottom: 1px solid #c6c6c6;
  height: fit-content;

  .ads-content-title {
    display: flex;
    place-items: center;
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

  .adsbyexchange {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.ads-debug {
  border: 2px solid red;
  margin-bottom: 2px;
  background-color: #ffe786;
  color: #000;
}
</style>

/**
 * 监听广告点击
 * TODO 增加广告点击上报 (不含关闭按钮)
 * TODO 广告加载不成功时，不监听 iframe 点击
 * TODO 监听广告是否出现在页面中
 */

import { onMounted } from 'vue'

interface IframeObj {
  element: HTMLIFrameElement
  ins: HTMLElement
  clicked: boolean
  adSlot?: string
}

export const useAdsClickListener = () => {
  const { customEventTrack } = useFirebase()
  const ttTrack = useTikTokTrack()
  const fbTrack = useFBTrack()

  let isTrackingSetup = false // 是否已经设置监听
  let intervalTimer: NodeJS.Timeout | undefined // 定时器
  const iframeObjList: IframeObj[] = [] // iframe 对象列表

  /** 2. 监听 iframe 是否被点击 */
  const setupIframeTracking = (iframe: HTMLIFrameElement, ins: HTMLElement) => {
    if (isTrackingSetup) {
      console.log('🚨🚨🚨 Tracking 已经设置，清除定时器，重新设置')
      clearInterval(intervalTimer)
    }
    isTrackingSetup = true
    iframeObjList.push({
      element: iframe,
      ins,
      clicked: false,
      adSlot: ins.dataset.adSlot,
    })

    const checkIframeClick = () => {
      const activeElement = document.activeElement
      if (activeElement) {
        iframeObjList.forEach((iframeObj) => {
          if (!iframeObj) return
          if (activeElement === iframeObj.element && !iframeObj.clicked) {
            iframeObj.clicked = true
            console.log('🚀🚀🚀 广告被点击 ad_click', iframeObj.adSlot)
            // 获取 ins 元素的边界矩形
            const insRect = iframeObj.ins.getBoundingClientRect()

            // 计算 ins 元素相对于页面左上角的位置和高度
            const transformData = {
              insX: insRect.left,
              insY: insRect.top,
              insHeight: insRect.height,
              windowWidth: window.innerWidth,
              windowHeight: window.innerHeight,
            }

            // 1. JSCallAndroid 调用
            if (window.JSCallAndroid && typeof window.JSCallAndroid.adClick === 'function') {
              window.JSCallAndroid.adClick(JSON.stringify(transformData))
            }
            else {
              // console.log('🚀🚀🚀 transformData: ', transformData)
            }

            // 2. firebase 上报
            customEventTrack.value('ad_click', 'click', {
              'data-ad-slot': iframeObj.adSlot,
            })

            // 3. TikTok 上报
            ttTrack(iframeObj.adSlot || '0000', 'click', 'ad_iframe_click')
            fbTrack(iframeObj.adSlot || '0000')
          }
        })
      }
    }

    intervalTimer = setInterval(() => {
      checkIframeClick()
    }, 200)
  }

  onMounted(() => {
    /** 1. 监听广告是否插入并显示 */
    const mutationOb = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (
            node instanceof HTMLIFrameElement
            && node.closest('ins.adsbygoogle')
            && node.style.display !== 'none'
          ) {
            console.log('🚀🚀🚀 有广告 iframe 插入', node, node.closest('ins.adsbygoogle'))
            // 2. 在检测到广告 iframe 插入后，调用 setupIframeTracking
            setupIframeTracking(
              node,
              node.closest('ins.adsbygoogle') as HTMLElement,
            )
          }
        })
      })
    })
    mutationOb.observe(document.body, { childList: true, subtree: true })
  })
}

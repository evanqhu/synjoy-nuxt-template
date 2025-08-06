/**
 * @name Firebase
 */
import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics'

let analyticsInstance: ReturnType<typeof getAnalytics> | null = null

export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.env.NODE_ENV !== 'production') return
  // 读取你的配置
  const { webConfig } = useAppStore()
  const firebaseConfig = webConfig.firebase || {}

  // 初始化 Firebase Analytics
  if (!analyticsInstance) {
    try {
      const supported = await isSupported()
      if (supported) {
        const firebaseApp = initializeApp(firebaseConfig)
        analyticsInstance = getAnalytics(firebaseApp)
        // 记录一个名为 "in_page" 的事件，表示用户进入页面
        logEvent(analyticsInstance, 'in_page')
        console.log('🚀🚀🚀 firebase analytics: ', 'in_page')
      }
    }
    catch (error) {
      console.error('🚀🚀🚀 Firebase Analytics is not supported', error)
    }
  }

  // 挂载到 NuxtApp 上，方便全局访问
  nuxtApp.provide('firebase', {
    analytics: analyticsInstance,
    logEvent: analyticsInstance
      ? (eventName: string, method: string, eventParams = {}) => {
          const _eventParams = { time: new Date(), message: eventName, method, ...eventParams }
          logEvent(analyticsInstance!, eventName, _eventParams)
        }
      : () => {},
  })
})

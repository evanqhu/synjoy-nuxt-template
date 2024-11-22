// 仅在客户端运行的插件
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { $logEvent, $eventTrack } from '~/configs/constants'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { webConfig } = useAppStore()
  const firebaseConfig = webConfig.firebase

  /** 初始化 Firebase */
  const initializeFirebase = () => {
    const firebaseApp = initializeApp(firebaseConfig)

    // 启用 Analytics
    const analyticsInstance = getAnalytics(firebaseApp)
    return analyticsInstance
  }

  try {
    await isSupported()
    const analytics = initializeFirebase()

    // 记录一个名为 "in_page" 的事件，表示用户进入页面
    logEvent(analytics, 'in_page')
    console.log('🚀🚀🚀 firebase analytics: ', 'in_page')

    const _logEvent = (eventName: string, eventParams = {}) => {
      logEvent(analytics, eventName, eventParams)
      // console.log('🚀🚀🚀 firebase analytics: ', eventName)
    }
    const _eventTrack = (eventName: string, method: string, eventParams = {}) => {
      const _eventParams = {
        time: new Date(),
        message: eventName,
        method,
        ...eventParams,
      }
      logEvent(analytics, eventName, _eventParams)
      // console.log('🚀🚀🚀 firebase analytics: ', eventName)
    }

    nuxtApp.vueApp.provide($logEvent, _logEvent)
    nuxtApp.vueApp.provide($eventTrack, _eventTrack)
  }
  catch (error) {
    console.log('🚀🚀🚀 Firebase Analytics is not supported', error)

    const _logEvent = (eventName: string, eventParams = {}) => {
      console.log(`🚀🚀🚀 Client Log: ${eventName}`, eventParams)
    }
    const _eventTrack = (eventName: string, method: string, eventParams = {}) => {
      console.log(`🚀🚀🚀 Client Log: ${eventName}`, method, eventParams)
    }

    nuxtApp.vueApp.provide($logEvent, _logEvent)
    nuxtApp.vueApp.provide($eventTrack, _eventTrack)
  }
})

import { getAnalytics, isSupported, logEvent } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'

export const useFirebase = () => {
  // 定义默认的 log 和 track 函数
  let customLogEvent = (eventName: string, eventParams = {}) => {
    console.log(`🚀🚀🚀 Client Log: ${eventName}`, eventParams)
  }
  let customEventTrack = (eventName: string, method: string, eventParams = {}) => {
    console.log(`🚀🚀🚀 Client Track: ${eventName}`, method, eventParams)
  }

  // 仅客户端运行
  onBeforeMount(async () => {
    // 开发环境不运行 firebase
    if (process.env.NODE_ENV === 'development') {
      customLogEvent = (eventName: string, eventParams = {}) => {
        console.log(`🚀🚀🚀 Client Development Log: ${eventName}`, eventParams)
      }
      customEventTrack = (eventName: string, method: string, eventParams = {}) => {
        console.log(`🚀🚀🚀 Client Development Track: ${eventName}`, method, eventParams)
      }
    }
    else {
      const { webConfig } = useAppStore()
      const firebaseConfig = webConfig.firebase || {}

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

        customLogEvent = (eventName: string, eventParams = {}) => {
          logEvent(analytics, eventName, eventParams)
        // console.log('🚀🚀🚀 firebase analytics: ', eventName)
        }
        customEventTrack = (eventName: string, method: string, eventParams = {}) => {
          const _eventParams = {
            time: new Date(),
            message: eventName,
            method,
            ...eventParams,
          }
          logEvent(analytics, eventName, _eventParams)
        // console.log('🚀🚀🚀 firebase analytics: ', eventName)
        }
      }
      catch (error) {
        console.error('🚀🚀🚀 Firebase Analytics is not supported', error)
      }
    }
  })

  return {
    customLogEvent,
    customEventTrack,
  }
}

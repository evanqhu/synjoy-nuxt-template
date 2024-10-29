// 仅在客户端运行的插件
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'

export default defineNuxtPlugin(async () => {
  // TODO 是否应该放在 app.config.ts 中呢
  const config = useAppConfig()

  const firebaseConfig = {
    apiKey: config.FB_API_KEY,
    authDomain: config.FB_AUTH_DOMAIN,
    projectId: config.FB_PROJECT_ID,
    storageBucket: config.FB_STORAGE_BUCKET,
    messagingSenderId: config.FB_MESSAGING_SENDER_ID,
    appId: config.FB_APP_ID,
    measurementId: config.FB_MEASUREMENT_ID,
  }

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

    const $logEvent = (eventName: string, eventParams = {}) => {
      logEvent(analytics, eventName, eventParams)
      // console.log('🚀🚀🚀 firebase analytics: ', eventName)
    }

    const $eventTrack = (eventName: string, method: string, eventParams = {}) => {
      const _eventParams = {
        time: new Date(),
        message: eventName,
        method,
        ...eventParams,
      }
      logEvent(analytics, eventName, _eventParams)
      // console.log('🚀🚀🚀 firebase analytics: ', eventName)
    }

    return {
      provide: {
        logEvent: $logEvent,
        eventTrack: $eventTrack,
      },
    }
  }
  catch (error) {
    console.log('🚀🚀🚀 Firebase Analytics is not supported', error)
    return {
      provide: {
        logEvent: (eventName: string, eventParams = {}) => {
          console.log(`🚀🚀🚀 Client Log: ${eventName}`, eventParams)
        },
        eventTrack: (eventName: string, method: string, eventParams = {}) => {
          console.log(`🚀🚀🚀 Client Log: ${eventName}`, method, eventParams)
        },
      },
    }
  }
})

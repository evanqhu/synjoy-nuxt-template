import { getAnalytics, logEvent } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'

export const useFirebase = () => {
  let customLogEvent: (eventName: string, eventParams?: object) => void
  let customEventTrack: (eventName: string, method: string, eventParams?: object) => void

  // 服务端不运行 firebase
  if (import.meta.env.SSR) {
    customLogEvent = (eventName: string, eventParams = {}) => {
      console.log(`🚀🚀🚀 Server Log: ${eventName}`, eventParams)
    }
    customEventTrack = (eventName: string, method: string, eventParams = {}) => {
      console.log(`🚀🚀🚀 Server Track: ${eventName}`, method, eventParams)
    }
  }
  else {
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
      const firebaseConfig = webConfig.firebase

      /** 初始化 Firebase */
      const initializeFirebase = () => {
        const firebaseApp = initializeApp(firebaseConfig)

        // 启用 Analytics
        const analyticsInstance = getAnalytics(firebaseApp)
        return analyticsInstance
      }

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

      /* try {
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
        console.log('🚀🚀🚀 Firebase Analytics is not supported', error)

        customLogEvent = (eventName: string, eventParams = {}) => {
          console.log(`🚀🚀🚀 Client Log: ${eventName}`, eventParams)
        }
        customEventTrack = (eventName: string, method: string, eventParams = {}) => {
          console.log(`🚀🚀🚀 Client Log: ${eventName}`, method, eventParams)
        }
      } */
    }
  }

  return {
    customLogEvent,
    customEventTrack,
  }
}

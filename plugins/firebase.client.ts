/**
 * firebase 插件，用于提供 logEvent 和 eventTrack 方法
 * 仅在客户端运行
 */
// import { getAnalytics, isSupported, logEvent } from 'firebase/analytics'
// import { initializeApp } from 'firebase/app'

// export default defineNuxtPlugin(async () => {
//   // 开发环境不运行 firebase
//   if (process.env.NODE_ENV === 'development') {
//     return {
//       provide: {
//         logEvent: () => {
//           console.log('🚀🚀🚀 测试环境 firebase analytics')
//         },
//         eventTrack: () => {
//           console.log('🚀🚀🚀 测试环境 firebase analytics')
//         },
//       },
//     }
//   }
//   const { webConfig } = useAppStore()
//   const firebaseConfig = webConfig.firebase

//   /** 初始化 Firebase */
//   const initializeFirebase = () => {
//     const firebaseApp = initializeApp(firebaseConfig)

//     // 启用 Analytics
//     const analyticsInstance = getAnalytics(firebaseApp)
//     return analyticsInstance
//   }

//   let customLogEvent
//   let customEventTrack

//   try {
//     await isSupported()
//     const analytics = initializeFirebase()

//     // 记录一个名为 "in_page" 的事件，表示用户进入页面
//     logEvent(analytics, 'in_page')
//     console.log('🚀🚀🚀 firebase analytics: ', 'in_page')

//     customLogEvent = (eventName: string, eventParams = {}) => {
//       logEvent(analytics, eventName, eventParams)
//       // console.log('🚀🚀🚀 firebase analytics: ', eventName)
//     }
//     customEventTrack = (eventName: string, method: string, eventParams = {}) => {
//       const _eventParams = {
//         time: new Date(),
//         message: eventName,
//         method,
//         ...eventParams,
//       }
//       logEvent(analytics, eventName, _eventParams)
//       // console.log('🚀🚀🚀 firebase analytics: ', eventName)
//     }
//   }
//   catch (error) {
//     console.log('🚀🚀🚀 Firebase Analytics is not supported', error)

//     customLogEvent = (eventName: string, eventParams = {}) => {
//       console.log(`🚀🚀🚀 Client Log: ${eventName}`, eventParams)
//     }
//     customEventTrack = (eventName: string, method: string, eventParams = {}) => {
//       console.log(`🚀🚀🚀 Client Log: ${eventName}`, method, eventParams)
//     }
//   }

//   return {
//     provide: {
//       logEvent: customLogEvent,
//       eventTrack: customEventTrack,
//     },
//   }

//   // 不需要将 $logEvent 和 $eventTrack 挂载到 Vue 实例上，放在 NuxtApp 上即可
//   // nuxtApp.vueApp.provide($logEvent, _logEvent)
//   // nuxtApp.vueApp.provide($eventTrack, _eventTrack)
// })

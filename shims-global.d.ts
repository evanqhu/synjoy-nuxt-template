import type { getAnalytics } from 'firebase/analytics'
import type { WebConfig as ConfigType } from './app/web.configs.js'

declare global {
  interface Window {
    JSCallAndroid: any
    adsbygoogle: any
    ttq: any
    fbq: any
    bge: any
    kwaiq: any
    uetq: any
    google: any
    googleCallback: any
  }

  type WebConfig = ConfigType
}

declare module '#app' {
  interface NuxtApp {
    $firebase: {
      analytics: ReturnType<typeof getAnalytics> | null
      logEvent: (eventName: string, method: string, eventParams?: Record<string, any>) => void
    }
  }
}

// 现有声明不变
export {}

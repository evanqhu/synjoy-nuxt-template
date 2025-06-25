import type { WebConfig as ConfigType } from '../app/web-configs.ts'

declare global {
  interface Window {
    JSCallAndroid: Fun
    adsbygoogle: any
    ttq: any
    fbq: any
    bge: any
    google: any
    googleCallback: any
  }

  type WebConfig = ConfigType
}

declare module '#app' {
  interface NuxtApp {
    $firebase: {
      analytics: Analytics | null
      logEvent: (eventName: string, method: string, eventParams?: Record<string, any>) => void
    }
  }
}

// 现有声明不变
export {}

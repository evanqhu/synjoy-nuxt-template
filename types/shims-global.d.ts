// src/types/shims-global.d.ts
import type { WebConfig as ConfigType } from '~/web-configs'

declare global {
  interface Window {
    JSCallAndroid: any
    adsbygoogle: any
    ttq: any
  }

  type WebConfig = ConfigType
}

// 现有声明不变
export {}

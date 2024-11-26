// src/types/shims-global.d.ts
import type { WebConfig as ConfigType } from '~/configs/web-configs'

declare global {
  interface Window {
    adsbygoogle: any
  }

  type WebConfig = ConfigType
}

// 现有声明不变
export {}

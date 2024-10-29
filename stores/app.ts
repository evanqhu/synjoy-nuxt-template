import { defaultSettings } from '~/settings'

export const useAppStore = defineStore('app', () => {
  /** adSenseConfig */
  const adSense = ref(defaultSettings.adSense)

  const deviceType = ref('mobile')

  /** 调试广告模式 */
  const showDebug = ref(false)

  const toggleDeviceType = () => {
    deviceType.value = deviceType.value === 'mobile' ? 'desktop' : 'mobile'
  }

  /** 切换 debug 模式 */
  const toggleDebug = (type: boolean) => {
    showDebug.value = type
  }

  return {
    adSense,
    deviceType,
    showDebug,
    toggleDeviceType,
    toggleDebug,
  }
})

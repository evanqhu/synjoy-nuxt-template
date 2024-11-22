import type { WebConfig } from '~/configs/webConfigs'

export const useAppStore = defineStore('app', () => {
  /** 设备类型 */
  const deviceType = ref('mobile')

  /** 调试广告模式 */
  const showDebug = ref(false)

  /** 网站配置 */
  const webConfig = ref<WebConfig>({} as WebConfig)

  /** 切换设备类型 */
  const toggleDeviceType = () => {
    deviceType.value = deviceType.value === 'mobile' ? 'desktop' : 'mobile'
  }

  /** 切换 debug 模式 */
  const toggleDebug = (type: boolean) => {
    showDebug.value = type
  }

  return {
    deviceType,
    showDebug,
    webConfig,
    toggleDeviceType,
    toggleDebug,
  }
})

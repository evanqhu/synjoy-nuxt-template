import type { WebConfig } from '~/configs/webConfigs'

export const useAppStore = defineStore('app', () => {
  /** 设备类型 */
  const deviceType = ref('mobile')

  /** 网站配置 */
  const webConfig = ref<WebConfig>({} as WebConfig)

  /** 切换设备类型 */
  const toggleDeviceType = () => {
    deviceType.value = deviceType.value === 'mobile' ? 'desktop' : 'mobile'
  }

  return {
    deviceType,
    webConfig,
    toggleDeviceType,
  }
})

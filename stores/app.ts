import { defaultSettings } from '~/settings'

export const useAppStore = defineStore('app', () => {
  /** adSenseConfig */
  const adSense = ref(defaultSettings.adSense)

  const deviceType = ref('mobile')

  const toggleDeviceType = () => {
    deviceType.value = deviceType.value === 'mobile' ? 'desktop' : 'mobile'
  }
  return {
    adSense,
    deviceType,
    toggleDeviceType,
  }
})

export const useAppStore = defineStore('app', () => {
  const deviceType = ref('mobile')

  const toggleDeviceType = () => {
    deviceType.value = deviceType.value === 'mobile' ? 'desktop' : 'mobile'
  }
  return {
    deviceType,
    toggleDeviceType,
  }
})

/**
 * 自定义检测设备类型
 */
export const useCustomDevice = () => {
  // 从 Nuxt App 获取 device module 的实例
  const { $device } = useNuxtApp()

  // 初始化响应式状态
  const isMobile = ref($device.isMobile)
  const isDesktop = ref(!$device.isMobile)

  // 更新状态的方法
  const _resizeHandler = () => {
    const userAgent = navigator.userAgent.toLocaleLowerCase()
    const matchesMobile = /mobile|android|webos|iphone|ipod|blackberry/i.test(userAgent)
    isMobile.value = matchesMobile
    isDesktop.value = !matchesMobile
  }

  // 监听 window resize 事件
  onMounted(() => {
    window.addEventListener('resize', _resizeHandler)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', _resizeHandler)
  })

  return {
    isMobile,
    isDesktop,
  }
}

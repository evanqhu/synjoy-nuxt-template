/**
 * @name 自定义检测设备类型（基于屏幕宽度，768px 作为分界点）
 * @note 不要使用 isMobile 来约束 UI，可能会导致水合错误
 * @note onMounted 之后，isMobile 的值才是正确的
 */
export function useCustomDevice() {
  // 初始化响应式状态
  const isMobile = ref(true)
  const isDesktop = ref(false)

  // 更新状态的方法
  const _resizeHandler = () => {
    const width = window.innerWidth
    isMobile.value = width <= 768
    isDesktop.value = width > 768
  }

  // 监听 window resize 事件
  onMounted(() => {
    _resizeHandler() // 初始化时立即判断一次
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

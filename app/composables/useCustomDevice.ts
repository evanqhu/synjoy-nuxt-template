/**
 * @name 自定义检测设备类型（基于屏幕宽度，768px 作为分界点）
 * @note 不要使用 isMobile 来约束 UI，可能会导致水合错误
 * @note onMounted 之后，isMobile 的值才是正确的
 */
const isMobile = ref(true)
const isDesktop = ref(false)
const initialWidth = ref<number>() // 初始宽度

export function useCustomDevice() {
  // 更新状态的方法
  const _resizeHandler = () => {
    const width = window.innerWidth
    isMobile.value = width <= 768
    isDesktop.value = width > 768
  }

  // 监听 window resize 事件
  onMounted(() => {
    _resizeHandler() // 初始化时立即判断一次
    initialWidth.value = window.innerWidth
    window.addEventListener('resize', _resizeHandler)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', _resizeHandler)
  })

  // 只在初始宽度和当前宽度跨越 768px 分界线时才 reload
  watch(isMobile, () => {
    if (initialWidth.value) {
      const currentWidth = window.innerWidth
      const crossesBreakpoint = (initialWidth.value <= 768 && currentWidth > 768)
        || (initialWidth.value > 768 && currentWidth <= 768)

      if (crossesBreakpoint) {
        window.location.reload()
      }
    }
  })

  return {
    isMobile,
    isDesktop,
  }
}

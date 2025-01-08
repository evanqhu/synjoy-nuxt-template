// App Store
export const useAppStore = defineStore('app', () => {
  /** 网站配置 */
  const webConfig = ref<WebConfig>({} as WebConfig)

  /** MenuDrawer 状态 */
  const menuDrawerOpened = ref(false)

  /** 切换 MenuDrawer 状态 */
  const toggleMenuDrawer = (type: boolean) => {
    menuDrawerOpened.value = type
  }

  return {
    webConfig,
    menuDrawerOpened,
    toggleMenuDrawer,
  }
})

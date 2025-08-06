// App Store
export const useAppStore = defineStore('app', () => {
  /** 网站配置 */
  const webConfig = ref<WebConfig>({} as WebConfig)

  /** MenuDrawer 状态 */
  const menuDrawerOpened = ref(false)

  /** 章节列表 */
  const chapterListData = ref<{
    hasNextPage: boolean
    pageNum: number
    total: number
  }>({
    hasNextPage: true,
    pageNum: 2,
    total: 0,
  })

  return {
    webConfig,
    menuDrawerOpened,
    chapterListData,
  }
})

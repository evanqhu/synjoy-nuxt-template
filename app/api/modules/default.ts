// 首页内容接口
export interface HomeContentResponse {
  scrollLayer: QuoteItem[]
  todayLayer: QuoteItem[]
  photoLayer: QuoteItem[]
  preLayer: QuoteItem[]
  trendingLayer: QuoteItem[]
  siteLayer: SiteItem[]
}

// 单条名言数据
export interface QuoteItem {
  id: number
  siteId: number
  progressId: number
  content: string
  author: string
  authorAvatar: string
  topics: string // 原始 JSON 是字符串，如 "[\"Dream\",\"Motivation\"]"
  topicList: string[] // 主题数组
  composeImg: string
  composeImgCompressed: string
  backgroundImg: string | null
  createTime: number
}

// 站点信息
export interface SiteItem {
  siteId: number
  siteName: string
  siteDomain: string
  siteImg: string
}

/** 获取首页内容 */
export function requestHomeContent() {
  return request.get<HomeContentResponse>('/quote/homePage')
}

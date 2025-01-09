// interface IBlog {
//   id: number
//   userId: number
//   title: string
//   body: string
// }
// sparkline 迷你图
export interface Candles {
  priceClose: number
  priceOpen: number
  priceHigh: number
  priceLow: number
  timestamp: number
}

export interface TopMoversCoinInfo {
  coinFullName: string
  coinShortName: string
  logoUrl: string
  nowPrice: number
  nowPriceText: string
  originId: string
  priceChange1d: number
  candles: Candles[]
}

// export const getData = (params?: string) => {
//   console.log('🚀🚀🚀 params: ', params)
//   return useRequest.get<Array<IBlog>>('/posts')
// }
export const fetchTopMovers = async () => {
  const result = await useRequest.get<{ datas: TopMoversCoinInfo[] }>('/coin/priceIncreaseTop4')
  // console.log('🚀🚀🚀 result: ', result)
  return result
}

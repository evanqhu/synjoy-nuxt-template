export interface PhotoInfo {
  id: number
  author: string
  authorAvatar: string
  prompt: string
  width: number
  height: number
  timestamp: string
  thumbnailImg1: string
  img1: string
  thumbnailImg2: string
  img2: string
  thumbnailImg3: string
  img3: string
  thumbnailImg4: string
  img4: string
  status: number
  updateTime: string
  createTime: string
  userName: string
  userProfileSmallUrl: string
  userProfileMediumUrl: string
}

export interface RecommendedPhontosResponse {
  total: number
  hasNext: boolean
  list: PhotoInfo[]
}

/** 获取推荐图片列表 */
export const requestRecommendedPhotos = (query: { pageSize: number, pageNum: number } = { pageSize: 50, pageNum: 1 }) => {
  return request.get<RecommendedPhontosResponse>('/photo/photoPage', {
    query,
  })
}

// 用户相关接口

export interface LoginResponse {
  userId: number
  name: string
  avatar: string
  tokenName: string
  tokenValue: string
}

/** 登录 */
export const login = (data: { ggToken: string }) => {
  return request.post<LoginResponse>('/user/login', data)
}

export interface UserInfo {
  id: number
  ggUserId: string
  email: string
  name: string
  avatar: string
  locale: string | null
  coinsTotal: number
  coinsCost: number
  updateTime: string
  createTime: string
}

/** 获取用户信息 */
export const requestUserInfo = async () => {
  return request.get<{ user: UserInfo }>('/user/info')
}

/** 退出登录 */
export const logout = async () => {
  return request.get('/user/logout')
}

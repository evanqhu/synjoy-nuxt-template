import type { UserInfo } from '~/api/modules/user'

// User Store
export const useUserStore = defineStore('user', () => {
  // 是否已登录
  const isAuth = ref(false)

  // 用户信息
  const userInfo = ref<UserInfo>()

  /** 登录 */
  const login = async (data: { ggToken: string }) => {
    const res = await api.userApi.login(data)
    if (res?.tokenValue) {
      // 设置 token
      useCookie(TOKEN_KEY).value = res.tokenValue
    }
  }

  /** 获取用户信息 */
  const getUserInfo = async () => {
    const res = await api.userApi.requestUserInfo()
    if (res?.user) {
      isAuth.value = true
      userInfo.value = res.user
    }
  }

  /** 退出登录 */
  const logout = async () => {
    await api.userApi.logout()
    useCookie(TOKEN_KEY).value = null
    isAuth.value = false
    userInfo.value = undefined
  }

  return {
    isAuth,
    userInfo,
    login,
    getUserInfo,
    logout,
  }
})

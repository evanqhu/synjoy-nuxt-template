// import type { UserInfo } from '~/api/modules/user'

// // User Store
// export const useUserStore = defineStore('user', () => {
//   // 是否已登录
//   const isAuth = ref(false)

//   // token key
//   const TOKEN_KEY = ref('')

//   // 用户信息
//   const userInfo = ref<UserInfo>()

//   /** 登录 */
//   const login = async (data: { ggToken: string }) => {
//     const res = await api.userApi.login(data)
//     if (res?.tokenName && res?.tokenValue) {
//       TOKEN_KEY.value = res.tokenName
//       // 设置 token
//       useCookie(TOKEN_KEY.value, {
//         maxAge: 60 * 60 * 24 * 30, // 30 天
//       }).value = res.tokenValue
//     }
//   }

//   /** 获取用户信息 */
//   const getUserInfo = async () => {
//     const res = await api.userApi.requestUserInfo()
//     if (res?.user) {
//       isAuth.value = true
//       userInfo.value = res.user
//     }
//   }

//   /** 退出登录 */
//   const logout = async () => {
//     await api.userApi.logout()
//     useCookie(TOKEN_KEY.value).value = null
//     isAuth.value = false
//     userInfo.value = undefined
//   }

//   return {
//     isAuth,
//     TOKEN_KEY,
//     userInfo,
//     login,
//     getUserInfo,
//     logout,
//   }
// })

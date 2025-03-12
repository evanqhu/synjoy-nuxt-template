// 全局路由中间件，在路由变化时执行
export default defineNuxtRouteMiddleware(async (to, from) => {
  // const { smartNavigate } = useCustomRouting()
  // const token = useCookie(TOKEN_KEY)
  // const userStore = useUserStore()

  // // 有 token
  // if (token.value) {
  //   if (to.name === 'login') {
  //     return smartNavigate('/')
  //   }
  //   else {
  //     // 判断是否获取用户信息
  //     if (userStore.userInfo) {
  //       return
  //     }
  //     else {
  //       // 获取用户信息
  //       try {
  //         await userStore.getUserInfo()
  //         return
  //       }
  //       catch (error) {
  //         // 移除 token 并跳转到登录页重新登录
  //         console.error('获取用户信息失败', error)
  //         token.value = null
  //         ElMessage({
  //           message: 'Get user info failed, please login again.',
  //           type: 'error',
  //         })
  //         return smartNavigate('/login')
  //       }
  //     }
  //   }
  // }
  // // 无 token
  // else {
  //   // 如果页面不需要登录，则直接跳转
  //   if (!to.meta.requireAuth) return
  //   // 否则跳转到登录页
  //   else return smartNavigate('/login')
  // }
})

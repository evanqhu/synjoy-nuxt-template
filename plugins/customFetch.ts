// 定义全局自定义 $customFetch 方法的插件
export default defineNuxtPlugin(() => {
  const userAuth = useCookie('token')
  const runtimeConfig = useRuntimeConfig()

  const $customFetch = $fetch.create({
    baseURL: runtimeConfig.public.baseURL ?? 'http://localhost:3000',
    onRequest({ request, options, error }) {
      if (userAuth.value) {
        // Add Authorization header
        options.headers.set('Authorization', `Bearer ${userAuth.value}`)
      }
    },
    onResponse({ response }) {
      // response._data = new myBusinessResponse(response._data)
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        navigateTo('/login')
      }
    },
  })
  // 向 nuxtApp 全局上下文提供自定义的 $customFetch 方法（Expose to useNuxtApp().$customFetch）
  return {
    provide: {
      customFetch: $customFetch,
    },
  }
})

// API 接口请求 (如果有其他后端接口地址，封装其他的组合式函数)
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

type RequestParams = NitroFetchOptions<NitroFetchRequest, 'options' | 'get' | 'head' | 'patch' | 'post' | 'put' | 'delete' | 'connect' | 'trace'>

/** 自定义封装 $fetch 方法 */
const _fetch = $fetch.create({
  // 请求根路径
  baseURL: useRuntimeConfig().public.baseURL,
  // 请求拦截器
  onRequest({ options }) {
    const userAuth = useCookie('token')
    if (userAuth.value) {
      // Add Authorization header
      options.headers.set('Authorization', `Bearer ${userAuth.value}`)
    }
  },
  // 响应拦截器
  onResponse() {
    // response._data = new myBusinessResponse(response._data)
  },
  // 响应错误拦截器
  onResponseError({ response }) {
    if (response.status === 401) {
      navigateTo('/login')
    }
  },
})

/** 自动导出方法 */
export const useRequest = {
  get<T>(url: string, params?: RequestParams) {
    return _fetch<T>(url, { method: 'get', ...params })
  },
  post<T>(url: string, data?: Record<string, unknown>, params?: RequestParams) {
    return _fetch<T>(url, { method: 'post', body: data, ...params })
  },
}

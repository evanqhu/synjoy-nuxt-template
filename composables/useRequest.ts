// API 接口请求 (如果有其他后端接口地址，封装其他的组合式函数)
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

type RequestParams = NitroFetchOptions<NitroFetchRequest, 'options' | 'get' | 'head' | 'patch' | 'post' | 'put' | 'delete' | 'connect' | 'trace'>

/** 自定义封装 $fetch 方法 */
const _fetch = $fetch.create({
  // 设置超时时间为 10 秒
  timeout: 1000 * 10,
  // 请求拦截器
  onRequest({ options }) {
    // 设置请求根路径
    const runtimeConfig = useRuntimeConfig()
    options.baseURL = runtimeConfig.public.apiBase

    // 设置请求头
    const userAuth = useCookie('token')
    if (userAuth.value) {
      // Add Authorization header
      options.headers.set('Authorization', `Bearer ${userAuth.value}`)
    }
  },
  // 响应拦截器
  onResponse({ response }) {
    if (!response.ok) {
      console.error('请求失败', response.statusText)
      throw new Error(`请求错误：${response.status}`)
    }

    // 与后端约定的数据响应格式
    const { data, code, msg, success } = response._data

    if (!success) {
      console.error('接口错误：', msg)
      throw new Error(msg || '未知错误')
    }

    // 通过修改 response._data 来修改响应数据
    response._data = data

    // 直接返回 data 不生效
    // return data
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

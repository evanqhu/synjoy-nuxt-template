// API 接口请求 (如果有其他后端接口地址，封装其他的组合式函数)
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

export type RequestParams = NitroFetchOptions<NitroFetchRequest, 'options' | 'get' | 'head' | 'patch' | 'post' | 'put' | 'delete' | 'connect' | 'trace'>

/** 自定义封装 $fetch 方法 */
export const customFetch = $fetch.create({
  // 设置请求根路径
  baseURL: '/api',
  // 设置超时时间为 20 秒
  timeout: 1000 * 20,
  // 请求拦截器
  onRequest({ options }) {
    // 设置请求根路径
    // const runtimeConfig = useRuntimeConfig()
    options.baseURL = '/api'

    // const { webConfig } = useAppStore()

    // options.headers.set('home_template', '2')
    // options.headers.set('novel_template', webConfig.novelTemplate.toString())

    // 在服务端请求时，通过自定义 header 传递 token
    // const { TOKEN_KEY } = useUserStore()
    // const userAuth = useCookie(TOKEN_KEY)
    // if (userAuth.value) {
    //   options.headers.set(TOKEN_KEY, userAuth.value)
    // options.headers.set('cookie', `${TOKEN_KEY}=${userAuth.value}`)
    // Add Authorization header
    // options.headers.set('Authorization', `Bearer ${userAuth.value}`)
    // }

    // 也可使用 useRequestHeaders() 将客户端的 cookie 添加到服务端的请求头中
    // const headers = useRequestHeaders(['cookie'])
    // Object.entries(headers).forEach(([key, value]) => {
    //   options.headers.set(key, value)
    // })
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
      // 创建一个包含完整错误信息的错误对象
      const error = new Error(msg || '接口错误')
      // 将接口返回的所有信息附加到错误对象上
      Object.assign(error, { code, data, success })
      throw error
    }

    // 通过修改 response._data 来修改响应数据
    response._data = data
  },
  // 响应错误拦截器
  onResponseError({ response }) {
    if (response.status === 401) {
      navigateTo('/login')
    }
  },
})

/** 自动导出方法 */
export const request = {
  get<T>(url: string, params?: RequestParams) {
    return customFetch<T>(url, { method: 'get', ...params })
  },
  post<T>(url: string, data?: Record<string, unknown>, params?: RequestParams) {
    return customFetch<T>(url, { method: 'post', body: data, ...params })
  },
}

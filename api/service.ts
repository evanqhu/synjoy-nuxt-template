import type { NitroFetchOptions } from 'nitropack'
// 封装网络请求函数
// TODO 感觉这里的类型定义写的不好
export function customFetch(url: string, options?: NitroFetchOptions<string, 'options' | 'get' | 'head' | 'patch' | 'post' | 'put' | 'delete' | 'connect' | 'trace'>) {
  return useNuxtApp().$customFetch(url, options)
}

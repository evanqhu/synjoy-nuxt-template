// 替代原生 useFetch 方法
import type { UseFetchOptions } from 'nuxt/app'

export function useCustomFetch<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {},
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$customFetch, // 将自定义的 fetch 方法传递给 useFetch
  })
}

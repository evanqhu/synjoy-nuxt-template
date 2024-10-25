import { customFetch } from '../service'

export const getData = async (params?: string) => {
  // console.log('🚀🚀🚀 params: ', params)
  return customFetch('/posts')
  // return useNuxtApp().$customFetch('/posts')
  // return $fetch('/posts')
}

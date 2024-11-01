export const getData = (params?: string) => {
  console.log('🚀🚀🚀 params: ', params)
  return useRequest.get<Array<unknown>>('/posts')
}

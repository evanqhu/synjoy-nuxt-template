interface IBlog {
  id: number
  userId: number
  title: string
  body: string
}

export const getData = (params?: string) => {
  console.log('🚀🚀🚀 params: ', params)
  return useRequest.get<Array<IBlog>>('/posts')
}

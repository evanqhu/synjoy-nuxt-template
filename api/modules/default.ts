export interface User {
  id: number
  name: string
  username: string
  email: string
  address: object
  phone: string
  website: string
  company: object
}

export const requestUsers = () => {
  return request.get<Array<User>>('/users')
}

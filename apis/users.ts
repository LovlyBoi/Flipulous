import { request } from '@/utils/request'

interface ResponseData<T = unknown> {
  code: number
  msg: string
  data: T
}

export function login(username: string, password: string)  {
  return request<ResponseData<{
    token: string
    username: string
  }>>({
    method: 'GET',
    url: '/user/login',
    params: {
      account: username,
      password,
    }
  })
}

export function register(username: string, password: string)  {
  return request<ResponseData<{
    token: string
    username: string
  }>>({
    method: 'POST',
    url: '/user/register',
    data: {
      account: username,
      password,
    }
  })
}

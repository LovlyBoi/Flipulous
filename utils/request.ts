import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  timeout: 60 * 1000,
  baseURL: process.env.AXIOS_BASEURL,
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.token = token
  }
  return config
})

async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const { data } = await instance.request<T>(config)
  return data
}

export { request }

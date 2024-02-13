import { create } from 'zustand'

interface UserStore {
  username: string
  setUsername: (username: string) => void
  token: string
  setToken: (token: string) => void
  logout: () => void
}

export const useUserStore = create<UserStore>()(
  (set, get) => ({
    username: '',
    setUsername: (username) => {
      localStorage.setItem('username', username) // 保存用户名到本地存储
      set(() => ({ username }))
    },
    token: '',
    setToken: (token) => {
      localStorage.setItem('token', token) // 保存token到本地存储
      set(() => ({ token }))
    },
    logout: () => {
      localStorage.removeItem('token') // 清除本地存储中的用户名
      set(() => ({ token: '' }))
    }
  }),
)

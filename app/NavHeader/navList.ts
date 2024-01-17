import { type ReactNode } from 'react'

type NavListItem = {
  title: string
  to?: string
  render?: (mobile?: boolean) => ReactNode
}

export const navList: NavListItem[] = [
  {
    title: '全部',
    to: '/',
  },
  {
    title: '笔记',
    to: '/notes',
  },
  {
    title: '生活随笔',
    to: '/essays',
  },
]

import { type ReactNode } from 'react'
import Link from 'next/link'

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
  {
    title: '管理文章',
    render() {
      return (
        <Link href="http://siven.cc/cms/index.html" target="_blank">
          管理文章
        </Link>
      )
    },
  },
]

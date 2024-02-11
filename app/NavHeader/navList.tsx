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
    title: '收藏',
    to: '/favorites',
  },
  {
    title: '登录/注册',
    render() {
      return <div>
        <Link href="/login" className='hover:text-indigo-400'>登录</Link>
        <span className='mx-[2px]'>/</span>
        <Link href="/register" className='hover:text-indigo-400'>注册</Link>
      </div>
    }
  },
]

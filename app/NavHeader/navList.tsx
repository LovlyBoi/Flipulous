import { useEffect, type ReactNode } from 'react'
import Link from 'next/link'
import { useUserStore } from '../(users)/userStore'
import { useRouter } from 'next/navigation'

type NavListItem = {
  title: string
  to?: string
  render?: (mobile?: boolean) => ReactNode
}

function LoginButton() {
  'use client'
  const router = useRouter()

  const token = useUserStore((store) => store.token)
  const logout = useUserStore((store) => store.logout)

  return (
    <div>
      {token ? (
        <a
          onClick={(e) => {
            e.preventDefault()
            logout()
            router.push('/login')
          }}
          className="hover:text-indigo-400 cursor-pointer"
        >
          登出
        </a>
      ) : (
        <>
          <Link href="/login" className="hover:text-indigo-400">
            登录
          </Link>
          <span className="mx-[2px]">/</span>
          <Link href="/register" className="hover:text-indigo-400">
            注册
          </Link>
        </>
      )}
    </div>
  )
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
      return <LoginButton />
    },
  },
]

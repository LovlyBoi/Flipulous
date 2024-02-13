'use client'
import { useEffect, type FC, type ReactNode } from 'react'
import { useUserStore } from '@/app/(users)/userStore'

type Props = {
  children?: ReactNode
}

const UserState: FC<Props> = ({ children }) => {
  const setUsername = useUserStore((store) => store.setUsername)
  const setToken = useUserStore((store) => store.setToken)

  useEffect(() => {
    const username = window.localStorage.getItem('username')
    const token = window.localStorage.getItem('token')

    username && setUsername(username)
    token && setToken(token)
  }, [setUsername, setToken])

  return children
}

export default UserState

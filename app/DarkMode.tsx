'use client'
import { useDarkMode } from '@/utils/useDarkMode'
import type { FC, ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const DarkMode: FC<Props> = ({ children }) => {
  useDarkMode()

  return <>{children}</>
}

export default DarkMode

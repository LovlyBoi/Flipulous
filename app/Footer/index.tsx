'use client'
import { type FC, type ReactNode, useState, useRef } from 'react'
import Image from 'next/image'
import { CSSTransition } from 'react-transition-group'
import Love from '@/static/img/love.svg'
import Nextjs from '@/static/img/next.svg'
import Vercel from '@/static/img/vercel.svg'

type Props = {
  children?: ReactNode
}

const Footer: FC<Props> = () => {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const [isMsgVisiable, setIsMsgVisiable] = useState(false)

  function handleEnter() {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setIsMsgVisiable(true)
    }, 500)
  }

  function handleLeave() {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setIsMsgVisiable(false)
    }, 500)
  }

  return (
    <footer className="mt-0 md:mt-10 py-6 font-serif tracking-wide text-gray-600 dark:text-gray-500 cursor-default text-sm md:flex md:flex-row-reverse md:justify-between border-t border-gray-300">
      {/* 作者 */}
      <div className="md:text-right">
        <div className="mb-1">
          Powered with{' '}
          <Image
            height={20}
            src={Nextjs}
            alt="next.js logo"
            className="inline-block -mt-0.5 -mx-3 h-3"
          />{' '}
          by
          <Image
            height={20}
            src={Vercel}
            alt="next.js logo"
            className="inline-block -mt-0.5 h-4 -mr-2"
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer

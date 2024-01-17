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
    <footer className="mt-0 md:mt-10 py-6 font-serif tracking-wide text-gray-600 dark:text-gray-500 cursor-default text-sm md:flex md:justify-between border-t border-gray-300">
      {/* 备案信息 */}
      <div className="mb-4 md:mb-0">
        <div className="mb-1">
          <span>Copyright © 2022 - 2024</span>
          <span className="text-purple-500 mx-2">Siven</span>
          <span>. All Rights Reserved.</span>
        </div>
        <a
          className="text-gray-500 underline-offset-2 hover:underline font-sans"
          href="https://beian.miit.gov.cn/"
          target="_blank"
        >
          黑ICP备2022008289号-1
        </a>
      </div>
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
        <div>
          Develop with
          <Image
            width={20}
            src={Love}
            alt="love"
            className="inline-block w-4 -mt-0.5 mx-2 cursor-pointer"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          />
          by <span className="underline">Siven</span> and{' '}
          <span className="underline">Lin</span>.
        </div>
        <div className="h-[1em]">
          {/* 把空间支撑起来，不让页面抖动 */}
          <CSSTransition
            in={isMsgVisiable}
            classNames="fade"
            timeout={300}
            unmountOnExit
          >
            <div>Some good idea support by Semghh</div>
          </CSSTransition>
        </div>
      </div>
    </footer>
  )
}

export default Footer

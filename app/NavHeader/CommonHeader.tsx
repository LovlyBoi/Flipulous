'use client'
import { useState, type FC, type ReactNode, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import avatar from '@/static/img/avatar.jpg'
import styles from './index.module.css'
import { useScreenType } from '@/utils/useScreen'
import { navList } from './navList'

type Props = {
  children?: ReactNode
}

const CommonHeader: FC<Props> = () => {
  const pathname = usePathname()

  const [expend, setExpend] = useState(false)

  // 没有用，只是为了解决CSSTransition警告的问题
  // see: https://github.com/reactjs/react-transition-group/issues/668
  const nodeRef = useRef(null)

  const isPhone = useScreenType() === 'phone'

  if (isPhone) {
    // 如果是手机端，收起导航栏
    expend && setExpend(false)
  }

  // 展开或收起导航栏，手机端不触发该事件
  const handleExpendChange = (checked: boolean) => {
    setExpend(checked)
  }

  // 手机端点击菜单事件
  const handlePhoneMenuClick = () => {
    console.log('is phone click')
  }

  return (
    <header className={styles['nav-header']}>
      <div className="header-wrapper sm:inline-block">
        <input
          type="checkbox"
          id="extend-header-btn"
          className="hidden"
          checked={expend}
          onChange={(e) => handleExpendChange(e.target.checked)}
        />
        <section className="header bg-l-white-d-slate-600 p-4 mt-2 rounded-lg shadow-sm flex justify-between sm:mt-4 md:mt-24 items-center">
          <div className="left flex items-center mr-6">
            <Link
              href="/"
              className="block w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden"
            >
              <Image
                src={avatar}
                alt="siven avatar"
                priority={false}
                className="block w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden"
              />
            </Link>
            <div className="flex flex-col ml-2">
              <Link
                href="/"
                className="text-l-gray-600-d-gray-200 text-sm sm:text-lg tracking-wider"
              >
                Flipulous
              </Link>
              <div className="text-l-gray-400-d-gray-400 text-xs tracking-wider font-thin">
                Flip to translate
              </div>
            </div>
          </div>

          <nav className="min-w-[80px]">
            <CSSTransition
              nodeRef={nodeRef}
              in={expend}
              classNames="draw"
              timeout={300}
              appear
              unmountOnExit
            >
              <ul
                ref={nodeRef}
                className="nav-list text-l-gray-400-d-gray-400 flex items-center h-8 overflow-x-hidden"
              >
                {navList.map((nav) => (
                  <li
                    className={`px-6 whitespace-nowrap ${
                      pathname === nav.to
                        ? 'text-gray-600 dark:text-gray-200'
                        : ''
                    }`}
                    key={nav.title}
                  >
                    {nav.render ? (
                      nav.render()
                    ) : (
                      <Link
                        href={nav.to ?? '/'}
                        className="hover:text-indigo-400 dark:hover:text-pink-300"
                      >
                        {nav.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </CSSTransition>
          </nav>

          <div className="right flex items-center ml-6 md:mr-4">
            {isPhone ? (
              // 手机菜单按钮
              <div
                className={`${styles['menu-static']} flex flex-col justify-around cursor-pointer`}
                onClick={() => handlePhoneMenuClick()}
              >
                <div className="bg-l-gray-700-gray-200" />
                <div className="bg-l-gray-700-gray-200" />
                <div className="bg-l-gray-700-gray-200" />
              </div>
            ) : (
              // 大屏幕菜单按钮
              <label
                htmlFor="extend-header-btn"
                className={
                  expend ? styles['cross-movable'] : styles['menu-movable']
                }
              >
                <div className="bg-l-gray-700-gray-200" />
                <div className="bg-l-gray-700-gray-200" />
                <div className="bg-l-gray-700-gray-200" />
              </label>
            )}
          </div>
        </section>
      </div>
    </header>
  )
}

export default CommonHeader

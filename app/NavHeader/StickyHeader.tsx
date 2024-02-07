'use client'
import { type FC, type ReactNode, forwardRef } from 'react'
import Link from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'
import { navList } from './navList'
import Avatar from '@/static/img/avatar.jpg'
import styles from './index.module.css'

type Props = {
  children?: ReactNode
}

const StickyHeader = forwardRef<HTMLElement, Props>((props, ref) => {
  return (
    <header
      ref={ref}
      className={`${styles['nav-header']} ${styles['sticky-header']} backdrop-blur-sm bg-l-white/90-d-slate-600 fixed mt-0 top-0 mx-auto p-4 rounded-b-lg shadow-sm flex items-center justify-between z-10`}
    >
      <div className="left flex items-center">
        <Link
          href="/"
          className="block w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden"
        >
          <img
            src={Avatar.src}
            className="object-cover w-8 h-8 sm:w-12 sm:h-12"
          />
        </Link>
        <div className="flex flex-col ml-2">
          <Link
            href="/"
            className="text-l-gray-600-d-gray-200 text-sm sm:text-lg tracking-wider"
          >
            浅秋细语
          </Link>
          <div className="text-l-gray-400-d-gray-400 text-xs tracking-wider font-thin">
            智文的前端小站
          </div>
        </div>
      </div>

      <div className="right flex items-center">
        <ThemeSwitcher></ThemeSwitcher>

        <ul className="hidden md:flex nav-list text-l-gray-400-d-gray-400 items-center h-8 overflow-x-hidden">
          {navList.map((nav) => (
            <li
              className="mx-6 whitespace-nowrap transition-all duration-300 group"
              key={nav.title}
            >
              {nav.render ? (
                nav.render()
              ) : (
                <Link
                  href={nav.to ?? '/'}
                  className="group-hover:text-indigo-400 dark:group-hover:text-pink-300"
                >
                  {nav.title}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <label
          className={`${styles['menu-static']} mx-4 flex flex-col justify-around cursor-pointer md:hidden`}
          onClick={() => {
            console.log('phone click')
          }}
        >
          <div className="bg-l-gray-700-gray-200"></div>
          <div className="bg-l-gray-700-gray-200"></div>
          <div className="bg-l-gray-700-gray-200"></div>
        </label>
      </div>
    </header>
  )
})

StickyHeader.displayName = 'StickyHeader'
export default StickyHeader

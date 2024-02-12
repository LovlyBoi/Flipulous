'use client'
import type { FC, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ThemeSwitcher from './ThemeSwitcher'
import { navList } from './navList'
import Avatar from '@/static/img/avatar.jpg'
import styles from './index.module.css'
import { usePathname } from 'next/navigation'

type Props = {
  children?: ReactNode
}

const PlainHeader: FC<Props> = () => {
  const pathname = usePathname()

  return (
    <header
      className={`${styles['nav-header']} sticky-header backdrop-blur-sm bg-l-white/90-d-slate-600 shadow-sm shadow-l-default-d-slate-400 fixed top-0 left-0 right-0 p-4 sm:py-2 lg:px-8 rounded-b-lg sm:rounded-none flex items-center justify-between z-10`}
    >
      <div className="left flex items-center">
        <Link
          href="/"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex justify-center items-center"
        >
          <Image
            src={Avatar.src}
            alt="avatar"
            width={Avatar.width}
            height={Avatar.height}
            className="object-cover w-8 h-8 sm:w-12 sm:h-12"
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

      <div className="right flex items-center">
        <ThemeSwitcher></ThemeSwitcher>
        <ul
          className="hidden md:flex nav-list text-l-gray-400-d-gray-400 items-center h-8 overflow-x-hidden"
          v-if="screenType !== 'phone'"
        >
          {navList.map((nav) => (
            <li
              className={`mx-6 whitespace-nowrap transition-all duration-300 group ${
                pathname === nav.to ? 'text-gray-600 dark:text-gray-200' : ''
              }`}
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
}

export default PlainHeader

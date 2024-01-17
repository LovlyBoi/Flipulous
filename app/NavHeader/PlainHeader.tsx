import type { FC, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ThemeSwitcher from './ThemeSwitcher'
import { navList } from './navList'
import Avatar from '@/static/img/avatar.jpg'

type Props = {
  children?: ReactNode
}

const PlainHeader: FC<Props> = () => {
  return (
    <header className="sticky-header theme-white-600-bg fixed top-0 left-0 right-0 p-4 sm:py-2 lg:px-8 rounded-b-lg sm:rounded-none shadow-sm flex items-center justify-between z-10">
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
            className="theme-gray-600-text text-sm sm:text-lg tracking-wider"
          >
            浅秋细语
          </Link>
          <div className="theme-gray-400-text text-xs tracking-wider font-thin">
            智文的前端小站
          </div>
        </div>
      </div>

      <div className="right flex items-center">
        <ThemeSwitcher></ThemeSwitcher>
        <ul
          className="nav-list theme-gray-400-text flex items-center h-8 overflow-x-hidden"
          v-if="screenType !== 'phone'"
        >
          {navList.map((nav) => (
            <li
              className="mx-6 whitespace-nowrap transition-all duration-300 group"
              key={nav.title}
            >
              <Link
                className="group-hover:text-indigo-400 dark:group-hover:text-pink-300"
                href={nav.to || ''}
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* <label className="menu-static mx-4">
          <div></div>
          <div></div>
          <div></div>
        </label> */}
      </div>
    </header>
  )
}

export default PlainHeader

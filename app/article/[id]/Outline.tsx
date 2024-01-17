'use client'
import Link from 'next/link'
import { type FC, type ReactNode } from 'react'
import { useActiveHashStore } from './activeHashStore'
import styles from './outline.module.css'
import type { Outline as OutlineType } from '@/app/types'

type Props = {
  children?: ReactNode
  outline: OutlineType
}

const Outline: FC<Props> = ({ outline }) => {
  const activeHash = useActiveHashStore((state) => state.activeHash)

  return (
    <aside className="fixed top-[68px] md:top-[60px] bottom-0 overflow-y-auto w-44 lg:w-60 xl:w-72 bg-white dark:bg-slate-700 border-r dark:border-gray-500">
      <ul
        className={`${styles['outline']} theme-gray-600-text font-extralight font-sans`}
      >
        {outline.map((item) => {
          return (
            <Link
              className={`break-words hover:text-indigo-400 dark:hover:text-pink-300 ${
                '#' + activeHash === item.anchor
                  ? 'text-indigo-500 dark:text-pink-300 font-normal'
                  : ''
              }`}
              key={item.anchor}
              href={item.anchor}
            >
              <li className={`aside-item aside-item-${item.depth}`}>
                {item.title}
              </li>
            </Link>
          )
        })}
      </ul>
    </aside>
  )
}

export default Outline

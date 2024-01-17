'use client'
import { type FC, type ReactNode, useEffect, useRef } from 'react'
import { observeElements } from '@/utils/intersectionObserver'
import { useActiveHashStore } from './activeHashStore'

type Props = {
  children?: ReactNode
  parsedHtml?: string
}

const ArticleBody: FC<Props> = ({ parsedHtml }) => {
  const setActiveHash = useActiveHashStore((store) => store.setActiveHash)

  // 响应值每次更新会变，需要一个 ref 保存起来
  const setterRef = useRef(setActiveHash)

  useEffect(() => {
    observeElements(
      '.marked h1, .marked h2, .marked h3, .marked h4, .marked h5, .marked h6',
      (hash) => {
        setterRef.current(hash)
      },
    )
  }, [])

  return (
    <main className="fixed top-[68px] md:top-[60px] bottom-0 left-0 right-0 px-4 sm:ml-44 md:ml-44 lg:ml-60 xl:ml-72 overflow-auto pb-32">
      <div
        className="marked max-w-[720px] mx-auto theme-gray-800-text font-sans box-border"
        dangerouslySetInnerHTML={{ __html: '<p></p>' + (parsedHtml ?? '') }}
      ></div>
    </main>
  )
}

export default ArticleBody

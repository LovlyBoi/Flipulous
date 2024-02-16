'use client'
import { useEffect, type FC, type ReactNode } from 'react'
import CMEditor from './CMEditor'
import { useHighlightItemStore } from './highlightStore'
import { Article } from '@/app/types'
import { queryFavorites } from '@/apis'

type Props = {
  children?: ReactNode
  article: Article
}

const FlipEditor: FC<Props> = ({ article }) => {
  const setHighlightItems = useHighlightItemStore(
    (store) => store.setHighlightItems,
  )
  const addHighlightView = useHighlightItemStore(
    (store) => store.addHighlightView,
  )
  const setArticleId = useHighlightItemStore((store) => store.setArticleId)

  setArticleId(article.id)

  // useEffect(() => {
  //   setHighlightItems([])
  // }, [setHighlightItems])

  useEffect(() => {
    queryFavorites(article.id).then(({ code, list }) => {
      let hs = []
      if (code === 200 && list.length > 0) {
        // 有收藏这篇文章的翻译
        hs = list
          .map((item) => ({
            ...item.translation,
            favorites: true,
          }))
          .reduce((acc, item) => {
            // 过滤重复的项
            const has = acc.find(
              (i: any) => i.from === item.from && i.to === item.to,
            )
            if (!has) {
              return [...acc, item]
            } else {
              return acc
            }
          }, [])
      } else {
        // 没有收藏
        // const hsStr = localStorage.getItem('hsCache')
        // if (hsStr) {
        //   const parsed = JSON.parse(hsStr)
        //   hs = parsed[article.id] || []
        // }
        // console.log(hs, 'hs')
      }
      // 恢复之前存的状态
      setHighlightItems(hs)
      addHighlightView?.(hs)
    })
  }, [setHighlightItems, addHighlightView, article.id])

  return <CMEditor article={article.content} />
}

export default FlipEditor

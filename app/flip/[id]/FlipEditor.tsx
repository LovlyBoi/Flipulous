'use client'
import { useEffect, type FC, type ReactNode } from 'react'
import CMEditor from './CMEditor'
import { useHighlightItemStore } from './highlightStore'
import { Article } from '@/app/types'

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
  const setArticleId = useHighlightItemStore(
    (store) => store.setArticleId,
  )

  setArticleId(article.id)

  useEffect(() => {
    const hs = localStorage.getItem('hsCache')
    if (hs) {
      const parsed = JSON.parse(hs)
      const current = parsed[article.id]
      if (!current) return
      // 恢复之前存的状态
      setHighlightItems(current)
      addHighlightView?.(current)
    }
  }, [setHighlightItems, addHighlightView, article.id])

  return <CMEditor article={article.content} />
}

export default FlipEditor

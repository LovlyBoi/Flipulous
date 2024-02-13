'use client'
import { useEffect, type FC, type ReactNode } from 'react'
import CMEditor from './CMEditor'
import { useHighlightItemStore } from './highlightStore'

type Props = {
  children?: ReactNode
}

const FlipEditor: FC<Props> = () => {
  const setHighlightItems = useHighlightItemStore((store) => store.setHighlightItems)
  const addHighlightView = useHighlightItemStore((store) => store.addHighlightView)

  useEffect(() => {
    const hs = localStorage.getItem('highlightItems')
    if (hs) {
      const parsed = JSON.parse(hs)
      // 恢复之前存的状态
      setHighlightItems(parsed)
      addHighlightView?.(parsed)
    }
  }, [setHighlightItems, addHighlightView])

  return <CMEditor />
}

export default FlipEditor

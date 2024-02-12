'use client'
import { useEffect, type FC, type ReactNode } from 'react'
import FlipCard from './FlipCard'
import { useHighlightItemStore } from './highlightStore'

type Props = {
  children?: ReactNode
}

const FlipCardContainer: FC<Props> = () => {
  const highlightItems = useHighlightItemStore((store) => store.highlightItems)

  useEffect(() => {
    console.log('highlightItems++', highlightItems)
  }, [highlightItems])

  return (
    <div className="px-4 flex flex-col gap-4">
      {highlightItems.map((card, index) => {
        return <FlipCard key={index} index={index + 1} card={card} />
      })}
    </div>
  )
}

export default FlipCardContainer

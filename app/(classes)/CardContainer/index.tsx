'use client'
import { useState, useEffect, useRef, memo } from 'react'
import type { FC, ReactNode } from 'react'
import { masonryLoayout } from '@/utils/startMasonry'
import { getBlogsByType } from '@/apis'
import Card from '@/app/(classes)/Card'
import CardSkeleton from '@/app/(classes)/Card/CardSkeleton'
import type { Card as CardType } from '@/app/types'

type Props = {
  children?: ReactNode
  type?: string
}

const skeletonPicNums = [2, 3, 2]

const macroTask = () => new Promise((resolve) => setTimeout(resolve, 0))

const CardContainer: FC<Props> = ({ type = 'all' }) => {
  const [cards, setCards] = useState<CardType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    getBlogsByType(type)
      .then(({ cards, hasNext }) => {
        if (ignore) throw new Error('ignore')
        setCards(cards)
        setLoading(false)
        // 等待两个宏任务， React 完成渲染
        return macroTask()
      })
      .then(() => macroTask())
      .then(() =>
        masonryLoayout('.card-container', {
          itemSelector: '.content-card',
          gutter: 10,
        }),
      )
      .catch((error) => {
        // 多余的副作用，不需要管
        if (error.message === 'ignore') return
        // 出错
        console.error(error)
      })

    return () => {
      ignore = true
    }
  }, [type])

  return (
    <div className="card-container w-full py-6">
      {loading ? (
        <div className="flex items-start gap-[10px]">
          {skeletonPicNums.map((picNum, i) => {
            return <CardSkeleton key={i} picNum={picNum} />
          })}
        </div>
      ) : (
        cards.map((card) => <Card data={card} key={card.id} />)
      )}
    </div>
  )
}

export default memo(CardContainer)

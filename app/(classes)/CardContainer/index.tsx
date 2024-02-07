'use client'
import { useState, useEffect, useRef, memo } from 'react'
import type { FC, ReactNode } from 'react'
import { masonryLoayout } from '@/utils/startMasonry'
import { getBlogs } from '@/apis'
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
  const cardsSetterRef = useRef(setCards)

  const [loading, setLoading] = useState(true)
  const loadingSetterRef = useRef(setLoading)

  const [hasNext, setHasNext] = useState(false)
  const hasNextSetterRef = useRef(setHasNext)

  const [loadingMore, setLoadingMore] = useState(false)
  const loadingMoreSetterRef = useRef(setLoadingMore)

  const [page, setPage] = useState({ pn: 1, ps: 10 })
  const pageSetterRef = useRef(setPage)

  useEffect(() => {
    let ignore = false

    getBlogs(type)
      .then(({ cards, hasNext }) => {
        if (ignore) throw new Error('ignore')
        hasNextSetterRef.current(hasNext)
        cardsSetterRef.current(cards)
        loadingSetterRef.current(false)
      })
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

  useEffect(() => {
    if (cards.length) {
      masonryLoayout('.card-container', {
        itemSelector: '.content-card',
        gutter: 10,
      })
    }
  }, [cards])

  const handleLoadMoreCard = () => {
    loadingMoreSetterRef.current(true)
    getBlogs(type, page.ps, page.pn + 1)
      .then(({ cards, hasNext }) => {
        cardsSetterRef.current((prev) => [...prev, ...cards])
        hasNextSetterRef.current(hasNext)
        pageSetterRef.current((prev) => ({ ...prev, pn: prev.pn + 1 }))
      })
      .catch((error) => {
        // 出错
        console.error(error)
      })
      .finally(() => {
        loadingMoreSetterRef.current(false)
      })
  }

  return (
    <>
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
      {!loading && hasNext && (
        <button
          className={
            'bg-l-white-d-slate-600 text-l-gray-400-d-gray-400 px-6 py-2 rounded-md shadow-sm mx-auto block font-light text-sm'
          }
          disabled={loadingMore}
          onClick={() => handleLoadMoreCard()}
        >
          {loadingMore ? '加载中...' : '加载更多'}
        </button>
      )}
    </>
  )
}

export default memo(CardContainer)

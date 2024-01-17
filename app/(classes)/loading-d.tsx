'use client'
import { type FC, type ReactNode, useEffect, useState, useRef } from 'react'
import { masonryLoayout } from '@/utils/startMasonry'
import CardSkeleton from './Card/CardSkeleton'

type Props = {
  children?: ReactNode
}

const macroTask = () => new Promise((resolve) => setTimeout(resolve, 0))

const timeout = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))

const Loading: FC<Props> = () => {
  const [isSkeletonShow, setIsSkeletonShow] = useState(false)

  const setterRef = useRef(setIsSkeletonShow)

  useEffect(() => {
    timeout(1000)
      .then(() => {
        setterRef.current(true)
        return macroTask()
      })
      .then(() => macroTask())
      .then(() => {
        masonryLoayout('.card-container', {
          itemSelector: '.content-card',
          gutter: 10,
        })
      })
  }, [])

  return (
    <div className="card-container w-full py-6">
      {isSkeletonShow &&
        Array(6)
          .fill(0)
          .map((i) => {
            const randomPicNum = Math.ceil(Math.random() * 4)
            return <CardSkeleton key={i} picNum={randomPicNum} />
          })}
    </div>
  )
}

export default Loading

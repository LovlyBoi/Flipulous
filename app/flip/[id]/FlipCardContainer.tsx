import { type FC, type ReactNode } from 'react'
import FlipCard from './FlipCard'

type Props = {
  children?: ReactNode
}

const FlipCardContainer: FC<Props> = () => {
  return (
    <div className="px-4 flex flex-col gap-4">
      {[1, 2, 3, 4, 5].map((_, index) => {
        return <FlipCard key={index} index={index + 1} />
      })}
    </div>
  )
}

export default FlipCardContainer

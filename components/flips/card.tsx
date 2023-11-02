import { FC, ReactNode } from 'react'

type CardProps = {
  children?: ReactNode
  card: Cards
}

// 右侧小卡片组件
const FlipCard: FC<CardProps> = ({ card }) => (
  <div className=' bg-yellow-50 mb-2 rounded-md'>
    <div className=' break-all'>{card.title}</div>
    <div className=' break-all'>{card.content}</div>
    <div className=' break-all'>{card.context}</div>
    <div className=' break-all'>{card.synonyms}</div>
  </div>
)

// Card 类型
export type Cards = {
  title: string
  index: number
  content: string
  context: string
  synonyms: string
}

export default FlipCard

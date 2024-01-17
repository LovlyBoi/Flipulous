import { useMemo, type FC, type ReactNode } from 'react'
import Link from 'next/link'
import dayjs from '@/utils/dayjs'
import type { Card as CardType, TagColor } from '@/app/types'
import styles from './index.module.css'

type Props = {
  children?: ReactNode
  data: CardType
}

const mapTagColor: Record<TagColor, string> = {
  yellow: 'bg-yellow-400',
  pink: 'bg-pink-400',
  indigo: 'bg-indigo-400',
  green: 'bg-green-400',
}

const Card: FC<Props> = ({ data }) => {
  const { id, title, tag, author, pictures, publishDate, updateDate } = data

  const publishFrom = useMemo(
    () => dayjs(new Date(publishDate)).format('YYYY / M / DD '),
    [publishDate],
  )

  const updateFrom = useMemo(
    () => dayjs(new Date(updateDate)).fromNow(),
    [updateDate],
  )

  const picNumber = Math.min(4, pictures.length)

  return (
    <div
      className={`content-card ${styles['content-card']} p-[15px] content theme-white-600-bg w-full box-border rounded-lg`}
    >
      <div>
        <div
          className={`rounded text-xs px-[6px] py-[1px] font-light text-white inline-block mr-4 ${
            mapTagColor[tag.color]
          }`}
        >
          {tag.name}
        </div>
        <div className="update-time theme-gray-400-text text-xs inline-block cursor-default">
          发布于 {publishFrom}
        </div>
      </div>
      <Link
        href={`/flip/${id}`}
        className="block text-[18px] theme-gray-600-text hover:text-indigo-400 dark:hover:text-pink-300 tracking-wide my-3 transition-all duration-300 delay-75"
        scroll={false}
      >
        {title}
      </Link>
      <div className={`card-pictures-wrapper pictures-${picNumber} w-full`}>
        {pictures.slice(0, 4).map((picUrl, index) => (
          <Link
            href={`/flip/${id}`}
            className="picture h-[200px] rounded flex bg-slate-400 overflow-hidden"
            key={picUrl + index}
            scroll={false}
          >
            <img
              alt=""
              src={picUrl + '?w=500'}
              className="object-cover min-w-full min-h-full cursor-pointer transition duration-300 ease-in-out transform hover:scale-[1.05]"
            />
          </Link>
        ))}
      </div>
      <div className="card-footer theme-gray-400-text text-xs mt-3 flex gap-2">
        <div className="update-date">更新于：{updateFrom}</div>
        <div className="author">作者：{author}</div>
      </div>
    </div>
  )
}

export default Card

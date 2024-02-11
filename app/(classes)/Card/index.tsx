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

  const picturesUrl = pictures.map((url) => {
    // const { pathname } = new URL(url)
    let baseUrl = process.env.AXIOS_BASEURL
    if (baseUrl?.endsWith('/')) {
      baseUrl = baseUrl.slice(0, -1)
    }
    return baseUrl + url
  })

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
      className={`content-card ${styles['content-card']} p-[15px] content bg-l-white-d-slate-600 w-full box-border rounded-lg`}
    >
      <div>
        <div
          className={`rounded text-xs px-[6px] py-[1px] font-light text-white inline-block mr-4 ${
            mapTagColor[tag.color]
          }`}
        >
          {tag.name}
        </div>
        <div className="update-time text-l-gray-400-d-gray-400 text-xs inline-block cursor-default">
          发布于 {publishFrom}
        </div>
      </div>
      <Link
        href={`/flip/${id}`}
        className="block text-[18px] text-l-gray-600-d-gray-200 hover:text-indigo-400 dark:hover:text-pink-300 tracking-wide my-3 transition-all duration-300 delay-75"
        scroll={false}
      >
        {title}
      </Link>
      <div className={`card-pictures-wrapper pictures-${picNumber} w-full`}>
        {picturesUrl.slice(0, 4).map((picUrl, index) => (
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
      <div className="card-footer text-l-gray-400-d-gray-400 text-xs mt-3 flex gap-2">
        <div className="update-date">更新于：{updateFrom}</div>
        <div className="author">作者：{author}</div>
      </div>
    </div>
  )
}

export default Card

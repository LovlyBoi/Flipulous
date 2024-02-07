import type { FC, ReactNode } from 'react'
import styles from './index.module.css'

type Props = {
  children?: ReactNode
  picNum?: number
}

// 骨架屏
const CardSkeleton: FC<Props> = ({ picNum = 4 }) => {
  return (
    <section
      className={`content-card p-[15px] content bg-l-white-d-slate-600 w-full box-border rounded-lg ${styles['content-card']}`}
    >
      <div className="flex items-center">
        <div
          className={`rounded px-[6px] py-[1px] inline-block mr-4 bg-slate-200 h-[16px] w-[38px]`}
        ></div>
        <div
          className={`inline-block h-[12px] w-24 rounded-sm ${styles['skeleton-background']}`}
        ></div>
      </div>
      <div
        className={`inline-block h-[18px] w-3/4 my-3 rounded-md ${styles['skeleton-background']}`}
      ></div>

      <div className={`card-pictures-wrapper pictures-${picNum} w-full`}>
        {Array.from({ length: picNum }, (_, i) => (
          <div
            key={i}
            className={`picture h-[200px] rounded flex overflow-hidden ${styles['skeleton-background']}`}
          ></div>
        ))}
      </div>
      <div className="card-footer mt-3 flex gap-2 ">
        <div className="update-date bg-slate-100 h-[12px] w-20"></div>
        <div className="author bg-slate-100 h-[12px] w-16"></div>
      </div>
    </section>
  )
}

export default CardSkeleton

import { type FC, type ReactNode } from 'react'
import { type TranslatedItem } from './highlightStore'

type Props = {
  children?: ReactNode
  index: number
  card: TranslatedItem
}

const FlipCard: FC<Props> = ({ index, card }) => {
  return (
    <section className="bg-white rounded-md p-4 flex flex-col gap-2">
      <div>
        <sup className="inline-block mr-1">{index != null && `[${index}]`}</sup>
        <h3 className="inline-block font-bold text-lg">{card.word}</h3>
      </div>
      {card.success == null ? (
        <div>Loading...</div>
      ) : card.success ? (
        <>
          <p>
            {'发音: '}
            <span className=" text-gray-500">{card.accent}</span>
          </p>
          <p>
            {'英译: '}
            <span className=" text-gray-500">{card.mean_en}</span>
          </p>
          <p>
            {'中译: '}
            <span className=" text-gray-500">{card.mean_cn}</span>
          </p>
          <p>
            {'例句: '}
            <span className=" text-gray-500">{card.sentence}</span>
          </p>
          <p>
            {'例句中译: '}
            <span className=" text-gray-500">{card.sentence_trans}</span>
          </p>
          {/* <p className=" text-gray-400">近义词: {' ' + card.synonyms}</p>ƒ */}
        </>
      ) : (
        <div>翻译失败，数据库好像没有收录这个词~</div>
      )}
    </section>
  )
}

export default FlipCard

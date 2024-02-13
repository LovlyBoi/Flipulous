import { type FC, type ReactNode } from 'react'
import { useHighlightItemStore, type TranslatedItem } from './highlightStore'
import { StarOutline, Star, TrashOutline } from '@ricons/ionicons5'

type Props = {
  children?: ReactNode
  index: number
  card: TranslatedItem
}

const FlipCard: FC<Props> = ({ index, card }) => {
  const addFavorites = useHighlightItemStore((store) => store.addFavorites)
  const removeFavorites = useHighlightItemStore(
    (store) => store.removeFavorites,
  )
  const removeHighlightView = useHighlightItemStore((store) => store.removeHighlightView)

  const isLoading = card.success == null
  const isFailure = card.success === false
  const isSuccess = card.success === true

  function removeCard(from: number, to: number) {
    removeHighlightView?.(from, to)
  }

  return (
    <section className="bg-white rounded-md p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div>
          <sup className="inline-block mr-1">
            {index != null && `[${index}]`}
          </sup>
          <h3 className="inline-block font-bold text-lg">{card.word}</h3>
        </div>
        <div>
          {/* 翻译成功后可以收藏 */}
          {isLoading ? null : isSuccess ? (
            card.favorites ? (
              <Star
                width={18}
                height={18}
                className="text-yellow-400 cursor-pointer"
                onClick={() => {
                  removeFavorites(card.from, card.to)
                }}
              />
            ) : (
              <StarOutline
                width={18}
                height={18}
                className="text-gray-300 hover:text-yellow-400 cursor-pointer"
                onClick={() => {
                  addFavorites(card.from, card.to)
                }}
              />
            )
          ) : (
            <TrashOutline
              width={18}
              height={18}
              className="text-gray-300 hover:text-red-400 cursor-pointer"
              onClick={() => {
                removeCard(card.from, card.to)
              }}
            />
          )}
        </div>
      </div>
      <div className="text-sm">
        {isLoading ? (
          <div>Loading...</div>
        ) : isSuccess ? (
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
          </>
        ) : (
          <div className=" text-gray-500">
            翻译失败，数据库好像没有收录这个词~
          </div>
        )}
      </div>
    </section>
  )
}

export default FlipCard

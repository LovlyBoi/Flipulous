'use client'
import { type FC, type ReactNode } from 'react'
import { StarOutline, Star, TrashOutline } from '@ricons/ionicons5'
import { useParams } from 'next/navigation'
import { useHighlightItemStore, type TranslatedItem } from './highlightStore'
import { useUserStore } from '@/app/(users)/userStore'
import { addFavoritesTranslation, removeFavoritesTranslation } from '@/apis'
import toast from 'react-hot-toast'

type Props = {
  children?: ReactNode
  index: number
  card: TranslatedItem
  openModal: () => void
}

const FlipCard: FC<Props> = ({ index, card, openModal }) => {
  const { id } = useParams()

  const addFavorites = useHighlightItemStore((store) => store.addFavorites)
  const removeFavorites = useHighlightItemStore(
    (store) => store.removeFavorites,
  )
  const removeHighlightView = useHighlightItemStore(
    (store) => store.removeHighlightView,
  )

  const token = useUserStore((store) => store.token)

  const isLogin = !!token

  const isLoading = card.success == null
  const isSuccess = card.success === true

  function removeCard(from: number, to: number) {
    removeHighlightView?.(from, to)
  }

  async function handleAddFavorties() {
    if (isLogin) {
      const idNumber = Number.parseInt(id as string)
      const { code } = await addFavoritesTranslation(idNumber, card)
      if (code !== 200) {
        toast.error('添加收藏失败')
      } else {
        addFavorites(card.from, card.to)
      }
    } else {
      openModal()
    }
  }

  async function handleRemoveFavorites() {
    if (isLogin) {
      const idNumber = Number.parseInt(id as string)
      const { code } = await removeFavoritesTranslation(
        idNumber,
        card.from,
        card.to,
      )
      if (code !== 200) {
        toast.error('删除收藏失败')
      } else {
        removeFavorites(card.from, card.to)
      }
    } else {
      openModal()
    }
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
                onClick={handleRemoveFavorites}
              />
            ) : (
              <StarOutline
                width={18}
                height={18}
                className="text-gray-300 hover:text-yellow-400 cursor-pointer"
                onClick={handleAddFavorties}
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
              <span className="text-gray-500 tracking-wider">
                {card.accent}
              </span>
            </p>
            <p>
              {'英译: '}
              <span className="text-gray-500">{card.mean_en}</span>
            </p>
            <p>
              {'中译: '}
              <span className="text-gray-500">{card.mean_cn}</span>
            </p>
            <p>
              {'例句: '}
              <span className="text-gray-500">{card.sentence}</span>
            </p>
            <p>
              {'例句中译: '}
              <span className="text-gray-500">{card.sentence_trans}</span>
            </p>
          </>
        ) : (
          <div className="text-gray-500">
            翻译失败，数据库好像没有收录这个词~
          </div>
        )}
      </div>
    </section>
  )
}

export default FlipCard

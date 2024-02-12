import { translateWord } from '@/apis'
import { create } from 'zustand'

export interface HighlightItem {
  from: number
  to: number
  word: string
  index: number
}

export interface TranslatedItem extends HighlightItem {
  success?: boolean
  accent?: string
  mean_cn?: string
  mean_en?: string
  sentence?: string
  sentence_trans?: string
}

interface HighlightItemStore {
  highlightItems: (HighlightItem | TranslatedItem)[]
  has: (highlightItem: { from: number; to: number }) => boolean
  setHighlightItems: (
    highlightItems: HighlightItem[],
    addItems?: { from: number; to: number; word: string }[],
    removeItems?: { from: number; to: number; word: string }[],
  ) => void
  changeHighlightItem: (from: number, to: number, payload: any) => void
}

export const useHighlightItemStore = create<HighlightItemStore>()(
  (set, get) => ({
    highlightItems: [],
    has: (highlight) => {
      return get().highlightItems.some(
        (i) => i.from === highlight.from && i.to === highlight.to,
      )
    },
    // 翻译完之后，修改对应的值
    changeHighlightItem: (from, to, payload) => {
      set((store) => {
        return {
          highlightItems: store.highlightItems.map((i) =>
            i.from === from && i.to === to ? { ...i, ...payload } : i,
          ),
        }
      })
    },
    setHighlightItems: (highlightItems, addItems, removeItems) => {
      const oldItems = get().highlightItems
      for (let i = 0; i < highlightItems.length; i++) {
        const item = highlightItems[i]
        const oldItem = oldItems.find(
          (i) => i.from === item.from && i.to === item.to,
        )
        if (oldItem) {
          // 之前有，给他迁移过来
          highlightItems[i] = {
            ...oldItem,
            // index需要变成新的
            index: item.index,
          }
        }
      }
      if (addItems) {
        // 添加新item
        console.log('add', addItems)
        addItems.forEach((item) => {
          // 调用翻译接口
          translateWord(item.word).then((res) => {
            if (!res) {
              get().changeHighlightItem(item.from, item.to, {
                success: false,
              })
              console.log('翻译失败', get().highlightItems)
            } else {
              get().changeHighlightItem(item.from, item.to, {
                success: true,
                ...res,
              })
              console.log('翻译成功', get().highlightItems)
            }
          })
        })
      } else if (removeItems) {
        console.log('remove', removeItems)
      }
      set(() => ({
        highlightItems,
      }))
    },
  }),
)

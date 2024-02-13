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
  favorites?: boolean
}

interface HighlightItemStore {
  highlightItems: (HighlightItem | TranslatedItem)[]
  removeHighlightView?: (from: number, to: number) => void
  registRemoveHighlightView: (fn: (from: number, to: number) => void) => void
  has: (highlightItem: { from: number; to: number }) => boolean
  setHighlightItems: (
    highlightItems: HighlightItem[],
    addItems?: { from: number; to: number; word: string }[],
    removeItems?: { from: number; to: number; word?: string }[],
  ) => void
  changeHighlightItem: (from: number, to: number, payload: any) => void
  addFavorites: (from: number, to: number) => void
  removeFavorites: (from: number, to: number) => void
}

export const useHighlightItemStore = create<HighlightItemStore>()(
  (set, get) => ({
    highlightItems: [],
    has: (highlight) => {
      return get().highlightItems.some(
        (i) => i.from === highlight.from && i.to === highlight.to,
      )
    },
    // 调用CMEditor提供的函数
    removeHighlightView: undefined,
    // CMEditor将清除view层高亮的函数注册进去，供别的组件调用
    registRemoveHighlightView: (fn) => {
      if (get().removeHighlightView) return
      set((store) => ({ removeHighlightView: fn}))
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
    addFavorites: (from, to) => {
      get().changeHighlightItem(from, to, {
        favorites: true,
      })
    },
    removeFavorites: (from, to) => {
      get().changeHighlightItem(from, to, {
        favorites: false,
      })
    },
  }),
)

'use client'
import {
  type FC,
  type ReactNode,
  useRef,
  useEffect,
  KeyboardEventHandler,
  memo,
} from 'react'
import {
  EditorState,
  StateEffect,
  StateField,
  SelectionRange,
} from '@codemirror/state'
import {
  EditorView,
  DecorationSet,
  Decoration,
  WidgetType,
} from '@codemirror/view'
import styled from './editor.module.css'
import { useHighlightItemStore } from './highlightStore'

type Props = {
  children?: ReactNode
}

const someArtcle = `Historically, developers had to use different languages (e.g. JavaScript, PHP) and frameworks when writing code for the server and the client. With React, developers can use the same language (JavaScript), and the same framework (e.g. Next.js or your framework of choice). This flexibility allows you to seamlessly write code for both environments without context switching.

However, each environment has its own set of capabilities and constraints. Therefore, the code you write for the server and the client is not always the same. There are certain operations (e.g. data fetching or managing user state) that are better suited for one environment over the other.

Understanding these differences is key to effectively using React and Next.js. We'll cover the differences and use cases in more detail on the Server and Client Components pages, for now, let's continue building on our foundation.

Request-Response Lifecycle
Broadly speaking, all websites follow the same Request-Response Lifecycle:
`

// 添加高亮
const addHighlight = StateEffect.define<{ from: number; to: number }>({
  map: ({ from, to }, change) => ({
    from: change.mapPos(from),
    to: change.mapPos(to),
  }),
})

// 移除高亮
const removeHighlight = StateEffect.define<{ from: number; to: number }>({
  map: ({ from, to }, change) => ({
    from: change.mapPos(from),
    to: change.mapPos(to),
  }),
})

const highlightField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none
  },
  update(highlights, tr) {
    highlights = highlights.map(tr.changes)
    for (let e of tr.effects) {
      if (e.is(addHighlight)) {
        highlights = highlights.update({
          add: [highlightMark.range(e.value.from, e.value.to)],
        })
      } else if (e.is(removeHighlight)) {
        highlights = highlights.update({
          filter: (from, to) => from !== e.value.from || to !== e.value.to,
        })
      }
    }
    return highlights
  },
  provide: (f) => EditorView.decorations.from(f),
})

const highlightMark = Decoration.mark({ class: 'cm-highlight' })

// 添加装饰的效果
const addDecorationsEffect = StateEffect.define<any>()

// 用于管理装饰的 StateField
const decorationsField = StateField.define<any>({
  create() {
    return Decoration.none
  },
  update(decorations, tr) {
    // 应用效果以更新装饰集
    for (let effect of tr.effects) {
      if (effect.is(addDecorationsEffect)) {
        decorations = effect.value
      }
    }
    return decorations
  },
  // 确保装饰被渲染
  provide: (f) => EditorView.decorations.from(f),
})

function updateHighlightNumbers(view: EditorView) {
  // 获取当前所有的高亮装饰
  let highlights = view.state.field(highlightField, false)
  if (!highlights) return

  let num = 1 // 序号开始
  const decorations: any[] = [] // 用于收集新的装饰

  const hs: { from: number; to: number; word: string; index: number }[] = []
  // 遍历当前所有高亮，为它们创建新的序号小部件装饰
  highlights.between(0, view.state.doc.length, (from, to) => {
    hs.push({
      from,
      to,
      word: view.state.doc.sliceString(from, to),
      index: num,
    })

    const widget = Decoration.widget({
      widget: new (class extends WidgetType {
        toDOM() {
          const sup = document.createElement('sup')
          sup.textContent = `[${num++}]`
          sup.className = 'cm-highlight-number' // 为样式添加类名
          return sup
        }
      })(),
      side: -1, // 确保序号显示在高亮内容的前面
    })
    // 将小部件装饰添加到集合中
    decorations.push(widget.range(from))
  })

  // 创建一个新的装饰集
  const newDecorations = Decoration.set(decorations, true)

  // 构造并提交一个事务来更新装饰集
  view.dispatch({
    effects: addDecorationsEffect.of(newDecorations),
  })

  return hs
}

const highlightTheme = EditorView.baseTheme({
  '.cm-highlight': {
    backgroundColor: 'rgba(254, 240, 138, 0.8)',
    borderRadius: '4px',
    display: 'inline-block',
  },
})

function getSelections(view: EditorView) {
  const selections: SelectionRange[] = view.state.selection.ranges.filter(
    (r) => !r.empty,
  )
  return selections.map((s) => ({
    from: s.from,
    to: s.to,
    word: view.state.doc.sliceString(s.from, s.to),
  }))
}

// 添加指定部分的高亮
function highlightFragment(
  view: EditorView,
  highlights: { from: number; to: number; word: string }[],
) {
  if (highlights.length < 1) return false
  const effects: StateEffect<unknown>[] = highlights.map(({ from, to }) =>
    addHighlight.of({ from, to }),
  )
  if (!view.state.field(highlightField, false)) {
    effects.push(StateEffect.appendConfig.of([highlightField, highlightTheme]))
  }

  view.dispatch({ effects })
  return highlights
}

// 移除选中部分的高亮
function removeHighlightSelection(view: EditorView) {
  const selections: SelectionRange[] = view.state.selection.ranges.filter(
    (r) => !r.empty,
  )

  const effects: StateEffect<unknown>[] = selections.map(({ from, to }) =>
    removeHighlight.of({ from, to }),
  )

  if (!effects.length) return false

  view.dispatch({ effects })
  return selections.map((s) => ({ from: s.from, to: s.to }))
}

// 移除指定部分的高亮
function removeHighlightFragment(
  view: EditorView,
  highlights: { from: number; to: number, word: string }[],
) {
  if (highlights.length < 1) return false
  const effects: StateEffect<unknown>[] = highlights.map(({ from, to }) =>
    removeHighlight.of({ from, to }),
  )
  view.dispatch({ effects })
  return highlights
}

const CMEditor: FC<Props> = () => {
  const editor = useRef<HTMLDivElement>(null)

  const cmState = useRef(
    EditorState.create({
      doc: someArtcle,
      extensions: [
        EditorState.readOnly.of(true),
        EditorView.lineWrapping,
        highlightTheme,
        decorationsField,
      ],
    }),
  )

  const cmView = useRef<EditorView | null>(null)

  // const addHighlightItem = useHighlightItemStore(
  //   (store) => store.addHighlightItem,
  // )
  // const removeHighlightItem = useHighlightItemStore(
  //   (store) => store.removeHighlightItem,
  // )
  const setHighlightItems = useHighlightItemStore(
    (store) => store.setHighlightItems,
  )
  const hasHighlightItem = useHighlightItemStore((store) => store.has)

  useEffect(() => {
    if (editor.current) {
      cmView.current = new EditorView({
        state: cmState.current,
        parent: editor.current,
      })
    }
    return () => cmView.current?.destroy()
  }, [editor.current])

  // 将选中部分添加高亮
  function tanslateSelection() {
    if (!cmView.current) return
    let selections = getSelections(cmView.current)
    selections = selections.filter((s) => !hasHighlightItem(s))
    if (selections.length === 0) return
    const newHighlightItems = highlightFragment(cmView.current, selections)
    if (!newHighlightItems) return
    const hs = updateHighlightNumbers(cmView.current)
    hs && setHighlightItems(hs, newHighlightItems)
  }

  // 将选中部分移除高亮
  function removeSelection() {
    if (!cmView.current) return
    let selections = getSelections(cmView.current)
    selections = selections.filter((s) => hasHighlightItem(s))
    if (selections.length === 0) return
    const removedHighlightItems = removeHighlightFragment(
      cmView.current,
      selections,
    )
    if (!removedHighlightItems) return
    const hs = updateHighlightNumbers(cmView.current)
    hs && setHighlightItems(hs, undefined, removedHighlightItems)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.ctrlKey && e.key === 'q') {
      tanslateSelection()
    } else if (e.ctrlKey && e.key === 'w') {
      removeSelection()
    }
  }

  return (
    <div
      ref={editor}
      className={styled['cm-editor-wrapper']}
      onKeyDown={handleKeyDown}
    ></div>
  )
}

export default memo(CMEditor)

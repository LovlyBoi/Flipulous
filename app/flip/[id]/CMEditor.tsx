'use client'
import {
  useState,
  type FC,
  type ReactNode,
  useRef,
  useEffect,
  KeyboardEventHandler,
} from 'react'
import {
  useCodeMirror,
  BasicSetupOptions,
  EditorView,
  Decoration,
  DecorationSet,
  EditorSelection,
  StateField,
  StateEffect,
  keymap,
} from '@uiw/react-codemirror'
import styled from './editor.module.css'

type Props = {
  children?: ReactNode
}

const someArtcle = `Historically, developers had

to use different languages (e.g. JavaScript, PHP) and frameworks when writing code for the server and the client. With React, developers can use the same language (JavaScript), and the same framework (e.g. Next.js or your framework of choice). This flexibility allows you to seamlessly write code for both environments without context switching.

However, each environment has its own set of capabilities and constraints. Therefore, the code you write for the server and the client is not always the same. There are certain operations (e.g. data fetching or managing user state) that are better suited for one environment over the other.

Understanding these differences is key to effectively using React and Next.js. We'll cover the differences and use cases in more detail on the Server and Client Components pages, for now, let's continue building on our foundation.

Request-Response Lifecycle
Broadly speaking, all websites follow the same Request-Response Lifecycle:
`

const options: BasicSetupOptions = {
  lineNumbers: false,
  highlightActiveLine: false,
  foldGutter: false,
  rectangularSelection: false,
  allowMultipleSelections: false,
  syntaxHighlighting: false,
  closeBrackets: false,
  autocompletion: false,
  crosshairCursor: false,
  highlightSelectionMatches: false,
}

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
    for (let e of tr.effects)
      if (e.is(addHighlight)) {
        highlights = highlights.update({
          add: [highlightMark.range(e.value.from, e.value.to)],
        })
      } else if (e.is(removeHighlight)) {
        highlights = highlights.update({
          filter: (from, to) => from !== e.value.from || to !== e.value.to,
        })
      }
    return highlights
  },
  provide: (f) => EditorView.decorations.from(f),
})

const highlightMark = Decoration.mark({ class: 'cm-highlight' })

const highlightTheme = EditorView.baseTheme({
  '.cm-editor': { backgroundColor: '#ffffff' },
  '.cm-highlight': { backgroundColor: 'rgba(254, 240, 138, 0.8)' },
})

// 将选中片段高亮
function highlightSelection(view: EditorView) {
  let effects: StateEffect<unknown>[] = view.state.selection.ranges
    .filter((r) => !r.empty)
    .map(({ from, to }) => addHighlight.of({ from, to }))

  if (!effects.length) return false

  if (!view.state.field(highlightField, false)) {
    effects.push(StateEffect.appendConfig.of([highlightField, highlightTheme]))
  }

  view.dispatch({ effects })
  return true
}

function highlightFragment(view: EditorView, from: number, to: number) {
  if (from == null || to == null) return false
  const effects: StateEffect<unknown>[] = [addHighlight.of({ from, to })]
  if (!view.state.field(highlightField, false))
    effects.push(StateEffect.appendConfig.of([highlightField, highlightTheme]))
  view.dispatch({ effects })
  return true
}

// 移除选中部分的高亮
function removeHighlightSelection(view: EditorView) {
  let effects: StateEffect<unknown>[] = view.state.selection.ranges
    .filter(r => !r.empty)
    .map(({ from, to }) => removeHighlight.of({ from, to }));

  if (!effects.length) return false;

  view.dispatch({ effects });
  return true;
}

const CMEditor: FC<Props> = () => {
  const editor = useRef<HTMLDivElement>(null)

  const { setContainer, view } = useCodeMirror({
    container: editor.current,
    value: someArtcle,
    basicSetup: options,
    extensions: [EditorView.lineWrapping, highlightTheme],
  })

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current)
    }
  }, [editor.current])

  function tanslate() {
    if (!view) return
    highlightSelection(view)
  }

  function remove() {
    if (!view) return
    removeHighlightSelection(view)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.ctrlKey && e.key === 'q') {
      tanslate()
    } else if (e.ctrlKey && e.key === 'w') {
      remove()
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

export default CMEditor

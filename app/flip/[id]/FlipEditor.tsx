'use client'
import { type FC, type ReactNode } from 'react'
import CMEditor from './CMEditor'

type Props = {
  children?: ReactNode
}

const FlipEditor: FC<Props> = () => {

  return <CMEditor />
}

export default FlipEditor

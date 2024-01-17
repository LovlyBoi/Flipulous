import { type FC, memo } from 'react'
import { type Metadata } from 'next'
import CardContainer from '@/app/(classes)/CardContainer'

export const metadata: Metadata = {
  title: 'Siven Space',
}

const PageIndex: FC = () => {
  return <CardContainer></CardContainer>
}

export default memo(PageIndex)

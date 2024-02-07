import { type ReactNode, type FC, memo } from 'react'
import PlainHeader from '@/app/NavHeader/PlainHeader'

const FlipLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      <div>
        <PlainHeader />
        {children}
      </div>
    </>
  )
}

export default memo(FlipLayout)

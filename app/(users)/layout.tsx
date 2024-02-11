import { type ReactNode, type FC, memo } from 'react'
import PlainHeader from '@/app/NavHeader/PlainHeader'

const UsersLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="">
        <PlainHeader />
        <div className="mt-[68px]">{children}</div>
      </div>
    </>
  )
}

export default memo(UsersLayout)

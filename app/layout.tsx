import { type ReactNode, type FC, memo } from 'react'
import './global.css'
import DarkMode from './DarkMode'
import { Toaster } from 'react-hot-toast'
import UserState from './UserState'

const RootLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <html lang="zh-CN">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className="font-serif">
        <DarkMode>
          <UserState>
            {children}
            <Toaster />
          </UserState>
        </DarkMode>
      </body>
    </html>
  )
}

export default memo(RootLayout)

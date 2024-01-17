import { type ReactNode, type FC, memo } from 'react'
import './global.css'
import DarkMode from './DarkMode'

const RootLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <html lang="zh-CN">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        <DarkMode>{children}</DarkMode>
      </body>
    </html>
  )
}

export default memo(RootLayout)

import { type ReactNode, type FC, memo } from 'react'
import Script from 'next/script'
// import CommonHeader from '@/app/NavHeader/CommonHeader'
// import StickyHeader from '@/app/NavHeader/StickyHeader'
import HeaderIndex from '@/app/NavHeader'
import Footer from '@/app/Footer'

const ClassesLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      {/* 引入masonry-layout.js */}
      <Script src="/js/masonryLayout.js"></Script>
      <div className="width-limit max-w-screen-lg mx-1 sm:mx-4 lg:mx-auto">
        <HeaderIndex />
        {children}
        <Footer />
      </div>
    </>
  )
}

export default memo(ClassesLayout)

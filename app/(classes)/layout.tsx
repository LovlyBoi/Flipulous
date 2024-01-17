import { type ReactNode, type FC, memo } from 'react'
import Script from 'next/script'
import CommomHeader from '@/app/NavHeader/CommomHeader'
import Footer from '@/app/Footer'

const ClassesLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      {/* 引入masonry-layout.js */}
      <Script src="/js/masonryLayout.js"></Script>
      <div className="width-limit max-w-screen-lg mx-1 sm:mx-4 lg:mx-auto">
        <CommomHeader />
        {children}
        <Footer />
      </div>
    </>
  )
}

export default memo(ClassesLayout)

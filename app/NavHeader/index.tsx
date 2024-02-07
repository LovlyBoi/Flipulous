'use client'
import {
  type FC,
  type ReactNode,
  useState,
  useEffect,
  useCallback,
  useRef,
  memo,
} from 'react'
import { CSSTransition } from 'react-transition-group'
import { throttle } from 'lodash-es'
import CommonHeader from './CommonHeader'
import StickyHeader from './StickyHeader'

type Props = {
  children?: ReactNode
}

const Index: FC<Props> = () => {
  const [isStickyHeaderShow, setIsStickyHeaderShow] = useState(false)
  const isStickyHeaderShowSetter = useRef(setIsStickyHeaderShow)

  const nodeRef = useRef(null)

  // 使用useCallback，阻止组件每次都重新生成节流函数
  const handleWindowScroll = useCallback(
    throttle(() => {
      const header = document.querySelector('.header') as HTMLDivElement
      if (!header) return
      const [scrollTop, headerBottom] = [
        window.scrollY,
        header.offsetHeight + header.offsetTop,
      ]
      // 看不见header了
      if (scrollTop > headerBottom + 50) {
        if (!header.classList.contains('header-cant-see')) {
          header.classList.add('header-cant-see')
          isStickyHeaderShowSetter.current(true)
        }
      } else {
        if (header.classList.contains('header-cant-see')) {
          header.classList.remove('header-cant-see')
          isStickyHeaderShowSetter.current(false)
        }
      }
    }, 200),
    [],
  )

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll)
    return () => {
      window.removeEventListener('scroll', handleWindowScroll)
    }
  }, [handleWindowScroll])

  return (
    <>
      <CommonHeader />
      <CSSTransition
        nodeRef={nodeRef}
        in={isStickyHeaderShow}
        classNames="fade-in-top"
        timeout={300}
        appear
        unmountOnExit
      >
        <StickyHeader ref={nodeRef} />
      </CSSTransition>
    </>
  )
}

export default memo(Index)

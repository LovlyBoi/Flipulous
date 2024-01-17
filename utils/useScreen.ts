import { type Dispatch, type SetStateAction, useState, useEffect } from 'react'
import { useDocument, useClient } from './useClient'

const setters = new Set<Dispatch<SetStateAction<number>>>()

let resizer: () => void

export function useClientWidth() {
  const doc = useDocument()

  const [clientWidth, setClientWidth] = useState(doc?.body?.clientWidth || 1024)

  useClient(() => {
    setClientWidth(document.body.clientWidth)
    // 组件创建后订阅
    setters.add(setClientWidth)

    // 如果没有监听过事件，监听
    if (!resizer) {
      resizer = () => {
        setters.forEach(
          (setter) =>
            typeof setter === 'function' && setter(document.body.clientWidth),
        )
      }
      window.addEventListener('resize', resizer)
    }

    return () => {
      // 组件销毁前取消订阅
      setters.delete(setClientWidth)
    }
  })

  return clientWidth
}

export function useScreenSize() {
  const clientWidth = useClientWidth()
  if (clientWidth < 640) {
    return 'xs'
  } else if (clientWidth >= 640 && clientWidth < 768) {
    return 'sm'
  } else if (clientWidth >= 768 && clientWidth < 1024) {
    return 'md'
  } else if (clientWidth >= 1024 && clientWidth < 1280) {
    return 'lg'
  } else if (clientWidth >= 1280 && clientWidth < 1536) {
    return 'xl'
  } else {
    return '2xl'
  }
}

export function useScreenType() {
  const clientWidth = useClientWidth()
  if (clientWidth < 640) {
    return 'phone'
  } else if (clientWidth >= 640 && clientWidth < 768) {
    return 'pad'
  } else if (clientWidth >= 768 && clientWidth < 1024) {
    return 'pad'
  } else if (clientWidth >= 1024 && clientWidth < 1280) {
    return 'laptop'
  } else if (clientWidth >= 1280 && clientWidth < 1536) {
    return 'desktop'
  } else {
    return 'desktop'
  }
}

import {
  type EffectCallback,
  type DependencyList,
  useEffect,
  useState,
} from 'react'

export function useClient(effect: EffectCallback, deps?: DependencyList) {
  useEffect(effect, deps ?? [])
}

export function useWindow() {
  const [w, setW] = useState<Window | null>(null)
  useClient(() => {
    setW(window)
  })
  return w
}

export function useDocument() {
  const [d, setD] = useState<Document | null>(null)
  useClient(() => {
    setD(document)
  })
  return d
}

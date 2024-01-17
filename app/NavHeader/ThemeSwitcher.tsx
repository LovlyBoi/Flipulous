'use client'
import { type FC, type ReactNode, useEffect, useRef } from 'react'
import styles from './themeSwitcher.module.css'
import { useDarkMode } from '@/utils/useDarkMode'

type Props = {
  children?: ReactNode
}

const ThemeSwitcher: FC<Props> = () => {
  const [theme, setTheme] = useDarkMode()

  const isDarkMode = theme === 'dark'

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // ssr 回来之后，永远是浅色模式
    // 需要自己来同步一下初始状态（我觉得这是个框架 bug
    inputRef.current && (inputRef.current.checked = isDarkMode)
  }, [])

  return (
    <>
      <input
        ref={inputRef}
        type="checkbox"
        id={styles['theme-switcher']}
        checked={isDarkMode}
        onChange={() => setTheme(isDarkMode ? 'light' : 'dark')}
      />
      <label
        className={styles['theme-switcher-label']}
        htmlFor={styles['theme-switcher']}
      >
        <span></span>
      </label>
    </>
  )
}

export default ThemeSwitcher

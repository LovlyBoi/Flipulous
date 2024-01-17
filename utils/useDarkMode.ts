import { useSessionStorage } from 'react-use'
import { useClient } from './useClient'

type ThemeMode = 'light' | 'dark'

function addThemeClass(mode: ThemeMode) {
  const html = document.documentElement
  if (mode === 'light') {
    html.classList.remove('dark')
  } else if (mode === 'dark') {
    html.classList.add('dark')
  } else {
    throw Error('Unknown Mode: ' + mode)
  }
}

let handleThemeChange: (e: MediaQueryListEvent) => void

export function useDarkMode() {
  const [theme, setTheme] = useSessionStorage<ThemeMode>('siven-theme', 'light')

  useClient(() => {
    addThemeClass(theme)

    const mqList =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')

    if (mqList) {
      if (!handleThemeChange) {
        handleThemeChange = (e) => {
          const mode = e.matches ? 'dark' : 'light'
          addThemeClass(mode)
        }
        mqList.addEventListener('change', handleThemeChange)
      }
    }

    return () => {
      if (handleThemeChange) {
        mqList.removeEventListener('change', handleThemeChange)
      }
    }
  })

  // 返回当前主题和修改当前主题的方法
  return [
    theme,
    (newTheme: ThemeMode) => {
      // 修改主题时，需要同步 session 和 html 的类名
      setTheme(newTheme)
      addThemeClass(newTheme)
    },
  ] as const
}

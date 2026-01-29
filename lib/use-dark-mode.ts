import { useEffect, useState } from 'react'

import useDarkModeImpl from '@fisch0920/use-dark-mode'

export function useDarkMode() {
  const [hasMounted, setHasMounted] = useState(false)
  const darkMode = useDarkModeImpl(false, { classNameDark: 'dark-mode' })

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return {
    hasMounted,
    // 마운트 전에는 항상 false 반환 (서버와 동일)
    isDarkMode: hasMounted ? darkMode.value : false,
    toggleDarkMode: darkMode.toggle
  }
}

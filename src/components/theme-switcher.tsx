import { Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Cargar el tema desde localStorage o usar light por defecto
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    // Aplicar la clase al body según el tema
    if (isDarkMode) {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

  return (
    <>
      {isDarkMode ? (
        <Sun
          size={20}
          onClick={toggleTheme}
          className='absolute top-6 right-6'
        />
      ) : (
        <Moon
          size={20}
          onClick={toggleTheme}
          className='absolute top-6 right-6'
        />
      )}
    </>
  )
}

export default ThemeSwitcher

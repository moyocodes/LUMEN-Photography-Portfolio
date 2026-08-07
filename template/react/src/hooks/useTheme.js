import { useEffect, useState } from "react"

const STORAGE_KEY = "site-theme"
const CHOSEN_KEY = "site-theme-chosen"

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light"
    return localStorage.getItem(STORAGE_KEY) || "light"
  })
  const [hasChosen, setHasChosen] = useState(() => {
    if (typeof window === "undefined") return false
    return localStorage.getItem(CHOSEN_KEY) === "1"
  })

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  function choose(next) {
    setTheme(next)
    setHasChosen(true)
    localStorage.setItem(CHOSEN_KEY, "1")
  }

  const toggle = () => choose(theme === "light" ? "dark" : "light")

  return { theme, toggle, choose, hasChosen }
}

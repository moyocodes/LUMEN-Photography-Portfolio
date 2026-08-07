import { useEffect, useState } from "react"

const AUTO_DISMISS_MS = 8000

export function DarkModeToast({ theme, hasChosen, onChoose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (hasChosen) return
    const showTimer = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(showTimer)
  }, [hasChosen])

  useEffect(() => {
    if (!visible) return
    const hideTimer = setTimeout(() => setVisible(false), AUTO_DISMISS_MS)
    return () => clearTimeout(hideTimer)
  }, [visible])

  if (hasChosen || !visible) return null

  const suggestedTheme = theme === "light" ? "dark" : "light"

  return (
    <div
      role="dialog"
      aria-label="Theme suggestion"
      className="fixed bottom-6 left-1/2 z-[9500] w-[min(320px,calc(100vw-2.5rem))] -translate-x-1/2 rounded-2xl bg-surface-2 p-4 text-foreground shadow-[0_16px_48px_rgba(0,0,0,0.35)] ring-1 ring-foreground/10 sm:left-6 sm:translate-x-0"
    >
      <p className="mb-3 text-[0.8rem] leading-[1.5] text-foreground/70">
        Prefer it dark? This site looks great in {suggestedTheme} mode too.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          data-cursor-hover
          onClick={() => {
            onChoose(suggestedTheme)
            setVisible(false)
          }}
          className="flex-1 rounded-full bg-rose px-3 py-2 text-center text-[0.6rem] font-medium tracking-[0.1em] uppercase text-background transition-colors duration-200 hover:bg-rose-2"
        >
          Switch to {suggestedTheme}
        </button>
        <button
          type="button"
          data-cursor-hover
          onClick={() => setVisible(false)}
          className="flex-1 rounded-full border border-foreground/15 px-3 py-2 text-center text-[0.6rem] tracking-[0.1em] uppercase text-foreground transition-colors duration-200 hover:border-foreground/40"
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}

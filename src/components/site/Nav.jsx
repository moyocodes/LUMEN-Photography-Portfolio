import { useEffect, useState } from "react"
import { buildWhatsAppLink, DEFAULT_BOOKING_MESSAGE } from "@/lib/whatsapp"
import { useTheme } from "@/hooks/useTheme"

export function Nav({ onOpenTips }) {
  const [stuck, setStuck] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 60)
    addEventListener("scroll", onScroll, { passive: true })
    return () => removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      id="nav"
      className={`fixed inset-x-0 top-0 z-[8000] flex items-center justify-between px-[var(--gap)] py-[1.3rem] backdrop-blur-2xl transition-all duration-400 ${
        stuck
          ? "bg-bone/90 border-b border-ink/8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          : "bg-bone/35"
      }`}
      style={{ "--gap": "clamp(1.2rem, 3.5vw, 3.5rem)" }}
    >
      <a
        href="#top"
        className="font-display text-[0.9rem] font-black tracking-[0.06em] text-ink no-underline"
        data-cursor-hover
      >
        TTMP<span className="text-rose">.</span>
      </a>
      <div className="flex gap-[0.1rem]">
        {[
          ["#film-zone", "Work"],
          ["#about", "About"],
          ["#packages", "Pricing"],
          ["#contact", "Contact"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            data-cursor-hover
            className="px-[0.9rem] py-[0.5rem] text-[0.62rem] tracking-[0.14em] uppercase text-ink/50 no-underline transition-colors duration-200 hover:text-ink"
          >
            {label}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-[0.65rem]">
        <button
          type="button"
          onClick={toggle}
          data-cursor-hover
          aria-label="Toggle light/dark theme"
          className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-ink/25 text-rose transition-all duration-200 hover:bg-rose hover:text-bone"
        >
          {theme === "light" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={onOpenTips}
          data-cursor-hover
          className="rounded-full border border-ink/25 px-[1.1rem] py-[0.5rem] font-sans text-[0.6rem] tracking-[0.12em] uppercase text-rose transition-all duration-200 hover:bg-rose hover:text-bone"
        >
          Tips
        </button>
        <a
          href={buildWhatsAppLink(DEFAULT_BOOKING_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="rounded-full bg-rose px-[1.3rem] py-[0.55rem] text-[0.6rem] font-medium tracking-[0.12em] uppercase text-bone no-underline transition-colors duration-200 hover:bg-rose-2"
        >
          Book session
        </a>
      </div>
    </nav>
  )
}

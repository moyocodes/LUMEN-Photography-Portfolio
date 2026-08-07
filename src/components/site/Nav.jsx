import { useEffect, useState } from "react"
import { buildWhatsAppLink, DEFAULT_BOOKING_MESSAGE } from "@/lib/whatsapp"
import { useTheme } from "@/hooks/useTheme"

const LINKS = [
  ["#film-zone", "Work"],
  ["#about", "About"],
  ["#packages", "Pricing"],
  ["#contact", "Contact"],
]

export function Nav({ onOpenTips }) {
  const [stuck, setStuck] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 60)
    addEventListener("scroll", onScroll, { passive: true })
    return () => removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <>
      <nav
        id="nav"
        className={`fixed inset-x-0 top-0 z-[8000] flex items-center justify-between px-[var(--gap)] py-[1.3rem] backdrop-blur-2xl transition-all duration-400 ${
          stuck
            ? "bg-background/90 border-b border-foreground/8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            : "bg-background/60"
        }`}
        style={{ "--gap": "clamp(1.2rem, 3.5vw, 3.5rem)" }}
      >
        <a
          href="#top"
          onClick={() => setMenuOpen(false)}
          className="font-display text-[0.9rem] font-black tracking-[0.06em] text-foreground no-underline"
          data-cursor-hover
        >
          TTMP<span className="text-rose">.</span>
        </a>

        <div className="hidden md:flex gap-[0.1rem]">
          {LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              data-cursor-hover
              className="px-[0.9rem] py-[0.5rem] text-[0.62rem] tracking-[0.14em] uppercase text-foreground/50 no-underline transition-colors duration-200 hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-[0.4rem] md:gap-[0.65rem]">
          <button
            type="button"
            onClick={toggle}
            data-cursor-hover
            aria-label="Toggle light/dark theme"
            className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-foreground/25 text-rose transition-all duration-200 hover:bg-rose hover:text-background"
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
            className="rounded-full border border-foreground/25 px-[0.8rem] py-[0.5rem] font-sans text-[0.6rem] tracking-[0.12em] uppercase text-rose transition-all duration-200 hover:bg-rose hover:text-background md:px-[1.1rem]"
          >
            Tips
          </button>
          <a
            href={buildWhatsAppLink(DEFAULT_BOOKING_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-block rounded-full bg-rose px-[0.9rem] py-[0.5rem] text-[0.55rem] font-medium tracking-[0.1em] uppercase text-background no-underline transition-colors duration-200 hover:bg-rose-2 sm:px-[1.3rem] sm:py-[0.55rem] sm:text-[0.6rem] sm:tracking-[0.12em]"
          >
            Book session
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            data-cursor-hover
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-foreground/25 text-foreground md:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="nav-drawer-back"
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[9050] bg-[rgba(7,7,10,0.65)] backdrop-blur-[5px] transition-opacity duration-400 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        id="nav-drawer"
        className={`fixed right-0 top-0 bottom-0 z-[9100] flex w-[300px] max-w-[85vw] flex-col overscroll-contain bg-background transition-transform duration-550 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center justify-between border-b border-foreground/8 p-[1.8rem]">
          <span className="font-display text-[0.85rem] font-black tracking-[0.06em] text-foreground">
            TTMP<span className="text-rose">.</span>
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            data-cursor-hover
            aria-label="Close menu"
            className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-foreground/25 text-foreground transition-all duration-200 hover:border-rose hover:text-rose"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-[0.3rem] overflow-y-auto p-[1.8rem]">
          {LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              data-cursor-hover
              className="border-b border-foreground/8 py-[1.1rem] text-[1.1rem] tracking-[0.02em] text-foreground no-underline"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="p-[1.8rem] pt-0">
          <a
            href={buildWhatsAppLink(DEFAULT_BOOKING_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            data-cursor-hover
            className="block rounded-full bg-rose px-[1.3rem] py-[0.85rem] text-center text-[0.65rem] font-medium tracking-[0.12em] uppercase text-background no-underline"
          >
            Book session
          </a>
        </div>
      </div>
    </>
  )
}

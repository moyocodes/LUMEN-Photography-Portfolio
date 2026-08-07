import { useEffect, useRef, useState } from "react"
import { buildWhatsAppLink, DEFAULT_BOOKING_MESSAGE } from "@/lib/whatsapp"
import { RATES, PACKAGES_NOTE } from "@/lib/siteConfig"

export function RateCardWidget() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function onPointerDown(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false)
    }
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <div className="fixed bottom-6 left-6 z-999 flex flex-col items-start gap-3">
      {open && (
        <div
          ref={panelRef}
          className="w-[min(300px,calc(100vw-3rem))] rounded-2xl bg-surface-2 p-4 text-foreground shadow-[0_16px_48px_rgba(0,0,0,0.35)] ring-1 ring-foreground/10"
        >
          <div className="mb-3 text-xs font-medium tracking-[0.04em] uppercase text-foreground/60">
            Rate card
          </div>
          <ul className="mb-3 list-none p-0">
            {RATES.map((r) => (
              <li
                key={r.name}
                className="flex items-center justify-between gap-3 border-t border-foreground/8 py-2 text-[0.8rem] first:border-t-0"
              >
                <span className="text-foreground/70">{r.name}</span>
                <span className="font-display font-medium text-foreground">{r.price}</span>
              </li>
            ))}
          </ul>
          <p className="mb-3 text-[0.65rem] leading-[1.6] text-foreground/40">{PACKAGES_NOTE}</p>
          <div className="flex gap-2">
            <a
              href="#packages"
              onClick={() => setOpen(false)}
              data-cursor-hover
              className="flex-1 rounded-full border border-foreground/15 px-3 py-2 text-center text-[0.6rem] tracking-[0.1em] uppercase text-foreground no-underline transition-colors duration-200 hover:border-foreground/40"
            >
              Full price list
            </a>
            <a
              href={buildWhatsAppLink(DEFAULT_BOOKING_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-rose px-3 py-2 text-center text-[0.6rem] font-medium tracking-[0.1em] uppercase text-background no-underline transition-colors duration-200 hover:bg-rose-2"
            >
              Book now
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        id="rate-widget"
        aria-label="View rate card"
        aria-expanded={open}
        data-cursor-hover
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-surface-2 px-4 py-3 text-xs font-medium tracking-[0.04em] uppercase text-foreground shadow-[0_8px_28px_rgba(0,0,0,0.28)] ring-1 ring-foreground/10 transition-transform duration-200 hover:scale-105"
      >
        <span className="text-rose">$</span>
        <span className="max-sm:hidden">Rate card</span>
      </button>
    </div>
  )
}

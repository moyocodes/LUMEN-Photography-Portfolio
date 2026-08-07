import { useEffect, useRef, useState } from "react"
import { buildWhatsAppLink, DEFAULT_BOOKING_MESSAGE } from "@/lib/whatsapp"

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState(DEFAULT_BOOKING_MESSAGE)
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
    <div className="fixed bottom-6 right-6 z-999 flex flex-col items-end gap-3">
      {open && (
        <div
          ref={panelRef}
          className="w-[min(320px,calc(100vw-3rem))] rounded-2xl bg-surface-2 p-4 text-foreground shadow-[0_16px_48px_rgba(0,0,0,0.35)] ring-1 ring-foreground/10"
        >
          <div className="mb-3 text-xs font-medium tracking-[0.04em] uppercase text-foreground/60">
            Message us on WhatsApp
          </div>
          <textarea
            autoFocus
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full resize-none rounded-lg bg-background/60 p-3 text-sm text-foreground outline-none ring-1 ring-foreground/10 focus:ring-foreground/25"
          />
          <a
            href={buildWhatsAppLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            aria-disabled={!message.trim()}
            onClick={(e) => {
              if (!message.trim()) e.preventDefault()
              else setOpen(false)
            }}
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-medium text-white no-underline transition-opacity duration-200 aria-disabled:pointer-events-none aria-disabled:opacity-50"
          >
            Send on WhatsApp
          </a>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          data-cursor-hover
          onClick={() => setOpen((v) => !v)}
          className="hidden rounded-full bg-surface-2 px-4 py-2.5 text-xs font-medium text-foreground shadow-[0_8px_28px_rgba(0,0,0,0.18)] ring-1 ring-foreground/10 sm:block"
        >
          Chat with us
        </button>
        <button
          type="button"
          id="wa-widget"
          aria-label="Chat with us on WhatsApp"
          aria-expanded={open}
          data-cursor-hover
          onClick={() => setOpen((v) => !v)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-110"
        >
          <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
            <path d="M16.02 3C9.4 3 4 8.37 4 15c0 2.34.66 4.52 1.8 6.38L4 29l7.8-1.75A11.94 11.94 0 0 0 16.02 27C22.65 27 28 21.63 28 15S22.65 3 16.02 3Zm0 21.8c-1.98 0-3.83-.55-5.41-1.5l-.39-.23-4.63 1.04 1.02-4.5-.25-.4A9.7 9.7 0 0 1 6.2 15c0-5.4 4.4-9.8 9.82-9.8 5.42 0 9.82 4.4 9.82 9.8 0 5.4-4.4 9.8-9.82 9.8Zm5.38-7.34c-.29-.15-1.73-.86-2-.95-.27-.1-.46-.15-.66.14-.2.29-.76.95-.93 1.15-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.44a8.75 8.75 0 0 1-1.62-2.02c-.17-.29-.02-.44.13-.59.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.51h-.56c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.03c.15.19 2.07 3.17 5.03 4.44.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.12.56-.08 1.73-.71 1.98-1.39.24-.68.24-1.27.17-1.39-.07-.12-.26-.19-.55-.34Z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

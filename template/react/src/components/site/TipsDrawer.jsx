import { useEffect, useState } from "react"

// Optional bonus drawer — a small content panel with tabbed tip categories.
// Not wired into App.jsx by default. To use it: import TipsDrawer, add a
// `tipsOpen` state in App.jsx, render <TipsDrawer open={tipsOpen} onClose={...} />,
// and restore the "Tips" button in Nav.jsx (commented block).
// Replace TIPS and TABS below with your own content, or delete this file.

const CATEGORY_1_KEY = "light"
const CATEGORY_2_KEY = "posing"

const TIPS = {
  [CATEGORY_1_KEY]: [
    { t: "Golden Hour", b: "Shoot in the hour after sunrise or before sunset. The low angle creates long shadows and warm, directional light that sculpts faces naturally." },
    { t: "Overcast is underrated", b: "A cloudy sky acts as a giant softbox. Shadows disappear, skin tones soften — ideal for portraits and detail shots." },
    { t: "Avoid midday sun", b: "Harsh overhead light casts unflattering shadows under the eyes. Move to open shade or use a diffuser." },
  ],
  [CATEGORY_2_KEY]: [
    { t: "Weight on the back foot", b: "Shifting weight to the back leg creates a relaxed, confident stance and a pleasing hip angle naturally." },
    { t: "Chin forward and down", b: "Chin slightly forward and fractionally down. Defines the jaw, reduces double chins. Classic for a reason." },
    { t: "Movement unlocks authenticity", b: "Ask subjects to walk, turn, laugh on cue — capture mid-motion. Staged stillness reads as staged; movement reads as real." },
  ],
}

const TABS = [
  { key: CATEGORY_1_KEY, label: "Light" },
  { key: CATEGORY_2_KEY, label: "Posing" },
]

export function TipsDrawer({ open, onClose }) {
  const [cat, setCat] = useState(TABS[0].key)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <div
        id="dback"
        onClick={onClose}
        className={`fixed inset-0 z-[9050] bg-[rgba(7,7,10,0.65)] backdrop-blur-[5px] transition-opacity duration-400 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        id="drawer"
        className={`fixed right-0 top-0 bottom-0 z-[9100] flex w-[370px] max-w-[90vw] flex-col overscroll-contain border-l border-foreground/9 bg-background transition-transform duration-550 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center justify-between border-b border-foreground/7 p-[1.8rem]">
          <span className="font-serif text-[1.2rem] italic text-foreground">Photography Tips</span>
          <button
            type="button"
            onClick={onClose}
            data-cursor-hover
            aria-label="Close"
            className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-foreground/18 text-[0.75rem] text-foreground/38 transition-all duration-200 hover:border-rose hover:text-rose"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-wrap gap-[0.3rem] border-b border-foreground/6 p-[0.9rem_1.8rem]">
          {TABS.map((tab) => {
            const on = cat === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setCat(tab.key)}
                data-cursor-hover
                className={`rounded-full border px-[0.8rem] py-[0.35rem] font-sans text-[0.52rem] tracking-[0.1em] uppercase transition-all duration-200 ${
                  on
                    ? "border-rose bg-rose text-background"
                    : "border-foreground/12 bg-transparent text-foreground/32"
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
        <div className="flex-1 overflow-y-auto p-[1.2rem_1.8rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {(TIPS[cat] || []).map((tip, i) => (
            <div
              className="mb-[0.7rem] rounded-[0.6rem] border border-foreground/7 bg-foreground/3 p-[1.1rem] transition-colors duration-200 hover:border-foreground/28"
              key={tip.t}
            >
              <div className="mb-[0.4rem] text-[0.46rem] tracking-[0.18em] uppercase text-rose">
                Tip {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mb-[0.45rem] font-serif text-[0.9rem] italic text-foreground">{tip.t}</div>
              <div className="text-[0.68rem] leading-[1.85] text-foreground/37">{tip.b}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

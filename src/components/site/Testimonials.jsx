const PLACEHOLDERS = [
  { initials: "—", name: "Client name", detail: "Portrait session" },
  { initials: "—", name: "Client name", detail: "Reel session" },
  { initials: "—", name: "Client name", detail: "Portrait session" },
]

const DELAY = { 1: "d1", 2: "d2", 3: "d3" }

export function Testimonials() {
  return (
    <section
      id="testi"
      className="bg-surface px-(--gap) py-[clamp(4rem,9vw,9rem)]"
      style={{ "--gap": "clamp(1.2rem, 3.5vw, 3.5rem)" }}
    >
      <div className="mx-auto max-w-(--max)" style={{ "--max": "1260px" }}>
        <p className="sr mb-4 flex items-center gap-[0.7rem] text-[0.55rem] tracking-[0.2em] uppercase text-rose before:block before:h-px before:w-6 before:bg-rose">
          Kind words
        </p>
        <h2 className="sr mb-12 font-display text-[clamp(1.8rem,3vw,3rem)] font-bold text-foreground">
          What clients say.
        </h2>
        <div className="mt-12 grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {PLACEHOLDERS.map((t, i) => (
            <div
              key={i}
              data-cursor-hover
              className={`sr ${DELAY[i + 1]} rounded-2xl border border-foreground/5 bg-foreground/3 p-[1.7rem] transition-colors duration-250 hover:border-foreground/25`}
            >
              <div className="mb-4 text-[0.72rem] tracking-[0.06em] text-rose">★★★★★</div>
              <p className="mb-[1.4rem] font-serif text-[0.95rem] italic leading-[1.8] text-foreground/60">
                "Client testimonials will appear here soon."
              </p>
              <div className="flex items-center gap-[0.65rem]">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-foreground/10 font-display text-[0.5rem] font-bold text-rose">
                  {t.initials}
                </div>
                <div>
                  <div className="text-[0.78rem] text-foreground">{t.name}</div>
                  <div className="mt-[0.1rem] text-[0.6rem] text-foreground/28">{t.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

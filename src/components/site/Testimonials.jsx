import { useEffect, useState } from "react"

const REVIEWS = [
  {
    quote: "I wasn't expecting less but you blew my mind.",
    name: "Client",
    detail: "Portrait session",
  },
  {
    quote: "They are so so beautiful! Thank you so much. God bless you.",
    name: "Client",
    detail: "Portrait session",
  },
  {
    quote: "Perfect. Thank you.",
    name: "Client",
    detail: "Reel session",
  },
]

export function Testimonials() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % REVIEWS.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

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

        <div className="sr relative mt-12 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {REVIEWS.map((t, i) => (
              <div key={i} className="w-full flex-shrink-0 px-1">
                <div
                  data-cursor-hover
                  className="mx-auto max-w-[560px] rounded-2xl border border-foreground/5 bg-foreground/3 p-[2rem] text-center transition-colors duration-250 hover:border-foreground/25"
                >
                  <div className="mb-4 text-[0.8rem] tracking-[0.06em] text-rose">★★★★★</div>
                  <p className="mb-[1.4rem] font-serif text-[1.05rem] italic leading-[1.8] text-foreground/70">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center justify-center gap-[0.65rem]">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-foreground/10 font-display text-[0.5rem] font-bold text-rose">
                      —
                    </div>
                    <div className="text-left">
                      <div className="text-[0.78rem] text-foreground">{t.name}</div>
                      <div className="mt-[0.1rem] text-[0.6rem] text-foreground/28">{t.detail}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-[0.5rem]">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                data-cursor-hover
                aria-label={`Go to review ${i + 1}`}
                className={`h-[6px] rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-rose" : "w-[6px] bg-foreground/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

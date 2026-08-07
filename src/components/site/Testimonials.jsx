import { useEffect, useState } from "react"

const REVIEWS = [
  { src: "/review-1.png", alt: "WhatsApp review: I wasn't expecting less but you blew my mind." },
  { src: "/review-2.png", alt: "WhatsApp review: They are so so beautiful! Thank you so much. God bless you." },
  { src: "/review-3.png", alt: "WhatsApp review: Perfect. Thank you." },
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

        <div className="sr mt-12 hidden gap-6 md:grid md:grid-cols-3">
          {REVIEWS.map((t, i) => (
            <div
              key={i}
              data-cursor-hover
              className="mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl border border-foreground/5 shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-colors duration-250 hover:border-foreground/25"
            >
              <img src={t.src} alt={t.alt} className="block h-auto w-full max-h-[460px] object-cover object-top" />
            </div>
          ))}
        </div>

        <div className="sr relative mt-12 overflow-hidden md:hidden">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {REVIEWS.map((t, i) => (
              <div key={i} className="w-full flex-shrink-0 px-1">
                <div
                  data-cursor-hover
                  className="mx-auto max-w-[360px] overflow-hidden rounded-2xl border border-foreground/5 shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-colors duration-250 hover:border-foreground/25"
                >
                  <img
                    src={t.src}
                    alt={t.alt}
                    className="block h-auto w-full max-h-[520px] object-cover object-top"
                  />
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

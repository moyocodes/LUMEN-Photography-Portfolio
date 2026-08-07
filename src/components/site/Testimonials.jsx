import { useEffect, useState } from "react"
import { buildWhatsAppLink, DEFAULT_BOOKING_MESSAGE } from "@/lib/whatsapp"

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
      className="bg-surface px-(--gap) py-[clamp(3rem,6vw,6rem)]"
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
            <img
              key={i}
              src={t.src}
              alt={t.alt}
              data-cursor-hover
              className="mx-auto h-auto max-h-[460px] w-full max-w-[320px] object-contain"
            />
          ))}
        </div>

        <div className="sr relative mt-12 overflow-hidden md:hidden">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {REVIEWS.map((t, i) => (
              <div key={i} className="w-full flex-shrink-0 px-1">
                <img
                  src={t.src}
                  alt={t.alt}
                  data-cursor-hover
                  className="mx-auto h-auto max-h-[520px] w-full max-w-[360px] object-contain"
                />
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

        <div className="sr mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-[0.85rem] text-foreground/50">
            Ready to be one of them?
          </p>
          <a
            href={buildWhatsAppLink(DEFAULT_BOOKING_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-block rounded-full bg-rose px-[1.8rem] py-[0.8rem] text-[0.65rem] font-medium tracking-[0.12em] uppercase text-background no-underline transition-all duration-250 hover:bg-rose-2"
          >
            Book a session
          </a>
        </div>
      </div>
    </section>
  )
}

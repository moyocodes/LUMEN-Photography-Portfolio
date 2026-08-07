import { useEffect, useState } from "react"
import { buildWhatsAppLink, DEFAULT_BOOKING_MESSAGE } from "@/lib/whatsapp"
import { REVIEWS } from "@/lib/siteConfig"

function Stars({ count }) {
  return (
    <div className="mb-4 flex gap-[0.15rem] text-rose" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i < count ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2.5l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.8 7.1-.7z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review, className = "" }) {
  return (
    <div
      data-cursor-hover
      className={`flex h-full flex-col rounded-2xl border border-foreground/8 bg-foreground/3 p-8 ${className}`}
    >
      <Stars count={review.rating} />
      <q className="mb-6 flex-1 font-serif text-[1.05rem] italic leading-[1.7] text-foreground/75">
        {review.quote}
      </q>
      <div className="flex items-center gap-3">
        <img
          src={review.photo}
          alt=""
          className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
        />
        <div>
          <div className="text-[0.8rem] font-medium text-foreground">{review.name}</div>
          <div className="text-[0.68rem] text-foreground/40">{review.location}</div>
        </div>
      </div>
    </div>
  )
}

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
      className="relative overflow-hidden bg-background px-(--gap) py-[clamp(2.5rem,5vw,4.5rem)]"
      style={{ "--gap": "clamp(1.2rem, 3.5vw, 3.5rem)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in srgb, var(--rose) 8%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-(--max)" style={{ "--max": "1260px" }}>
        <p className="sr mb-4 flex items-center gap-[0.7rem] text-[0.55rem] tracking-[0.2em] uppercase text-rose before:block before:h-px before:w-6 before:bg-rose">
          Kind words
        </p>
        <h2 className="sr mb-8 font-display text-[clamp(1.8rem,3vw,3rem)] font-bold text-foreground">
          What clients say.
        </h2>

        <div className="sr mt-8 hidden gap-6 md:grid md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>

        <div className="sr relative mt-8 overflow-hidden md:hidden">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {REVIEWS.map((r, i) => (
              <div key={i} className="w-full flex-shrink-0 px-1">
                <ReviewCard review={r} />
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-[0.5rem]">
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

        <div className="sr mt-8 flex flex-col items-center gap-3 text-center">
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

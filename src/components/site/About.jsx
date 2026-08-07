import { buildWhatsAppLink, DEFAULT_BOOKING_MESSAGE } from "@/lib/whatsapp"

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-surface px-(--gap) py-[clamp(5rem,11vw,11rem)]"
      style={{ "--gap": "clamp(1.2rem, 3.5vw, 3.5rem)" }}
    >
      <div className="mx-auto grid max-w-(--max) grid-cols-2 items-center gap-20 max-md:grid-cols-1 max-md:gap-12" style={{ "--max": "1260px" }}>
        <div className="srl relative h-[580px] max-md:h-[420px]">
          <img
            src="/portfolio/photo-12.jpeg"
            alt="TTMP portrait work"
            className="absolute left-0 top-0 h-[80%] w-[74%] object-contain"
          />
          <img
            src="/portfolio/photo-15.jpeg"
            alt="TTMP portrait work"
            className="absolute bottom-0 right-0 h-[52%] w-[54%] object-contain"
          />
        </div>
        <div className="srr d1">
          <p className="mb-[1.2rem] flex items-center gap-[0.7rem] text-[0.55rem] tracking-[0.2em] uppercase text-rose before:block before:h-px before:w-6 before:bg-rose">
            About
          </p>
          <h2 className="mb-[1.6rem] font-display text-[clamp(2rem,3.2vw,3.2rem)] font-bold leading-[1.08] text-foreground">
            I photograph what light <em className="font-serif text-rose font-normal italic">reveals.</em>
          </h2>
          <p className="mb-[1.8rem] max-w-[400px] text-[0.85rem] leading-[2] text-foreground/38">
            TTMP is a mobile photography studio built around portraits and
            reels that feel like you — no fixed studio, just good light and
            an eye for the moment worth keeping.
          </p>
          <div className="mb-8 border-l-2 border-rose pl-[1.2rem] py-[0.8rem]">
            <q className="font-serif text-[0.98rem] italic leading-[1.8] text-foreground/50">
              A photograph is a secret about a secret. The more it tells you, the less you know.
            </q>
          </div>
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

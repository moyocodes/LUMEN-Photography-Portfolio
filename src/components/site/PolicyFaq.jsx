import { useState } from "react"
import { buildWhatsAppLink, DEFAULT_BOOKING_MESSAGE } from "@/lib/whatsapp"

const POLICIES = [
  "Please kindly note that a shoot is scheduled for an hour — for the sake of my next client(s), kindly keep to time, as a ₦10,000 lateness fee will be charged.",
  "TTMP doesn't offer refunds.",
  "It is advisable to make your bookings in advance.",
  "All shoots end by 10pm — any time after that attracts a fee.",
]

const FAQS = [
  { q: "Do you have a studio?", a: "No, I am a mobile photographer." },
  {
    q: "Can I wear more than one outfit for my shoot?",
    a: "Yes, you can — as long as it doesn't exceed the number of pictures that will be edited.",
  },
  { q: "Are you available to travel?", a: "Yes, I am." },
  { q: "Do you shoot events?", a: "No, I don't." },
  { q: "Do you shoot reels videos?", a: "Yes, I do." },
  {
    q: "Do you teach, and can you edit outside pictures?",
    a: "No, I don't.",
  },
]

export function PolicyFaq() {
  const [open, setOpen] = useState(null)

  return (
    <section
      className="relative overflow-hidden bg-surface px-(--gap) py-[clamp(3rem,6vw,6rem)]"
      style={{ "--gap": "clamp(1.2rem, 3.5vw, 3.5rem)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
      >
        <span className="font-display text-[38vw] font-black leading-none tracking-[-0.04em] text-foreground/[0.035]">
          TTMP
        </span>
      </div>

      <div className="relative mx-auto grid max-w-(--max) grid-cols-2 gap-16 max-md:grid-cols-1 max-md:gap-14" style={{ "--max": "1100px" }}>
        <div id="policy">
          <p className="sr mb-4 flex items-center gap-[0.7rem] text-[0.55rem] tracking-[0.2em] uppercase text-rose before:block before:h-px before:w-6 before:bg-rose">
            Please read
          </p>
          <h2 className="sr mb-12 font-display text-[clamp(1.8rem,3vw,3rem)] font-bold text-foreground">
            Booking policy.
          </h2>
          <div className="sr d1 rounded-2xl bg-background p-[clamp(2rem,4vw,3.4rem)] text-foreground">
            <div className="mb-[1.6rem] flex items-center justify-between border-b border-foreground/12 pb-[1.6rem]">
              <span className="font-display text-[1.05rem] font-bold">Booking Policy</span>
              <span className="flex h-[2.2rem] w-[2.2rem] items-center justify-center rounded-full border-[1.5px] border-foreground font-serif italic">
                !
              </span>
            </div>
            <ul className="flex list-none flex-col gap-[1.7rem] p-0 text-center">
              {POLICIES.map((policy) => (
                <li key={policy} className="mx-auto max-w-[30rem] text-[0.92rem] leading-[1.75] tracking-[0.01em]">
                  {policy}
                </li>
              ))}
            </ul>
            <p className="mt-[2.2rem] text-center text-[0.85rem] leading-[1.7] opacity-[0.68]">
              Please kindly read through before proceeding with your booking.
              Thank you, beautiful people.
            </p>
            <p className="mt-[1.4rem] text-center text-[0.62rem] tracking-[0.2em] uppercase opacity-[0.45]">
              @ttakesmypictures
            </p>
          </div>
        </div>

        <div id="faq">
          <p className="sr mb-4 flex items-center gap-[0.7rem] text-[0.55rem] tracking-[0.2em] uppercase text-rose before:block before:h-px before:w-6 before:bg-rose">
            Good to know
          </p>
          <h2 className="sr mb-12 font-display text-[clamp(1.8rem,3vw,3rem)] font-bold text-foreground">
            FAQ.
          </h2>
          <div className="sr d1">
            {FAQS.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={item.q} className="border-b border-foreground/10">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    data-cursor-hover
                    className="flex w-full items-center justify-between gap-4 border-none bg-transparent px-[0.2rem] py-[1.3rem] text-left font-sans text-[0.92rem] text-foreground"
                  >
                    {item.q}
                    <span
                      className={`flex-shrink-0 font-serif text-[1.1rem] italic text-rose transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-[max-height] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ maxHeight: isOpen ? "12rem" : "0" }}
                  >
                    <p className="px-[0.2rem] pb-[1.3rem] text-[0.82rem] leading-[1.75] text-foreground/50">
                      {item.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="sr relative mx-auto mt-16 flex max-w-(--max) flex-col items-center gap-4 text-center" style={{ "--max": "1100px" }}>
        <p className="text-[0.85rem] text-foreground/50">
          Still have questions?
        </p>
        <a
          href={buildWhatsAppLink(DEFAULT_BOOKING_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="inline-block rounded-full bg-rose px-[1.8rem] py-[0.8rem] text-[0.65rem] font-medium tracking-[0.12em] uppercase text-background no-underline transition-all duration-250 hover:bg-rose-2"
        >
          Message on WhatsApp
        </a>
      </div>
    </section>
  )
}

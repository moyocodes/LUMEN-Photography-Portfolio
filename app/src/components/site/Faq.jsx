import { useState } from "react"

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

export function Faq() {
  const [open, setOpen] = useState(null)

  return (
    <section
      id="faq"
      className="bg-background px-(--gap) py-[clamp(4rem,9vw,9rem)]"
      style={{ "--gap": "clamp(1.2rem, 3.5vw, 3.5rem)" }}
    >
      <div className="mx-auto max-w-[760px]">
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
    </section>
  )
}

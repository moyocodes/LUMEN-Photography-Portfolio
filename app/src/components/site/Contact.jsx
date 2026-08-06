import { useState } from "react"
import { buildWhatsAppLink } from "@/lib/whatsapp"

export function Contact() {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [note, setNote] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    const lines = ["Hi TTMP! I'd like to book a session."]
    if (name) lines.push(`Name: ${name}`)
    if (type) lines.push(`Session type: ${type}`)
    if (note) lines.push(`Details: ${note}`)
    window.open(buildWhatsAppLink(lines.join("\n")), "_blank", "noopener,noreferrer")
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-(--gap) py-[clamp(5rem,10vw,10rem)] bg-[#07070a]"
      style={{ "--gap": "clamp(1.2rem, 3.5vw, 3.5rem)" }}
    >
      <img
        id="ct-bg"
        src="/portfolio/photo-7.jpeg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-[0.14] grayscale contrast-[1.1]"
      />
      <div
        id="ct-vign"
        className="absolute inset-0"
        style={{
          background: "linear-gradient(130deg, rgba(7,7,10,0.97) 45%, rgba(7,7,10,0.65) 100%)",
        }}
      />
      <div className="relative z-1 mx-auto grid max-w-(--max) grid-cols-2 items-start gap-24 max-md:grid-cols-1 max-md:gap-12" style={{ "--max": "1260px" }}>
        <div className="srl">
          <h2 className="mb-[1.2rem] font-display text-[clamp(2rem,3.8vw,3.8rem)] font-bold leading-[1.05] text-bone">
            Your story
            <br />
            is waiting
            <br />
            <em className="font-serif text-rose font-normal italic">to be told.</em>
          </h2>
          <p className="mb-[1.6rem] text-[0.8rem] leading-[2] text-bone/30">
            Send a message and I'll get back to you on WhatsApp to confirm
            your date.
          </p>
          <div>
            <a
              href="https://instagram.com/ttakesmypictures"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="mb-[0.35rem] block text-[0.78rem] text-bone/32 no-underline transition-colors duration-200 hover:text-rose"
            >
              @ttakesmypictures
            </a>
          </div>
        </div>
        <form className="srr d1" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-cursor-hover
              className="w-full rounded-[0.45rem] border border-bone/8 bg-bone/4 px-4 py-[0.8rem] font-sans text-[0.78rem] text-bone outline-none transition-colors duration-200 placeholder:text-bone/18 focus:border-rose"
            />
          </div>
          <div className="mb-3">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              data-cursor-hover
              className="w-full rounded-[0.45rem] border border-bone/8 bg-bone/4 px-4 py-[0.8rem] font-sans text-[0.78rem] text-bone outline-none transition-colors duration-200 focus:border-rose"
            >
              <option value="">Type of session…</option>
              <option>4 Edited Pictures</option>
              <option>8 Edited Pictures (2 Looks)</option>
              <option>Reels</option>
            </select>
          </div>
          <div className="mb-3">
            <textarea
              placeholder="Tell me about your vision…"
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              data-cursor-hover
              className="w-full resize-none rounded-[0.45rem] border border-bone/8 bg-bone/4 px-4 py-[0.8rem] font-sans text-[0.78rem] text-bone outline-none transition-colors duration-200 placeholder:text-bone/18 focus:border-rose"
            />
          </div>
          <button
            type="submit"
            data-cursor-hover
            className="inline-block w-full rounded-full bg-rose px-[1.8rem] py-[0.8rem] text-[0.65rem] font-medium tracking-[0.12em] uppercase text-ink no-underline transition-all duration-250 hover:bg-rose-2"
          >
            Send on WhatsApp
          </button>
        </form>
      </div>
      <div className="relative z-1 mx-auto mt-20 flex max-w-(--max) flex-wrap items-center justify-between gap-4 border-t border-bone/6 pt-[1.8rem]" style={{ "--max": "1260px" }}>
        <div className="font-display text-[0.8rem] font-black text-bone">
          TTMP<span className="text-rose">.</span>
        </div>
        <p className="text-[0.58rem] text-bone/16">© 2026 TTMP Photography. All rights reserved.</p>
        <div className="flex gap-[1.4rem]">
          <a
            href="https://instagram.com/ttakesmypictures"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="text-[0.55rem] tracking-[0.12em] uppercase text-bone/18 no-underline transition-colors duration-200 hover:text-rose"
          >
            Instagram
          </a>
          <a
            href="#film-zone"
            data-cursor-hover
            className="text-[0.55rem] tracking-[0.12em] uppercase text-bone/18 no-underline transition-colors duration-200 hover:text-rose"
          >
            Work
          </a>
          <a
            href="#contact"
            data-cursor-hover
            className="text-[0.55rem] tracking-[0.12em] uppercase text-bone/18 no-underline transition-colors duration-200 hover:text-rose"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from "react"

const clamp = (t) => Math.max(0, Math.min(1, t))
const remap = (t, a, b) => clamp((t - a) / (b - a))
const easeOut = (t) => 1 - Math.pow(1 - t, 3)

export function Hero() {
  const zoneRef = useRef(null)
  const pinRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const hintRef = useRef(null)
  const quoteRef = useRef(null)
  const quoteInnerRef = useRef(null)
  const ctaRef = useRef(null)
  const ctaInRef = useRef(null)

  useEffect(() => {
    function update() {
      const zone = zoneRef.current
      if (!zone) return
      const zt = zone.getBoundingClientRect().top
      const zh = zone.offsetHeight - innerHeight
      const p = clamp(-zt / zh)

      const p0 = remap(p, 0, 0.18)
      textRef.current.style.opacity = String(1 - easeOut(p0))
      textRef.current.style.transform = `translateY(${-easeOut(p0) * 50}px)`
      hintRef.current.style.opacity = String(Math.max(0, 1 - p0 * 5))

      imgRef.current.style.transform = `scale(${1 + p * 0.06})`

      const qIn = remap(p, 0.3, 0.46)
      const qOut = remap(p, 0.5, 0.64)
      const qO = easeOut(qIn) * (1 - easeOut(qOut))
      quoteRef.current.style.opacity = String(qO)
      quoteInnerRef.current.style.transform = `translateY(${(1 - easeOut(qIn)) * 30}px)`

      const cp = remap(p, 0.62, 0.78)
      ctaRef.current.style.opacity = String(easeOut(cp))
      ctaRef.current.style.pointerEvents = cp > 0.05 ? "auto" : "none"
      ctaInRef.current.style.opacity = String(easeOut(remap(p, 0.64, 0.8)))
      ctaInRef.current.style.transform = `translateY(${(1 - easeOut(remap(p, 0.64, 0.8))) * 36}px)`

      pinRef.current.style.opacity = p > 0.96 ? String(1 - remap(p, 0.96, 1)) : "1"
    }

    let tick = false
    const onScroll = () => {
      if (tick) return
      tick = true
      requestAnimationFrame(() => {
        update()
        tick = false
      })
    }
    addEventListener("scroll", onScroll, { passive: true })
    update()
    return () => removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div id="hero-zone" ref={zoneRef} className="relative h-[400vh]">
      <div id="hero-pin" ref={pinRef} className="sticky top-0 z-0 h-dvh overflow-hidden">
        <div
          id="h-img"
          ref={imgRef}
          className="absolute inset-0 h-full w-full origin-center"
        >
          <img
            src="/portfolio/photo-1.jpeg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover max-md:block hidden"
          />
          <div className="hidden h-full w-full md:grid md:grid-cols-3">
            <img
              src="/portfolio/photo-14.jpeg"
              alt=""
              className="h-full w-full object-cover object-top"
            />
            <img
              src="/portfolio/photo-1.jpeg"
              alt=""
              className="h-full w-full object-cover"
            />
            <img
              src="/portfolio/photo-16.jpeg"
              alt=""
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
        <div id="h-grad" className="absolute inset-0" style={{ background: "var(--hero-gradient)" }} />

        <div
          id="h-text"
          ref={textRef}
          className="absolute inset-0 z-5 mx-auto flex max-w-(--max) flex-col justify-end px-(--gap) pb-[clamp(3rem,7vh,6rem)]"
          style={{ "--gap": "clamp(1.2rem, 3.5vw, 3.5rem)", "--max": "1260px" }}
        >
          <p className="mb-[1.6rem] flex items-center gap-[0.8rem] text-[0.56rem] tracking-[0.22em] uppercase text-rose before:block before:h-px before:w-8 before:bg-rose">
            Mobile Photographer · Available to Travel
          </p>
          <h1 className="mb-[2.8rem] font-display text-[clamp(3.8rem,9.5vw,10rem)] font-black leading-[0.88] tracking-[-0.03em] text-foreground">
            Light.
            <br />
            Moment.
            <br />
            <em className="font-serif text-rose font-normal italic">Memory.</em>
          </h1>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <p className="max-w-[280px] text-[0.85rem] leading-[1.9] text-foreground/40">
              Portrait &amp; reel photography — emotion held still.
            </p>
            <div className="flex gap-[0.6rem]">
              <a
                href="#film-zone"
                data-cursor-hover
                className="inline-block rounded-full bg-rose px-[1.8rem] py-[0.8rem] text-[0.65rem] font-medium tracking-[0.12em] uppercase text-background no-underline transition-all duration-250 hover:bg-rose-2"
              >
                View gallery
              </a>
              <a
                href="#about"
                data-cursor-hover
                className="inline-block rounded-full border border-foreground/22 px-[1.8rem] py-[0.8rem] text-[0.65rem] tracking-[0.12em] uppercase text-foreground no-underline transition-all duration-250 hover:border-foreground/60"
              >
                About
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          ref={hintRef}
        >
          <span className="text-[0.5rem] tracking-[0.2em] uppercase text-foreground/22">Scroll</span>
          <div
            className="h-[2.6rem] w-px"
            style={{
              background:
                "linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 22%, transparent), transparent)",
            }}
          />
        </div>

        <div
          id="h-quote"
          ref={quoteRef}
          className="absolute inset-0 z-6 flex items-center justify-center pointer-events-none opacity-0"
        >
          <div id="h-q-inner" ref={quoteInnerRef} className="p-8 text-center">
            <h2
              className="font-serif text-[clamp(2.8rem,7.5vw,8rem)] font-normal italic leading-[0.93] tracking-[-0.01em] text-foreground"
              style={{
                textShadow:
                  "0 4px 80px color-mix(in srgb, var(--background) 90%, transparent)",
              }}
            >
              Every frame
              <br />
              is a{" "}
              <strong className="font-display text-[0.6em] font-black not-italic tracking-[-0.03em] text-rose">
                confession.
              </strong>
            </h2>
          </div>
        </div>

        <div
          id="h-cta"
          ref={ctaRef}
          className="absolute inset-0 z-7 flex items-center justify-center pointer-events-none opacity-0"
        >
          <div className="absolute inset-0" style={{ background: "var(--background)" }} />
          <div className="absolute inset-y-0 left-0 hidden w-[22%] lg:block">
            <img src="/portfolio/photo-11.jpeg" alt="" className="h-full w-full object-cover object-top opacity-60" />
          </div>
          <div className="absolute inset-y-0 right-0 hidden w-[22%] lg:block">
            <img src="/portfolio/photo-16.jpeg" alt="" className="h-full w-full object-cover object-top opacity-60" />
          </div>
          <div id="h-cta-in" ref={ctaInRef} className="relative translate-y-10 text-center opacity-0">
            <div className="mb-[1.4rem] text-[0.6rem] tracking-[0.2em] uppercase text-rose">
              Ready to be seen?
            </div>
            <h3 className="mb-[1.2rem] font-serif text-[clamp(2.8rem,6vw,6.5rem)] font-normal leading-[0.92] text-foreground">
              Let's make
              <br />
              <em className="italic text-rose">something real.</em>
            </h3>
            <p className="mx-auto mb-8 max-w-[340px] text-[0.82rem] leading-[1.85] text-foreground/38">
              A feeling, a moment — preserved in a single frame.
            </p>
            <div className="flex justify-center gap-[0.6rem]">
              <a
                href="#film-zone"
                data-cursor-hover
                className="pointer-events-auto inline-block rounded-full bg-rose px-[1.8rem] py-[0.8rem] text-[0.65rem] font-medium tracking-[0.12em] uppercase text-background no-underline transition-all duration-250 hover:bg-rose-2"
              >
                See the work
              </a>
              <a
                href="#contact"
                data-cursor-hover
                className="pointer-events-auto inline-block rounded-full border border-foreground/22 px-[1.8rem] py-[0.8rem] text-[0.65rem] tracking-[0.12em] uppercase text-foreground no-underline transition-all duration-250 hover:border-foreground/60"
              >
                Book now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

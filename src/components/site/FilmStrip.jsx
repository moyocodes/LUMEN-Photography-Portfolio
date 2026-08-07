import { useEffect, useRef } from "react"

const clamp = (t) => Math.max(0, Math.min(1, t))
const easeOut = (t) => 1 - Math.pow(1 - t, 3)

const FRAMES = [
  { src: "/portfolio/photo-1.jpeg", tag: "Portrait", title: "Golden Hour" },
  { src: "/portfolio/photo-2.jpeg", tag: "Portrait", title: "Soft Light" },
  { src: "/portfolio/photo-3.jpeg", tag: "Editorial", title: "Quiet Luxury" },
  { src: "/portfolio/photo-4.jpeg", tag: "Portrait", title: "Still Frame" },
  { src: "/portfolio/photo-5.jpeg", tag: "Reel", title: "In Motion" },
  { src: "/portfolio/photo-6.jpeg", tag: "Portrait", title: "Golden Hour" },
  { src: "/portfolio/photo-7.jpeg", tag: "Editorial", title: "Off Duty" },
  { src: "/portfolio/photo-8.jpeg", tag: "Portrait", title: "Dreamstate" },
  { src: "/portfolio/photo-9.jpeg", tag: "Editorial", title: "New Season" },
  { src: "/portfolio/photo-10.jpeg", tag: "Portrait", title: "Untamed" },
]

const PERF_CLASS =
  "h-[1.1rem] w-[1.7rem] flex-shrink-0 rounded-[0.22rem] border-[1.5px] border-[rgba(200,185,150,0.16)] bg-[rgba(200,185,150,0.03)]"

export function FilmStrip() {
  const zoneRef = useRef(null)
  const trackRef = useRef(null)
  const progFillRef = useRef(null)
  const progCountRef = useRef(null)
  const codeRef = useRef(null)
  const topPerfRef = useRef(null)
  const botPerfRef = useRef(null)

  useEffect(() => {
    function buildPerfs() {
      const n = Math.ceil(innerWidth / 44) + 2
      ;[topPerfRef, botPerfRef].forEach((ref) => {
        const el = ref.current
        if (!el) return
        el.innerHTML = ""
        for (let i = 0; i < n; i++) {
          const p = document.createElement("div")
          p.className = PERF_CLASS
          el.appendChild(p)
        }
      })
    }
    buildPerfs()
    addEventListener("resize", buildPerfs)

    function update() {
      const zone = zoneRef.current
      const track = trackRef.current
      if (!zone || !track) return
      const fRect = zone.getBoundingClientRect()
      const filmH = zone.offsetHeight - innerHeight
      if (filmH <= 0) return
      const scrolled = -fRect.top
      if (scrolled < 0 || scrolled > filmH) return
      const p = clamp(scrolled / filmH)
      const trackW = track.scrollWidth
      const visW = track.parentElement.offsetWidth
      const maxT = Math.max(0, trackW - visW)
      track.style.transform = `translateX(${-easeOut(p) * maxT}px)`
      progFillRef.current.style.width = (p * 100).toFixed(1) + "%"
      const fc = track.children.length
      const cf = Math.min(fc, Math.floor(p * fc) + 1)
      progCountRef.current.textContent =
        String(cf).padStart(2, "0") + " / " + String(fc).padStart(2, "0")
      codeRef.current.textContent =
        p > 0.5 ? "REEL 02 · MOBILE · 2026" : "REEL 01 · MOBILE · 2026"
      const tx = -easeOut(p) * maxT
      const cx = -tx + visW / 2
      Array.from(track.children).forEach((f) => {
        const fx = f.offsetLeft + f.offsetWidth / 2
        const dist = Math.abs(fx - cx)
        const frac = clamp(dist / (visW * 0.6))
        f.style.opacity = (1 - frac * 0.55).toFixed(2)
      })
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

    return () => {
      removeEventListener("resize", buildPerfs)
      removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div id="film-zone" ref={zoneRef} className="relative h-[500vh]">
      <div id="film-pin" className="sticky top-0 h-screen overflow-hidden bg-[#131109]">
        <div className="film-edge absolute inset-x-0 top-0 z-8 h-20 border-b-2 border-[rgba(200,185,150,0.09)] bg-[#131109]">
          <div
            className="absolute inset-x-0 top-[1.1rem] flex items-center gap-[1.05rem] px-[1.4rem]"
            ref={topPerfRef}
          />
        </div>
        <div id="film-hd" className="absolute inset-x-0 top-0 z-9 flex h-20 items-center justify-between px-10">
          <h3 className="font-serif text-[1.1rem] font-normal italic text-bone">Selected frames</h3>
          <span
            className="text-[0.5rem] tracking-[0.2em] uppercase text-[rgba(200,185,150,0.28)]"
            ref={codeRef}
          >
            REEL 01 · MOBILE · 2026
          </span>
        </div>
        <div
          id="film-vp"
          className="absolute inset-x-0 top-20 bottom-20 flex items-center overflow-hidden before:absolute before:inset-y-0 before:left-0 before:z-5 before:w-[1.2rem] before:bg-[repeating-linear-gradient(to_bottom,transparent,transparent_1.8rem,rgba(200,185,150,0.05)_1.8rem,rgba(200,185,150,0.05)_calc(1.8rem+2px))] before:content-[''] after:absolute after:inset-y-0 after:right-0 after:z-5 after:w-[1.2rem] after:bg-[repeating-linear-gradient(to_bottom,transparent,transparent_1.8rem,rgba(200,185,150,0.05)_1.8rem,rgba(200,185,150,0.05)_calc(1.8rem+2px))] after:content-['']"
        >
          <div id="film-track" ref={trackRef} className="flex will-change-transform">
            {FRAMES.map((frame, i) => (
              <div
                className="group relative h-[calc(100vh-10rem)] w-[clamp(210px,23vw,340px)] flex-shrink-0 border-r-[3px] border-[rgba(200,185,150,0.06)]"
                key={frame.src}
                data-cursor-hover
              >
                <div className="absolute inset-[0.7rem_0.7rem_0.7rem_1.3rem] overflow-hidden rounded-[0.3rem] bg-[#0a0910]">
                  <img
                    src={frame.src}
                    alt={frame.title}
                    loading="lazy"
                    className="block h-full w-full object-contain transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-2 right-[0.7rem] font-display text-[0.46rem] tracking-[0.12em] text-[rgba(200,185,150,0.2)]">
                  {String(i + 1).padStart(3, "0")}
                </div>
                <div className="absolute bottom-[0.7rem] left-[1.3rem] right-[0.7rem] rounded-b-[0.3rem] p-[0.8rem_1rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(to_top,rgba(7,7,10,0.88),transparent)]">
                  <span className="text-[0.5rem] tracking-[0.14em] uppercase text-rose">{frame.tag}</span>
                  <h4 className="font-serif text-[1.15rem] italic text-bone">{frame.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="film-edge absolute inset-x-0 bottom-0 z-8 h-20 border-t-2 border-[rgba(200,185,150,0.09)] bg-[#131109]">
          <div
            className="absolute inset-x-0 bottom-[1.1rem] flex items-center gap-[1.05rem] px-[1.4rem]"
            ref={botPerfRef}
          />
        </div>
        <div id="film-prog" className="absolute inset-x-0 bottom-[1.2rem] z-10 flex items-center justify-center gap-[1.2rem]">
          <span className="text-[0.48rem] tracking-[0.18em] uppercase text-[rgba(200,185,150,0.28)]">SCROLL</span>
          <div id="prog-bar" className="h-px w-[150px] bg-[rgba(200,185,150,0.1)]">
            <div id="prog-fill" ref={progFillRef} className="h-full w-0 bg-rose" />
          </div>
          <span
            className="text-[0.48rem] tracking-[0.18em] uppercase text-[rgba(200,185,150,0.28)]"
            ref={progCountRef}
          >
            01 / {String(FRAMES.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  )
}

import { useEffect } from "react"

export function useScrollReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(".sr, .srl, .srr")
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on")
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

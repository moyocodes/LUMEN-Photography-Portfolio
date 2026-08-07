import { useEffect, useRef } from "react"

export function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    const cur = ref.current
    if (!cur) return

    const move = (e) => {
      cur.style.left = e.clientX + "px"
      cur.style.top = e.clientY + "px"
    }
    document.addEventListener("mousemove", move)

    const hoverables = "a,button,[data-cursor-hover]"
    const onEnter = () => cur.classList.add("hov")
    const onLeave = () => cur.classList.remove("hov")

    const attach = () => {
      document.querySelectorAll(hoverables).forEach((el) => {
        el.addEventListener("mouseenter", onEnter)
        el.addEventListener("mouseleave", onLeave)
      })
    }
    attach()
    const mo = new MutationObserver(attach)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener("mousemove", move)
      mo.disconnect()
      document.querySelectorAll(hoverables).forEach((el) => {
        el.removeEventListener("mouseenter", onEnter)
        el.removeEventListener("mouseleave", onLeave)
      })
    }
  }, [])

  return (
    <div
      id="cur"
      ref={ref}
      className="fixed z-[99999] h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose pointer-events-none mix-blend-difference transition-[width,height] duration-[180ms]"
    />
  )
}

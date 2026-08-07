import { useEffect, useState } from "react"
import { Cursor } from "@/components/site/Cursor"
import { Nav } from "@/components/site/Nav"
import { Hero } from "@/components/site/Hero"
import { Ticker } from "@/components/site/Ticker"
import { FilmStrip } from "@/components/site/FilmStrip"
import { About } from "@/components/site/About"
import { Packages } from "@/components/site/Packages"
import { BookingPolicy } from "@/components/site/BookingPolicy"
import { Faq } from "@/components/site/Faq"
import { Testimonials } from "@/components/site/Testimonials"
import { Contact } from "@/components/site/Contact"
import { TipsDrawer } from "@/components/site/TipsDrawer"
import { WhatsAppWidget } from "@/components/site/WhatsAppWidget"
import { useScrollReveal } from "@/hooks/useScrollReveal"

function App() {
  const [tipsOpen, setTipsOpen] = useState(false)

  useScrollReveal()

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setTipsOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div id="top">
      <Cursor />
      <Nav onOpenTips={() => setTipsOpen(true)} />

      <Hero />
      <Ticker />
      <FilmStrip />
      <About />

      <Packages />
      <BookingPolicy />
      <Faq />
      <Testimonials />
      <Contact />

      <TipsDrawer open={tipsOpen} onClose={() => setTipsOpen(false)} />
      <WhatsAppWidget />
    </div>
  )
}

export default App

import { Cursor } from "@/components/site/Cursor"
import { Nav } from "@/components/site/Nav"
import { Hero } from "@/components/site/Hero"
import { Ticker } from "@/components/site/Ticker"
import { FilmStrip } from "@/components/site/FilmStrip"
import { About } from "@/components/site/About"
import { Packages } from "@/components/site/Packages"
import { PolicyFaq } from "@/components/site/PolicyFaq"
import { Testimonials } from "@/components/site/Testimonials"
import { Contact } from "@/components/site/Contact"
// import { TipsDrawer } from "@/components/site/TipsDrawer" // temporarily disabled
import { WhatsAppWidget } from "@/components/site/WhatsAppWidget"
import { RateCardWidget } from "@/components/site/RateCardWidget"
import { useScrollReveal } from "@/hooks/useScrollReveal"

function App() {
  useScrollReveal()

  return (
    <div id="top">
      <Cursor />
      <Nav onOpenTips={() => {}} />

      <Hero />
      <Ticker />
      <FilmStrip />
      <About />

      <Packages />
      <PolicyFaq />
      <Testimonials />
      <Contact />

      {/* <TipsDrawer open={tipsOpen} onClose={() => setTipsOpen(false)} /> temporarily disabled */}
      <WhatsAppWidget />
      <RateCardWidget />
    </div>
  )
}

export default App

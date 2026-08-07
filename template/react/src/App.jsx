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
// import { TipsDrawer } from "@/components/site/TipsDrawer" // optional — see README
import { WhatsAppWidget } from "@/components/site/WhatsAppWidget"
import { RateCardWidget } from "@/components/site/RateCardWidget"
import { DarkModeToast } from "@/components/site/DarkModeToast"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { useTheme } from "@/hooks/useTheme"

function App() {
  useScrollReveal()
  const themeState = useTheme()

  return (
    <div id="top">
      <Cursor />
      <Nav theme={themeState.theme} onToggleTheme={themeState.toggle} />

      <Hero />
      <Ticker />
      <FilmStrip />
      <About />

      <Packages />
      <PolicyFaq />
      <Testimonials />
      <Contact />

      {/* <TipsDrawer open={tipsOpen} onClose={() => setTipsOpen(false)} /> optional drawer, see README */}
      <WhatsAppWidget />
      <RateCardWidget />
      <DarkModeToast
        theme={themeState.theme}
        hasChosen={themeState.hasChosen}
        onChoose={themeState.choose}
      />
    </div>
  )
}

export default App

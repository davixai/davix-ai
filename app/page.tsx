import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { HeroHome } from "@/components/hero-home"
import { ServicesGrid } from "@/components/services-grid"
import { ProofSection } from "@/components/proof-section"
import { PriceCalculator } from "@/components/calculator"

export const metadata = {
  title: "DaviX AI — Site-uri web, aplicații personalizate și chatboți AI",
  description:
    "Construim site-uri web premium, aplicații personalizate și chatboți AI pentru afaceri locale care vor să economisească timp și să primească mai multe cereri.",
}

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-transparent text-zinc-900">
        <Navbar />
        <HeroHome />
        <ServicesGrid />
        <ProofSection />
        <PriceCalculator />
        <Footer />
      </main>
    </SmoothScroll>
  )
}

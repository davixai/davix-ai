import { Navbar } from "@/components/navbar"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"

export const metadata = {
  title: "Modele construite de mine — DaviX AI",
  description:
    "Site-uri și aplicații construite de la zero de DaviX AI: modele complete și funcționale pentru afaceri locale, gata de adaptat pe afacerea ta.",
}

export default function TestimonialePage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-transparent text-zinc-900 overflow-hidden">
        <Navbar />
        <TestimonialsSection />
        <Footer />
      </main>
    </SmoothScroll>
  )
}

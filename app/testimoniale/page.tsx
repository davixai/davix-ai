import { Navbar } from "@/components/navbar"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Testimoniale - Davix AI",
  description: "Ce spun clientii nostri despre serviciile de automatizare AI oferite de Davix AI.",
}

export default function TestimonialePage() {
  return (
    <main className="relative min-h-screen bg-zinc-950 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950" />
      
      <Navbar />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}

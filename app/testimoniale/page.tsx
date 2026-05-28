import { Navbar } from "@/components/navbar"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { SmoothScroll } from "@/components/smooth-scroll"

export const metadata = {
  title: "Studii de caz — DaviX AI",
  description:
    "Studii de caz și rezultate concrete: site-uri, CRM-uri și automatizări AI livrate de DaviX AI pentru afaceri locale.",
}

export default function TestimonialePage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-white text-zinc-900 overflow-hidden">
        <Navbar />
        <TestimonialsSection />
        <Footer />
        <Chatbot />
      </main>
    </SmoothScroll>
  )
}

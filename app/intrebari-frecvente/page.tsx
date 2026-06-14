import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Chatbot } from "@/components/chatbot"
import FaqPage from "@/components/faq-page"

export const metadata = {
  title: "Întrebări Frecvente — DaviX AI",
  description:
    "Răspunsuri la întrebări despre costuri, integrări (WhatsApp, SMS, email), proces și Davix Dental.",
}

export default function IntrebariFrecvente() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-transparent text-zinc-900">
        <Navbar />
        <FaqPage />
        <Footer />
        <Chatbot />
      </main>
    </SmoothScroll>
  )
}

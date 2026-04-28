import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Chatbot } from "@/components/chatbot"
import FaqPage from "@/components/faq-page"

export const metadata = {
  title: "Întrebări Frecvente — DaviX AI",
  description: "Răspunsuri la cele mai comune întrebări despre site-uri, automatizări și serviciile DaviX AI.",
}

export default function IntrebariFrecvente() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-zinc-950">
        <Navbar />
        <FaqPage />
        <Footer />
        <Chatbot />
      </main>
    </SmoothScroll>
  )
}

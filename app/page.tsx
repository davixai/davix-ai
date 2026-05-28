import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { HeroHome } from "@/components/hero-home"
import { ServicesGrid } from "@/components/services-grid"
import { Contact } from "@/components/contact"
import { Chatbot } from "@/components/chatbot"

export const metadata = {
  title: "DaviX AI — Aplicații, site-uri și automatizări AI pentru business",
  description:
    "Construim aplicații web custom, site-uri moderne și automatizări AI (SMS, email, WhatsApp, CRM) pentru afaceri locale care vor mai mulți clienți.",
}

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-white text-zinc-900">
        <Navbar />
        <HeroHome />
        <ServicesGrid />
        <Contact />
        <Footer />
        <Chatbot />
      </main>
    </SmoothScroll>
  )
}

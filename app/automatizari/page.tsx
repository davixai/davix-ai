import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { AutomatizariHero } from "@/components/automatizari/hero"
import { AutomatizariServicii } from "@/components/automatizari/servicii"
import { AutomatizariFaq } from "@/components/automatizari/faq"
import { AutomatizariCta } from "@/components/automatizari/cta"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Automatizări AI pentru Business | DaviX AI",
  description: "Robot Asistent de Vânzări, Automatizări Email/Excel, Suport Clienți pe WhatsApp. Elimină munca manuală din afacerea ta.",
}

export default function AutomatizariPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-transparent text-zinc-900">
        <Navbar />
        <AutomatizariHero />
        <AutomatizariServicii />
        <AutomatizariCta />
        <Contact />
        <AutomatizariFaq />
        <Footer />
      </main>
    </SmoothScroll>
  )
}

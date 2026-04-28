import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import SiteUriHero from "@/components/site-uri/hero"
import SiteUriFeatures from "@/components/site-uri/features"
import SiteUriPachete from "@/components/site-uri/pachete"
import SiteUriAddons from "@/components/site-uri/addons"
import DespreNoi from "@/components/despre-noi"
import { Contact } from "@/components/contact"
import { Chatbot } from "@/components/chatbot"

export const metadata = {
  title: "DaviX AI — Site-uri & Automatizări AI pentru Business",
  description: "Design modern, livrare rapidă, optimizat pentru business-uri locale. De la 300€. Hosting inclus, fără costuri ascunse.",
}

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-zinc-950">
        <Navbar />
        <SiteUriHero />
        <SiteUriFeatures />
        <SiteUriPachete />
        <SiteUriAddons />
        <DespreNoi />
        <Contact />
        <Footer />
        <Chatbot />
      </main>
    </SmoothScroll>
  )
}

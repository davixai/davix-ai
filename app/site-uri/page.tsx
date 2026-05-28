import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import SiteUriHero from "@/components/site-uri/hero"
import SiteUriFeatures from "@/components/site-uri/features"
import SiteUriPachete from "@/components/site-uri/pachete"
import SiteUriAddons from "@/components/site-uri/addons"
import SiteUriFaq from "@/components/site-uri/faq"
import SiteUriCta from "@/components/site-uri/cta"
import { Chatbot } from "@/components/chatbot"

export const metadata = {
  title: "Site-uri de prezentare care aduc clienți | DaviX AI",
  description: "Design modern, livrare rapidă, optimizat pentru business-uri locale. De la 300€. Hosting inclus, fără costuri ascunse.",
}

export default function SiteUriPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-white text-zinc-900">
        <Navbar />
        <SiteUriHero />
        <SiteUriFeatures />
        <SiteUriPachete />
        <SiteUriAddons />
        <SiteUriCta />
        <SiteUriFaq />
        <Footer />
        <Chatbot />
      </main>
    </SmoothScroll>
  )
}

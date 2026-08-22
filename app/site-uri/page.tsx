import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import SiteUriHero from "@/components/site-uri/hero"
import SiteUriFeatures from "@/components/site-uri/features"
import SiteUriPachete from "@/components/site-uri/pachete"
import SiteUriMeniuDigital from "@/components/site-uri/meniu-digital"
import SiteUriAddons from "@/components/site-uri/addons"
import SiteUriFaq from "@/components/site-uri/faq"
import SiteUriCta from "@/components/site-uri/cta"

export const metadata = {
  title: "Site-uri de prezentare care aduc clienți | DaviX AI",
  description:
    "Design modern, livrare rapidă, optimizat pentru business-uri locale. Landing page de la 500 lei, site de prezentare de la 800 lei, site complex de la 1.400 lei, magazin online de la 1.800 lei. Meniuri digitale cu cod QR de la 250 lei. Domeniu și găzduire incluse primul an, fără costuri ascunse.",
}

export default function SiteUriPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-transparent text-zinc-900">
        <Navbar />
        <SiteUriHero />
        <SiteUriFeatures />
        <SiteUriPachete />
        <SiteUriMeniuDigital />
        <SiteUriAddons />
        <SiteUriCta />
        <SiteUriFaq />
        <Footer />
      </main>
    </SmoothScroll>
  )
}

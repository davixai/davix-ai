import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { DavixDental } from "@/components/davix-dental"

export const metadata = {
  title: "Davix Dental — CRM stomatologic pentru clinici",
  description:
    "Davix Dental: CRM stomatologic pentru cabinete și clinici. Programări, pacienți, fișiere medicale, tratamente, financiar, laborator și automatizări SMS într-o singură aplicație. Planuri Starter, Pro și Max.",
  keywords: [
    "Davix Dental",
    "CRM stomatologic",
    "software clinică dentară",
    "programări pacienți",
    "fișe pacienți",
    "automatizări SMS clinică",
    "reminder programare",
    "review Google pacienți",
  ],
  openGraph: {
    title: "Davix Dental — CRM stomatologic pentru clinici",
    description:
      "Pacienți, programări, fișiere medicale, tratamente, financiar, laborator și automatizări SMS într-un sistem configurat pentru fluxul clinicii.",
    url: "https://www.davixai.website/davix-dental",
    siteName: "DaviX AI",
    locale: "ro_RO",
    type: "website",
  },
}

export default function DavixDentalPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-transparent text-zinc-900">
        <Navbar />
        <div className="pt-20">
          <DavixDental />
        </div>
        <Footer />
      </main>
    </SmoothScroll>
  )
}

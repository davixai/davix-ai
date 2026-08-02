import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { DavixDental } from "@/components/davix-dental"

export const metadata = {
  title: "Davix Dental — aplicație pentru cabinete stomatologice",
  description:
    "Davix Dental: aplicația care ține cabinetul stomatologic organizat. Pacienți, programări, fișe, tratamente, încasări, laborator și mesaje automate, într-un singur loc.",
  keywords: [
    "Davix Dental",
    "aplicație cabinet stomatologic",
    "CRM stomatologic",
    "software clinică dentară",
    "programări pacienți",
    "fișe pacienți",
    "automatizări SMS clinică",
    "reminder programare",
    "review Google pacienți",
  ],
  openGraph: {
    title: "Davix Dental — aplicație pentru cabinete stomatologice",
    description:
      "Pacienți, programări, fișe medicale, tratamente, încasări, laborator și mesaje automate, într-o singură aplicație gândită pentru cabinet.",
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

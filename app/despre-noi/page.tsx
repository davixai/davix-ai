import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import DespreNoi from "@/components/despre-noi"

export const metadata = {
  title: "Despre noi — DaviX AI",
  description:
    "Echipa DaviX AI: cum lucrăm, ce livrăm și de ce afacerile locale aleg site-urile, aplicațiile și automatizările noastre.",
}

export default function DespreNoiPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-transparent text-zinc-900">
        <Navbar />
        <div className="pt-28 pb-8">
          <DespreNoi />
        </div>
        <Footer />
      </main>
    </SmoothScroll>
  )
}

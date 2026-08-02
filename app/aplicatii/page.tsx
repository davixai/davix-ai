import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Aplicatii } from "@/components/aplicatii"

export const metadata = {
  title: "Aplicații personalizate — DaviX AI",
  description:
    "Aplicații construite special pentru afacerea ta: DaviX Dental pentru cabinete stomatologice și aplicația de fidelizare pentru cafenele.",
}

export default function AplicatiiPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-transparent text-zinc-900">
        <Navbar />
        <div className="pt-20">
          <Aplicatii />
        </div>
        <Footer />
      </main>
    </SmoothScroll>
  )
}

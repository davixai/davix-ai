import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import DespreMine from "@/components/despre-mine"

export const metadata = {
  title: "Despre mine — DaviX AI",
  description:
    "Balta David Ioan, Suceava. Construiesc site-uri și aplicații pentru afaceri locale. Contract, factură și termene clare la fiecare proiect.",
}

export default function DesprePage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-transparent text-zinc-900">
        <Navbar />
        <div className="pt-28 pb-8">
          <DespreMine />
        </div>
        <Footer />
      </main>
    </SmoothScroll>
  )
}

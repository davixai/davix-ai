import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import DespreNoi from "@/components/despre-noi"
import { Chatbot } from "@/components/chatbot"

export const metadata = {
  title: "Despre noi — DaviX AI",
  description: "Află mai multe despre echipa DaviX AI, valorile noastre și cum ajutăm business-urile locale să crească online.",
}

export default function DespreNoiPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-zinc-950">
        <Navbar />
        <div className="pt-28 pb-8">
          <DespreNoi />
        </div>
        <Footer />
        <Chatbot />
      </main>
    </SmoothScroll>
  )
}

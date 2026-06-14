import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Chatbot } from "@/components/chatbot"

export const metadata = {
  title: "Politica de Confidențialitate — DaviX AI",
  description:
    "Cum colectează, folosește și protejează DaviX AI datele tale: formulare, programări, comunicare prin email/WhatsApp/SMS.",
}

export default function ConfidentialitatePage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-transparent text-zinc-900">
        <Navbar />
        <section className="pt-32 pb-20 px-4 sm:px-6">
          <article className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-3">
              Legal
            </p>
            <h1
              style={{ letterSpacing: "-0.025em" }}
              className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4"
            >
              Politica de Confidențialitate
            </h1>
            <p className="text-sm text-zinc-500 mb-10">
              Ultima actualizare:{" "}
              {new Date().toLocaleDateString("ro-RO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <div className="space-y-8 text-zinc-700" style={{ lineHeight: "1.75" }}>
              <section>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">1. Operator de date</h2>
                <p>
                  Operatorul datelor cu caracter personal este DaviX AI (Balta David, Suceava,
                  România). Contact: <a href="mailto:contact@davixai.website" className="text-emerald-700 hover:underline">contact@davixai.website</a>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">2. Date colectate</h2>
                <p>Colectăm date strict necesare pentru livrarea serviciilor:</p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>Nume, email, telefon — pentru contact și ofertă</li>
                  <li>Mesaje și detalii proiect — pentru estimarea soluției</li>
                  <li>Data și ora programării — pentru auditul gratuit</li>
                  <li>Date tehnice anonime — analytics (Vercel Analytics)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">3. Scopuri și temeiuri</h2>
                <p>
                  Procesăm datele pentru: răspuns la cereri, programări, livrarea serviciilor,
                  facturare și obligații legale. Temeiul este executarea contractului, obligațiile
                  legale sau consimțământul tău explicit.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">4. Stocare și securitate</h2>
                <p>
                  Datele sunt stocate pe servicii securizate (ex. Supabase pentru programări, Vercel
                  pentru hosting). Păstrăm datele atât cât e necesar pentru scopurile menționate sau
                  pentru cerințele fiscale și legale aplicabile.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">5. Servicii terțe</h2>
                <p>
                  Pentru a livra serviciile, folosim furnizori precum: Vercel (hosting), Supabase
                  (bază de date), Calisero/alte gateway-uri SMS (mesaje către pacienți/clienți, în
                  cadrul Davix Dental), WhatsApp Business și provideri de email. Fiecare furnizor are
                  propria politică de confidențialitate.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">6. Drepturile tale (GDPR)</h2>
                <p>
                  Ai dreptul la acces, rectificare, ștergere, restricționare, portabilitate și
                  opoziție privind prelucrarea datelor tale. Pentru orice solicitare, scrie-ne la{" "}
                  <a href="mailto:contact@davixai.website" className="text-emerald-700 hover:underline">
                    contact@davixai.website
                  </a>
                  . De asemenea, poți depune o plângere la ANSPDCP.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">7. Cookie-uri</h2>
                <p>
                  Folosim cookie-uri minime, necesare funcționării site-ului și pentru analytics
                  agregat (Vercel Analytics). Nu folosim cookie-uri de tracking pentru reclame
                  externe.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">8. Modificări</h2>
                <p>
                  Putem actualiza această politică. Versiunea curentă este afișată mereu pe această
                  pagină.
                </p>
              </section>
            </div>
          </article>
        </section>
        <Footer />
        <Chatbot />
      </main>
    </SmoothScroll>
  )
}

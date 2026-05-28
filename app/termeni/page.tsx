import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Chatbot } from "@/components/chatbot"

export const metadata = {
  title: "Termeni și Condiții — DaviX AI",
  description:
    "Termenii și condițiile de utilizare a serviciilor DaviX AI: aplicații web, site-uri, automatizări AI și Davix Dental.",
}

export default function TermeniPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-white text-zinc-900">
        <Navbar />
        <section className="pt-32 pb-20 px-4 sm:px-6">
          <article className="max-w-3xl mx-auto prose-zinc">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-3">
              Legal
            </p>
            <h1
              style={{ letterSpacing: "-0.025em" }}
              className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4"
            >
              Termeni și Condiții
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
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">1. Cine suntem</h2>
                <p>
                  DaviX AI este un brand de servicii digitale operat de Balta David, cu sediul în
                  Suceava, România. Oferim aplicații web custom, site-uri de prezentare, CRM-uri
                  (inclusiv produsul Davix Dental) și automatizări AI pentru SMS, email, WhatsApp și
                  fluxuri interne.
                </p>
                <p className="mt-3">
                  Contact: <a href="mailto:contact@davixai.website" className="text-emerald-700 hover:underline">contact@davixai.website</a>
                  {" "}— Telefon: <a href="tel:0729369094" className="text-emerald-700 hover:underline">0729 369 094</a>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">2. Servicii oferite</h2>
                <p>
                  Acceptarea unei oferte sau semnarea unui contract înseamnă acceptarea acestor
                  termeni. Serviciile sunt livrate conform documentului de scope agreat în prealabil,
                  cu termene și costuri stabilite înainte de începere.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">3. Plăți și facturare</h2>
                <p>
                  Lucrăm cu factură fiscală și contract. Plățile se efectuează conform termenelor
                  agreate (în general, avans + tranșe + livrare finală). Suportăm e-Factură pentru
                  clienții persoane juridice din România.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">4. Proprietate intelectuală</h2>
                <p>
                  După achitarea integrală a prețului, materialele și codul livrate (site, aplicație,
                  conținut) devin proprietatea clientului, cu excepția componentelor terțe,
                  bibliotecilor open-source și a produselor SaaS (ex. Davix Dental) care rămân
                  proprietatea DaviX AI și se utilizează în baza unui abonament.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">5. Suport și mentenanță</h2>
                <p>
                  Pentru produsele tip aplicație/CRM, suportul este inclus în abonamentul lunar. Pentru
                  proiecte one-off, suportul se poate contracta separat. Timpii de răspuns standard
                  sunt în zile lucrătoare (L–V).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">6. Limitarea răspunderii</h2>
                <p>
                  DaviX AI nu este răspunzător pentru pierderi indirecte sau consecutive (pierderi de
                  profit, oportunități etc.) și pentru întreruperi cauzate de servicii terțe (hosting,
                  furnizori SMS/email, platforme externe). Răspunderea maximă se limitează la
                  valoarea serviciilor facturate clientului în ultimele 12 luni.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">7. Modificări</h2>
                <p>
                  Acești termeni pot fi actualizați. Modificările intră în vigoare la publicarea pe
                  această pagină. Pentru contractele active, prevalează termenii din contract.
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

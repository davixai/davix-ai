import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Termeni și Condiții — Automatizari AI",
  description: "Termenii și condițiile serviciului Automatizari AI.",
}

export default function TermeniPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300">
      <div className="max-w-2xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors mb-10"
        >
          ← Înapoi
        </Link>

        <p className="text-[11px] text-zinc-600 uppercase tracking-widest mb-2">Integrare TikTok</p>
        <h1 className="text-2xl font-semibold text-white mb-1">Termeni și Condiții</h1>
        <p className="text-xs text-zinc-500 mb-1">Automatizari AI — aplicație TikTok Content Posting</p>
        <p className="text-xs text-zinc-600 mb-10">Ultima actualizare: 1 mai 2026</p>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-white mb-2">1. Despre serviciu</h2>
            <p>
              Automatizari AI („noi", „serviciul nostru") oferă servicii de automatizare a conținutului pentru rețele
              sociale, bazate pe inteligență artificială. Creăm și publicăm conținut video și imagine generat cu ajutorul
              AI în numele companiilor, pe platforme precum TikTok.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">2. Utilizarea serviciului</h2>
            <p>
              Serviciul nostru este destinat clienților business care doresc să automatizeze crearea și publicarea
              conținutului pe rețele sociale. Prin utilizarea acestui serviciu, clienții sunt de acord să respecte toți
              termenii aplicabili ai platformelor, inclusiv Termenii de Serviciu TikTok.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">3. Conținut</h2>
            <p>
              Tot conținutul generat prin serviciul nostru este asistat de AI și revizuit înainte de publicare. Clienții
              sunt responsabili pentru a se asigura că conținutul publicat respectă legile aplicabile și ghidurile
              platformelor.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">4. Limitarea răspunderii</h2>
            <p>
              Automatizari AI nu este responsabilă pentru niciun prejudiciu indirect sau consecvent care rezultă din
              utilizarea acestui serviciu.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">5. Contact</h2>
            <p>
              Pentru întrebări, contactați-ne la:{" "}
              <a
                href="mailto:davixai.contact@gmail.com"
                className="text-zinc-400 hover:text-white transition-colors underline underline-offset-2"
              >
                davixai.contact@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

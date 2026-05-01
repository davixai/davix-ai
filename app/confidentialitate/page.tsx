import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Politica de Confidențialitate — Automatizari AI",
  description: "Politica de confidențialitate a serviciului Automatizari AI.",
}

export default function ConfidentialitatePage() {
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
        <h1 className="text-2xl font-semibold text-white mb-1">Politica de Confidențialitate</h1>
        <p className="text-xs text-zinc-500 mb-1">Automatizari AI — aplicație TikTok Content Posting</p>
        <p className="text-xs text-zinc-600 mb-10">Ultima actualizare: 1 mai 2026</p>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-white mb-2">1. Date colectate</h2>
            <p>
              Colectăm doar datele necesare pentru furnizarea serviciilor noastre de automatizare: numele companiei,
              identificatorii conturilor de social media și preferințele de conținut furnizate de clienți.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">2. Integrarea TikTok</h2>
            <p className="mb-3">
              Serviciul nostru se integrează cu API-ul de publicare de conținut TikTok (Content Posting API) pentru a
              publica videoclipuri în numele conturilor de business autorizate. Solicităm doar următoarele permisiuni
              TikTok:
            </p>
            <ul className="space-y-2 pl-4 border-l border-zinc-800">
              <li>
                <span className="text-zinc-400 font-mono text-xs">video.publish</span>
                <span className="text-zinc-500"> — pentru a publica videoclipuri pe contul TikTok autorizat</span>
              </li>
              <li>
                <span className="text-zinc-400 font-mono text-xs">video.upload</span>
                <span className="text-zinc-500"> — pentru a încărca fișiere video înainte de publicare</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">3. Cum utilizăm datele</h2>
            <p>
              Datele sunt utilizate exclusiv pentru a furniza servicii de publicare automată de conținut clienților
              noștri. Nu vindem, nu partajăm și nu transferăm niciun date către terțe părți.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">4. Stocarea datelor</h2>
            <p>
              Stocăm doar datele minime necesare pentru funcționarea serviciului. Token-urile de acces TikTok sunt
              stocate în siguranță și utilizate exclusiv pentru acțiunile de publicare autorizate.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">5. Drepturile utilizatorilor</h2>
            <p>
              Clienții pot solicita ștergerea datelor lor în orice moment, contactându-ne.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">6. Contact</h2>
            <p>
              Pentru întrebări legate de confidențialitate, contactați:{" "}
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

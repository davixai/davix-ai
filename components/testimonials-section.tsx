"use client"

import { motion } from "framer-motion"
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react"
import Link from "next/link"

/**
 * Modele construite de mine, nu lucrări comandate de clienți.
 *
 * Textele de aici NU au voie să conțină rezultate măsurate („mai puține
 * apeluri", „mai mulți pacienți") și nici formulări de tip „am livrat pentru
 * X": nu există încă un client care să le confirme, iar o cifră inventată
 * care se dovedește falsă costă mai mult decât aduce. Descriu ce am construit
 * și ce face fiecare model — atât.
 */
const cases = [
  {
    industry: "Stomatologie",
    title: "Model de site pentru cabinet stomatologic",
    summary:
      "Site de prezentare pentru o clinică dentară: servicii explicate clar, secțiune de încredere și programare în câțiva pași. Construit ca model, gata de adaptat pe un cabinet real.",
    metric: "Model complet, funcțional",
    url: "https://democlinicastomatologica.netlify.app/",
  },
  {
    industry: "Aplicație pentru cabinete dentare",
    title: "Davix Dental — aplicație pentru cabinete stomatologice",
    summary:
      "Aplicația pe care o construiesc și o dezvolt eu, pentru cabinete care țin acum pacienții, programările și încasările în Excel: pacienți, programări, fișe medicale, încasări, acces pe roluri și mesaje automate.",
    metric: "Produs propriu, în dezvoltare",
    url: "https://davixdental.online/",
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.8} />
            <span className="text-emerald-700 text-sm font-medium">Ce am construit</span>
          </div>
          <h1
            style={{ letterSpacing: "-0.025em" }}
            className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-4 text-balance"
          >
            Modele construite de mine
          </h1>
          <p
            className="text-zinc-600 max-w-2xl mx-auto"
            style={{ lineHeight: "1.7" }}
          >
            Site-uri și aplicații construite de la zero, ca să pot arăta ce fac înainte să te decizi.
            Sunt complete și funcționale — le poți deschide și plimba prin ele. Pe măsură ce lucrez
            cu afaceri care acceptă să apară aici, adaug și rezultatele lor.
          </p>
        </motion.div>

        <div className="space-y-5">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200 card-elevated hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700">
                  {c.industry}
                </span>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-emerald-700 transition-colors"
                  aria-label={`Deschide ${c.title}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 mb-2">{c.title}</h2>
              <p
                className="text-sm text-zinc-600 mb-4"
                style={{ lineHeight: "1.65" }}
              >
                {c.summary}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-medium text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {c.metric}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-zinc-600 mb-6">
            Vrei ca afacerea ta să fie prima care apare aici?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-7 h-12 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shimmer-btn"
            >
              Programează audit gratuit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/40729369094"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 h-12 rounded-full bg-white text-zinc-800 border border-zinc-300 font-semibold hover:bg-zinc-50 transition-colors"
            >
              Scrie pe WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { Plus, Minus } from "lucide-react"

const categories = [
  {
    label: "Site-uri",
    faqs: [
      {
        q: "Trebuie să am domeniu și hosting?",
        a: "Nu. Noi ne ocupăm de tot. Poți folosi domeniul tău existent sau te ajutăm să cumperi unul nou. Hosting-ul este inclus în pachet primele 3–6 luni, în funcție de pachetul ales.",
      },
      {
        q: "Cât durează să fac un site?",
        a: "7–10 zile de la semnarea contractului. Primești preview-ul inițial după 3 zile pentru feedback. Lucrăm rapid, dar fără compromisuri la calitate.",
      },
      {
        q: "Trebuie să știu programare?",
        a: "Nu. Noi ne ocupăm de tot — design, dezvoltare, publicare. Tu primești site-ul gata de utilizat.",
      },
      {
        q: "Pot să modific conținutul singur după?",
        a: "Da, absolut. Te învățăm cum să editezi texte și imagini simplu. Dacă preferi, ne ocupăm noi de actualizări (serviciu opțional cu abonament lunar).",
      },
      {
        q: "Site-ul este 100% al meu?",
        a: "Da. După livrare, site-ul și tot conținutul sunt proprietatea ta exclusivă.",
      },
      {
        q: "Mă ajutați cu domeniul (.ro / .com)?",
        a: "Da, te ghidăm pas cu pas pentru înregistrarea și configurarea domeniului potrivit afacerii tale.",
      },
    ],
  },
  {
    label: "Prețuri & Garanție",
    faqs: [
      {
        q: "Ce se întâmplă după ce site-ul e gata?",
        a: "Hosting gratuit primele 3–6 luni (depinde de pachet). După expirare: €10/lună sau îl poți muta unde dorești — site-ul e 100% al tău.",
      },
      {
        q: "Oferiți garanție?",
        a: "Da. Dacă ceva nu funcționează corect în primele 30 de zile după livrare, reparăm GRATUIT. Vrem să fii 100% mulțumit de rezultat.",
      },
      {
        q: "Există costuri ascunse?",
        a: "Nu. Prețul convenit include tot. Singurele costuri opționale sunt mentenanța lunară sau servicii suplimentare alese de tine.",
      },
    ],
  },
  {
    label: "Automatizări AI",
    faqs: [
      {
        q: "Ce tipuri de automatizări oferiți?",
        a: "Chatbot AI pe site sau WhatsApp, automatizare email, gestionare lead-uri, integrare Google Sheets / Excel, notificări automate și multe altele.",
      },
      {
        q: "Automatizările funcționează non-stop?",
        a: "Da. Odată configurate, automatizările rulează 24/7 fără intervenție manuală.",
      },
      {
        q: "Pot integra automatizările cu site-ul meu existent?",
        a: "În general da. Ne spui ce platformă folosești și analizăm compatibilitatea fără niciun cost.",
      },
    ],
  },
]

function FaqCategory({ category, index }: { category: typeof categories[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [open, setOpen] = useState<number | null>(null)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10"
    >
      <h3 className="text-sm font-semibold tracking-widest text-emerald-400 uppercase mb-4">
        {category.label}
      </h3>
      <div className="space-y-2">
        {category.faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden hover:border-zinc-700 transition-colors duration-200"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-white hover:text-emerald-400 transition-colors"
            >
              <span>{faq.q}</span>
              <motion.div
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="shrink-0 ml-4"
              >
                {open === i ? (
                  <Minus className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Plus className="w-4 h-4 text-zinc-500" />
                )}
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-5 pb-4 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-3">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function FaqPage() {
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6">
      {/* Background glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto">
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 text-sm font-medium">Răspunsuri rapide</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
            Întrebări Frecvente
          </h1>
          <p className="text-zinc-400 max-w-md mx-auto leading-relaxed">
            Nu găsești răspunsul? Scrie-ne pe{" "}
            <a
              href="https://wa.me/40729369094"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-2"
            >
              WhatsApp
            </a>{" "}
            și răspundem în maxim 2 ore (L–V).
          </p>
        </motion.div>

        {categories.map((category, index) => (
          <FaqCategory key={category.label} category={category} index={index} />
        ))}
      </div>
    </section>
  )
}

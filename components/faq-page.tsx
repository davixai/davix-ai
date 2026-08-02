"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { Plus, Minus, Sparkles } from "lucide-react"

const categories = [
  {
    label: "Costuri și estimări",
    faqs: [
      {
        q: "Cât costă un chatbot AI?",
        a: "Depinde de cât de multe trebuie să facă. Un chatbot care răspunde la întrebările frecvente și preia cereri pornește de la câteva sute de euro. Prețul exact ți-l spunem în auditul gratuit.",
      },
      {
        q: "Cât costă o aplicație personalizată?",
        a: "O primă versiune simplă pornește, de obicei, de la 1.500–2.500 €. Prețul crește în funcție de câți oameni o folosesc și câte lucruri trebuie să facă. În audit primești o cifră concretă.",
      },
      {
        q: "Pot începe doar cu un site?",
        a: "Da. Mulți clienți pornesc cu un site de prezentare și adaugă mai târziu un chatbot sau alte lucruri. Construim pe etape, fără să te blocăm într-un pachet mare.",
      },
      {
        q: "Există abonament lunar?",
        a: "Pentru aplicații (de exemplu Davix Dental) lucrăm cu abonament lunar, care include actualizări, suport și găzduire. La site-uri, abonamentul e opțional și acoperă întreținerea.",
      },
      {
        q: "Primesc factură și contract?",
        a: "Da. Contract de prestări servicii și factură la fiecare proiect. Termenii sunt clari înainte să începem.",
      },
    ],
  },
  {
    label: "Chatboți și legături cu alte programe",
    faqs: [
      {
        q: "Chatbotul merge pe WhatsApp?",
        a: "Da. Îl putem pune pe WhatsApp Business, ca să răspundă singur clienților și să-ți trimită cererile mai departe, pe email sau pe telefon.",
      },
      {
        q: "Poate trimite singur mesaje clienților?",
        a: "Da. Se pot trimite mesaje de reamintire înainte de programare, confirmări și cereri de recenzie pe Google. Pentru fiecare mesaj vezi dacă a ajuns sau nu.",
      },
      {
        q: "Merge cu emailul meu?",
        a: "Da. Îl conectăm cu Gmail sau Outlook, pentru mesaje trimise automat: bun venit, revenire la o ofertă, facturi sau anunțuri.",
      },
      {
        q: "Merge cu site-ul pe care îl am deja?",
        a: "În cele mai multe cazuri, da. Ne spui ce ai acum și verificăm gratuit, în cadrul auditului.",
      },
    ],
  },
  {
    label: "Proces și livrare",
    faqs: [
      {
        q: "Ce se întâmplă după auditul gratuit?",
        a: "Primești o ofertă cu ce construim, cât costă și în cât timp e gata. Dacă mergem mai departe, semnăm contractul și pornim.",
      },
      {
        q: "Cât durează?",
        a: "Site de prezentare: 2–5 zile lucrătoare. Chatbot: 3–5 zile. Aplicație personalizată: 2–6 săptămâni, în funcție de cât de mare e.",
      },
      {
        q: "Trebuie să știu programare?",
        a: "Nu. Ne ocupăm noi de tot: design, construcție și publicare. Tu rămâi concentrat pe afacerea ta.",
      },
      {
        q: "Pot să modific singur textele după?",
        a: "Da. La site-uri îți arătăm cum să schimbi texte și poze. La aplicații, fiecare om din echipă vede doar ecranele de care are nevoie — nu trebuie să fii tehnic.",
      },
    ],
  },
  {
    label: "Davix Dental",
    faqs: [
      {
        q: "Ce este Davix Dental?",
        a: "E o aplicație pentru cabinete stomatologice. Ține pacienții, programările, fișele, tratamentele, încasările și lucrările de laborator într-un singur loc și trimite singură mesaje de reamintire pacienților.",
      },
      {
        q: "Pentru ce cabinete e potrivită?",
        a: "Pentru cabinete și clinici mici și medii care vor totul într-un singur loc, în locul caietelor, al fișierelor Excel și al mesajelor trimise de mână.",
      },
      {
        q: "Care e diferența dintre planul Pro și Max?",
        a: "În Pro, cabinetul plătește direct mesajele trimise. În Max, ne ocupăm noi și sunt incluse 450 de mesaje pe lună; peste ele, se facturează separat.",
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
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10"
    >
      <h3 className="text-sm font-semibold tracking-widest text-emerald-700 uppercase mb-4">
        {category.label}
      </h3>
      <div className="space-y-2">
        {category.faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl border border-zinc-200 bg-white overflow-hidden hover:border-emerald-300 transition-colors duration-200"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-zinc-900 hover:text-emerald-700 transition-colors"
            >
              <span>{faq.q}</span>
              <motion.div
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="shrink-0 ml-4"
              >
                {open === i ? (
                  <Minus className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Plus className="w-4 h-4 text-zinc-400" />
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
                  <p
                    className="px-5 pb-4 text-sm text-zinc-600 border-t border-zinc-100 pt-3"
                    style={{ lineHeight: "1.65" }}
                  >
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
    <section className="pt-32 pb-20 px-4 sm:px-6 bg-white">
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative">
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.8} />
            <span className="text-emerald-700 text-sm font-medium">Răspunsuri rapide</span>
          </div>
          <h1
            style={{ letterSpacing: "-0.025em" }}
            className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-4 text-balance"
          >
            Întrebări frecvente
          </h1>
          <p className="text-zinc-600 max-w-md mx-auto" style={{ lineHeight: "1.7" }}>
            Nu găsești răspunsul? Scrie-ne pe{" "}
            <a
              href="https://wa.me/40729369094"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-900 transition-colors underline underline-offset-2 font-medium"
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

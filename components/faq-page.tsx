"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { Plus, Minus, Sparkles } from "lucide-react"

const categories = [
  {
    label: "Costuri și estimări",
    faqs: [
      {
        q: "Cât costă o automatizare AI?",
        a: "Depinde de complexitate. Pentru automatizări simple (email, SMS, WhatsApp, sortări de date) începem de la câteva sute de euro. Pentru sisteme complete cu CRM și agenți AI, estimarea o discutăm în auditul gratuit, după ce înțelegem fluxul real.",
      },
      {
        q: "Cât costă o aplicație web?",
        a: "Aplicațiile web custom (CRM-uri, portaluri, dashboard-uri) pornesc, de obicei, de la 1.500–2.500 € pentru un MVP simplu și cresc în funcție de roluri, integrări și volum de date. În audit primești o estimare concretă.",
      },
      {
        q: "Pot începe doar cu un site?",
        a: "Da. Mulți clienți pornesc cu un site de prezentare modern și adaugă, în timp, formulare inteligente, automatizări SMS sau chatbot. Construim pe etape, fără să te blocăm într-un pachet mare.",
      },
      {
        q: "Există abonament lunar?",
        a: "Pentru produsele de tip aplicație/CRM (ex. Davix Dental) lucrăm cu abonament lunar care include update-uri, suport și hosting. Pentru site-uri și automatizări one-off, abonamentul este opțional (mentenanță, optimizări).",
      },
      {
        q: "Primesc factură și contract?",
        a: "Da. Lucrăm cu factură și contract de prestări servicii. Suportăm e-Factură, iar termenii sunt clari înainte de începerea proiectului.",
      },
    ],
  },
  {
    label: "Integrări",
    faqs: [
      {
        q: "Se poate integra cu WhatsApp?",
        a: "Da. Putem conecta WhatsApp Business pentru chatbot, răspunsuri automate, preluare cereri și lead-uri direct în CRM sau email.",
      },
      {
        q: "Se poate integra cu SMS pentru reminder și review?",
        a: "Da. Folosim integrări cu furnizori SMS pentru România (ex. Calisero). Trimitem reminder-e de programări, confirmări și cereri automate de review Google, cu jurnal complet pe fiecare mesaj.",
      },
      {
        q: "Se poate integra cu email?",
        a: "Da. Conectăm Gmail, Outlook sau alți provideri pentru secvențe automate: welcome, follow-up oferte, facturi, notificări interne și newsletter.",
      },
      {
        q: "Pot integra automatizările cu site-ul meu existent?",
        a: "În cele mai multe cazuri da, indiferent de platformă. Ne spui ce folosești și verificăm compatibilitatea fără cost, în cadrul auditului gratuit.",
      },
    ],
  },
  {
    label: "Proces și livrare",
    faqs: [
      {
        q: "Ce se întâmplă după auditul gratuit?",
        a: "Primești o propunere de soluție cu scope, cost estimativ și timp de livrare. Dacă mergem mai departe, semnăm contractul și începem cu o etapă de design/architecture, urmată de dezvoltare în iterații.",
      },
      {
        q: "Cât durează implementarea?",
        a: "Site-uri: 5–7 zile. Automatizări simple: 3–5 zile. Aplicații web / CRM-uri: 2–6 săptămâni, în funcție de scope și integrări. Davix Dental se poate implementa rapid pentru clinici mici/medii.",
      },
      {
        q: "Trebuie să știu programare?",
        a: "Nu. Ne ocupăm noi de tot — design, dezvoltare, integrări și publicare. Tu rămâi concentrat pe afacerea ta.",
      },
      {
        q: "Pot să modific conținutul singur după?",
        a: "Da. Pentru site-uri îți explicăm cum să editezi texte și imagini. Pentru CRM-uri și aplicații, fiecare rol are interfața lui și nu ai nevoie de cunoștințe tehnice.",
      },
    ],
  },
  {
    label: "Davix Dental",
    faqs: [
      {
        q: "Ce este Davix Dental?",
        a: "Davix Dental este un CRM stomatologic pentru cabinete și clinici dentare. Include pacienți, programări, fișiere medicale, odontogramă, tratamente, financiar, laborator, roluri și automatizări SMS pentru reminder și review Google.",
      },
      {
        q: "Pentru ce clinici este potrivit Davix Dental?",
        a: "Pentru cabinete și clinici mici/medii care vor să-și organizeze pacienții, programările și financiarul într-o singură aplicație și să automatizeze partea de comunicare cu pacienții (reminder, review). Planurile sunt: Starter 699 RON, Pro 749 RON, Max 950 RON / lună.",
      },
      {
        q: "Cum funcționează SMS-urile în planul Pro vs. Max?",
        a: "În Pro, clinica folosește propriul cont Calisero și plătește direct consumul SMS (~0,25 RON/mesaj). În Max, gestionăm noi 450 SMS incluse lunar, iar extra-SMS sunt facturate la 0,39 RON/mesaj, lunar.",
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

"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Trebuie să am domeniu și hosting?",
    answer: "Nu. Noi ne ocupăm de tot. Poți folosi domeniul tău existent sau îți ajutăm să cumperi unul nou. Hosting-ul este inclus în pachet primele 3-6 luni (depinde de pachetul ales).",
  },
  {
    question: "Cât durează să fac un site?",
    answer: "7-10 zile de la semnarea contractului. Primești preview-ul inițial după 3 zile pentru feedback. Lucrăm rapid, dar fără compromisuri la calitate.",
  },
  {
    question: "Pot să modific conținutul singur după?",
    answer: "Da, absolut. Te învățăm cum să editezi texte și imagini simplu. Dacă preferi, ne ocupăm noi de actualizări (serviciu opțional cu abonament lunar).",
  },
  {
    question: "Ce se întâmplă după ce site-ul e gata?",
    answer: "Hosting gratuit primele 3-6 luni (depinde de pachet). După expirare: €10/lună sau îl poți muta unde dorești - site-ul e 100% al tău.",
  },
  {
    question: "Oferiți garanție?",
    answer: "Da. Dacă ceva nu funcționează corect în primele 30 zile după livrare, reparăm GRATUIT. Vrem să fii 100% mulțumit de rezultat.",
  },
]

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Întrebări Frecvente</h3>
          <p className="text-zinc-400 text-sm">Răspunsuri rapide la întrebările tale</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-800/30 transition-colors"
              >
                <span className="font-medium text-white text-sm">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 text-sm text-zinc-400 border-t border-zinc-800/50 pt-3">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

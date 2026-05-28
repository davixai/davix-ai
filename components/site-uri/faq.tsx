"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    q: "Trebuie sa stiu programare?",
    a: "Nu. Noi ne ocupam de tot — design, dezvoltare, publicare. Tu primesti site-ul gata de utilizat.",
  },
  {
    q: "Site-ul este 100% al meu?",
    a: "Da. Dupa livrare, site-ul si tot continutul sunt proprietatea ta exclusiva.",
  },
  {
    q: "Cat dureaza livrarea?",
    a: "Intre 5 si 10 zile lucratoare, in functie de complexitate si disponibilitatea informatiilor de la tine.",
  },
  {
    q: "Pot modifica continutul dupa livrare?",
    a: "Da. Poti modifica singur sau noi gestionam modificarile pentru tine, in functie de pachetul ales.",
  },
  {
    q: "Ma ajutati cu domeniul (.ro / .com)?",
    a: "Da, te ghidam pas cu pas pentru inregistrarea si configurarea domeniului potrivit afacerii tale.",
  },
]

export default function SiteUriFaq() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            style={{ letterSpacing: "-0.025em" }}
            className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4 text-balance"
          >
            Întrebări frecvente
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-xl border border-zinc-200 bg-white overflow-hidden hover:border-emerald-300 transition-colors"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-zinc-900 hover:text-emerald-700 transition-colors"
              >
                <span>{faq.q}</span>
                {open === index ? (
                  <Minus className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Plus className="w-4 h-4 text-zinc-400 shrink-0" />
                )}
              </button>
              <AnimatePresence initial={false}>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

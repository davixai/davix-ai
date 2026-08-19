"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    q: "Trebuie să schimb aplicațiile pe care le folosesc deja?",
    a: "Nu. Mă conectez direct la ce folosești deja — Excel, Gmail, WhatsApp, programul de facturare — fără să fie nevoie să schimbi nimic.",
  },
  {
    q: "Cât durează implementarea?",
    a: "Un chatbot sau automatizare simplă: 3–5 zile. Sisteme mai complexe cu mai multe integrări: 1–2 săptămâni. Lucrez rapid și îți livrez totul testat.",
  },
  {
    q: "Cum funcționează robotul de WhatsApp?",
    a: "Conectez un agent AI la numărul tău de WhatsApp Business. El citește mesajele clienților, înțelege contextul și răspunde automat conform regulilor pe care i le definesc. Tu primești notificare doar când e ceva ce necesită intervenția ta.",
  },
  {
    q: "Se recuperează investiția?",
    a: "Absolut. Un patron care economisește 2 ore pe zi câștigă echivalentul unui angajat part-time. Clienții mei recuperează investiția în primele 30–60 de zile.",
  },
  {
    q: "Există costuri lunare după implementare?",
    a: "Da, dar variază mult. Abonamentul pornește de la 150 lei/lună pentru o automatizare simplă și urcă spre 700–800 lei/lună pentru sisteme cu mai multe fluxuri și mai mulți oameni care le folosesc. Acoperă serverul, monitorizarea, corecțiile și actualizările — cu cât ceri mai multe, cu atât crește partea lunară, nu implementarea.",
  },
]

export function AutomatizariFaq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2
            style={{ letterSpacing: "-0.02em" }}
            className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4"
          >
            Întrebări frecvente
          </h2>
          <p className="text-zinc-600">Răspunsuri clare la cele mai comune întrebări.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200 bg-white overflow-hidden hover:border-emerald-300 transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-medium text-zinc-900 text-sm sm:text-base">{faq.q}</span>
                <span className="ml-4 shrink-0 text-zinc-400">
                  {open === i ? <Minus className="w-4 h-4 text-emerald-600" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p
                      className="px-6 pb-5 text-sm text-zinc-600 border-t border-zinc-100 pt-3"
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
      </div>
    </section>
  )
}

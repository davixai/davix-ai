"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    q: "Trebuie să schimb aplicațiile pe care le folosesc deja?",
    a: "Nu. Ne conectăm direct la uneltele tale existente — Excel, Gmail, WhatsApp, CRM, facturare — și le automatizăm fără să fie nevoie să schimbi nimic.",
  },
  {
    q: "Cât durează implementarea?",
    a: "Un chatbot sau automatizare simplă: 3–5 zile. Sisteme mai complexe cu mai multe integrări: 1–2 săptămâni. Lucrăm rapid și îți livrăm testat.",
  },
  {
    q: "Cum funcționează robotul de WhatsApp?",
    a: "Conectăm un agent AI la numărul tău de WhatsApp Business. El citește mesajele clienților, înțelege contextul și răspunde automat conform regulilor pe care i le definim. Tu primești notificare doar când e ceva ce necesită intervenția ta.",
  },
  {
    q: "Se recuperează investiția?",
    a: "Absolut. Un patron care economisește 2 ore pe zi câștigă echivalentul unui angajat part-time. Clienții noștri recuperează investiția în primele 30–60 de zile.",
  },
  {
    q: "Există costuri lunare după implementare?",
    a: "Depinde de soluție. Unele automatizări simple nu au costuri lunare. Roboții AI activi necesită un abonament mic de mentenanță (de la 20–50€/lună) care acoperă serverul și actualizările.",
  },
]

export function AutomatizariFaq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Întrebări frecvente</h2>
          <p className="text-zinc-400">Răspunsuri clare la cele mai comune întrebări.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-medium text-white text-sm sm:text-base">{faq.q}</span>
                <span className="ml-4 shrink-0 text-zinc-400">
                  {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
                    <p className="px-6 pb-5 text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
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

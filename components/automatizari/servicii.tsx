"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Bot, Mail, MessageSquare, Zap, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const servicii = [
  {
    icon: Bot,
    badge: "AI",
    title: "Asistent de Vânzări Online",
    subtitle: "Chatbot inteligent pe site-ul tău",
    description: "Un agent AI activ 24/7 pe site-ul tău care răspunde instant la întrebările vizitatorilor, califică lead-uri și îi ghidează spre cumpărare — chiar și noaptea sau în weekend.",
    features: [
      "Răspunde la întrebări frecvente instant",
      "Colectează date de contact automat",
      "Ghidează vizitatorii spre ofertă",
      "Integrare cu WhatsApp sau email",
      "Personalizat cu vocea brandului tău",
      "Raportare conversații lunară",
    ],
    cta: "Vreau un asistent de vânzări",
    color: "emerald",
    large: true,
  },
  {
    icon: MessageSquare,
    badge: "WhatsApp",
    title: "Suport Clienți pe WhatsApp",
    subtitle: "Răspuns în 2 secunde, non-stop",
    description: "Clienții tăi primesc răspuns instant pe WhatsApp la orice oră. Automatizăm preluarea cererilor de ofertă, confirmările de programări și întrebările frecvente — fără să ridici un deget.",
    features: [
      "Răspuns automat în 2 secunde",
      "Preia cereri de ofertă automat",
      "Confirmări programări automate",
      "Funcționează și în weekend",
      "Integrare cu calendarul tău",
      "Notificări instant pentru tine",
    ],
    cta: "Automatizez WhatsApp-ul",
    color: "blue",
    large: false,
  },
  {
    icon: Mail,
    badge: "Email & Excel",
    title: "Automatizări Simple",
    subtitle: "Email-uri, Excel, facturi — pe pilot automat",
    description: "Scapă de taskurile repetitive care îți mănâncă ore întregi: sortarea emailurilor, completarea foilor Excel, trimiterea facturilor, notificările automate și sincronizarea datelor între aplicații.",
    features: [
      "Sortare și răspuns automat email",
      "Completare automată Excel/Sheets",
      "Trimitere facturi automate",
      "Sincronizare date între aplicații",
      "Notificări automate echipă",
      "Rapoarte zilnice/săptămânale auto",
    ],
    cta: "Elimin munca manuală",
    color: "violet",
    large: false,
  },
]

const colorMap: Record<string, string> = {
  emerald: "border-emerald-500/30 bg-emerald-500/5",
  blue: "border-blue-500/30 bg-blue-500/5",
  violet: "border-violet-500/30 bg-violet-500/5",
}

const iconColorMap: Record<string, string> = {
  emerald: "text-emerald-400 bg-emerald-500/10",
  blue: "text-blue-400 bg-blue-500/10",
  violet: "text-violet-400 bg-violet-500/10",
}

const badgeColorMap: Record<string, string> = {
  emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
}

export function AutomatizariServicii() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="servicii" ref={ref} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ce automatizăm pentru tine
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Trei soluții clare, implementate rapid, care îți returnează ore întregi de muncă manuală în fiecare săptămână.
          </p>
        </motion.div>

        {/* Large card - Asistent Vanzari */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`relative rounded-2xl border p-8 mb-4 ${colorMap.emerald}`}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-xl ${iconColorMap.emerald}`}>
                  <Bot className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${badgeColorMap.emerald}`}>
                  {servicii[0].badge}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{servicii[0].title}</h3>
              <p className="text-sm text-zinc-500 mb-4">{servicii[0].subtitle}</p>
              <p className="text-zinc-400 leading-relaxed mb-6">{servicii[0].description}</p>
              <Button className="shimmer-btn bg-white text-zinc-950 hover:bg-zinc-200 rounded-full" asChild>
                <a href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer">
                  {servicii[0].cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {servicii[0].features.map((f) => (
                <div key={f} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-sm text-zinc-300">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 2 smaller cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {servicii.slice(1).map((serviciu, i) => {
            const Icon = serviciu.icon
            return (
              <motion.div
                key={serviciu.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className={`relative rounded-2xl border p-6 ${colorMap[serviciu.color]}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-xl ${iconColorMap[serviciu.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${badgeColorMap[serviciu.color]}`}>
                    {serviciu.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{serviciu.title}</h3>
                <p className="text-xs text-zinc-500 mb-3">{serviciu.subtitle}</p>
                <p className="text-sm text-zinc-400 leading-relaxed mb-5">{serviciu.description}</p>
                <ul className="space-y-2 mb-6">
                  {serviciu.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-zinc-300">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${serviciu.color === "blue" ? "text-blue-400" : "text-violet-400"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  asChild
                >
                  <a href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer">
                    {serviciu.cta}
                    <ArrowRight className="ml-2 w-3.5 h-3.5" />
                  </a>
                </Button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

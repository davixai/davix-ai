"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { MessageSquare, Globe, Bot, Mail, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2 bg-zinc-800 rounded-full w-fit">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-zinc-400 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

function WhatsAppAnimation() {
  const [messages, setMessages] = useState([
    { text: "Bună! Vreau o ofertă.", from: "user", visible: true },
    { text: "Bună! Trimitem oferta în 2 secunde.", from: "bot", visible: false },
    { text: "Mulțumesc, revin imediat!", from: "bot", visible: false },
  ])

  useEffect(() => {
    const timers = [
      setTimeout(() => setMessages((m) => m.map((msg, i) => i === 1 ? { ...msg, visible: true } : msg)), 1200),
      setTimeout(() => setMessages((m) => m.map((msg, i) => i === 2 ? { ...msg, visible: true } : msg)), 2400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="mt-4 space-y-2">
      {messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: msg.from === "user" ? 20 : -20 }}
          animate={msg.visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4 }}
          className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
        >
          <span className={`px-3 py-1.5 rounded-xl text-xs max-w-[80%] ${
            msg.from === "user"
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-zinc-800 text-zinc-300 border border-zinc-700"
          }`}>
            {msg.text}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="servicii" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Serviciile noastre
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Soluții complete de automatizare AI pentru afacerea ta. De la site-uri web care vând la roboți care gestionează clienții 24/7.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Card 2 - Suport Clienti WhatsApp - Large */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-zinc-800 w-fit">
                    <MessageSquare className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <span className="px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                    2 sec răspuns
                  </span>
                </div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">ROBOT AI MESAGERIE</p>
                <h3 className="text-xl font-semibold text-white mb-2">Suport Clienți pe WhatsApp</h3>
                <p className="text-zinc-400 text-sm">
                  Răspunde clienților tăi 24/7, chiar și în weekend. Preluare comenzi, întrebări frecvente, programări automate.
                </p>
                <ul className="mt-3 space-y-1.5">
                  {[
                    "Răspuns instant pe WhatsApp/Messenger",
                    "Automatizare preluare cereri ofertă și întrebări frecvente",
                    "Vorbește natural, urmează regulile tale",
                    "Nu mai pierzi clienți",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-zinc-400">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={1.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button size="sm" className="mt-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-4" asChild>
                  <a href="#contact">Vreau o ofertă</a>
                </Button>
              </div>
            </div>
            <WhatsAppAnimation />
          </motion.div>

          {/* Card 1 - Site-uri care aduc Clienti */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300 flex flex-col"
          >
            <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
              <Globe className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
            </div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">CREARE SITE-URI WEB</p>
            <h3 className="text-lg font-semibold text-white mb-2">Site-uri care Aduc Clienți</h3>
            <p className="text-zinc-400 text-sm mb-3">
              Site modern, rapid, optimizat pentru conversii. Perfect pentru freelanceri, saloane, restaurante și antreprenori locali.
            </p>
            <ul className="space-y-1.5 mb-4 flex-1">
              {[
                "Design modern și rapid (mobil optimizat)",
                "Configurare Google SEO",
                "Formulare contact rapide + WhatsApp/Apel",
                "Preț variază după complexitate",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-zinc-400">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={1.5} />
                  {f}
                </li>
              ))}
            </ul>
            <Button size="sm" variant="outline" className="rounded-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-xs px-4 w-fit" asChild>
              <a href="#contact">Descoperă mai mult</a>
            </Button>
          </motion.div>

          {/* Card 3 - Automatizari Simple */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300 flex flex-col"
          >
            <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
              <Mail className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
            </div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">AUTOMATIZARE EMAIL</p>
            <h3 className="text-lg font-semibold text-white mb-2">Automatizări Simple pentru Business</h3>
            <p className="text-zinc-400 text-sm mb-3">
              Sortare și răspuns automat la emailuri. Economisește ore zilnic, fără să mai pierzi niciun deget.
            </p>
            <ul className="space-y-1.5 mb-4 flex-1">
              {[
                "Sortare automată",
                "Răspuns personalizat automat",
                "Auto-reminder pentru urmăriri",
                "Excel → Rapoarte automate, Formulare → Notificări instant",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-zinc-400">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={1.5} />
                  {f}
                </li>
              ))}
            </ul>
            <Button size="sm" variant="outline" className="rounded-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-xs px-4 w-fit" asChild>
              <a href="#contact">Spune-mi nevoile tale</a>
            </Button>
          </motion.div>

          {/* Card 4 - Asistent de Vanzari Online */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300 flex flex-col"
          >
            <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
              <Bot className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
            </div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">WEBSITE CHATBOT</p>
            <h3 className="text-lg font-semibold text-white mb-2">Asistent de Vânzări Online</h3>
            <p className="text-zinc-400 text-sm mb-3">
              Agent inteligent direct pe site-ul tău. Convertește vizitatori în clienți plătitori.
            </p>
            <div className="flex-1" />
            <TypingIndicator />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

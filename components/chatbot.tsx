"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send } from "lucide-react"

const CHATBOT_DATA = {
  saluturi: {
    termeni: ["salut", "buna", "bună", "hey", "hello", "hi", "alo", "servus", "boss"],
    raspuns: "Salutare! Sunt asistentul DaviX AI. Cu ce te pot ajuta astazi?",
  },
  confirmari: {
    termeni: ["ok", "bine", "mersi", "multumesc", "mulțumesc", "thanks", "super", "perfect"],
    raspuns: "Cu drag! Dacă te hotărăști să facem un audit gratuit, poți alege o dată din secțiunea Contact de pe site.",
  },
  ajutor: {
    termeni: ["ma ajuti", "mă ajuți", "ce poti face", "ce poți face", "cu ce te ocupi", "ce oferi"],
    raspuns: "Sigur că te pot ajuta! La DaviX AI eliminăm munca manuală din afacerea ta. Te pot ajuta cu:\n\n• Site-uri de prezentare care aduc clienți (de la 300€)\n• Asistent de Vânzări Online pe site\n• Suport Clienți pe WhatsApp (răspuns în 2 secunde)\n• Automatizări simple: email, Excel, facturi\n\nCe te interesează cel mai mult?",
  },
  situri: {
    termeni: ["site", "website", "pagina", "pagină", "prezentare", "web"],
    raspuns: "Cream site-uri de prezentare care aduc clienți, cu design modern și optimizat.\n\n• Pachet START: de la 300€ — 3-5 pagini, design modern, SEO basic, hosting inclus\n• Pachet PRO: de la 500€ — 7-10 pagini, design premium, SEO avansat, automatizări, WhatsApp integrat\n\nLivrare în 5–7 zile. Fără costuri ascunse.",
  },
  automatizari: {
    termeni: ["automatizare", "automatizări", "automatizari", "robot", "email", "excel", "whatsapp", "bot"],
    raspuns: "Automatizăm procesele repetitive din afacerea ta:\n\n• Asistent de Vânzări Online — chatbot AI activ 24/7 pe site\n• Suport Clienți pe WhatsApp — răspuns automat în 2 secunde\n• Automatizări Simple — email, Excel, facturi, rapoarte automate\n\nEconomiți zeci de ore lunar și eliminați erorile umane.",
  },
  pret: {
    termeni: ["pret", "preț", "cost", "cat costa", "cât costă", "tarif", "oferta", "ofertă"],
    raspuns: "Prețurile noastre:\n\n• Site START: de la 300€\n• Site PRO: de la 500€\n• Asistent Vânzări Online: ofertă personalizată\n• Suport WhatsApp: ofertă personalizată\n• Automatizări Simple: de la 200€\n\nPentru o ofertă exactă, contactează-ne pe WhatsApp: 0729 369 094",
  },
  durata: {
    termeni: ["cat dureaza", "cât durează", "timp", "livrare", "implementare"],
    raspuns: "Timpii de livrare:\n\n• Site web: 5–7 zile\n• Chatbot/Asistent AI: 3–5 zile\n• Automatizări simple: 2–3 zile\n• Sisteme complexe: 1–2 săptămâni\n\nLucrăm rapid și transparent, cu actualizări zilnice.",
  },
  contact: {
    termeni: ["contact", "telefon", "email", "suna", "sună", "vorbim", "programare"],
    raspuns: "Ne poți contacta oricând:\n\n• WhatsApp/Telefon: 0729 369 094\n• Email: contact@davixai.website\n• Locație: Suceava, România\n\nSau poți programa un audit gratuit de 15 minute direct de pe site, din secțiunea Contact.",
  },
  audit: {
    termeni: ["audit", "consultatie", "consultație", "gratuit", "analiza", "analiză"],
    raspuns: "Oferim un audit gratuit de 15 minute în care analizăm afacerea ta și identificăm cele mai bune oportunități de automatizare.\n\nPoți programa direct din secțiunea Contact de pe site. Fără obligații.",
  },
}

interface Message {
  id: number
  text: string
  from: "user" | "bot"
}

function findResponse(userText: string): string {
  const lower = userText.toLowerCase().trim()

  // Check profanity
  const badWords = ["fut", "pula", "prost", "idiot", "imbecil", "dracu", "mama ta"]
  if (badWords.some((w) => lower.includes(w))) {
    return "Nu ne putem purta conversația în acest mod. Te rog să reformulezi.\n\nPentru suport, contactează-ne la 0729 369 094."
  }

  // Check each category
  for (const [, data] of Object.entries(CHATBOT_DATA)) {
    if (data.termeni.some((t) => lower.includes(t))) {
      return data.raspuns
    }
  }

  // Default
  return "Interesant! Cel mai bine ar fi să discutăm asta într-un audit gratuit de 15 minute ca să vedem cum putem aplica AI-ul exact pe cazul tău. Te interesează?\n\nNe poți contacta la 0729 369 094 sau contact@davixai.website"
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Salutare! Sunt asistentul DaviX AI. Cu ce te pot ajuta astazi?\n\nPoți întreba despre site-uri, prețuri, automatizări sau contact.", from: "bot" },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      inputRef.current?.focus()
    }
  }, [isOpen, messages])

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return

    const userMsg: Message = { id: Date.now(), text, from: "user" }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const botMsg: Message = { id: Date.now() + 1, text: findResponse(text), from: "bot" }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 800)
  }

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 md:right-6 w-[calc(100vw-2rem)] max-w-sm z-50 flex flex-col rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/50"
            style={{ height: "420px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="font-semibold text-white text-sm">Asistent DaviX AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-3"
              onWheel={(e) => e.stopPropagation()}
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.from === "user"
                        ? "bg-white text-zinc-950 rounded-br-sm"
                        : "bg-zinc-800 text-zinc-200 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-zinc-500 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-zinc-800 bg-zinc-900 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Scrie un mesaj..."
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-zinc-500 transition-colors"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-full bg-white text-zinc-950 flex items-center justify-center disabled:opacity-40 hover:bg-zinc-200 transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 md:right-6 w-10 h-10 bg-white hover:bg-zinc-100 rounded-full shadow-lg flex items-center justify-center z-40 transition-colors"
        aria-label="Deschide chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-4 h-4 text-zinc-950" />
            </motion.div>
          ) : (
            <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-4 h-4 text-zinc-950" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send } from "lucide-react"

const CHATBOT_DATA = {
  saluturi: {
    termeni: ["salut", "buna", "bună", "hey", "hello", "hi", "alo", "servus", "boss"],
    raspuns: "Salutare! Sunt asistentul DaviX AI. Cu ce te pot ajuta astăzi?",
  },
  confirmari: {
    termeni: ["ok", "bine", "mersi", "multumesc", "mulțumesc", "thanks", "super", "perfect"],
    raspuns:
      "Cu drag! Dacă te hotărăști, poți programa auditul gratuit din secțiunea Contact de pe site.",
  },
  ajutor: {
    termeni: ["ma ajuti", "mă ajuți", "ce poti face", "ce poți face", "cu ce te ocupi", "ce oferi"],
    raspuns:
      "La DaviX AI te ajutăm cu:\n\n• Aplicații web custom\n• Site-uri de prezentare\n• CRM-uri și platforme interne\n• Automatizări AI\n• Automatizări SMS (reminder, review)\n• Automatizări email\n• WhatsApp / chatbot\n• Davix Dental — CRM pentru clinici dentare\n\nCe te interesează cel mai mult?",
  },
  dental: {
    termeni: ["dental", "stomato", "clinica", "cabinet", "dentist", "davix dental", "crm dentar"],
    raspuns:
      "Davix Dental este CRM-ul nostru pentru clinici dentare:\n\n• Pacienți, programări, fișiere medicale\n• Odontogramă, tratamente, financiar, laborator\n• Roluri pentru medic, asistent, recepție, contabil\n• Automatizări SMS (reminder + review Google)\n\nPlanuri: Starter 699 RON, Pro 749 RON, Max 950 RON / lună. Vezi secțiunea Davix Dental.",
  },
  situri: {
    termeni: ["site", "website", "pagina", "pagină", "prezentare", "web"],
    raspuns:
      "Construim site-uri moderne care aduc clienți: design pe brand, SEO basic, integrare WhatsApp și formular de programare. Detalii: pagina Site-uri.",
  },
  automatizari: {
    termeni: ["automatizare", "automatizări", "automatizari", "robot", "email", "excel", "whatsapp", "bot", "sms"],
    raspuns:
      "Automatizăm pe SMS, email, WhatsApp, CRM și fluxuri interne:\n\n• SMS pentru reminder, confirmări, review Google\n• Email pentru welcome, follow-up, facturi\n• WhatsApp chatbot pentru lead-uri\n• CRM-uri custom pe procesele tale\n\nProgramează un audit gratuit ca să vedem ce ți se potrivește.",
  },
  pret: {
    termeni: ["pret", "preț", "cost", "cat costa", "cât costă", "tarif", "oferta", "ofertă"],
    raspuns:
      "Prețurile depind de scope. Davix Dental: 699/749/950 RON / lună. Restul (site, app, automatizări) primesc estimare în auditul gratuit de 15 minute.",
  },
  durata: {
    termeni: ["cat dureaza", "cât durează", "timp", "livrare", "implementare"],
    raspuns:
      "Site-uri: 5–7 zile. Chatbot/automatizări simple: 3–5 zile. Aplicații / CRM: 1–4 săptămâni, în funcție de scope.",
  },
  contact: {
    termeni: ["contact", "telefon", "email", "suna", "sună", "vorbim", "programare"],
    raspuns:
      "Ne poți contacta oricând:\n\n• WhatsApp: 0729 369 094\n• Email: contact@davixai.website\n• Audit gratuit: secțiunea Contact",
  },
  audit: {
    termeni: ["audit", "consultatie", "consultație", "gratuit", "analiza", "analiză"],
    raspuns:
      "Auditul gratuit durează 15 minute. Vedem ce procese poți automatiza, unde pierzi timp sau clienți și ce soluție se potrivește. Fără obligații.",
  },
}

interface Message {
  id: number
  text: string
  from: "user" | "bot"
}

function findResponse(userText: string): string {
  const lower = userText.toLowerCase().trim()
  const badWords = ["fut", "pula", "prost", "idiot", "imbecil", "dracu", "mama ta"]
  if (badWords.some((w) => lower.includes(w))) {
    return "Hai să păstrăm conversația politicoasă. Pentru suport: 0729 369 094."
  }
  for (const [, data] of Object.entries(CHATBOT_DATA)) {
    if (data.termeni.some((t) => lower.includes(t))) {
      return data.raspuns
    }
  }
  return "Interesant. Cel mai bine ar fi să discutăm într-un audit gratuit de 15 min. Contact: 0729 369 094 sau contact@davixai.website."
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Salutare! Sunt asistentul DaviX AI. Te pot ajuta cu site-uri, aplicații, automatizări sau Davix Dental.",
      from: "bot",
    },
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
    }, 700)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 md:right-6 w-[calc(100vw-2rem)] max-w-sm z-50 flex flex-col rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-2xl shadow-zinc-900/15"
            style={{ height: "440px" }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 bg-zinc-50 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="font-semibold text-zinc-900 text-sm">Asistent DaviX AI</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-3 bg-white"
              onWheel={(e) => e.stopPropagation()}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.from === "user"
                        ? "bg-emerald-600 text-white rounded-br-sm"
                        : "bg-zinc-100 text-zinc-800 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-100 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-3 py-3 border-t border-zinc-200 bg-zinc-50 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Scrie un mesaj..."
                  className="flex-1 bg-white border border-zinc-300 rounded-full px-4 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center disabled:opacity-40 hover:bg-emerald-700 transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 md:right-6 w-12 h-12 bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-lg shadow-emerald-600/30 flex items-center justify-center z-40 transition-colors"
        aria-label="Deschide chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}

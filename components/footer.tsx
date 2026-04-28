"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const footerLinks = {
  Servicii: ["Robot AI Apeluri", "Robot AI Mesagerie", "Creare Site-uri", "Website Chatbot", "Automatizare Email"],
  Legal: ["Termeni și Condiții", "Politica de Confidențialitate"],
}

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer ref={ref} className="border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden p-1.5">
                <img src="/davix-logo.png" alt="DaviX AI" className="w-full h-full object-contain" />
              </div>
              <span className="font-semibold text-white">DaviX AI</span>
            </a>
            <p className="text-sm text-zinc-500 mb-4 max-w-sm">
              Automatizări AI custom pentru afacerea ta. De la roboți vocali la site-uri web moderne.
            </p>
            {/* Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
              <span className="text-xs text-zinc-400">Disponibil pentru proiecte noi</span>
            </div>
            {/* Contact Info */}
            <div className="space-y-1 text-sm text-zinc-500">
              <p>Balta David</p>
              <p>
                <a href="tel:0729369094" className="hover:text-white transition-colors">
                  0729 369 094
                </a>
              </p>
              <p>
                <a href="mailto:contact@davixai.website" className="hover:text-white transition-colors">
                  contact@davixai.website
                </a>
              </p>
              <p>Suceava, România</p>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#servicii" className="text-sm text-zinc-500 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-zinc-500">&copy; {new Date().getFullYear()} DaviX AI. Toate drepturile rezervate.</p>
          <div className="flex items-center gap-6">
            <a href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-white transition-colors">
              WhatsApp
            </a>
            <a href="mailto:contact@davixai.website" className="text-sm text-zinc-500 hover:text-white transition-colors">
              Email
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

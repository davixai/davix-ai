"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

const footerLinks = {
  Servicii: [
    { label: "Site-uri web", href: "/site-uri" },
    { label: "Automatizări AI", href: "/automatizari" },
    { label: "Davix Dental", href: "/davix-dental" },
    { label: "Proiecte", href: "/proiecte" },
  ],
  Companie: [
    { label: "Despre noi", href: "/despre-noi" },
    { label: "Studii de caz", href: "/testimoniale" },
    { label: "Întrebări frecvente", href: "/intrebari-frecvente" },
    { label: "Contact", href: "/#contact" },
  ],
  Legal: [
    { label: "Termeni și Condiții", href: "/termeni" },
    { label: "Politica de Confidențialitate", href: "/confidentialitate" },
  ],
}

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer ref={ref} className="border-t border-zinc-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-14 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8"
        >
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center overflow-hidden ring-1 ring-white/10">
                <img
                  src="/davix-logo-white.png"
                  alt="DaviX AI"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-semibold text-zinc-900">DaviX AI</span>
            </Link>
            <p className="text-sm text-zinc-600 mb-4 max-w-sm" style={{ lineHeight: "1.6" }}>
              Aplicații web, site-uri și automatizări AI pentru afaceri locale care vor mai mulți
              clienți.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
              <span className="text-xs text-emerald-700">Disponibil pentru proiecte noi</span>
            </div>
            <div className="space-y-1 text-sm text-zinc-600">
              <p className="font-medium text-zinc-800">Balta David</p>
              <p>
                <a href="tel:0729369094" className="hover:text-emerald-700 transition-colors">
                  0729 369 094
                </a>
              </p>
              <p>
                <a
                  href="mailto:contact@davixai.website"
                  className="hover:text-emerald-700 transition-colors"
                >
                  contact@davixai.website
                </a>
              </p>
              <p>Suceava, România</p>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-zinc-900 mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-600 hover:text-emerald-700 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} DaviX AI. Toate drepturile rezervate.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://wa.me/40729369094"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-emerald-700 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="mailto:contact@davixai.website"
              className="text-sm text-zinc-500 hover:text-emerald-700 transition-colors"
            >
              Email
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

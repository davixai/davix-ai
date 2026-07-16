"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, ArrowRight } from "lucide-react"

export function DavixDentalToast() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1400)
    return () => clearTimeout(timer)
  }, [])

  const close = () => setVisible(false)

  const handleCta = () => {
    setVisible(false)
    if (typeof window !== "undefined") {
      window.location.href = "/davix-dental"
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          className="fixed bottom-20 left-4 right-auto lg:left-6 lg:bottom-6 z-40 max-w-[220px] lg:max-w-sm"
        >
          <div className="relative overflow-hidden rounded-xl lg:rounded-2xl bg-white border border-zinc-200 shadow-2xl shadow-sky-900/10 backdrop-blur">
            {/* Accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 lg:w-1 bg-gradient-to-b from-sky-500 to-emerald-500" />

            <button
              type="button"
              onClick={close}
              aria-label="Închide notificarea"
              className="absolute top-1.5 right-1.5 lg:top-2.5 lg:right-2.5 p-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
            </button>

            <div className="p-2.5 pl-3 pr-7 lg:p-4 lg:pl-5 lg:pr-9">
              <div className="flex items-center gap-1.5 lg:gap-2 mb-1 lg:mb-1.5">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 lg:px-2 rounded-full bg-sky-50 border border-sky-200 text-[9px] lg:text-[10px] font-semibold uppercase tracking-wider text-sky-700">
                  <Sparkles className="w-2 h-2 lg:w-2.5 lg:h-2.5" strokeWidth={2.5} />
                  Nou
                </span>
                <span className="text-xs lg:text-sm font-semibold text-zinc-900">Davix Dental</span>
              </div>

              {/* Short copy on mobile & tablet */}
              <p
                className="lg:hidden text-[11px] text-zinc-600 mb-2"
                style={{ lineHeight: "1.45" }}
              >
                CRM stomatologic pentru cabinete și clinici.
              </p>

              {/* Full copy on desktop */}
              <p
                className="hidden lg:block text-xs text-zinc-600 mb-3"
                style={{ lineHeight: "1.55" }}
              >
                CRM stomatologic pentru cabinete și clinici. Programări, pacienți, fișiere medicale,
                tratamente, financiar și automatizări SMS — într-o singură aplicație.
              </p>

              <button
                type="button"
                onClick={handleCta}
                className="group inline-flex items-center gap-1.5 text-[11px] lg:text-xs font-semibold text-sky-700 hover:text-sky-900 transition-colors"
              >
                Vezi aplicația
                <ArrowRight
                  className="w-3 h-3 lg:w-3.5 lg:h-3.5 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

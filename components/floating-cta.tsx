"use client"

import { motion } from "framer-motion"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { Calendar } from "lucide-react"

export function FloatingCta() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 right-4 z-40 hidden sm:block"
    >
      <MagneticButton distance={0.4}>
        <a
          href="/#contact"
          className="group flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 hover:bg-emerald-700 active:scale-95 transition-all duration-200 whitespace-nowrap"
        >
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-white" />
          <span className="hidden sm:inline">Programează audit gratuit</span>
        </a>
      </MagneticButton>
    </motion.div>
  )
}

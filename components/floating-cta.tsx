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
      className="fixed top-4 right-4 z-50"
    >
      <MagneticButton distance={0.4}>
        <a
          href="#contact"
          className="group flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white text-zinc-900 font-semibold text-xs sm:text-sm shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 hover:bg-zinc-100 active:scale-95 transition-all duration-200 border border-white/80 whitespace-nowrap"
          style={{
            boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18), 0 1.5px 6px 0 rgba(0,0,0,0.10)",
          }}
        >
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-zinc-700 group-hover:text-zinc-900 transition-colors" />
          <span className="hidden sm:inline">Programează o discuție</span>
          <span className="sm:hidden">Programează</span>
        </a>
      </MagneticButton>
    </motion.div>
  )
}

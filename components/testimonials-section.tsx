"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"

export function TestimonialsSection() {
  return (
    <section className="relative py-32 sm:py-40">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
            Testimoniale
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto text-pretty">
            Experiențele clienților noștri, în cuvintele lor.
          </p>
        </motion.div>

        {/* Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center justify-center py-24 px-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 border-dashed max-w-2xl mx-auto text-center"
        >
          <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
            <Clock className="w-6 h-6 text-zinc-500" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-3">
            Testimonialele clienților noștri vor apărea aici în curând
          </h2>
          <p className="text-zinc-500 text-sm max-w-md">
            Lucrăm cu primii noștri clienți. Revino în curând pentru a vedea ce spun ei despre experiența cu DaviX AI.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="https://wa.me/40729369094"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-zinc-950 font-semibold hover:bg-zinc-200 transition-colors shimmer-btn"
          >
            Contactează-ne pe WhatsApp
          </a>
        </motion.div>

      </div>
    </section>
  )
}

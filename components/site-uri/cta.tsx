"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function SiteUriCta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/60 via-zinc-900 to-zinc-900 border border-emerald-500/30 p-10 sm:p-14 text-center"
        >
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance relative"
          >
            Vrei un site care iti aduce clienti?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 mb-8 max-w-lg mx-auto leading-relaxed relative"
          >
            Programeaza o discutie gratuita de 15 minute. Iti explic exact ce ai nevoie si primesti un plan clar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <Button
              size="lg"
              className="shimmer-btn bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-10 text-base"
              asChild
            >
              <a href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer">
                Incepem acum
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <p className="text-xs text-zinc-500 mt-4">Raspundem in maxim 2 ore (L–V)</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

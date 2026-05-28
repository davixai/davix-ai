"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function SiteUriCta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-10 sm:p-14 text-center card-elevated"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ letterSpacing: "-0.02em" }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance relative"
          >
            Vrei un site care îți aduce clienți?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-emerald-50 mb-8 max-w-lg mx-auto"
            style={{ lineHeight: "1.7" }}
          >
            Programează auditul gratuit de 15 minute. Îți explicăm exact ce ai nevoie și primești un plan clar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center relative"
          >
            <Button
              size="lg"
              className="shimmer-btn bg-white text-emerald-700 hover:bg-zinc-100 rounded-full px-7 text-base font-semibold h-12"
              asChild
            >
              <a href="/#contact">
                Programează audit gratuit
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-7 h-12 border-white/40 text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <a href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer">
                Scrie pe WhatsApp
              </a>
            </Button>
          </motion.div>
          <p className="text-xs text-emerald-100 mt-4 relative">Răspundem în maxim 2 ore (L–V)</p>
        </motion.div>
      </div>
    </section>
  )
}

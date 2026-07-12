"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AutomatizariCta() {
  return (
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-emerald-200 bg-emerald-50/60 p-10 text-center overflow-hidden card-elevated"
        >
          <div className="relative z-10">
            <h2
              style={{ letterSpacing: "-0.02em" }}
              className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4 text-balance"
            >
              Gata să elimini munca manuală?
            </h2>
            <p
              className="text-zinc-600 mb-8 max-w-xl mx-auto"
              style={{ lineHeight: "1.7" }}
            >
              15 minute de discuție și știm exact ce automatizăm pentru tine. Fără obligații, fără pitch agresiv.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="shimmer-btn bg-emerald-600 text-white hover:bg-emerald-700 rounded-full px-7 font-semibold h-12"
                asChild
              >
                <a href="#contact">
                  Programează audit gratuit
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-7 h-12 border-zinc-300 text-zinc-800 hover:bg-zinc-50 bg-white"
                asChild
              >
                <a href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer">
                  Scrie pe WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

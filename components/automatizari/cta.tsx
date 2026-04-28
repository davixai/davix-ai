"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AutomatizariCta() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-zinc-800 bg-zinc-900/60 p-10 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.06)_0%,_transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
              Gata să elimini munca manuală?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              15 minute de discuție și știm exact ce automatizăm pentru tine. Fără obligații, fără pitch agresiv.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="shimmer-btn bg-white text-zinc-950 hover:bg-zinc-200 rounded-full px-8 font-semibold"
                asChild
              >
                <a href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer">
                  Consultație Gratuită pe WhatsApp
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                asChild
              >
                <a href="#contact">Programează o discuție</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

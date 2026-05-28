"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AutomatizariHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-200/30 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(16,24,40,0.08) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-emerald-200 mb-6 shadow-sm"
        >
          <Zap className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-xs text-emerald-700 font-medium">
            Automatizări AI pentru business
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ letterSpacing: "-0.03em" }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 mb-6 leading-[1.05] text-balance"
        >
          Elimină munca manuală.{" "}
          <span className="text-emerald-600">Câștigă timp real.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-zinc-600 mb-10 max-w-2xl mx-auto"
          style={{ lineHeight: "1.7" }}
        >
          De la chatbot WhatsApp și SMS reminder/review la automatizări email și fluxuri interne —
          conectăm uneltele tale și le facem să lucreze singure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button
            size="lg"
            className="shimmer-btn bg-emerald-600 text-white hover:bg-emerald-700 rounded-full px-7 h-12 font-semibold shadow-lg shadow-emerald-600/20"
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
            <a href="#servicii">Vezi serviciile</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { value: "3 zile", label: "livrare chatbot" },
            { value: "24/7", label: "funcționare automată" },
            { value: "0 erori", label: "umane în flux" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-zinc-900">{stat.value}</div>
              <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

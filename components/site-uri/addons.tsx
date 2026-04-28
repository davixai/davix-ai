"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Bot, Mail, BarChart2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const addons = [
  { icon: Bot, label: "Chatbot AI" },
  { icon: Mail, label: "Automatizare email" },
  { icon: BarChart2, label: "Dashboard lead-uri" },
]

export default function SiteUriAddons() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800"
        >
          <h3 className="text-lg font-semibold text-white mb-6 text-center">Vrei mai mult?</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {addons.map((addon, index) => (
              <motion.div
                key={addon.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-300"
              >
                <addon.icon className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
                {addon.label}
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-white text-sm rounded-full"
              asChild
            >
              <a href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer">
                Spune-mi ce ai nevoie
                <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

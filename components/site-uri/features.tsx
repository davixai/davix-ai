"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Palette, TrendingUp, Wrench } from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "Design Modern",
    items: [
      "Responsive (mobil + desktop)",
      "Branding personalizat",
      "UI curat și modern",
      "Incarcare rapida",
    ],
  },
  {
    icon: TrendingUp,
    title: "Conversii & Clienți",
    items: [
      "Formulare contact rapide",
      "Buton WhatsApp / apel direct",
      "SEO basic inclus",
      "Optimizat pentru Google local",
    ],
  },
  {
    icon: Wrench,
    title: "Fara griji tehnice",
    items: [
      "Hosting inclus initial",
      "SSL securizat",
      "Setup complet",
      "Livrare gata de utilizare",
    ],
  },
]

export default function SiteUriFeatures() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            Tot ce ai nevoie pentru un site care vinde
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Fiecare site livrat include tot ce e necesar pentru a atrage și converti clienți noi.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-zinc-900/60 backdrop-blur border border-zinc-800 hover:border-emerald-500/30 transition-all duration-300 hover:bg-zinc-900"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:bg-emerald-500/20 transition-colors">
                <feature.icon className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">{feature.title}</h3>
              <ul className="space-y-2.5">
                {feature.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Palette, TrendingUp, Wrench } from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "Design modern",
    items: [
      "Responsive (mobil + desktop)",
      "Branding personalizat",
      "UI curat și modern",
      "Încărcare rapidă",
    ],
  },
  {
    icon: TrendingUp,
    title: "Conversii și clienți",
    items: [
      "Formulare contact rapide",
      "Buton WhatsApp / apel direct",
      "SEO basic inclus",
      "Optimizat pentru Google local",
    ],
  },
  {
    icon: Wrench,
    title: "Fără griji tehnice",
    items: [
      "Hosting inclus inițial",
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
    <section ref={ref} className="py-16 px-4 sm:px-6 bg-gradient-to-b from-white via-zinc-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2
            style={{ letterSpacing: "-0.025em" }}
            className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4 text-balance"
          >
            Tot ce ai nevoie pentru un site care vinde
          </h2>
          <p className="text-zinc-600 max-w-xl mx-auto" style={{ lineHeight: "1.7" }}>
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
              className="group p-6 rounded-2xl bg-white border border-zinc-200 hover:border-emerald-300 transition-all duration-300 card-elevated"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors">
                <feature.icon className="w-5 h-5 text-emerald-600" strokeWidth={1.8} />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-4">{feature.title}</h3>
              <ul className="space-y-2.5">
                {feature.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
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

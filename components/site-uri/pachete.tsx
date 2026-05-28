"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const pachete = [
  {
    id: "start",
    name: "START",
    price: "300€+",
    tagline: "Site simplu, modern, eficient",
    popular: false,
    features: [
      "3–5 pagini",
      "Design modern responsive",
      "Formulare contact",
      "SEO basic",
      "Hosting inclus (perioadă inițială)",
      "Livrare 5–7 zile",
    ],
  },
  {
    id: "pro",
    name: "PRO",
    price: "500€+",
    tagline: "Site modern + automatizări + conversii",
    popular: true,
    features: [
      "Tot din pachetul Start",
      "7–10 pagini",
      "Design premium",
      "SEO avansat",
      "Google Analytics",
      "Integrare WhatsApp + tracking",
      "Automatizări (email, lead-uri, formulare inteligente)",
      "Optimizare performanță",
    ],
  },
]

export default function SiteUriPachete() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="pachete" className="py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
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
            Alege pachetul potrivit
          </h2>
          <p className="text-zinc-600 max-w-xl mx-auto" style={{ lineHeight: "1.7" }}>
            Două opțiuni clare, fără complicații. Plătești o dată, site-ul e al tău.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {pachete.map((pachet, index) => (
            <motion.div
              key={pachet.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative p-8 rounded-2xl border transition-all duration-300 card-elevated ${
                pachet.popular
                  ? "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white border-emerald-500"
                  : "bg-white border-zinc-200 hover:border-emerald-300"
              }`}
            >
              {pachet.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 text-xs font-semibold bg-white text-emerald-700 rounded-full">
                    POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <span
                  className={`text-xs font-semibold tracking-widest uppercase ${
                    pachet.popular ? "text-emerald-100" : "text-zinc-400"
                  }`}
                >
                  Pachet {pachet.name}
                </span>
                <div className="flex items-baseline gap-1 mt-2 mb-1">
                  <span
                    className={`text-4xl font-bold ${
                      pachet.popular ? "text-white" : "text-zinc-900"
                    }`}
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {pachet.price}
                  </span>
                </div>
                <p className={`text-sm ${pachet.popular ? "text-emerald-50" : "text-zinc-600"}`}>
                  {pachet.tagline}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {pachet.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-2.5 text-sm ${
                      pachet.popular ? "text-emerald-50" : "text-zinc-700"
                    }`}
                  >
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        pachet.popular ? "text-white" : "text-emerald-600"
                      }`}
                      strokeWidth={2.5}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-full font-semibold ${
                  pachet.popular
                    ? "bg-white text-emerald-700 hover:bg-zinc-100"
                    : "bg-zinc-900 text-white hover:bg-zinc-800"
                }`}
                asChild
              >
                <a href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer">
                  Vreau pachetul {pachet.name}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-zinc-500 mt-8"
        >
          Oferim și mentenanță lunară în funcție de nevoi (update-uri, modificări, hosting și suport
          tehnic).
        </motion.p>
      </div>
    </section>
  )
}

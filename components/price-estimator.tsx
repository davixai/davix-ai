"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Check, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"

const serviceOptions = [
  {
    id: "website",
    name: "Website Business",
    description: "Prezența online care vinde singură.",
    price: 299.99,
    popular: true,
    features: [
      "Design modern și rapid (mobil optimizat)",
      "Configurare Google (SEO)",
      "Formulare contact rapid + WhatsApp/Apel",
      "Preț variază după complexitate",
    ],
  },
  {
    id: "robot",
    name: "Robot AI",
    description: "Angajatul digital care nu doarme niciodată.",
    price: 499.99,
    startingPrice: true,
    features: [
      "Răspunde instant pe WhatsApp/Messenger",
      "Preluare comenzi/programări automat 24/7",
      "Vorbește natural, urmează regulile tale",
      "Nu mai pierzi clienți",
    ],
  },
  {
    id: "complex",
    name: "Soluție Complexă",
    description: "Sistem complet de management și profit.",
    price: 899.99,
    startingPrice: true,
    features: [
      "Conectăm toate aplicațiile tale",
      "Rapoarte automate vânzări în timp real",
      "Automatizare cap-coadă",
      "Suport tehnic dedicat",
    ],
  },
]

function BorderBeam() {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
      <div
        className="absolute w-24 h-24 bg-white/20 blur-xl border-beam"
        style={{
          offsetPath: "rect(0 100% 100% 0 round 16px)",
        }}
      />
    </div>
  )
}

export function PriceEstimator() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const totalPrice = selectedServices.reduce((sum, id) => {
    const service = serviceOptions.find((s) => s.id === id)
    return sum + (service?.price || 0)
  }, 0)

  const handleRequestOffer = () => {
    const selectedNames = selectedServices
      .map((id) => serviceOptions.find((s) => s.id === id)?.name)
      .filter(Boolean)
      .join(", ")
    const message = encodeURIComponent(
      `Salut! Aș dori o ofertă personalizată pentru:\n\nServicii selectate: ${selectedNames}\nTotal estimat: ${totalPrice.toFixed(2)} EUR`
    )
    window.open(`https://wa.me/40729369094?text=${message}`, "_blank")
  }

  return (
    <section id="estimator" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            Estimator de preț
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
            Selectează serviciile de care ai nevoie și obține o estimare de preț instant.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {serviceOptions.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              onClick={() => toggleService(service.id)}
              className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                selectedServices.includes(service.id)
                  ? "bg-zinc-900 border-emerald-500/50"
                  : service.popular
                  ? "bg-zinc-900 border-zinc-700"
                  : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-600"
              }`}
            >
              {service.popular && <BorderBeam />}

              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-zinc-950 text-xs font-medium rounded-full">
                  Popular
                </div>
              )}

              {/* Selection indicator */}
              <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                selectedServices.includes(service.id)
                  ? "bg-emerald-500 border-emerald-500"
                  : "border-zinc-600"
              }`}>
                {selectedServices.includes(service.id) && (
                  <Check className="w-4 h-4 text-white" strokeWidth={2} />
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{service.name}</h3>
                <p className="text-zinc-400 text-sm">{service.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1 flex-wrap">
                  {service.startingPrice && <span className="text-zinc-400 text-sm">de la</span>}
                  <span className="text-3xl font-bold text-white">{service.price}</span>
                  <span className="text-zinc-400 text-sm">EUR</span>
                </div>
              </div>

              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={1.5} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Price Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 max-w-md mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-zinc-400" />
            <span className="text-zinc-400">Total estimat</span>
          </div>
          <div className="text-5xl font-bold text-white mb-2">
            {totalPrice > 0 ? totalPrice.toFixed(2) : "0"} <span className="text-2xl text-zinc-400">EUR</span>
          </div>
          <p className="text-zinc-500 text-sm mb-6">
            {selectedServices.length === 0
              ? "Selectează serviciile dorite"
              : `${selectedServices.length} ${selectedServices.length === 1 ? "serviciu selectat" : "servicii selectate"}`}
          </p>
          <Button
            className="shimmer-btn w-full bg-white text-zinc-950 hover:bg-zinc-200 rounded-full"
            disabled={selectedServices.length === 0}
            onClick={handleRequestOffer}
          >
            Solicită ofertă personalizată
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

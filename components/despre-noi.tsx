"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Sparkles, Users, Clock, ShieldCheck } from "lucide-react"

const stats = [
  { icon: Users, value: "50+", label: "Clienți mulțumiți" },
  { icon: Clock, value: "7–10", label: "Zile livrare" },
  { icon: ShieldCheck, value: "100%", label: "Garanție satisfacție" },
  { icon: Sparkles, value: "24/7", label: "Suport AI disponibil" },
]

const values = [
  {
    title: "Transparență totală",
    desc: "Prețuri clare, fără surprize. Știi exact ce primești înainte să semnezi.",
  },
  {
    title: "Calitate fără compromis",
    desc: "Fiecare proiect este tratat cu aceeași atenție, indiferent de buget.",
  },
  {
    title: "Rezultate măsurabile",
    desc: "Nu facem site-uri frumoase — facem site-uri care aduc clienți reali.",
  },
]

export default function DespreNoi() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" })

  const valuesRef = useRef(null)
  const valuesInView = useInView(valuesRef, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="py-14 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 text-sm font-medium">Cine suntem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            Despre noi
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            DaviX AI este o echipă de specialiști în web design și automatizări AI, dedicată
            business-urilor locale care vor să crească online. Combinăm design modern cu
            tehnologie AI pentru a livra soluții care aduc rezultate reale.
          </p>
        </motion.div>

        {/* Stats row */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col items-center text-center p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/30 hover:bg-zinc-900 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3 group-hover:bg-emerald-500/20 transition-colors duration-300">
                <stat.icon className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
              </div>
              <span className="text-2xl font-bold text-white mb-1">{stat.value}</span>
              <span className="text-xs text-zinc-500 leading-tight">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div ref={valuesRef} className="grid sm:grid-cols-3 gap-5">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-emerald-500/20 hover:bg-zinc-900/70 transition-all duration-300"
            >
              {/* Accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={valuesInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-0.5 w-10 bg-emerald-500 rounded-full mb-4 origin-left"
              />
              <h3 className="text-base font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

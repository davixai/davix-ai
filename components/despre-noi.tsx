"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Sparkles,
  Clock,
  ShieldCheck,
  Receipt,
  Search,
  Lightbulb,
  Palette,
  TestTube2,
  Rocket,
  LifeBuoy,
} from "lucide-react"

const stats = [
  { icon: Clock, value: "3–10 zile", label: "Depinde de proiect" },
  { icon: ShieldCheck, value: "100%", label: "Garanție pe lucrare" },
  { icon: Sparkles, value: "Audit", label: "Gratuit, fără obligații" },
  { icon: Receipt, value: "E-Factură", label: "Totul legal" },
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
    desc: "Nu facem doar lucruri frumoase — construim ce aduce cereri și economisește timp.",
  },
]

const steps = [
  {
    icon: Search,
    title: "Audit gratuit",
    desc: "15 minute în care înțelegem afacerea ta, fluxul actual și unde pierzi timp sau clienți.",
  },
  {
    icon: Lightbulb,
    title: "Propunere soluție",
    desc: "Recomandăm exact ce ți se potrivește: site, aplicație, CRM sau o combinație de automatizări.",
  },
  {
    icon: Palette,
    title: "Design / dezvoltare",
    desc: "Construim soluția pe procesele tale, cu update-uri regulate și aprobări la fiecare etapă.",
  },
  {
    icon: TestTube2,
    title: "Testare",
    desc: "Verificăm responsive, performanță, integrările cu WhatsApp, SMS, email și fluxurile reale.",
  },
  {
    icon: Rocket,
    title: "Lansare",
    desc: "Punem soluția online, conectăm domeniul tău și migrăm datele acolo unde este nevoie.",
  },
  {
    icon: LifeBuoy,
    title: "Suport / optimizare",
    desc: "Rămânem disponibili pentru ajustări, mentenanță și optimizări pe baza datelor reale.",
  },
]

export default function DespreNoi() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" })

  const valuesRef = useRef(null)
  const valuesInView = useInView(valuesRef, { once: true, margin: "-60px" })

  const stepsRef = useRef(null)
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="py-14 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 text-sm font-medium">Cine suntem</span>
          </div>
          <h2
            style={{ letterSpacing: "-0.025em" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-4 text-balance"
          >
            Despre noi
          </h2>
          <p
            className="text-zinc-600 max-w-2xl mx-auto"
            style={{ lineHeight: "1.7" }}
          >
            DaviX AI construiește aplicații web, site-uri și automatizări AI pentru afaceri locale.
            Combinăm design modern cu tehnologie reală pentru a livra soluții care economisesc timp
            și aduc mai multe cereri.
          </p>
        </motion.div>

        {/* Stats row */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-zinc-200 hover:border-emerald-300 transition-all duration-300 card-elevated"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3 group-hover:bg-emerald-100 transition-colors">
                <stat.icon className="w-4 h-4 text-emerald-600" strokeWidth={1.8} />
              </div>
              <span className="text-xl font-bold text-zinc-900 mb-1 text-center">{stat.value}</span>
              <span className="text-xs text-zinc-500 text-center">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Cum lucram process */}
        <div ref={stepsRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h3
              style={{ letterSpacing: "-0.02em" }}
              className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3 text-balance"
            >
              Cum lucrăm
            </h3>
            <p
              className="text-zinc-600 max-w-xl mx-auto"
              style={{ lineHeight: "1.6" }}
            >
              Un proces simplu și predictibil, de la primul mesaj până la suport post-lansare.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="relative p-5 rounded-2xl bg-white border border-zinc-200 hover:border-emerald-300 transition-colors card-elevated"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-emerald-600" strokeWidth={1.8} />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                      Pas {i + 1}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-zinc-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-zinc-600" style={{ lineHeight: "1.6" }}>
                    {step.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Values */}
        <div ref={valuesRef} className="grid sm:grid-cols-3 gap-5">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group p-6 rounded-2xl bg-white border border-zinc-200 hover:border-emerald-300 transition-all duration-300 card-elevated"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={valuesInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-0.5 w-10 bg-emerald-500 rounded-full mb-4 origin-left"
              />
              <h3 className="text-base font-semibold text-zinc-900 mb-2">{value.title}</h3>
              <p className="text-sm text-zinc-600" style={{ lineHeight: "1.65" }}>
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

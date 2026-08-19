"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Check,
  Coffee,
  Stethoscope,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const EASE = [0.22, 1, 0.36, 1] as const

const dental = {
  icon: Stethoscope,
  eyebrow: "Pentru cabinete stomatologice",
  name: "DaviX Dental",
  desc: "Platformă pentru cabinete stomatologice, unde ții pacienții, programările și activitatea de zi cu zi într-un singur loc.",
  features: [
    "Calendar cu programări, pe fiecare medic",
    "Fișa pacientului și tot istoricul lui",
    "Planuri de tratament și poze înainte/după",
    "Încasări, cheltuieli și lucrări de laborator",
    "Mesaje care amintesc singure pacientului de programare",
    "Acces separat pentru medic, asistent, recepție și contabil",
  ],
}

const cafenea = {
  icon: Coffee,
  eyebrow: "Pentru cafenele și localuri",
  name: "Fidelizare cafenea",
  desc: "Card digital de fidelitate prin care clienții acumulează puncte și primesc recompense direct din aplicație.",
  features: [
    "Clientul strânge puncte la fiecare comandă",
    "Fără card de carton care se pierde sau se uită acasă",
    "Recompensele le stabilești tu",
    "Vezi cine revine și cât de des",
  ],
}

const WA_IDEE =
  "https://wa.me/40729369094?text=" +
  encodeURIComponent("Salut! Am o idee de aplicație pentru afacerea mea și vreau să discutăm.")

const WA_CAFENEA =
  "https://wa.me/40729369094?text=" +
  encodeURIComponent("Salut! Vreau să știu când e gata aplicația de fidelizare pentru cafenele.")

export function Aplicatii() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const reduceMotion = useReducedMotion()

  const DentalIcon = dental.icon
  const CafeneaIcon = cafenea.icon

  return (
    <section ref={ref} className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden bg-transparent">
      {/* aceleași accente moi ca pe restul site-ului */}
      <div className="absolute top-32 -left-32 w-[400px] h-[400px] bg-sky-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] bg-emerald-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-5">
            <Blocks className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.8} />
            <span className="text-emerald-700 text-sm font-medium">Aplicații personalizate</span>
          </div>
          <h1
            style={{ letterSpacing: "-0.025em" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-4 text-balance"
          >
            Aplicații construite pe afacerea ta
          </h1>
          <p className="text-zinc-600 max-w-xl mx-auto" style={{ lineHeight: "1.7" }}>
            Nu adaptez afacerea ta la un program de-a gata. Construiesc programul după cum lucrezi tu.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
          {/* ---------- DaviX Dental — gata ---------- */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-sky-300/50 p-6 sm:p-8
                       hover:border-sky-400 hover:-translate-y-1 transition-[transform,border-color] duration-300 ease-out
                       card-elevated shadow-[0_0_0_1px_rgba(56,189,248,0.06),0_22px_60px_-32px_rgba(56,189,248,0.5)]"
          >
            <div className="mb-5 flex flex-col-reverse items-start gap-3 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="flex w-12 h-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 border border-sky-100 text-sky-600
                             group-hover:scale-105 transition-transform duration-300 ease-out"
                >
                  <DentalIcon className="w-6 h-6" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-zinc-500">{dental.eyebrow}</p>
                  <h2
                    className="text-2xl font-bold text-zinc-900 leading-tight"
                    style={{ letterSpacing: "-0.025em" }}
                  >
                    {dental.name}
                  </h2>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-glow" />
                Gata
              </span>
            </div>

            <p className="text-sm text-zinc-600 mb-6" style={{ lineHeight: "1.7" }}>
              {dental.desc}
            </p>

            <ul className="flex-1 space-y-3 mb-7">
              {dental.features.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.3 + i * 0.06, ease: EASE }}
                  className="flex items-start gap-2.5 text-sm text-zinc-700"
                >
                  <Check className="mt-0.5 w-4 h-4 shrink-0 text-sky-500" strokeWidth={2.4} aria-hidden="true" />
                  <span style={{ lineHeight: "1.6" }}>{f}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-center gap-3">
              <Button
                className="rounded-full bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 h-11 shadow-lg shadow-sky-600/20"
                asChild
              >
                <Link href="/davix-dental">
                  Vezi proiectul
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <a
                href="https://davixdental.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-zinc-700 hover:text-sky-700
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 transition-colors"
              >
                Vezi aplicația live
                <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
              </a>
            </div>
          </motion.article>

          {/* ---------- Fidelizare cafenea — în lucru ---------- */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.22, ease: EASE }}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-amber-300/50 p-6 sm:p-8
                       hover:border-amber-400 hover:-translate-y-1 transition-[transform,border-color] duration-300 ease-out
                       card-elevated shadow-[0_0_0_1px_rgba(245,158,11,0.06),0_22px_60px_-32px_rgba(245,158,11,0.45)]"
          >
            {/* bara de progres — semnalează discret că se lucrează la ea */}
            {!reduceMotion && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px] overflow-hidden bg-amber-100"
              >
                <span className="wip-bar block h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              </span>
            )}

            <div className="mb-5 flex flex-col-reverse items-start gap-3 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="flex w-12 h-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 border border-amber-100 text-amber-600
                             group-hover:scale-105 transition-transform duration-300 ease-out"
                >
                  <CafeneaIcon className="w-6 h-6" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-zinc-500">{cafenea.eyebrow}</p>
                  <h2
                    className="text-2xl font-bold text-zinc-900 leading-tight"
                    style={{ letterSpacing: "-0.025em" }}
                  >
                    {cafenea.name}
                  </h2>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Se lucrează
              </span>
            </div>

            <p className="text-sm text-zinc-600 mb-6" style={{ lineHeight: "1.7" }}>
              {cafenea.desc}
            </p>

            <ul className="flex-1 space-y-3 mb-7">
              {cafenea.features.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.42 + i * 0.06, ease: EASE }}
                  className="flex items-start gap-2.5 text-sm text-zinc-700"
                >
                  <Check className="mt-0.5 w-4 h-4 shrink-0 text-amber-500" strokeWidth={2.4} aria-hidden="true" />
                  <span style={{ lineHeight: "1.6" }}>{f}</span>
                </motion.li>
              ))}
            </ul>

            <a
              href={WA_CAFENEA}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full text-sm font-medium text-zinc-700 hover:text-amber-700
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 transition-colors"
            >
              Anunță-mă când e gata
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
            </a>
          </motion.article>
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white text-center card-elevated"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ letterSpacing: "-0.02em" }}>
            Ai nevoie de o aplicație a ta?
          </h2>
          <p className="text-emerald-50 mb-6 max-w-xl mx-auto" style={{ lineHeight: "1.7" }}>
            Spune-mi cum lucrezi acum și îți spun ce se poate construi, cât costă și în cât timp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="rounded-full bg-[#f8fafc] text-emerald-800 hover:bg-[#ecfdf5] font-semibold shadow-sm"
              asChild
            >
              <Link href="/#contact">Programează audit gratuit</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <a href={WA_IDEE} target="_blank" rel="noopener noreferrer">
                Scrie pe WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

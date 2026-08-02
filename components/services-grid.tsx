"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Blocks, Bot, Globe, ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react"

type AppItem = { name: string; note: string; status: "live" | "wip" }

type Serviciu = {
  icon: LucideIcon
  title: string
  desc: string
  items?: string[]
  apps?: AppItem[]
  href: string
  cta: string
}

const servicii: Serviciu[] = [
  {
    icon: Globe,
    title: "Site-uri Web",
    desc: "Construim site-uri moderne, rapide și optimizate pentru afacerea ta.",
    items: [
      "Site de prezentare — restaurante, pensiuni, cabinete, saloane, service auto",
      "Magazin online — pentru orice tip de afacere",
      "Site cu calculator de preț — acoperișuri, panouri solare, mobilier la comandă",
      "Pagină de campanie — pentru reclame și promoții",
    ],
    href: "/site-uri",
    cta: "Vezi site-uri web",
  },
  {
    icon: Blocks,
    title: "Aplicații personalizate",
    desc: "Dezvoltăm aplicații create special pentru afacerea ta, exact după modul în care funcționează.",
    apps: [
      { name: "DaviX Dental", note: "Pentru cabinete stomatologice", status: "live" },
      { name: "Fidelizare cafenea", note: "Card de puncte pe telefon", status: "wip" },
    ],
    href: "/aplicatii",
    cta: "Vezi aplicațiile",
  },
  {
    icon: Bot,
    title: "Chatboți AI",
    desc: "Asistenți virtuali care răspund automat clienților, preiau solicitări și sunt disponibili 24/7.",
    items: [
      "Răspund pe loc la întrebările care se repetă",
      "Preiau cereri și programări",
      "Pe site, pe WhatsApp sau pe email",
      "Lucrează și noaptea, și în weekend",
    ],
    href: "/automatizari",
    cta: "Vezi chatboți AI",
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

export function ServicesGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const reduceMotion = useReducedMotion()

  return (
    <section id="servicii" className="py-24 sm:py-32 px-4 sm:px-6 bg-transparent">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 text-sm font-medium">Ce construim</span>
          </div>
          <h2
            style={{ letterSpacing: "-0.025em" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-4 text-balance"
          >
            Trei direcții. Atât.
          </h2>
          <p className="text-zinc-600 max-w-xl mx-auto" style={{ lineHeight: "1.7" }}>
            Alegi ce ți se potrivește, noi construim, tu te ocupi mai departe de afacere.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicii.map((s, index) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                className={index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}
              >
                <Link
                  href={s.href}
                  className="group relative flex h-full flex-col overflow-hidden p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200
                             hover:border-emerald-300 hover:-translate-y-1 active:translate-y-0
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2
                             transition-[transform,border-color,box-shadow] duration-300 ease-out card-elevated"
                >
                  {/* sheen — traversează cardul la hover */}
                  {!reduceMotion && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12
                                 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent
                                 transition-transform duration-[900ms] ease-out group-hover:translate-x-[420%]"
                    />
                  )}

                  <div className="relative flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center
                                 group-hover:bg-emerald-100 group-hover:scale-105 transition-[transform,background-color] duration-300 ease-out"
                    >
                      <Icon className="w-5 h-5 text-emerald-600" strokeWidth={1.8} />
                    </div>
                    <h3
                      className="text-lg font-semibold text-zinc-900"
                      style={{ letterSpacing: "-0.015em" }}
                    >
                      {s.title}
                    </h3>
                  </div>

                  <p className="relative text-sm text-zinc-600 mb-5" style={{ lineHeight: "1.7" }}>
                    {s.desc}
                  </p>

                  {s.items && (
                    <ul className="relative flex-1 space-y-2.5 mb-6">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-700">
                          <span
                            aria-hidden="true"
                            className="mt-[0.45rem] w-1.5 h-1.5 shrink-0 rounded-full bg-emerald-500"
                          />
                          <span style={{ lineHeight: "1.6" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.apps && (
                    <ul className="relative flex-1 space-y-2.5 mb-6">
                      {s.apps.map((app) => (
                        <li
                          key={app.name}
                          className="rounded-xl border border-zinc-100 bg-zinc-50/70 px-3.5 py-3"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-medium text-zinc-800">{app.name}</span>
                            {app.status === "live" ? (
                              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-glow" />
                                Gata
                              </span>
                            ) : (
                              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                Se lucrează
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-zinc-500">{app.note}</p>
                        </li>
                      ))}
                    </ul>
                  )}

                  <span className="relative mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                    {s.cta}
                    <ArrowUpRight
                      className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.2}
                    />
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* CTA discret, ca să nu concureze cu formularul de mai jos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-2 text-center"
        >
          <p className="text-sm text-zinc-600">Nu știi de unde să începi?</p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 rounded-full text-sm font-semibold text-emerald-700 hover:text-emerald-800
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 transition-colors"
          >
            Programează un audit gratuit de 15 minute
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
              strokeWidth={2.2}
            />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

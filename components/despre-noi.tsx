"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import {
  Clock,
  ShieldCheck,
  Receipt,
  PhoneCall,
  FileText,
  Wrench,
  Eye,
  Rocket,
  Blocks,
  type LucideIcon,
} from "lucide-react"

const EASE = [0.22, 1, 0.36, 1] as const

const stats = [
  { icon: Clock, value: "2–5 zile", label: "Pentru un site de prezentare" },
  { icon: ShieldCheck, value: "Contract", label: "La fiecare proiect" },
  { icon: Receipt, value: "Factură", label: "Lucrez pe PFA, totul legal" },
  { icon: PhoneCall, value: "Direct", label: "Vorbești cu mine, nu cu un birou" },
]

const paragrafe = [
  "Mă numesc Balta David Ioan și lucrez din Suceava. Tehnologia m-a atras de mult timp, dar am tot amânat. La un moment dat m-am oprit din amânat și am început să construiesc: întâi site-uri, apoi aplicații. Nu e o poveste spectaculoasă. E doar decizia de a face lucrul care îmi plăcea, în loc să-l las pe mâine.",
  "Acum construiesc site-uri de prezentare, magazine online și aplicații pentru afaceri locale: pensiuni, restaurante, cabinete, service-uri auto, firme de servicii. Am trecut de faza de început și prind experiență cu fiecare proiect. Învăț în continuare și nu ascund asta — mi se pare mai corect decât să mă dau mai mare decât sunt.",
  "Ce pot să-ți promit sunt lucrurile pe care le controlez: răspund la telefon, respect termenul stabilit și îți spun din prima cât costă. Lucrez pe PFA, cu contract și factură la fiecare proiect. Vorbești direct cu omul care construiește site-ul — nu treci prin trei intermediari ca să schimbi o poză.",
]

type Pas = { icon: LucideIcon; title: string; desc: string; time: string }

const pasiSite: Pas[] = [
  {
    icon: PhoneCall,
    title: "Discuția",
    desc: "Aflu ce face afacerea ta, ce vrei să obții și ce ai deja.",
    time: "15–20 minute",
  },
  {
    icon: FileText,
    title: "Oferta și avansul",
    desc: "Preț fix, fără surprize pe parcurs. Semnăm contractul și pornesc după avans.",
    time: "În aceeași zi",
  },
  {
    icon: Wrench,
    title: "Construcția",
    desc: "Ridic site-ul: structură, texte, poze, formulare. Nu te deranjez decât dacă am nevoie de ceva.",
    time: "2–5 zile lucrătoare",
  },
  {
    icon: Eye,
    title: "Preview și corecturi",
    desc: "Vezi site-ul pe un link privat, îmi spui ce vrei schimbat și schimb.",
    time: "1–2 zile",
  },
  {
    icon: Rocket,
    title: "Publicarea",
    desc: "Conectez domeniul, site-ul intră live, primești factura. Rămân disponibil și după.",
    time: "În ziua stabilită",
  },
]

const pasiAplicatie = [
  "Discuția e mai lungă — vreau să văd exact cum lucrezi acum, pas cu pas.",
  "Construiesc o primă versiune și o folosim pe date reale, câteva zile.",
  "Corectez ce nu se potrivește cu felul tău de a lucra.",
  "Aplicația intră în folosință și rămân pe suport pentru ajustări.",
]

const promisiuni = [
  {
    title: "Preț fix, spus din start",
    desc: "Îți spun cât costă înainte să începem. Ce e în ofertă rămâne în ofertă.",
  },
  {
    title: "Termenul e în contract",
    desc: "Dacă am zis 5 zile, în 5 zile e gata. Dacă apare o problemă, afli de la mine.",
  },
  {
    title: "Rămân disponibil după",
    desc: "Site-ul nu e gata când îl public. Dacă ai nevoie de o schimbare, mă suni.",
  },
]

export default function DespreNoi() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" })

  const stepsRef = useRef(null)
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" })

  const valuesRef = useRef(null)
  const valuesInView = useInView(valuesRef, { once: true, margin: "-60px" })

  const reduceMotion = useReducedMotion()

  return (
    <section ref={ref} className="py-14 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* ---------- Despre mine ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 text-sm font-medium">Cine sunt</span>
          </div>
          <h2
            style={{ letterSpacing: "-0.025em" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 text-balance"
          >
            Despre mine
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-5 mb-14">
          {paragrafe.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.12, ease: EASE }}
              className="text-zinc-600"
              style={{ lineHeight: "1.8" }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
              className="group flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-zinc-200 hover:border-emerald-300 hover:-translate-y-0.5 transition-[transform,border-color] duration-300 card-elevated"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3 group-hover:bg-emerald-100 group-hover:scale-105 transition-[transform,background-color] duration-300">
                <stat.icon className="w-4 h-4 text-emerald-600" strokeWidth={1.8} />
              </div>
              <span className="text-lg font-bold text-zinc-900 mb-1 text-center">{stat.value}</span>
              <span className="text-xs text-zinc-500 text-center" style={{ lineHeight: "1.5" }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ---------- Cum lucrez ---------- */}
        <div ref={stepsRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center mb-10"
          >
            <h2
              style={{ letterSpacing: "-0.025em" }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 mb-3 text-balance"
            >
              De la telefon la site live
            </h2>
            <p className="text-zinc-600 max-w-xl mx-auto" style={{ lineHeight: "1.7" }}>
              Cinci pași, fiecare cu termenul lui. Știi tot timpul unde suntem.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-2xl mx-auto">
            {/* linia verticală care se desenează la scroll */}
            <span
              aria-hidden="true"
              className="absolute left-[1.375rem] top-6 bottom-6 w-px bg-zinc-200 overflow-hidden"
            >
              <motion.span
                initial={reduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
                animate={stepsInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.3, delay: 0.25, ease: EASE }}
                className="block h-full w-full origin-top bg-gradient-to-b from-emerald-500 via-emerald-400 to-emerald-500/0"
              />
            </span>

            <ol className="relative space-y-4">
              {pasiSite.map((pas, i) => {
                const Icon = pas.icon
                return (
                  <motion.li
                    key={pas.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.3 + i * 0.12, ease: EASE }}
                    className="group flex items-start gap-4"
                  >
                    {/* pastila cu numărul */}
                    <span className="relative z-10 flex w-11 h-11 shrink-0 items-center justify-center rounded-full bg-white border border-emerald-200 text-sm font-bold text-emerald-700 card-elevated group-hover:border-emerald-400 group-hover:scale-105 transition-[transform,border-color] duration-300 ease-out">
                      {i + 1}
                    </span>

                    <div className="flex-1 min-w-0 p-5 rounded-2xl bg-white border border-zinc-200 hover:border-emerald-300 transition-colors duration-300 card-elevated">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={1.9} aria-hidden="true" />
                          <h3 className="text-base font-semibold text-zinc-900">{pas.title}</h3>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                          <Clock className="w-3 h-3" strokeWidth={2.2} aria-hidden="true" />
                          {pas.time}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-600" style={{ lineHeight: "1.65" }}>
                        {pas.desc}
                      </p>
                    </div>
                  </motion.li>
                )
              })}
            </ol>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={stepsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="mt-8 max-w-2xl mx-auto text-center text-sm text-zinc-600"
            style={{ lineHeight: "1.8" }}
          >
            Termenele astea sunt scrise în contract, nu doar spuse la telefon. Când știi exact când e
            gata site-ul, îți poți face planuri: anunțuri, promovare, deschidere.
          </motion.p>

          {/* Traseul pentru aplicații — mai scurt, pentru că e același drum, doar mai lung */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.05, ease: EASE }}
            className="mt-10 max-w-2xl mx-auto p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200 card-elevated"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="flex w-10 h-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                <Blocks className="w-5 h-5" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-zinc-900">
                  La aplicații e același drum, doar mai lung
                </h3>
                <p className="text-xs text-zinc-500">2–6 săptămâni, în funcție de cât de mare e</p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {pasiAplicatie.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-zinc-600">
                  <span
                    aria-hidden="true"
                    className="mt-[0.45rem] w-1.5 h-1.5 shrink-0 rounded-full bg-emerald-500"
                  />
                  <span style={{ lineHeight: "1.65" }}>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ---------- Ce garantez ---------- */}
        <div ref={valuesRef} className="grid sm:grid-cols-3 gap-5">
          {promisiuni.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.12, ease: EASE }}
              className="group p-6 rounded-2xl bg-white border border-zinc-200 hover:border-emerald-300 hover:-translate-y-0.5 transition-[transform,border-color] duration-300 card-elevated"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={valuesInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: EASE }}
                className="h-0.5 w-10 bg-emerald-500 rounded-full mb-4 origin-left"
              />
              <h3 className="text-base font-semibold text-zinc-900 mb-2">{value.title}</h3>
              <p className="text-sm text-zinc-600" style={{ lineHeight: "1.7" }}>
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

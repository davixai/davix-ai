"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  CalendarDays,
  FileText,
  Activity,
  ImageIcon,
  Wallet,
  Beaker,
  Users,
  ShieldCheck,
  MessageSquare,
  Check,
  ArrowRight,
  Sparkles,
  Star,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const WA_DENTAL_DEMO =
  "https://wa.me/40729369094?text=" +
  encodeURIComponent(
    "Salut, vreau mai multe detalii despre Davix Dental și planurile pentru clinici."
  )

const WA_PRO =
  "https://wa.me/40729369094?text=" +
  encodeURIComponent("Salut, vreau planul Pro pentru Davix Dental.")

const beneficii = [
  { icon: CalendarDays, label: "Calendar și programări pe medic" },
  { icon: FileText, label: "Fișe pacienți și istoric medical" },
  { icon: Activity, label: "Odontogramă și planuri de tratament" },
  { icon: ImageIcon, label: "Fișiere medicale și galerie before/after" },
  { icon: Wallet, label: "Financiar: plăți, încasări și cheltuieli" },
  { icon: Beaker, label: "Laborator: lucrări, furnizori și costuri" },
  { icon: Users, label: "Roluri pentru medic, asistent, recepție, contabil" },
  { icon: ShieldCheck, label: "Audit log și notițe rapide" },
  { icon: MessageSquare, label: "Automatizări SMS pentru reminder și review Google" },
]

type Plan = {
  id: "starter" | "pro" | "max"
  name: string
  badge?: string
  price: string
  description: string
  highlight?: boolean
  includes: string[]
  note: string
  ctaLabel: string
  ctaHref: string
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "400",
    description:
      "Pentru clinici care vor CRM dentar complet, fără automatizări SMS.",
    includes: [
      "Calendar și programări pe medic",
      "Fișe pacienți, istoric medical și consimțământ marketing",
      "Odontogramă, tratamente și planuri de tratament",
      "Fișiere medicale și galerie foto before/after",
      "Servicii, prețuri și durate pe clinică/medic",
      "Financiar: plăți, încasări, cheltuieli și metode de plată",
      "Laborator: lucrări, furnizori, statusuri și costuri",
      "Recall pacienți, notițe rapide și audit log",
    ],
    note:
      "Automatizări SMS: inactive. Plan potrivit când clinica dorește aplicația, dar gestionează comunicarea manual.",
    ctaLabel: "Vreau planul Starter",
    ctaHref:
      "https://wa.me/40729369094?text=" +
      encodeURIComponent("Salut, vreau planul Starter pentru Davix Dental."),
  },
  {
    id: "pro",
    name: "Pro",
    badge: "Recomandat",
    highlight: true,
    price: "600",
    description:
      "Pentru clinici care vor automatizări active, cu SMS plătit direct de clinică.",
    includes: [
      "Tot din Starter + reminder programare automat",
      "Cerere automată de review Google după programare finalizată",
      "Template-uri SMS configurabile pentru clinică",
      "Link scurt pentru review și dezabonare pacient",
      "Jurnal SMS: trimis, eșuat sau ignorat",
      "Control pe cost: clinica folosește contul propriu Calisero",
      "Suport pentru setarea inițială a automatizărilor",
      "Costurile SMS sunt achitate direct de clinică",
    ],
    note:
      "Cost SMS estimat: ~0,25 RON/mesaj. Automatizările sunt incluse în abonament; consumul SMS este gestionat și plătit de clinică în Calisero.",
    ctaLabel: "Vreau planul Pro",
    ctaHref: WA_PRO,
  },
  {
    id: "max",
    name: "Max",
    badge: "Gestionat",
    price: "800",
    description:
      "Pentru clinici care vor automatizări SMS fără administrarea contului Calisero.",
    includes: [
      "Tot din Pro + gestionăm noi primele 450 SMS/lună",
      "450 SMS incluse lunar, gestionate de Davix",
      "Reminder programare + review Google automat",
      "Configurare template-uri și link review scurt",
      "Monitorizare consum și raportare lunară",
      "Fără cont Calisero administrat de clinică",
      "Potrivit pentru ~9–10 programări/zi",
      "Consum suplimentar facturat transparent",
    ],
    note:
      "Extra SMS: 0,39 RON/mesaj, facturat lunar. După cele 450 SMS incluse, fiecare mesaj suplimentar se taxează lunar în funcție de consum.",
    ctaLabel: "Vreau planul Max",
    ctaHref:
      "https://wa.me/40729369094?text=" +
      encodeURIComponent("Salut, vreau planul Max pentru Davix Dental."),
  },
]

const sharedInclusions = [
  "Admin + 5 utilizatori de echipă",
  "100GB stocare medicală inclusă",
  "Roluri: medic, asistent, recepție, contabil",
  "Utilizator suplimentar: +50 RON/lună",
  "Extra stocare: +25 RON/lună / 100GB",
]

export function DavixDental() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const plansRef = useRef(null)
  const plansInView = useInView(plansRef, { once: true, margin: "-100px" })

  return (
    <section
      id="davix-dental"
      ref={ref}
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden bg-transparent"
    >
      {/* Soft blue accents for Davix Dental */}
      <div className="absolute top-32 -left-32 w-[400px] h-[400px] bg-sky-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] bg-emerald-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" strokeWidth={1.8} />
            <span className="text-sky-700 text-sm font-medium">Produs Davix pentru clinici dentare</span>
          </div>

          <h2 className="text-sm font-semibold tracking-widest text-sky-700 uppercase mb-3">
            Davix Dental
          </h2>
          <h3
            style={{ letterSpacing: "-0.025em" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-5 text-balance"
          >
            CRM stomatologic pentru cabinete și clinici organizate
          </h3>
          <p
            className="text-zinc-600 max-w-2xl mx-auto mb-7"
            style={{ lineHeight: "1.7" }}
          >
            Pacienți, programări, fișiere medicale, tratamente, roluri, financiar, laborator și
            automatizări SMS într-un sistem configurat pentru fluxul clinicii.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="shimmer-btn bg-sky-600 hover:bg-sky-700 text-white rounded-full px-7 h-12 shadow-lg shadow-sky-600/20"
              asChild
            >
              <a href={WA_DENTAL_DEMO} target="_blank" rel="noopener noreferrer">
                Programează demo Davix Dental
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-7 h-12 border-zinc-300 text-zinc-800 hover:bg-zinc-50 bg-white"
              asChild
            >
              <a href="#dental-planuri">Vezi planurile</a>
            </Button>
          </div>
        </motion.div>

        {/* Beneficii grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-20"
        >
          {beneficii.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.04 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white border border-zinc-200 hover:border-sky-300 hover:bg-sky-50/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-sky-600" strokeWidth={1.8} />
                </div>
                <span className="text-sm text-zinc-700">{b.label}</span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Plans */}
        <div id="dental-planuri" ref={plansRef} className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={plansInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h3
              style={{ letterSpacing: "-0.025em" }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 mb-4 text-balance"
            >
              Planuri Davix Dental
            </h3>
            <p className="text-zinc-600 max-w-2xl mx-auto" style={{ lineHeight: "1.7" }}>
              Toate planurile includ <strong>admin + 5 utilizatori, 100GB stocare</strong> și
              <strong> roluri</strong> pentru medic, asistent, recepție și contabil.
            </p>
          </motion.div>

          {/* Shared inclusions strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={plansInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mb-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-600"
          >
            {sharedInclusions.map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2.5} />
                <span>{s}</span>
              </div>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                animate={plansInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.1 }}
                className={`relative p-7 rounded-2xl flex flex-col card-elevated ${
                  plan.highlight
                    ? "bg-gradient-to-br from-sky-600 to-sky-700 text-white border border-sky-500 lg:-translate-y-2"
                    : "bg-white border border-zinc-200"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                        plan.highlight
                          ? "bg-white text-sky-700"
                          : "bg-emerald-600 text-white"
                      }`}
                    >
                      {plan.highlight ? <Star className="w-3 h-3" strokeWidth={2.5} /> : <Settings className="w-3 h-3" strokeWidth={2.5} />}
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <h4
                    className={`text-xl font-bold mb-1 ${
                      plan.highlight ? "text-white" : "text-zinc-900"
                    }`}
                  >
                    {plan.name}
                  </h4>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span
                      className={`text-4xl font-bold ${
                        plan.highlight ? "text-white" : "text-zinc-900"
                      }`}
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm ${plan.highlight ? "text-sky-100" : "text-zinc-500"}`}
                    >
                      RON / lună
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      plan.highlight ? "text-sky-50" : "text-zinc-600"
                    }`}
                    style={{ lineHeight: "1.6" }}
                  >
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.includes.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-2 text-sm ${
                        plan.highlight ? "text-sky-50" : "text-zinc-700"
                      }`}
                      style={{ lineHeight: "1.5" }}
                    >
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          plan.highlight ? "text-white" : "text-emerald-600"
                        }`}
                        strokeWidth={2.5}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p
                  className={`text-xs italic mb-5 ${
                    plan.highlight ? "text-sky-100" : "text-zinc-500"
                  }`}
                  style={{ lineHeight: "1.5" }}
                >
                  {plan.note}
                </p>

                <Button
                  className={`w-full rounded-full font-semibold ${
                    plan.highlight
                      ? "bg-white text-sky-700 hover:bg-zinc-100"
                      : "bg-zinc-900 text-white hover:bg-zinc-800"
                  }`}
                  asChild
                >
                  <a href={plan.ctaHref} target="_blank" rel="noopener noreferrer">
                    {plan.ctaLabel}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Extra costs footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={plansInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 p-6 rounded-2xl bg-zinc-50 border border-zinc-200"
          >
            <p
              className="text-sm text-zinc-600 text-center mb-4"
              style={{ lineHeight: "1.7" }}
            >
              Prețuri lunare pentru clinici dentare mici și medii. Oferta este gândită pentru
              implementare rapidă, costuri predictibile și separarea clară între aplicație,
              utilizatori, stocare și consumul SMS.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-zinc-500">
              <span>+50 RON utilizator suplimentar</span>
              <span>•</span>
              <span>+25 RON/lună per 100GB stocare extra</span>
              <span>•</span>
              <span>0,39 RON per SMS extra, facturat lunar</span>
            </div>
          </motion.div>

          {/* Bottom CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={plansInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              size="lg"
              className="bg-sky-600 hover:bg-sky-700 text-white rounded-full px-7 h-12 shadow-lg shadow-sky-600/20"
              asChild
            >
              <a href={WA_DENTAL_DEMO} target="_blank" rel="noopener noreferrer">
                Programează demo Davix Dental
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-7 h-12 border-zinc-300 text-zinc-800 hover:bg-zinc-50 bg-white"
              asChild
            >
              <a href={WA_PRO} target="_blank" rel="noopener noreferrer">
                Vreau planul Pro
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-7 h-12 border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-white"
              asChild
            >
              <a href={WA_DENTAL_DEMO} target="_blank" rel="noopener noreferrer">
                Întreabă pe WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

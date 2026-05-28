"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Code2,
  Globe,
  Database,
  Sparkles,
  MessageSquare,
  Mail,
  Smartphone,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const servicii = [
  {
    icon: Code2,
    title: "Aplicații web custom",
    problem:
      "Excel, Google Sheets sau soluții generice nu mai țin pasul cu echipa și cu fluxul real al afacerii.",
    benefit:
      "Construim aplicații web pe măsură: dashboard-uri, portal clienți, calculatoare, rezervări — exact ce ai nevoie.",
  },
  {
    icon: Globe,
    title: "Site-uri de prezentare",
    problem:
      "Site-ul actual e lent, vechi sau nu aduce cereri reale prin formulare și WhatsApp.",
    benefit:
      "Site-uri moderne, rapide, optimizate SEO și pentru conversie — cu integrare WhatsApp și formular de programare.",
  },
  {
    icon: Database,
    title: "CRM-uri și platforme interne",
    problem:
      "Datele despre clienți, programări sau comenzi sunt împrăștiate prin tabele, foi de hârtie sau capul echipei.",
    benefit:
      "Centralizăm totul într-un CRM configurat pe procesele tale: clienți, programări, facturi, rapoarte și roluri.",
  },
  {
    icon: Sparkles,
    title: "Automatizări AI",
    problem:
      "Răspunsuri la oferte, calificare lead-uri și taskuri repetitive îți consumă ore zilnic.",
    benefit:
      "Agenți AI care preiau întrebări frecvente, califică lead-uri și sortează cererile direct în pipeline.",
  },
  {
    icon: Smartphone,
    title: "Automatizări SMS",
    problem:
      "Pacienții/clienții uită programările, nu lasă review-uri și pierzi oportunități de re-contact.",
    benefit:
      "SMS automat pentru reminder programare, confirmări, review Google și notificări — cu jurnal complet.",
  },
  {
    icon: Mail,
    title: "Automatizări email",
    problem:
      "Email-urile importante se pierd, follow-up-urile se uită și clienții nu mai răspund.",
    benefit:
      "Secvențe automate pentru welcome, follow-up oferte, newsletter, facturi și notificări interne.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp / chatbot",
    problem:
      "Pe WhatsApp ajung zilnic zeci de mesaje, dar răspunsul vine prea târziu și pierzi clienți.",
    benefit:
      "Chatbot WhatsApp care răspunde instant, preia cereri și transmite lead-urile mai departe către tine.",
  },
]

export function ServicesGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="servicii" className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-white via-zinc-50 to-white">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 text-sm font-medium">Servicii DaviX AI</span>
          </div>
          <h2
            style={{ letterSpacing: "-0.025em" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-4 text-balance"
          >
            Construim ce are nevoie afacerea ta, nu un template generic
          </h2>
          <p className="text-zinc-600 max-w-2xl mx-auto" style={{ lineHeight: "1.7" }}>
            De la site-uri și aplicații web custom până la automatizări SMS, email și WhatsApp —
            soluții pe procesele tale, cu rezultate măsurabile.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicii.map((s, index) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative p-6 rounded-2xl bg-white border border-zinc-200 hover:border-emerald-300 transition-all duration-300 card-elevated hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <Icon className="w-5 h-5 text-emerald-600" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900">{s.title}</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                      Problema
                    </p>
                    <p className="text-sm text-zinc-600" style={{ lineHeight: "1.6" }}>
                      {s.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 mb-1">
                      Soluția noastră
                    </p>
                    <p className="text-sm text-zinc-700" style={{ lineHeight: "1.6" }}>
                      {s.benefit}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white flex flex-col justify-between min-h-[200px] card-elevated"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">Nu știi de unde să începi?</h3>
              <p className="text-emerald-50 text-sm" style={{ lineHeight: "1.6" }}>
                În auditul gratuit alegem împreună ce poate fi automatizat, ce reduce cel mai mult din
                timpul tău și ce te ajută să aduci mai mulți clienți.
              </p>
            </div>
            <Button
              size="sm"
              className="mt-5 self-start rounded-full bg-white text-emerald-700 hover:bg-zinc-100 font-semibold"
              asChild
            >
              <a href="#contact">
                Programează audit gratuit
                <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

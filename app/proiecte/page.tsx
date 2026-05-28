"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, ArrowRight, AlertCircle, Sparkles, Trophy } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Chatbot } from "@/components/chatbot"
import { Button } from "@/components/ui/button"

type Project = {
  category: string
  name: string
  problem: string
  solution: string
  benefit: string
  url: string
  waMessage: string
}

const projects: Project[] = [
  {
    category: "Stomatologie",
    name: "DaviDent",
    problem: "Cabinet stomatologic fără prezență online clară, fără canal direct pentru programări.",
    solution: "Site de prezentare modern, secțiuni servicii și recenzii, integrare WhatsApp și formular contact.",
    benefit: "Vizitatorii află rapid serviciile și pot trimite cereri sau scrie pe WhatsApp în câteva secunde.",
    url: "https://davident.lovable.app/#recenzii",
    waMessage: "Salut, vreau un site similar cu DaviDent pentru cabinetul meu.",
  },
  {
    category: "Stomatologie",
    name: "Cabinet Dr. Domnar Gabriel",
    problem: "Pacienții sunau pentru detalii și programări pe care le puteau găsi online.",
    solution: "Site profesional cu pagini de servicii, programare online și informații despre echipă.",
    benefit: "Reducere apeluri repetitive și mai multe programări intrate direct din site.",
    url: "https://cabinet-domnargabriel.netlify.app/",
    waMessage: "Salut, vreau un site similar cu Cabinet Dr. Domnar pentru afacerea mea.",
  },
  {
    category: "SaaS / CRM",
    name: "Dental CRM",
    problem: "Clinici care lucrau cu Excel pentru pacienți, programări și financiar — pierdeau date și timp.",
    solution: "Aplicație web cu abonament: pacienți, programări, fișe, financiar și roluri pe utilizatori.",
    benefit: "Tot fluxul clinicii într-o singură aplicație, accesibilă de pe orice dispozitiv.",
    url: "https://dental-crm1.pages.dev",
    waMessage: "Salut, vreau o aplicație similară cu Dental CRM pentru clinica mea.",
  },
  {
    category: "Auto",
    name: "PieseAutoSmart",
    problem: "Magazin online fără filtrare rapidă pe marcă/model — utilizatorii părăseau site-ul.",
    solution: "Magazin cu căutare avansată, filtre pe marcă/model și flow simplificat de cumpărare.",
    benefit: "Utilizatorii găsesc piesa potrivită în câteva clickuri, conversie mai mare.",
    url: "https://pieseautosmart.netlify.app/",
    waMessage: "Salut, vreau un magazin similar cu PieseAutoSmart.",
  },
  {
    category: "Auto",
    name: "FiltrAuto",
    problem: "Căutarea de vehicule second-hand era greoaie pe platformele existente.",
    solution: "Platformă cu filtre avansate și UX curat pentru navigare rapidă printre anunțuri.",
    benefit: "Cumpărătorii găsesc rapid mașina dorită, vânzătorii au mai multe vizualizări.",
    url: "https://v0-filtreauto.vercel.app/",
    waMessage: "Salut, vreau o platformă similară cu FiltrAuto.",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function ProiectePage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-white text-zinc-900">
        <Navbar />

        <div className="pt-28 pb-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-14 text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-6">
                <Trophy className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.8} />
                <span className="text-emerald-700 text-sm font-medium">Portofoliu DaviX AI</span>
              </div>
              <h1
                style={{ letterSpacing: "-0.025em" }}
                className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-4 text-balance"
              >
                Proiecte demonstrative
              </h1>
              <p
                className="text-zinc-600 max-w-2xl mx-auto"
                style={{ lineHeight: "1.7" }}
              >
                Exemple concrete realizate de echipa DaviX AI — de la site-uri de prezentare la
                aplicații SaaS și CRM-uri. Fiecare proiect explică problema rezolvată și beneficiul
                pentru client.
              </p>
            </motion.div>

            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.url}
                  variants={cardVariants}
                  className="group flex flex-col rounded-2xl bg-white border border-zinc-200 p-6
                             hover:border-emerald-300 hover:-translate-y-0.5
                             transition-[transform,border-color] duration-300 card-elevated"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-700 mb-3">
                    {project.category}
                  </span>

                  <h2 className="text-lg font-semibold text-zinc-900 mb-4 leading-snug">
                    {project.name}
                  </h2>

                  <div className="space-y-3 mb-5 flex-1">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <AlertCircle className="w-3 h-3 text-zinc-400" strokeWidth={2} />
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                          Problema
                        </p>
                      </div>
                      <p className="text-xs text-zinc-600" style={{ lineHeight: "1.55" }}>
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" strokeWidth={2} />
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                          Soluția
                        </p>
                      </div>
                      <p className="text-xs text-zinc-700" style={{ lineHeight: "1.55" }}>
                        {project.solution}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Trophy className="w-3 h-3 text-emerald-600" strokeWidth={2} />
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                          Beneficiu
                        </p>
                      </div>
                      <p className="text-xs text-zinc-700" style={{ lineHeight: "1.55" }}>
                        {project.benefit}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-auto">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                                 bg-zinc-100 border border-zinc-200 text-sm text-zinc-700
                                 hover:bg-zinc-200 hover:text-zinc-900
                                 transition-colors duration-200"
                    >
                      Vezi proiectul
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />
                    </a>
                    <a
                      href={`https://wa.me/40729369094?text=${encodeURIComponent(project.waMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                                 bg-emerald-600 text-white text-sm font-medium
                                 hover:bg-emerald-700 transition-colors duration-200"
                    >
                      Vreau ceva similar
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-14 p-8 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white text-center"
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-3" style={{ letterSpacing: "-0.02em" }}>
                Ai un proiect în minte?
              </h3>
              <p className="text-emerald-50 mb-6 max-w-xl mx-auto" style={{ lineHeight: "1.6" }}>
                Programează un audit gratuit de 15 minute și discutăm cum putem să-l construim.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  className="rounded-full bg-white text-emerald-700 hover:bg-zinc-100 font-semibold"
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
                  <a href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer">
                    Scrie pe WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
        <Chatbot />
      </main>
    </SmoothScroll>
  )
}
